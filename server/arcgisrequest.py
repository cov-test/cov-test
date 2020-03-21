import pandas as pd
import json
import requests
import datetime

url = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
r = requests.head(url)
url_datetime = datetime.datetime.strptime(r.headers['last-modified'], '%a, %d %b %Y %X GMT')

# TODO add loop, check if url_datetime is newer than our last data
result = requests.get(url)
json_value = json.loads(result.text)
attributesOnly = [element['attributes'] for element in json_value['features']]
df = pd.DataFrame(attributesOnly)

# TODO write out data to our database