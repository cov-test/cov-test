import collections
import numpy as np


def classify(answers) {
    """
    This function takes a dictionary of symptoms and then
    calculates a binary classification (True/False) based on
    logistic regression.
    Each answer has a risk factor (coefficients) between 0.0 and 1.0 where
    a coefficient value of 0.0 indicates no corona-indication
    and 1.0 indicates high indication for corona.
    
    coefficients = collections.OrderedDict({
        # data from WHO
        "fever_temperature":   0.879,  # Fieber
        "dry_cough":           0.677,  # trockener Husten
        "sputum_production":   0.334,  # Auswurf
        "haemotysis":          0.009,  # Blut beim Abhusten

        "chills":              0.114,  # Schüttelfrost
        "fatigue":             0.381,  # Müdigkeit
        "shortness_of_breath": 0.186,  # Kurzatmigkeit

        "sore_throat":         0.139,  # Halsschmerzen
        "headache":            0.136,  # Kopfschmerzen
        "muscle_or_join_pain": 0.148,  # Gliederschmerzen

        "diarrhrea":           0.037,  # Durchfall
        "nausea_or_vomiting:   0.050,  # Übelkeit/Erbrechen

        # imaginary data
        "wet_cough":           0.3,    # verschleimter Husten
    });

    binary_symptoms = [
        "dry_cough",
        "sputum_production",
        "haemotysis",
        "chills",
        "fatigue",
        "shortness_of_breath",
        "sore_throat",
        "headache",
        "muscle_or_join_pain",
        "diarreha",
        "nausea_or_vomiting",
        "wet_cough",
    ]

    check = []
    x = np.zeros(len(coefficients)
    
    for symptom in binary_symptoms:
        i = coefficients.keys().index(symptom)
        x[i] = (answers[symptom] == True)
        check.append(symptom)
        
    # Fever must be above 38 degrees
    symptom = 'fever_temperature'
    i = coefficients.keys().index(symptom)
    x[i] = (answers[symptom] >= 38.0)
    check.append(symptom)

    assert len(set(coefficients.keys()) - set(check)) == 0

    c = x.dot(coefficients)
    return np.exp(c / (1 + c)) > 0.5
