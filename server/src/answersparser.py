import base64

from covtesttypes import *


def parse(data):
    userId = data["userId"]
    answers = data["answers"]
    result = Answers(
        userId=userId,
        contactToInfectedPerson=parse_contact_to_infected_person(answers),
        symptoms=parse_symptoms(answers),
        fever=parse_fever(answers),
        coughing=parse_coughing(answers),
        travel=parse_travel(answers),
        riskGroup=parse_risk_group(answers),
        workplace=parse_workplace(answers),
    )
    return result


def parse_infected(v):
    if v.upper() == 'YES':
        return InfectedContact.YES
    elif v.upper() == 'MAYBE':
        return InfectedContact.MAYBE
    else:
        return InfectedContact.NO


def parse_cough_type(v):
    return CoughType[v.upper()]


def parse_audio_classification_result(v):
    return AudioClassificationResult[v.upper()]


def parse_has_travelled(v):
    return HasTravelled[v.upper()]


def parse_int(v):
    return int(v)


def parse_float(v):
    return float(v)


def parse_base64(v):
    return base64.b64decode(v)


def parse_contact_to_infected_person(data) -> ContactToInfectedPerson:
    data = data['CONTACT_TO_INFECTED_PERSON']
    return ContactToInfectedPerson(
        contactInfected=parse_infected(data['contactInfected']),
        daysSinceContact=parse_int(data['daysSinceContact']),
        sameHousehold=data['sameHousehold']
    )


def parse_symptoms(data) -> Symptoms:
    data = data['SYMPTOMS']
    symptoms = [
        'fever',
        'coughing',
        'shivers',
        'permanentTiredness',
        'shortnessOfBreath',
        'soreThroat',
        'headache',
        'rheumaticPains',
        'diarrhea',
        'nausea',
    ]
    return Symptoms(**{
        key: data[key]
        for key in symptoms
    })


def parse_fever(data) -> Fever:
    data = data['FEVER']
    return Fever(
        maximumTemperatureInDegrees=parse_float(data['maximumTemperatureInDegrees']),
        daysSinceMaximumTemperature=parse_int(data['daysSinceMaximumTemperature']),
    )


def parse_coughing(data) -> Coughing:
    data = data['COUGHING']
    return Coughing(
        audio=parse_base64(data['audio']),
        audioClassificationResult=parse_audio_classification_result(data['audioClassificationResult']),
        type=parse_cough_type(data['type']),
        phlegm=data['phlegm'],
        bloodInCough=data['bloodInCough']
    )


def parse_travel(data) -> Travel:
    data = data['TRAVEL']
    return Travel(
        hasTravelled=parse_has_travelled(data['hasTravelled']),
        abroadTravelCountryCode=data['abroadTravelCountryCode'],
    )


def parse_risk_group(data) -> RiskGroup:
    data = data['RISK_GROUP']
    attributes = [
        'overFiftyYearsOld',
        'overSixtyYearsOld',
        'overSeventyYearsOld',
        'overEightyYearsOld',
        'smoker',
        'pregnant',
        'chronicLungDisease',
        'consumptionOfImmunoSuppressantDrugs',
    ]
    return RiskGroup(**{
        key: data[key]
        for key in attributes
    })


def parse_workplace(data) -> Workplace:
    data = data['WORKPLACE']
    return Workplace[data['workplace'].upper()]
