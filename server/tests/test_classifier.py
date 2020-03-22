import copy
import pandas as pd

from server.src.classifier import classify, answers_baseline_for_test

def test_positive_cases():
    return # SKIP FOR NOW

    # this data is from keggle: https://www.kaggle.com/sudalairajkumar/novel-corona-virus-2019-dataset/version/40
    df = pd.read_csv('data/COVID19_line_list_data.csv')
    
    parsed_symptom_list = ['fever', 'cough', 'difficult in breathing', 'chills', 'joint pain',  'diarrhea', 'nausea', 'headache', 'sputum', 'sore throat', 'tired']

    for symptom in parsed_symptom_list:
        df[symptom] = df.symptom.str.contains(symptom)
    
    df['difficult in breathing'] |= df.symptom.str.contains('breathlessness')
    df['joint pain'] |= df.symptom.str.contains('muscle pain')
    df['nausea'] |= df.symptom.str.contains('vomitting')
    df['sore throat'] |= df.symptom.str.contains('throat pain')
    
    df = df[df[parsed_symptom_list].any(axis=1)]
    
    # TODO: age
    
    results = []
    for i, row in df.iterrows():
        answers = copy.deepcopy(answers_baseline_for_test)

        answers['SYMPTOMS']['fever'] = row['fever']
        answers['FEVER']['maximumTemperatureInDegrees'] = 40 if row['fever'] else 36
            
        answers['SYMPTOMS']['coughing'] = row['cough']
        answers['COUGHING']['type'] = 'DRY' if row['cough'] else 'UNKNOWN'
        answers['COUGHING']['phlegm'] = row['sputum']

        answers['SYMPTOMS']['shortnessOfBreath'] = row['difficult in breathing']
        answers['SYMPTOMS']['chills'] = row['chills']
        answers['SYMPTOMS']['rheumaticPains'] = row['joint pain']
        answers['SYMPTOMS']['soreThroat'] = row['sore throat']
        answers['SYMPTOMS']['diarrhea'] = row['diarrhea']
        answers['SYMPTOMS']['nausea'] = row['nausea']
        answers['SYMPTOMS']['headache'] = row['headache']
        answers['SYMPTOMS']['nausea'] = row['nausea']
        answers['SYMPTOMS']['permanentTiredness'] = row['tired']
        
        res = classify(answers)
        if res[0] == False:
            print('i = ', i)
            for s, v in answers['SYMPTOMS'].items():
                if v:
                    print(s)
            print(' ^^ failed!!', res)
            print()
        results.append(res[0])
        
    print(sum(results) / len(results))
    
    # We have 256 positive cases, but we only classify 246 cases as positive
    # that is because the other 10 cases just have a sore throat or just a headache
    assert sum(results) == 246

