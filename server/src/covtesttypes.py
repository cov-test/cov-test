import enum
from dataclasses import dataclass


class InfectedContact(enum.Enum):
    YES = 1
    MAYBE = 2
    NO = 3


@dataclass
class ContactToInfectedPerson:
    contactInfected: InfectedContact
    daysSinceContact: int
    sameHousehold: bool


@dataclass
class Symptoms:
    fever: bool
    coughing: bool
    shivers: bool
    permanentTiredness: bool
    shortnessOfBreath: bool
    soreThroat: bool
    headache: bool
    rheumaticPains: bool
    diarrhea: bool
    nausea: bool


@dataclass
class Fever:
    maximumTemperatureInDegrees: float
    daysSinceMaximumTemperature: int


class AudioClassificationResult(enum.Enum):
    BACKGROUND = 1
    DRY = 2
    PRODUCTIVE = 3


class CoughType(enum.Enum):
    DRY = 1
    PRODUCTIVE = 2
    UNKNOWN = 3


@dataclass
class Coughing:
    audio: bytearray
    audioClassificationResult: AudioClassificationResult
    type: CoughType
    phlegm: bool
    bloodInCough: bool


class HasTravelled(enum.Enum):
    NO = 1
    WITHIN_GERMANY = 2
    ABROAD = 3


@dataclass
class Travel:
    hasTravelled: HasTravelled
    abroadTravelCountryCode: str


@dataclass
class RiskGroup:
    overFiftyYearsOld: bool
    overSixtyYearsOld: bool
    overSeventyYearsOld: bool
    overEightyYearsOld: bool
    smoker: bool
    pregnant: bool
    chronicLungDisease: bool
    consumptionOfImmunoSuppressantDrugs: bool


class Workplace(enum.Enum):
    EDUCATION_SECTOR = 1
    MEDICAL_SECTOR = 2
    FREQUENT_CONTACT_WITH_PEOPLE = 3
    OTHER = 4


@dataclass
class Answers:
    userId: str
    contactToInfectedPerson: ContactToInfectedPerson
    symptoms: Symptoms
    fever: Fever
    coughing: Coughing
    travel: Travel
    riskGroup: RiskGroup
    workplace: Workplace
