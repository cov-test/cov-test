import base64

from covtesttypes import *


def parse(data):
    userId = data.get("userId")
    answers = data.get("answers")
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
    try:
        return int(v)
    except ValueError:
        return 0


def parse_bool(v):
    try:
        return bool(v)
    except ValueError:
        return False


def parse_float(v):
    try:
        return float(v)
    except ValueError:
        return float('NaN')


def parse_base64(v):
    try:
        return base64.b64decode(v)
    except Exception:
        return b''


def parse_contact_to_infected_person(data) -> ContactToInfectedPerson:
    data = data.get('CONTACT_TO_INFECTED_PERSON', {})
    return ContactToInfectedPerson(
        contactInfected=parse_infected(data.get('contactInfected', 'NO')),
        daysSinceContact=parse_int(data.get('daysSinceContact', '0')),
        sameHousehold=parse_bool(data.get('sameHousehold', 'true'))
    )


def parse_symptoms(data) -> Symptoms:
    data = data.get('SYMPTOMS', {})
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
        key: parse_bool(data.get(key, 'false'))
        for key in symptoms
    })


def parse_fever(data) -> Fever:
    data = data.get('FEVER', {})
    return Fever(
        maximumTemperatureInDegrees=parse_float(data.get('maximumTemperatureInDegrees', 'NaN')),
        daysSinceMaximumTemperature=parse_int(data.get('daysSinceMaximumTemperature', 0)),
    )


def parse_coughing(data) -> Coughing:
    data = data.get('COUGHING', {})
    return Coughing(
        audio=parse_base64(data.get('audio', '')),
        audioClassificationResult=parse_audio_classification_result(data.get('audioClassificationResult')),
        type=parse_cough_type(data.get('type', 'UNKNOWN')),
        phlegm=parse_bool(data.get('phlegm', 'false')),
        bloodInCough=parse_bool(data.get('bloodInCough', 'false'))
    )


def parse_travel(data) -> Travel:
    data = data.get('TRAVEL', {})
    return Travel(
        hasTravelled=parse_has_travelled(data.get('hasTravelled')),
        abroadTravelCountryCode=data.get('abroadTravelCountryCode', ''),
    )


def parse_risk_group(data) -> RiskGroup:
    data = data.get('RISK_GROUP', {})
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
        key: parse_bool(data.get(key, 'false'))
        for key in attributes
    })


def parse_workplace(data) -> Workplace:
    data = data.get('WORKPLACE', {})
    return Workplace[data.get('workplace').upper()]
