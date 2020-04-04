Languages: EN | DE

German below!


# Welcome to COVtest!


## Introduction
COVtest is an open-source project that we created as part of the #wirvsvirus hackathon [https://wirvsvirushackathon.org/] in Germany.
The goal of the hackathon was to develop solutions that help against the rapid spreading of the coronavirus.

Our solution is the digital service "COVtest", which offers people all over the world the opportunity to get a precise initial assessment of their probability of an infection. Based on the test result, we recommended our users further initial measures and help.

We can't and don't want to replace the diagnose from a doctor. Our goal is to offer first aid to overloaded health care systems and people with difficult access to a functioning health care system. We hope that we're able to further reduce the global infection rate of the coronavirus by providing the information and offering help through our service.


## How the COVtest works
1. In the app or on the mobile website, users answer questions about the known risk factors and symptoms of the coronavirus
2. In the next step, the users voluntarily record their cough and their temperature profile.
3. The data is then evaluated by our artificial intelligence, based on the current scientific status.
4. Depending on the test result, COVtest recommends further measures for immediate help. For example, contacting the family and a doctor or forwarding the user to other digital help offers, that we connect via API.


## The technology behind COVtest
- The data is transmitted anonymously and encrypted to ensure data protection. Personal data remain on the user's device.
- Our trained artificial intelligence evaluates the coughing noises and the user's temperature profiles.
- For an accurate initial assessment, our analysis procedure is adapted continuously to the best procedures worldwide.
- The questions and the artificial intelligence for evaluation are continuously updated to the current scientific status of the Robert Koch Institute in Berlin [https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/nCoV.html] and the WHO [https://www.who.int/emergencies/diseases/novel-coronavirus-2019].


## The structure of COVtest
For the design and Mock-ups, we use tools from Sketch [https://www.sketch.com/], Invision [https://www.invisionapp.com/] and Zeplin [https://zeplin.io/].

We set up the first training of the breathing- & coughing-noises with the Google Teachable Machine [https://teachablemachine.withgoogle.com/]. The software runs entirely in the cloud and is divided into front-end and backend:

- The front-end is based on React [https://reactjs.org/] and is optimized for smartphones. The model for cough detection & classification is carried out on the client-side, i.e. on the end-users device. For the detection, it is not necessary to send the data to a server.
- In the backend, after the user has entered their data, the test is being calculated & evaluated by the implemented rest web service [https://dzone.com/articles/introduction-to-rest-api-restful-web-services], written in Python [https://www.python.org/]. For further analysis, we save the anonymized data to our database in Firestore [https://firebase.google.com/docs/firestore/]. This allows us to refine our prediction models even further.
To train our prediction, we used information from the WHO [https://www.who.int/emergencies/diseases/novel-coronavirus-2019] and used a logistic regression model to build our corona test. We then compared and validated the test with a publicly accessible database of corona cases.


## Where can I try the COVtest?
The free test is available online at http://covtest.net.
Once we completed the development of the mobile app, we'll make it available for free free in the Google Playstore and the Apple Appstore.


## More about the development of COVtest
You can follow our progress at Devpost [https://devpost.com/software/1_020_a_corona-testprozesse_corona-test-mit-dem-handy-254] and Jira [https://covtest.atlassian.net].

If you'd like to participate in the development, you can contact us via email: contact.covtest@gmail.com.





-------------------------------------------------------------------------------------------------------------------



# Willkommen bei COVtest!


## Einstieg
​COVtest ist ein Open Source-Projekt, das im Rahmen des #wirvsvirus Hackathons [https://wirvsvirushackathon.org/] in Deutschland entstanden ist.
Ziel des Hackathons war es unter anderem Lösungen zu Entwickeln, die gegen die schnelle Ausbreitung des Coronavirus helfen.

Unsere Lösung ist der digitale Service "COVtest", der Menschen auf aller Welt die Möglichkeit bietet, eine möglichst präzise Ersteinschätzung zur Infektionswahrscheinlichkeit zu erhalten. Basierend auf dem Testergebnis werden den Nutzer:innen weitere Erstmaßnahmen und Hilfeangebote empfohlen.

Dabei können und möchten wir die Diagnose durch den Arzt nicht ersetzen. Unser Ziel ist es, überlasteten Gesundheitssysteme und Menschen mit erschwertem Zugang zu einem funktionierenden Gesundheitssystem eine erste Hilfe anzubieten. Wir hoffen, durch die Bereitstellung der Informationen und der Hilfsangebote, die globale Infektionsrate am Coronavirus weiter reduzieren zu können.


## So funktioniert der COVtest
1. In der App oder auf der mobil angepassten Webseite beantworten die Nutzer:innen Fragen zu den bekannten Risikofaktoren und Corona-Symptomen
2. Im nächsten Schritt nehmen die Nutzer:innen Ihr husten und den Temperaturverlauf auf freiwilliger Basis auf.
3. Die erfassten Daten werden dann von unserer künstlichen Intelligenz auf Basis des aktuellen wissenschaftlichen Stands ausgewertet.
4. Je nach Testergebnis empfiehlt COVtest dann weitere Maßnahmen zur Soforthilfe. Zum Beispiel die Kontaktaufnahme zur Familie & zum Arzt oder die Weiterleitung zu anderen digitalen Hilfeangeboten, die wir per API anbinden.

​
## Die Technik hinter COVtest​
- Um den Datenschutz zu garantieren, werden die Daten anonymisiert und verschlüsselt übertragen. Personenbezogene Daten bleiben dabei auf dem Endgerät.
- Hustengeräusche und Temperaturverläufe werden mithilfe einer trainierten künstlichen Intelligenz ausgewertet.
- Für eine möglichst akkurate Ersteinschätzung wird unser Analyseverfahren stetig an die weltweit besten Verfahren angepasst.
- Die Fragen sowie die künstliche Intelligenz zur Auswertung werden laufend an den aktuellen wissenschaftlichen Stand des Robert Kochs Instituts in Berlin [https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/nCoV.html] und der WHO [https://www.who.int/emergencies/diseases/novel-coronavirus-2019] angepasst.


## Wie ist COVtest aufgebaut?
​Für das Design und die Mock-Ups nutzen wir die Tools von Sketch [https://www.sketch.com/], Invision [https://www.invisionapp.com/] und Zeplin [https://zeplin.io/].

Das erste Training der Atem- und Hustengeräuschen wurde mit der Teachable Machine [https://teachablemachine.withgoogle.com/] von Google durchgeführt.
Die Software läuft komplett in der Cloud und ist in Frontend und Backend aufgeteilt:

- Das Frontend basiert auf React [https://reactjs.org/] und ist für die Nutzung mit dem Smartphone optimiert. Das Modell für die Hustenerkennung & Klassifizierung wird clientseitig, also auf dem Endgerät, ausgeführt - es ist hier nicht notwendig, die Daten für die Erkennung an einen Server zu senden.
- Im Backend findet nach Eingabe aller Daten durch den Nutzer die Berechnung des Tests statt - dieses ist als Rest Webservice [https://dzone.com/articles/introduction-to-rest-api-restful-web-services] in Python [https://www.python.org/] implementiert. Für spätere Analysen werden die anonymisierten Daten dann in unserer Datenbank in Firestore [https://firebase.google.com/docs/firestore/] gespeichert. Wir nutzen die Daten, um unsere Berechnugnsmodelle weiter zu verbessern. 
Zur Vorhersage haben wir Informationen der WHO [https://www.who.int/emergencies/diseases/novel-coronavirus-2019] und ein logistisches Regressionsmodell genutzt, anhand dessen wir unseren Corona-Test aufgebaut haben. Danach haben wir den Test mit einer öffentlich zugänglichen Datenbank an Coronafällen abgeglichen & validiert.​​


## Wo kann ich COVtest ausprobieren?
​Der kostenlose Test ist online unter http://covtest.net erreichbar.
Wenn die Entwicklung der mobilen App abgeschlossen ist, werden wir diese kostenlos im Google Playstore und dem Apple Appstore zur Verfügung stellen.


## Mehr über die Entwicklung von COVtest
Unseren Fortschritt kannst Du bei Devpost [https://devpost.com/software/1_020_a_corona-testprozesse_corona-test-mit-dem-handy-254] und Jira [https://covtest.atlassian.net] mitverfolgen.

Wenn Du Dich an der Entwicklung beteiligen möchtest, erreichst Du per E-Mail: contact.covtest@gmail.com.




