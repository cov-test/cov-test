# README

## Releases

Recommended for deployment are the `git flow` tools. Install it via `brew install git-flow`

Deployment Recommendations:

```
$> git checkout master; git pull
$> git checkout develop; git pull

# which release do i want to deploy - look for valid tags
$> git tag --list

$> git flow release start x.x.x
$> git flow release finish x.x.x

# push the new tags
git push --tags

# PRODUCTION deploy
later

# STAGING deploy
later
```

## Development

### Setup for FE (cov-test/client)

1. Install [Yarn for Mac](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
2. `yarn install` (cov-test/client)
3. `yarn start`
4. happy coding

## DEMO Backend Call

```
curl --location --request POST 'localhost:5000/store_result' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": "xxxx",
  "answers": {
    "CONTACT_TO_INFECTED_PERSON": {
      "contactInfected": "YES",
      "daysSinceContact": 3,
      "sameHousehold": false
    },
    "SYMPTOMS": {
      "fever": true,
      "coughing": true,
      "shivers": true,
      "permanentTiredness": true,
      "shortnessOfBreath": true,
      "soreThroat": false,
      "headache": true,
      "rheumaticPains": true,
      "diarrhea": false,
      "nausea": true
    },
    "FEVER": {
      "maximumTemperatureInDegrees": 38.5,
      "daysSinceMaximumTemperature": 5
    },
    "COUGHING": {
      "audio": "dGVzdA==\n",
      "audioClassificationResult": "DRY",
      "type": "PRODUCTIVE",
      "phlegm": true,
      "bloodInCough": true
    },
    "TRAVEL": {
      "hasTravelled": "ABROAD",
      "abroadTravelCountryCode": "US"
    },
    "RISK_GROUP": {
      "overFiftyYearsOld": true,
      "overSixtyYearsOld": true,
      "overSeventyYearsOld": true,
      "overEightyYearsOld": true,
      "smoker": true,
      "pregnant": true,
      "chronicLungDisease": true,
      "consumptionOfImmunoSuppressantDrugs": true
    },
    "WORKPLACE": {
      "workplace": "EDUCATION_SECTOR"
    }
  }
}'

```
