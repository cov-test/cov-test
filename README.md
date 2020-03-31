# Willkommen bei COVtest!
## Kurz erklärt
​
COVtest ermöglicht es mithilfe einer KI die Infektionswahrscheinlichkeit mit COVID-19 sofort zu testen
​
**So funktioniert es**
​
1.  Fülle einen Fragebogen aus
2.  Zeichne Hustengeräusche und Körpertemperaturverlauf auf.
3.  Informiere im Falle eines erhöhten Risikos wichtige Kontakte mit einem Klick
​
**Die Technik hinter COVtest**
​
-   Das Ergebnis wird auf Basis aktuellster Daten des WHO und Robert Koch Instituts intern berechnet.
-   Hustengeräusche und Temperaturverläufe werden mithilfe einer trainierten künstlichen Intelligenz ausgewertet
-   Personenbezogene Daten werden nur Lokal im Gerät gespeichert
## Wie ist COVtest aufgebaut?
​
Für die Mock-Ups wurden Invision und Zeplin genutzt. Das erste Training von Atem- und Hustengeräuschen wurde mit der [Teachable Machine](https://teachablemachine.withgoogle.com/) durchgeführt.
Die Software läuft komplett in der Google Cloud und ist aufgeteilt in Front- und Backend:  
- Das Frontend basiert auf React und ist für die Nutzung mit dem Smartphone optimiert. Das Modell für die Hustenerkennung und Klassifizierung wird clientseitig ausgeführt - es ist hier nicht notwendig, die Daten für die Erkennung an einen anderen Server zu senden.
- Im Backend findet nach Eingabe aller Daten durch den Nutzer die Berechnung des Tests statt - dieses ist als Rest Webservice in Python implementiert, die Persistierung der Daten erfolgt für spätere Analysen in Firestore. Optimalerweise können die so gewonnenen Daten auch dazu genutzt werden, um unsere Modelle zukünftig weiter zu verfeinern.
​
Zur Vorhersage haben wurden Informationen der WHO genommen und ein Logistisches Regressionsmodell genutzt um unseren Corona-Test zu bauen. Danach haben den Test gegen öffentlich zugängliche Daten zu chinesischen Corona Fällen validiert.
​
​
## Wo kann ich COVtest ausprobieren
​
Der Corona-Test ist unter [http://covtest.net](http://covtest.net/) kostenlos erreichbar.