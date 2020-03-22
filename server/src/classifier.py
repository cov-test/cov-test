import copy
import collections
import numpy as np


def flatten_answers(answers):
    result = {}
    
    for key1, subdict in answers.items():
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
    "FEVER__maximumTemperatureInDegrees":   prob_to_log_odds(0.879),  # Fieber über 38 Grad
    "FEVER__daysSinceMaximumTemperature":   prob_to_log_odds(0.0),    # ignored for now
    "COUGHING__type":                       prob_to_log_odds(0.677),  # trockener Husten
    "COUGHING__phlegm":                     prob_to_log_odds(0.334),  # Auswurf
    "COUGHING__bloodInCough":               prob_to_log_odds(0.009),  # Blut beim Abhusten

    "SYMPTOMS__shivers":                    prob_to_log_odds(0.114),  # Schüttelfrost
    "SYMPTOMS__permanentTiredness":         prob_to_log_odds(0.381),  # Müdigkeit
    "SYMPTOMS__shortnessOfBreath":          prob_to_log_odds(0.186),  # Kurzatmigkeit

    "SYMPTOMS__soreThroat":                 prob_to_log_odds(0.139),  # Halsschmerzen
    "SYMPTOMS__headache":                   prob_to_log_odds(0.136),  # Kopfschmerzen
    "SYMPTOMS__rheumaticPains":             prob_to_log_odds(0.148),  # Gliederschmerzen

    "SYMPTOMS__diarrhea":                   prob_to_log_odds(0.037),  # Durchfall
    "SYMPTOMS__nausea":                     prob_to_log_odds(0.050),  # Übelkeit/Erbrechen


    # these values are just assumptions and are not supported by data:
    'TRAVEL__hasTravelled':                 np.log(1.2), # 1 = in Germany, 2 = abroad, 3: in high risk country

    "SYMPTOMS__fever_above_38_and_dry_cough":   np.log(1.5),      # combined risk for fever and dry_cough togehter

    
    'CONTACT_TO_INFECTED_PERSON__contactInfected':  np.log(3),
    'CONTACT_TO_INFECTED_PERSON__daysSinceContact': 0.0,
    'CONTACT_TO_INFECTED_PERSON__sameHousehold':    np.log(100),
    
    "RISK_GROUP__overFiftyYearsOld":               np.log(1.1),
    "RISK_GROUP__overSixtyYearsOld":               np.log(1.1),
    "RISK_GROUP__overSeventyYearsOld":             np.log(1.3),
    "RISK_GROUP__overEightyYearsOld":              np.log(1.4),
    "RISK_GROUP__smoker":                          np.log(1.2),
    "RISK_GROUP__pregnant":                        np.log(1.3),
    "RISK_GROUP__chronicLungDisease":              np.log(1.3),
    "RISK_GROUP__consumptionOfImmunoSuppressantDrugs": np.log(1.3),
    
    'WORKPLACE__workplace':                         np.log(1.), # 1: medical sector
})

SYMPTOM_FACTORS = [factor for factor in coefficients
                   if factor.startswith('SYMPTOMS__')
                      and factor != 'SYMPTOMS__fever_above_38_and_dry_cough']

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
    answers = flatten_answers(answers)
    
    factor_list = list(sorted(coefficients.keys()))

    check = []
    x = np.zeros(len(coefficients))

    binary_factors = [
        'CONTACT_TO_INFECTED_PERSON__sameHousehold',
        'COUGHING__phlegm',
        'COUGHING__bloodInCough',
        'SYMPTOMS__shivers',
        'SYMPTOMS__permanentTiredness',
        'SYMPTOMS__shortnessOfBreath',
        'SYMPTOMS__soreThroat',
        'SYMPTOMS__headache',
        'SYMPTOMS__rheumaticPains',
        'SYMPTOMS__diarrhea',
        'SYMPTOMS__nausea',
        "RISK_GROUP__overFiftyYearsOld",
        "RISK_GROUP__overSixtyYearsOld",
        "RISK_GROUP__overSeventyYearsOld",
        "RISK_GROUP__overEightyYearsOld",
        "RISK_GROUP__smoker",
        "RISK_GROUP__pregnant",
        "RISK_GROUP__chronicLungDisease",
        "RISK_GROUP__consumptionOfImmunoSuppressantDrugs",
    ]
    
    for this_factor in binary_factors:
        i = factor_list.index(this_factor)
        x[i] = (answers[this_factor] == True)
        check.append(this_factor)


    # == CONTACT_TO_INFECTED_PERSON ==
    this_factor = 'CONTACT_TO_INFECTED_PERSON__contactInfected'
    x += map_answer(answers, factor_list, this_factor, {'YES': 2, 'MAYBE': 1, 'NO': 0})
    check.append(this_factor)

    # if the person has contact to a case (YES or MAYBE), but it was more than two weeks ago
    # and the person does not show any symptoms there is no additional risk
    has_symptoms = any(answers[key] for key in SYMPTOM_FACTORS)
    if (answers['CONTACT_TO_INFECTED_PERSON__daysSinceContact'] > 14 and not has_symptoms):
        i = factor_list.index(this_factor)
        x[i] = 0
    check.append('CONTACT_TO_INFECTED_PERSON__daysSinceContact')
    

    # == SYMPTOMS ==
    number_of_symptoms = sum(answers[key] for key in SYMPTOM_FACTORS)

    # If the person is only permanently tired and has no other symptoms,
    # we do not classify them as corona positive
    this_factor = 'SYMPTOMS__permanentTiredness'
    if number_of_symptoms == 1 and answers[this_factor]:
        i = factor_list.index(this_factor)
        x[i] = 0
       
    
    # these factors will be dealt with in detail
    check.append('SYMPTOMS__fever')
    check.append('SYMPTOMS__coughing')


    # == FEVER ==
    this_factor = 'FEVER__maximumTemperatureInDegrees'
    has_fever = False
    if answers['SYMPTOMS__fever'] and answers['FEVER__daysSinceMaximumTemperature'] <= 4:
        i = factor_list.index(this_factor)
        x[i] = (answers[this_factor] >= 38.0)
        has_fever = True
    check.append(this_factor)
    check.append('FEVER__daysSinceMaximumTemperature')
    
    
    # == COUGHING ==
    this_factor = 'COUGHING__type'
    has_dry_cough = False
    if answers['SYMPTOMS__coughing']:
        x += map_answer(answers, factor_list, this_factor, {'DRY': 1, 'CONGESTED': 0.25, 'UNKNOWN': 0.25})
        if answers[this_factor] == 'DRY':
            has_dry_cough = True
    check.append(this_factor)

    # handle the combination of fever and dry cough with an extra risk
    combined_factor = 'SYMPTOMS__fever_above_38_and_dry_cough'
    if has_fever and has_dry_cough:
        i = factor_list.index(combined_factor)
        x[i] = 1
    check.append(combined_factor)


    # == TRAVEL ==
    this_factor = 'TRAVEL__hasTravelled'
    i = factor_list.index(this_factor)
    if answers[this_factor] == 'NO':
        pass
    elif answers[this_factor] == 'WITHIN_GERMANY':
        x[i] = 1
    elif answers['TRAVEL__abroadTravelCountryCode'] in HIGH_RISK_COUNTRIES:
        x[i] = 3
    else:
        x[i] = 2
    check.append(this_factor)


    # == WORKPLACE ==
    this_factor = 'WORKPLACE__workplace'
    x += map_answer(answers, factor_list, this_factor, {
        'EDUCATION_SECTOR':             0.2,
        'MEDICAL_SECTOR':               1.0,
        'FREQUENT_CONTACT_WITH_PEOPLE': 0.1,
        'OTHER':                        0.0,
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


def test_classify():
    answers_baseline = {
        'CONTACT_TO_INFECTED_PERSON': {
            'contactInfected': 'NO',
            'daysSinceContact': 0,
            'sameHousehold': False,
        },
        'SYMPTOMS': {
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
        'FEVER': {
            'maximumTemperatureInDegrees': 36.5,
            'daysSinceMaximumTemperature': 0,
        },
        'COUGHING': {
            'type': 'UNKNOWN',
            'phlegm': False,
            'bloodInCough': False,
        },
        'TRAVEL': {
            'hasTravelled': 'NO',
            'abroadTravelCountryCode': '',
        },
        'RISK_GROUP': {
            "overFiftyYearsOld": False,
            "overSixtyYearsOld": False,
            "overSeventyYearsOld": False,
            "overEightyYearsOld": False,
            "smoker": False,
            "pregnant": False,
            "chronicLungDisease": False,
            "consumptionOfImmunoSuppressantDrugs": False,
        },
        'WORKPLACE': {
            'workplace': 'OTHER',
        },
    }

    answers = copy.deepcopy(answers_baseline)
    res = classify(answers)
    assert res[0] == False
    
    answers = copy.deepcopy(answers_baseline)
    answers['CONTACT_TO_INFECTED_PERSON']['contactInfected'] = 'YES'
    res = classify(answers)
    print(res)
    assert res[0] == True


    answers = copy.deepcopy(answers_baseline)
    assert answers['CONTACT_TO_INFECTED_PERSON']['contactInfected'] == 'NO'
    answers['CONTACT_TO_INFECTED_PERSON']['contactInfected'] = 'MAYBE'
    res = classify(answers)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline)
    answers['CONTACT_TO_INFECTED_PERSON']['contactInfected'] = 'MAYBE'
    answers['CONTACT_TO_INFECTED_PERSON']['daysSinceContact'] = 20
    res = classify(answers)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline)
    answers['SYMPTOMS']['fever'] = True
    answers['FEVER']['maximumTemperatureInDegrees'] = 40
    res = classify(answers)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline)
    answers['SYMPTOMS']['coughing'] = True
    answers['COUGHING']['type'] = 'DRY'
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline)
    answers['SYMPTOMS']['fever'] = True
    answers['FEVER']['maximumTemperatureInDegrees'] = 40
    answers['SYMPTOMS']['coughing'] = True
    answers['COUGHING']['type'] = 'DRY'
    res = classify(answers)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline)
    answers['WORKPLACE']['workplace'] = 'MEDICAL_SECTOR'
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline)
    answers['WORKPLACE']['workplace'] = 'MEDICAL_SECTOR'
    answers['SYMPTOMS']['fever'] = True
    answers['FEVER']['maximumTemperatureInDegrees'] = 40
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline)
    answers['WORKPLACE']['workplace'] = 'MEDICAL_SECTOR'
    answers['SYMPTOMS']['coughing'] = True
    answers['COUGHING']['type'] = 'DRY'
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline)
    answers['WORKPLACE']['workplace'] = 'EDUCATION_SECTOR'
    answers['SYMPTOMS']['fever'] = True
    answers['FEVER']['maximumTemperatureInDegrees'] = 40
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline)
    answers['SYMPTOMS']['headache'] = True
    answers['SYMPTOMS']['rheumaticPains'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline)
    answers['SYMPTOMS']['headache'] = True
    answers['SYMPTOMS']['rheumaticPains'] = True
    answers['SYMPTOMS']['shivers'] = True
    res = classify(answers)
    print(res)
    assert res[0] == True

    answers = copy.deepcopy(answers_baseline)
    answers['SYMPTOMS']['permanentTiredness'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline)
    answers['RISK_GROUP']['smoker'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline)
    answers['RISK_GROUP']['smoker'] = True
    answers['SYMPTOMS']['permanentTiredness'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline)
    answers['RISK_GROUP']['pregnant'] = True
    answers['SYMPTOMS']['permanentTiredness'] = True
    res = classify(answers)
    print(res)
    assert res[0] == False

    answers = copy.deepcopy(answers_baseline)
    answers['RISK_GROUP']['overEightyYearsOld'] = True
    answers['SYMPTOMS']['shivers'] = True
    res = classify(answers)
    print(res)
    assert res[0] == True
