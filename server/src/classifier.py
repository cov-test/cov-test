import os
import json
import copy
import collections
import numpy as np

from covtesttypes import InfectedContact, CoughType, Workplace, HasTravelled

def flatten_answers(answers):
    result = {}
    
    for key1, subdict in answers.items():
        if key1 == 'workplace':
            result[key1] = subdict
        else:
            for key2, value in subdict.items():
                result['{}__{}'.format(key1, key2)] = value
    return result


HIGH_RISK_COUNTRIES = set([
    'CN', # CHINA
])

prob_to_odds = lambda p: 1 + p / (1 - p)
prob_to_log_odds = lambda p: np.log(prob_to_odds(p))

# The keys of this dict are also called 'factors' and the values 'coefficients'.
# The coefficients are the logs of the odds ratio for a factor:
# e.g if the odds for a man is 3 times higher to be infected than
# for a woman, the coefficient for the factor of being male is log(3)
coefficients = collections.OrderedDict({
    # data from WHO
    "fever__maximumTemperatureInDegrees":   prob_to_log_odds(0.879),  # Fieber über 38 Grad
    "fever__daysSinceMaximumTemperature":   prob_to_log_odds(0.0),    # ignored for now
    "coughing__type":                       prob_to_log_odds(0.677),  # trockener Husten
    "coughing__phlegm":                     prob_to_log_odds(0.334),  # Auswurf
    "coughing__bloodInCough":               prob_to_log_odds(0.009),  # Blut beim Abhusten

    "symptoms__shivers":                    prob_to_log_odds(0.114),  # Schüttelfrost
    "symptoms__permanentTiredness":         prob_to_log_odds(0.381),  # Müdigkeit
    "symptoms__shortnessOfBreath":          prob_to_log_odds(0.186),  # Kurzatmigkeit

    "symptoms__soreThroat":                 prob_to_log_odds(0.139),  # Halsschmerzen
    "symptoms__headache":                   prob_to_log_odds(0.136),  # Kopfschmerzen
    "symptoms__rheumaticPains":             prob_to_log_odds(0.148),  # Gliederschmerzen

    "symptoms__diarrhea":                   prob_to_log_odds(0.037),  # Durchfall
    "symptoms__nausea":                     prob_to_log_odds(0.050),  # Übelkeit/Erbrechen


    # these values are just assumptions and are not supported by data:
    'travel__hasTravelled':                 np.log(1.2), # 1 = in Germany, 2 = abroad, 3: in high risk country

    "symptoms__fever_above_38_and_dry_cough":   np.log(1.5),      # combined risk for fever and dry_cough togehter

    
    'contactToInfectedPerson__contactInfected':  np.log(3),
    'contactToInfectedPerson__daysSinceContact': 0.0,
    'contactToInfectedPerson__sameHousehold':    np.log(100),
    
    "riskGroup__overFiftyYearsOld":               np.log(1.1),
    "riskGroup__overSixtyYearsOld":               np.log(1.1),
    "riskGroup__overSeventyYearsOld":             np.log(1.3),
    "riskGroup__overEightyYearsOld":              np.log(1.4),
    "riskGroup__smoker":                          np.log(1.2),
    "riskGroup__pregnant":                        np.log(1.3),
    "riskGroup__chronicLungDisease":              np.log(1.3),
    "riskGroup__consumptionOfImmunoSuppressantDrugs": np.log(1.3),
    
    'workplace':                                  np.log(0.5), # 1: medical sector
})

SYMPTOM_FACTORS = [factor for factor in coefficients
                   if factor.startswith('symptoms__')
                      and factor != 'symptoms__fever_above_38_and_dry_cough']

def map_answer(answers, factor_list, key, mapping):
    i = factor_list.index(key)
    value = answers[key]
    c = mapping[value]

    x = np.zeros(len(factor_list))
    x[i] = c
    return x


def classify(answers):
    """
    This function takes a dictionary of symptoms and then
    returns a tuple (bool, float) where bool is a binary classification (True/False)
    based on logistic regression and float is the probability to be infected.
    Each answer has a risk factor (coefficients) between 0.0 and 1.0 where
    a coefficient value of 0.0 indicates no corona-indication
    and 1.0 indicates high indication for corona.
    """
    debug = True
    if not isinstance(answers, dict):
        answers = answers.__dict__
        
        for k in ['contactToInfectedPerson', 'symptoms', 'fever', 'coughing', 'travel', 'riskGroup']:
            answers[k] = answers[k].__dict__
        del answers['userId']
    answers = flatten_answers(answers)
    
    factor_list = list(sorted(coefficients.keys()))

    check = []
    x = np.zeros(len(coefficients))

    binary_factors = [
        'contactToInfectedPerson__sameHousehold',
        'coughing__phlegm',
        'coughing__bloodInCough',
        'symptoms__shivers',
        'symptoms__permanentTiredness',
        'symptoms__shortnessOfBreath',
        'symptoms__soreThroat',
        'symptoms__headache',
        'symptoms__rheumaticPains',
        'symptoms__diarrhea',
        'symptoms__nausea',
        "riskGroup__overFiftyYearsOld",
        "riskGroup__overSixtyYearsOld",
        "riskGroup__overSeventyYearsOld",
        "riskGroup__overEightyYearsOld",
        "riskGroup__smoker",
        "riskGroup__pregnant",
        "riskGroup__chronicLungDisease",
        "riskGroup__consumptionOfImmunoSuppressantDrugs",
    ]
    
    for this_factor in binary_factors:
        i = factor_list.index(this_factor)
        x[i] = (answers[this_factor] == True)
        check.append(this_factor)


    # == contactToInfectedPerson ==
    this_factor = 'contactToInfectedPerson__contactInfected'
    x += map_answer(answers, factor_list, this_factor, {
        InfectedContact.YES: 2,
        InfectedContact.MAYBE: 1,
        InfectedContact.NO: 0
    })
    check.append(this_factor)

    # if the person has contact to a case (YES or MAYBE), but it was more than two weeks ago
    # and the person does not show any symptoms there is no additional risk
    has_symptoms = any(answers[key] for key in SYMPTOM_FACTORS)
    if (answers['contactToInfectedPerson__daysSinceContact'] > 14 and not has_symptoms):
        i = factor_list.index(this_factor)
        x[i] = 0
    check.append('contactToInfectedPerson__daysSinceContact')
    

    # == SYMPTOMS ==
    number_of_symptoms = sum(answers[key] for key in SYMPTOM_FACTORS)

    # If the person is only permanently tired and has no other symptoms,
    # we do not classify them as corona positive
    this_factor = 'symptoms__permanentTiredness'
    if number_of_symptoms == 1 and answers[this_factor]:
        i = factor_list.index(this_factor)
        x[i] = 0
       
    
    # these factors will be dealt with in detail
    check.append('symptoms__fever')
    check.append('symptoms__coughing')


    # == FEVER ==
    this_factor = 'fever__maximumTemperatureInDegrees'
    has_fever = False
    if answers['symptoms__fever'] and answers['fever__daysSinceMaximumTemperature'] <= 4:
        i = factor_list.index(this_factor)
        x[i] = (answers[this_factor] >= 38.0)
        has_fever = True
    check.append(this_factor)
    check.append('fever__daysSinceMaximumTemperature')
    
    
    # == COUGHING ==
    this_factor = 'coughing__type'
    has_dry_cough = False
    if answers['symptoms__coughing']:
        x += map_answer(answers, factor_list, this_factor, {
            CoughType.DRY: 1,
            CoughType.PRODUCTIVE: 0.25,
            CoughType.UNKNOWN: 0.25
        })
        if answers[this_factor] == CoughType.DRY:
            has_dry_cough = True
    check.append(this_factor)

    # handle the combination of fever and dry cough with an extra risk
    combined_factor = 'symptoms__fever_above_38_and_dry_cough'
    if has_fever and has_dry_cough:
        i = factor_list.index(combined_factor)
        x[i] = 1
    check.append(combined_factor)


    # == TRAVEL ==
    this_factor = 'travel__hasTravelled'
    i = factor_list.index(this_factor)
    if answers[this_factor] == HasTravelled.NO:
        pass
    elif answers[this_factor] == HasTravelled.WITHIN_GERMANY:
        x[i] = 1
    elif answers['travel__abroadTravelCountryCode'] in HIGH_RISK_COUNTRIES:
        x[i] = 3
    else:
        x[i] = 2
    check.append(this_factor)


    # == WORKPLACE ==
    this_factor = 'workplace'
    x += map_answer(answers, factor_list, this_factor, {
        Workplace.EDUCATION_SECTOR:             0.2,
        Workplace.MEDICAL_SECTOR:               1.0,
        Workplace.FREQUENT_CONTACT_WITH_PEOPLE: 0.1,
        Workplace.OTHER:                        0.0,
    })
    check.append(this_factor)

    assert len(set(factor_list) - set(check)) == 0

    coeffs = np.array([coefficients[k] for k in factor_list])
    c = x.dot(coeffs)
    prob = np.exp(c) / (1 + np.exp(c))
    test_result = prob > 0.6

    if debug:
        for i, this_factor in enumerate(factor_list):
            if x[i] > 0:
                print(this_factor, x[i], coeffs[i], x[i] * coeffs[i])
    
    return (test_result, prob)


answers_baseline_for_test = {
    'contactToInfectedPerson': {
        'contactInfected': InfectedContact.NO,
        'daysSinceContact': 0,
        'sameHousehold': False,
    },
    'symptoms': {
        "fever": False,
        "coughing": False,
        "shivers": False,
        "permanentTiredness": False,
        "shortnessOfBreath": False,
        "soreThroat": False,
        "headache": False,
        "rheumaticPains": False,
        "diarrhea": False,
        "nausea": False,
    },
    'fever': {
        'maximumTemperatureInDegrees': 36.5,
        'daysSinceMaximumTemperature': 0,
    },
    'coughing': {
        'type': 'UNKNOWN',
        'phlegm': False,
        'bloodInCough': False,
    },
    'travel': {
        'hasTravelled': HasTravelled.NO,
        'abroadTravelCountryCode': '',
    },
    'riskGroup': {
        "overFiftyYearsOld": False,
        "overSixtyYearsOld": False,
        "overSeventyYearsOld": False,
        "overEightyYearsOld": False,
        "smoker": False,
        "pregnant": False,
        "chronicLungDisease": False,
        "consumptionOfImmunoSuppressantDrugs": False,
    },
    'workplace': Workplace.OTHER,
}


def test_classify():
    answers = copy.deepcopy(answers_baseline_for_test)
    res = classify(answers)
    assert res[0] == False
    
    answers = copy.deepcopy(answers_baseline_for_test)
    answers['contactToInfectedPerson']['contactInfected'] = InfectedContact.YES
    res = classify(answers)
    print(res)
    assert res[0] == True


    answers = copy.deepcopy(answers_baseline_for_test)
    assert answers['contactToInfectedPerson']['contactInfected'] == InfectedContact.NO
    answers['contactToInfectedPerson']['contactInfected'] = InfectedContact.MAYBE
    res = classify(answers)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['contactToInfectedPerson']['contactInfected'] = InfectedContact.MAYBE
    answers['contactToInfectedPerson']['daysSinceContact'] = 20
    res = classify(answers)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['symptoms']['fever'] = True
    answers['fever']['maximumTemperatureInDegrees'] = 40
    res = classify(answers)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['symptoms']['coughing'] = True
    answers['coughing']['type'] = CoughType.DRY
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['symptoms']['fever'] = True
    answers['fever']['maximumTemperatureInDegrees'] = 40
    answers['symptoms']['coughing'] = True
    answers['coughing']['type'] = CoughType.DRY
    res = classify(answers)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['workplace'] = Workplace.MEDICAL_SECTOR
    print('  foo')
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['workplace'] = Workplace.MEDICAL_SECTOR
    answers['symptoms']['fever'] = True
    answers['fever']['maximumTemperatureInDegrees'] = 40
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['workplace'] = Workplace.MEDICAL_SECTOR
    answers['symptoms']['coughing'] = True
    answers['coughing']['type'] = CoughType.DRY
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['workplace'] = Workplace.EDUCATION_SECTOR
    answers['symptoms']['fever'] = True
    answers['fever']['maximumTemperatureInDegrees'] = 40
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['symptoms']['headache'] = True
    answers['symptoms']['rheumaticPains'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['symptoms']['headache'] = True
    answers['symptoms']['rheumaticPains'] = True
    answers['symptoms']['shivers'] = True
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['symptoms']['permanentTiredness'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['riskGroup']['smoker'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['riskGroup']['smoker'] = True
    answers['symptoms']['permanentTiredness'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['riskGroup']['pregnant'] = True
    answers['symptoms']['permanentTiredness'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline_for_test)
    answers['riskGroup']['overEightyYearsOld'] = True
    answers['symptoms']['shivers'] = True
    res = classify(answers)
    print(res)

    assert res[0] == True


def test_data_from_backend():
    import answersparser 
    with open(os.path.join(os.path.dirname(__file__), '../tests/data/answers.json')) as f:
        json_data = json.load(f)
    result = answersparser.parse(json_data)
        
    classify(result)

