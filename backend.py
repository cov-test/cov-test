from flask import Flask, escape, request
from flask import jsonify
import enum

app = Flask(__name__)

def parse_test_data(data):
    result = {
        'CONTACT_TO_INFECTED_PERSON': parse_contact_to_infected_person(data),
        'SYMPTOMS': parse_symptoms(data),
        'FEVER': parse_fever(data),
        'COUGHING': parse_coughing(data),
        'TRAVEL': parse_travel(data),
        'RISK_GROUP': parse_risk_group(data),
        'WORKPLACE': parse_work_place(data),
    }
    return result


class IsInfected(enum.Enum):
    YES = 1
    MAYBE = 2
    NO = 3


def parse_infected(v):
    if v.upper() == 'YES':
        return IsInfected.YES
    elif v.upper() == 'MAYBE':
        return IsInfected.MAYBE
    else:
        return IsInfected.NO


def parse_int(v):
    try:
        return int(v)
    except ValueError:
        return 0


def parse_bool(v):
    try:
        return bool(v)
    except ValueError:
        return false


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


@app.route('/store_result')
def store_result():
    data = request.get_json()
    test_data = parse_test_data(data)
    # TODO:
    #  - store test data
    #  - store audio data
    #  - calculate classification
    result = classify(test_data)
    
    return jsonify({'result': result})


def parse_contact_to_infected_person(data):
    data = data.get('CONTACT_TO_INFECTED_PERSON', {})
    return {
        'contactInfected': parse_infected(data.get('contactInfected', 'NO')),
        'daysSinceContact': parse_int(data.get('daysSinceContact', '0')),
        'sameHousehold': parse_bool(data.get('sameHousehold', 'true')),
    }

def parse_symptoms(data):
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
    return {
        key: parse_bool(data.get(key, 'false'))
        for key in symptoms
    }
    

def parse_fever(data):
    data = data.get('FEVER', {})
    return {
        'maximumTemperatureInDegrees': parse_float(data.get('maximumTemperatureInDegrees', 'NaN')),
        'daysSinceMaximumTemperature': parse_int(data.get('daysSinceMaximumTemperature', 0)),
    }

    
def parse_coughing(data):
    data = data.get('COUGHING', {})
    return {
        'audio': parse_base64(data.get('audio', '')),
        'type': data.get('type', 'UNKNOWN'),
        'phlegm': parse_bool(data.get('phlegm', 'false')),
        'bloodInCough': parse_bool(data.get('bloodInCough', 'false')),
    }


def parse_travel(data):
    data = data.get('TRAVEL', {})
    return {
        'hasTravelled': data.get('hasTravelled', ''),
        'abroadTravelCountryCode': data.get('abroadTravelCountryCode', ''),
    }


def parse_risk_group(data):
    data = data.get('RISK_GROUP', {})
    symptoms = [
        'overFiftyYearsOld',
        'overSixtyYearsOld',
        'overSeventyYearsOld',
        'overEightyYearsOld',
        'smoker',
        'pregnant',
        'chronicLungDisease',
        'consumptionOfImmunoSuppressantDrugs',
    ]
    return {
        key: parse_bool(data.get(key, 'false'))
        for key in symptoms
    }
    

def parse_workplace(data):
    data = data.get('WORKPLACE', {})
    return {
        'workplace': data.get('workplace', '')
    }
