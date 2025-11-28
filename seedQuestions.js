import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';

// Native Node import for JSON
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

// 1. Initialize Admin SDK (Bypasses all rules)
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

// 2. Define your questions here
// Key = The Date (YYYY-MM-DD), Value = The Question Data
const questionsToAdd = [
    {
        id: "2026-01-01", // Make sure this matches today's date if you want to test now!
        data: {
            questionText: "Damit selbstgemachte Erdbeerkonfitüre ihre rote Farbe behält, sollte sie ...?",
            options: {
                a: "nach der Zubereitung unter fünf Grad Celsius gelagert werden",
                b: "vor dem Abfüllen mit einer Messerspitze Backpulver vermischt werden",
                c: "nach dem Kochen langsam in einem lauwarmen Wasserbad abgekühlen",
            },
            correctAnswer: "a",
            explanation: "Hausgemachte Erdbeerkonfitüre kann nach einiger Zeit ihre rote Farbe verlieren und braun werden. " +
                "Das liegt daran, dass die Planzenfarbstoffe lichtempfindlich sind und von in Erdbeeren enthaltenen Enzymen auf gespalten werden. " +
                "Um das zu vermeiden, sollte die fertige, abgekühlte Erdbeerkonfitüre in Einmachgläser gefüllt und stehend im Gefrierschrank gelagert werden. " +
                "Im Dunkeln bei Temperaturen unter fünf Grad Celsius wird die Verfärbung verlangsamt und die Konfitüre behält nach dem Auftauen ihre rote Farbe."
        }
    },
    {
        id: "2026-01-02",
        data: {
            questionText: "Warum scheiterte im hessischen Nidda im August 2018 ein Weltrekordversuch mit rund 4.000 Mini-Dominosteinen?",
            options: {
                a: "Eine Putzkraft hatte am Vorabend einen Teil der Steine aufgesaugt.",
                b: "Bei Nachkontrollen waren drei Steine einen Millimeter zu groß.",
                c: "Eine Fliege brachte den fertigen Aufbau zu früh zum Einsturz.",
            },
            correctAnswer: "c",
            explanation: "In einer Turnhalle im hessischen Nidda hatte das Team um Organisator Patrick Sinner im August 2018 fast zwei Wochen lang sorgfältig Dominosteine aufgebaut, " +
                "um gleich fünf Weltrekorde zu brechen. Der Rekordversuch mit den meisten Mini-Dominosteinen scheiterte jedoch an einer Fliege, " +
                "die die Steine von der größe des Nagels eines kleinen Fingers vorzeitig zu Fall brachte. Für den etwa zwölfstündigen Wiederaufbau reichte anschließend die Zeit nicht mehr."
        }
    },
    {
        id: "2026-01-03",
        data: {
            questionText: "Der ehmalige Basketball-Superstar Michael Jordan hatte in sienem ersten Profivertrag eine Klause, die ihm erlaubte, ...?",
            options: {
                a: "monatlich bis zu 500$ im Casino auszugeben.",
                b: "an Spieltagen unbegrenzte Mengen Sushi zu essen.",
                c: "in der Freizeit jederzeit und überall Basketball zu spielen.",
            },
            correctAnswer: "c",
            explanation: "1984 holten die Chicago Bulls den talentierten Michael Jordan in die NBA, " +
                "in der sich zu einem der erfolgreichsten Profis aller Zeiten entwickelte. Seinen ersten Profi Vertrag unterschrieb er allerdings nur unter einer Bedingung. " +
                "WEil es die Verantwortlichen der Teams nicht gerne sehen, wenn Spieler in ihrer Freizeit aufgrund von sportlichen Aktivitäten eine Verletzung riskieren, " +
                "ließ er seine Liebe zum Spiel auch abseits des Profi-Geschäfts vertraglich absichern. Die sogenannte 'For the Love of the Game'-Klausel erlaubte es ihm, " +
                "jederzeit und überall Basketball zu spielen."
        }
    },
    {
        id: "2026-01-05",
        data: {
            questionText: "Sei 1996 ist die Frage 'Red or Green?' der offiziell verabschiedete Slogen des US-Staates New Mexico, der darauf abzielt, ...?",
            options: {
                a: "welche Chilis von den Bürgern lieber gegessen werden.",
                b: "welches Halstuch beim Volkstanz Jarabe Tapatio getragen wird.",
                c: "ob das Herz des heimischen Baseball- oder Football-Teams schlägt.",
            },
            correctAnswer: "a",
            explanation: "Im Jahr 1996 entschied der US-Bundesstaat New Mexico, 'Red or Green' zur offiziellen Frage des Staates zu ernennen." +
                "Diese zeihlt auf das wichtigste Exportgut New Mexicos ab: Denn knapp 50 Millionen US-Dollar Umsatz macht der Staat pro Jahr mit dem Verkauf von Chilis." +
                "'Red or Green' bezieht sich dabei auf die Frage, ob zu traditionellen Gerichten aus New Mexico schärfere rote Chilis oder mildere grüne Chilis bevorzugt werden."
        }
    },
    {
        id: "2026-01-06",
        data: {
            questionText: "Maulfurf-Weibchen ...?",
            options: {
                a: "werden nur zwischen Januar und März geboren.",
                b: "produziren eine ähnlich hohe Testosteronmenge wie Männchen.",
                c: "transportieren ihren Nachwuchs monatelang auf dem Rücken.",
            },
            correctAnswer: "b",
            explanation: "Der Maulwurf gehört zu den Säugetieren und besitzt für das Graben sechs Finger an jeder Vorderpfote. " +
                "Das ist aber nicht die einzige Eigenschaft, mit der sich der Maulwurf von anderen Säugetieren abhebt. " +
                "Tatsächlich sind Maulwurfweibchen zweigeschlechtlich. Sie sind mit zwei X-Chromosomen bestückt," +
                "besitzen aber dennoch neben einem funktionierenden Eierstock zusätzlich auch Hodengewebe. " +
                "Sie produzieren dadurch eine ähnlich hohe Menge an Testosteron wie die Männchen. Daddurch entwickeln die Weibchen mehr Muskelmasse und werden kräftiger," +
                " was für das Leben unter der Erde Vorteile bietet"
        }
    },
    {
        id: "2026-01-07",
        data: {
            questionText: "Durchschnittlich 2,8 Sekunden ...?",
            options: {
                a: "braucht es nach dem Aufwachen, bis Sehreize im Gehirn ankommen.",
                b: "reichen, um die menschliche Konzentration nachhaltig zu stören.",
                c: "dauert es, bis ein Reflex bei einem äußreen Reiz ausgelöst wird..",
            },
            correctAnswer: "b",
            explanation: "Ein Blick aufs Handy, eine eingehende E-Mail oder ein Anruf reichen aus, um unser Gehirn nachhaltig von einer Aufgabe abzulenken. " +
                "Eine US-amerikanische Studie von 2014 belegte, dass es tatsächlich nur rund 2,8 Sekunden dauert, um die Konzentration zu verlieren. " +
                "Sich nach einer längeren Unterbrechnung weider in die eigentliche Aufgabe einzudenken, kann laut einer Untersuchung von 2008 bis zu 23 Minuten dauern."
        }
    },
    {
        id: "2026-01-08",
        data: {
            questionText: "Mithilfe von Haarspray lassen sich ...?",
            options: {
                a: "Brillengläser temporär mit einem Blaulichtfilter versehen.",
                b: "Permanent-Marker-Flecken von Glattleder entfernen.",
                c: "Luftblasen aus Klebefolien beseitigen.",
            },
            correctAnswer: "b",
            explanation: "Haarspray eignet sich nicht nur, um die Frisur zu fixieren, sondern ist auch hilfreich, wenn sich ein Permanent-Marker-Fleck auf Glattleder befindet. " +
                "Um den Fleck zu entfernen, wird er mit dem Spray besprüht und nach kurzer Einwirkzeit weiterbehandelt. Der im Spray enthaltene Alkohl löst die Farbe, " +
                "die sich dadurch nach dem Trocknen leicht abwischen lässt. Sollte eine Behandlung nicht ausreichen, kann der VOrgang wiederholt werden." +
                "Außerdem ist es empfehlenswert, im Anschluss eine Lederpflege aufzutragen."
        }
    },
    {
        id: "2026-01-09",
        data: {
            questionText: "Bevor Blattgold zum Vergolden von Gegenständen mit einem Pinsel aufgetragen wird, ...?",
            options: {
                a: "wird die Oberfläche des Blattgolds mit einem Feuerzeug erwärmt.",
                b: "streichen sich Vergolder mit dem Pinsel über die Wange.",
                c: "rauen Vergolder das WErkstück mit einer Drahtürste an.",
            },
            correctAnswer: "b",
            explanation: "Für das Vergolden mit Blattgold braucht es Fingerspitzengefühl und die richtige Technik. " +
                "AUsgebildete Vergolder/innen nutzen beim sogenannten Anschießen, wenn das Blattgold auf dem Werkstück aufgebracht wird, " +
                "meist einen flachen Pinsel aus Eichhörnchenhaar. Dieser wird vor dem AUfnehmen des Goldes an Wange oder Kopfhaar entlanggestrichen. " +
                "Dadurch werden die feinen Haare leicht eingefettet, sodass das dünne Blatt dran haften bleibt, sich aber beim Kontakt mit der zu verolgdenden Oberfläche sofort wieder löst."
        }
    },
    {
        id: "2026-01-10",
        data: {
            questionText: "Bei der sogenannten Ehegattenschaukel ...?",
            options: {
                a: "arbeiten beide Ehepartner jeweils 20 Stunden pro Woche in Teilzeit.",
                b: "beansprucht jeder Ehepartner die Hälfte des Kinderfreibetrags.",
                c: "kaufen sich Ehepartner eine Immobilie immer wieder gegenseitig ab.",
            },
            correctAnswer: "c",
            explanation: "Die sogennante Ehegattenschaukel ist ein Steuerspar-Modell für verheirtatete Immobilienbesitzer, die ihre Immobilie vermieten. " +
                "Meist ist nach einigen Jahren der WErt einer Immobilie gestiegen und liegt deutlich über dem führeren Kaufpreis. " +
                "Wird diese Immobilie zum neuen Wert an den Ehepartner verkauf, kann ein höherer Betrag für die Immobilie abgeschrieben werden. Esmüssen also weniger Steuern bezahlt werden. " +
                "Bei Verkäufen an Ehepartner fällt außerdem die Grunderwerbsteuer weg. Wird die Immobilie immer wieder hin und her verkauft, wird von Ehegattenschaukel gesprochen."
        }
    },
    {
        id: "2026-01-12",
        data: {
            questionText: "WElche Neuhaeit sorgte ab dem 16.Juli 1935 in Oklahoma City für Ärger bei AUtofahrern?",
            options: {
                a: "die las 'Blaues Wunder' benannte erste Mautstation.",
                b: "die als 'Big Brother' bekannte erste Radarfalle.",
                c: "die als 'schwarze Maria' bezeichnete erste Parkuhr",
            },
            correctAnswer: "c",
            explanation: "Cariton Cole Magee war Anwalt, Journalist und 1935 Chef des Verkehrsausschusses von Oklahoma City. " +
                "Schon länger waren ihm die Dauerparker ein Dorn im AUge, die im Zentrum den Platz vor den Geschäften blockierten. " +
                "Deshalb entwarf er mit zwei Ingenieuren einen mechansichen Parkzeitmesser mit einem Uhrwerk, dessen Feder von eingeworfenen Münzen gespannt wurde. " +
                "Am 16. Juli 1935 wurden die ersten Parkuhren in Oklahoma City aufgestellt, die von den verärgerten Autofahrern 'schwarze Marias' getaufte wurden - " +
                "in Anlehnung an die 'Black Marias', frühere schwarzfarbige Gefangenen-Transporter. Allem Wiederstand zum Trotz wurde Magees Erfindung erfolgreich und eroberte schon bald andere Städte."
        }
    },
    {
        id: "2026-01-13",
        data: {
            questionText: "Schleimaale wehren sich erfolgreich gegen Fresseinde, indem sie ein Sekret produzieren, das ...?",
            options: {
                a: "im Wasser um das 10.000-fache anschwillt.",
                b: "die Farbe von Meerwasser annimmt und sie fast unsichtbar macht.",
                c: "in Verbidnung mit Wasser leichte Stromstöße erzeugt.",
            },
            correctAnswer: "a",
            explanation: "Schleimaale sind gemeinsam mit den Neunaugen die einzigen noch lebenden Vertreter der der urtümlichen Rundmäuler. " +
                "Sie leben am Meeresgrund bis in etwa 2.000 Metern Tiefe und ernähren sich dort von Aas. " +
                "Wird ein Schleimaal von einem Fressfeind gebissen, sonder er aus rund 150 Drüsen ein Sekret ab, das bei Wasserkontakt um das 10.000-facje anschwillt." +
                "Aus einem Teelöffel Sekret wird so in Sekunden ein 5-Liter Eimer Schleim, der so zäh ist, dass selbst groß0e Räuber wie Haie umgehend die Flucht ergreifen müssen, um nicht zu ersticken."
        }
    },
    {
        id: "2026-01-14",
        data: {
            questionText: "Eine Schweizer Studie von 2023 zur Wahrnehmung von Männer- und Frauenfußball im Fernsehen kam zu dem Ergebnis, dass bei ...?",
            options: {
                a: "Spielerinnen Fouls eher übersehen werden",
                b: "Männer Spielverzögerungen als länger wahrgenommen werden",
                c: "verpixelte Bildern Männer und Frauen gleich gut bewertet werden",
            },
            correctAnswer: "c",
            explanation: "Forschende der Universität Zürich haben 2023 die Wahrnehmung von Männer- und Frauenfußball untersucht. " +
                "276 Frauen und 337 Männer mit einem Durchschnittsalter von 34 Jahren wurden in zwei Gruppen unter- teilt: " +
                "Gruppe 1 wurden unbearbeitete Videoaufnahmen von Fußballerinnen und Fußballern auf Weltspitzen-Niveau von 2019 gezeigt. " +
                "Gruppe 2 wur- den dieselben Aufnahmen verpixelt gezeigt, sodass die Geschlechter nicht erkennbar waren. Bei der Bewertung der Leistung erhielten " +
                "die Männer auf den unbearbeiteten Aufnahmen bessere Noten als die Frauen. Waren die Aufnahmen verpixelt, erhielten beide Geschlechter dieselbe Note. " +
                "Frauen wurden also nur dann als schlechter bewertet, wenn das Geschlecht erkennbar war."
        }
    },
    {
        id: "2026-01-15",
        data: {
            questionText: "Damit selbst fermentiertes Gemüse nach einiger Zeit keinen unangenhemen Geschmack entwickelt, sollte ...?",
            options: {
                a: "zu Beginn ein Schuss Apfelsaft in das Einmachglas gegeben werden",
                b: "weißer Belag auf der Flässigkeit regelmäßig abgeschöpft werden",
                c: "der Deckel des Glasses mit kleinen Löchern versehen werden",
            },
            correctAnswer: "b",
            explanation: "Beim Fermentieren sollte auf eine gute Küchenhygiene geachtet werden und " +
                "das Gemüse während des mehrere Wochen andauernden Vergärungs- prozesses immer wieder kontrolliert werden. " +
                "Denn häufig schwimmt nach einiger Zeit eine Art weißer, pudriger Belag auf der Oberfläche. Dabei handelt es sich um unbedenkliche, " +
                "sogenannte Kahmhefe aus Hefen und sauerstoffabhängigen Bakterien, die sich an Übergängen von Oberflächen zu Luft ansammelt. " +
                "Um einen unangenehmen Geschmack des Fermentier- guts zu vermeiden, sollte die Kahmhefe regelmäßig abgeschöpft werden."

        }
    },
    {
        id: "2026-01-16",
        data: {
            questionText: "Wer beim Orthopäden eine 'Tossy'-Diagose erhält, ...?",
            options: {
                a: "sollte seine Schulter schonen",
                b: "benötigt medizinische Schuheinlagen",
                c: "sollte bei sportlichen Aktivitäten dringend Kniebandagen tragen",
            },
            correctAnswer: "a",
            explanation: "Ein Sturz oder starke Belastung der Schulter kann eine Verletzung am Schultereckgelenk verursachen. " +
                "Dort sind Bänder, die das Schlüsselbein und das Schulterblatt miteinander verbinden, beschädigt oder gerissen, " +
                "und die Schulter kann nicht mehr schmerzfrei bewegt werden. Beim Ortho- päden erfolgt eine sogenannte Tossy-Diagnose: " +
                "eine dreistufige Einteilung des Verletzungsausmaßes, die 1963 von dem Mediziner Jerome Tossy ent- wickelt wurde. " +
                "Tossy I beschreibt eine Überdehnung, Tossy II Teilrisse der Bandstrukturen, bei denen das Gelenk intensiv geschont werden sollte. " +
                "Bei einer Tossy-III-Diagnose sind die Bänder gerissen, was eine operative Behandlung nach sich ziehen kann."

        }
    },
    {
        id: "2026-01-17",
        data: {
            questionText: "Bis 1083 war es am Wiener Burgtheater verboten, ...?",
            options: {
                a: "als Gast Schuhe mit hohen Absätzen zu tragen",
                b: "sich als Schauspieler am Ende vor dem Publikum zu verbeugen",
                c: "in der ersten Reihe des Parketts zu sitzen",
            },
            correctAnswer: "b",
            explanation: "Das sogenannte Vorhangverbot am Wiener Burgtheater war ein unge- schriebenes Gesetz vom 19. August 1778. " +
                "Es schrieb vor, dass sich nach Ende des Stückes keine Ensemblemitglieder vor dem Publikum verbeugen durften. " +
                "Diese galten als ',Schauspieler Seiner Majestät' Kaiser Joseph II., und als solche wäre ein derartiges Verhalten nicht statthaft gewesen. " +
                "So blieb der Vorhang, nachdem das Stück zu Ende war, geschlossen und die Mimen des Wiener Burgtheaters durften dem Applaus des Publikums nicht beiwohnen. " +
                "Erst 1983 wurde das Verbot offiziell aufgehoben."

        }
    },
    {
        id: "2026-01-19",
        data: {
            questionText: "Worin besteht bei einem Sehtest mit 'Landolt-Ringen' der Vorteil im Gegensatz zu herkömmlichen Buchstaben?",
            options: {
                a: "Sie erübrigen meist die anschließende Dioptrienbestimmung.",
                b: "Sie können nicht aufgrund ihrer Form erraten werden.",
                c: "Es kann außer der Sehschärfe auch das Farbsehen überprüft werden.",
            },
            correctAnswer: "b",
            explanation: "Ein traditioneller Sehtest mit Buchstaben kann ungenaue Ergebnisse lie- fern, " +
                "da Buchstaben auch bei beeinträchtigter Sehschärfe aufgrund ihrer Form erkannt oder erraten werden können. " +
                "Beim Sehtest mit sogenannten Landolt-Ringen muss der Betrachter die unterschiedlichen Ausrichtungen eines Kreisrings mit Öffnung bestimmen. " +
                "Der Test bietet eine rein objektive Beurteilung der Sehschärfe und ist deshalb auch bei der Untersuchung von jungen Kindern und Analphabeten geeignet."

        }
    },
    {
        id: "2026-01-20",
        data: {
            questionText: "Duftpelargonien ...?",
            options: {
                a: "können in Innenräumen das ABlösen von Tapeten begünstigen.",
                b: "eignen sich zum Aromatisieren von Speisen und Getränken.",
                c: "sollten nicht ohne Handschuhe berührt werden.",
            },
            correctAnswer: "b",
            explanation: "Duftpelargonien, umgangssprachlich auch Duftgeranien genannt, sind beliebte Kübelpflanzen für den Balkon oder die Terrasse. " +
                "Diese Gruppe von Pelargonien zeichnet sich durch stark aromatische Blätter aus. " +
                "Der intensive Duft nach Rosen, Zitrone oder auch Pfefferminz stammt von ätherischen Ölen, die der Insektenabwehr dienen. " +
                "Im Gegensatz zu anderen Pelargonien, die zwar auch essbar, aber nicht schmackhaft sind, eignen sich die unbehandelten Blätter und Blüten " +
                "der Duftpelargonien zum Aromatisieren und Garnieren von Speisen und Getränken."

        }
    },
    {
        id: "2026-01-21",
        data: {
            questionText: "Insgesamt 37% Prozent der Männer und 43% der Frauen ab 18 Jahren in Deutschland ...?",
            options: {
                a: "machen zumindest eine Woche im Jahr eine Diät",
                b: "benutzen klassische Desktop-Computer zur Internet-nutzung",
                c: "gehen mindestens gelegentlich wandern",
            },
            correctAnswer: "c",
            explanation: "Eine repräsentative Umfrage einer Online-Plattform für Statistik von 2023 zeigt, dass Wandern auf Platz Eins der Sportarten liegt, " +
                "die zumindest gelegentlich ausgeübt werden. Bei den Männern liegt der Anteil bei 37 Prozent und bei den Frauen bei 43 Prozent. " +
                "Ebenfalls bei beiden Geschlechtern beliebt sind Joggen, Schwimmen oder Tauchen und Radfahren. Unterschiede gibt es bei Fußball, " +
                "was bei Männern deutlich beliebter ist, und Fitness und Aerobic, was von Frauen deutlich bevorzugt wird."

        }
    },
    {
        id: "2026-01-22",
        data: {
            questionText: "Um beim Mahlen von Kaffeebohnen zu verhindern, dass gemahlener Kaffee im Mahlwerk hängenbleibt, hilft es, die Bohnen ...?",
            options: {
                a: "zuvor mit den Händen wärmen",
                b: "vor dem Mahlen mit etwas Wasser zu besprühen",
                c: "nicht dauerhaft in Porzellanbehältern zu lagern",
            },
            correctAnswer: "b",
            explanation: "Durch statische Aufladung klebt das Mahlgut bei Kaffeemühlen schnell im Mahlwerk und ist nur mühsam zu entfernen. " +
                "Werden die Bohnen vor dem Mahlen mit ein wenig Wasser besprüht, reduziert dies " +
                "die statische Aufladung und das Mahlgut fällt fast vollständig in den Auffangbehälter."

        }
    },
    {
        id: "2026-01-23",
        data: {
            questionText: "Welcher optische Effekt würde bei einem Menschen im Raumschiff bei einer Beschleunigung auf Lichtgeschwindigkeit anfangs auftreten?",
            options: {
                a: "Objekte wie Sterne vor dem Raumschiff entfernen sich scheinbar.",
                b: "Hinter dem Raumschiff scheint sich das All zusammenzuziehen",
                c: "Vorbeifliegende Himmelsobjekte erscheinen wie eingefroren",
            },
            correctAnswer: "a",
            explanation: "Lichtgeschwindigkeit ist für Objekte mit Masse, also auch den Menschen, nicht erreichbar. Dennoch gibt es theoretische Uberlegungen, " +
                "welche Effekte bei einer Beschleunigung auf Lichtgeschwindigkeit auftreten wurden. Bei zunehmender Geschwindigkeit wurden zunachst " +
                "die Lichtstrahlen immer frontaler auf das beschleunigende Objekt treffen. Vergleichbar ist dies mit einem Auto im Regen: " +
                "die Strahlen scheinen nun wie Regentropfen auf der Windschutzscheibe von vorne zu kommen statt von allen Seiten. " +
                "Der optische Effekt, der daraufhin entsteht, lasst die Sterne sich am sichtbaren Horizont scheinbar entfernen, " +
                "obwohl das Objekt sich innen mitzunehmender Geschwindigkeit nahert."

        }
    },
    {
        id: "2026-01-24",
        data: {
            questionText: "Männer, die in Frankreich öffentliche Schwimmbäder besuchen möchten, sollten ...?",
            options: {
                a: "auf Handtücher in grellen Farben verzichten",
                b: "kurze und enganliegnde Badehosen tragen",
                c: "Brust- und Achselhaare abrasieren",
            },
            correctAnswer: "b",
            explanation: "In Frankreich ist das Tragen von locker sitzenden Badeshorts in den meisten öffentlichen Schwimmbädern nciht erlaubt, " +
                "da sie als unhygienisch und umweltschädlich betrachtet werden. Stattdessen ist das Tragen von kurzen, enganliegenden Badehosen, " +
                "oft Vorschrift. Da sie selten außerhalb von Bädern getragen werden, bringen sie weniger Schmutz mit. Sie befördern auch weniger Wasser aus dem Becken. " +
                "Ein allgemeines Gesetz, das das Tragen von Badeshorts in Frankreich verbietet, gibt es jedoch nicht."

        }
    },
    {
        id: "2026-01-26",
        data: {
            questionText: "Mantelzone, Saumzone und Kernzone bezeichnen ...?",
            options: {
                a: "Teile der Fruchtstruktur eines Apfels",
                b: "die städtebaulichen Abschnitte einer Vorortsiedlung",
                c: "die verschiedenen Bereiche einer Hecke in der Landwirtschaft",
            },
            correctAnswer: "c",
            explanation: "Die typische-Gartenhecke ist jedem ein Begriff, doch es gibt Bepflanzungen in der freien Landschaft, die ebenfalls als Hecken bezeichnet werden. " +
                "Es sind vom Menschen geschaffene Ökosysteme, die verschiedenen Tierarten Lebensraum bieten. " +
                "Solche Hecken dienen der natürlichen Begrenzung von Weiden, Wiesen, Ackerflachen oder Grundstücken. In der Regel ist eine Hecke im Querschnitt in drei Zonen unterteilt. " +
                "Dabei: ist die Kernzone, also der innerste Bereich, am höchsten und flacht zum Rand hin ab. In der äußersten Saumzone wachsen niedrige Pflanzen und Krauter, " +
                "die viel Licht benötigen. In der Mantelzone, dem Ubesgang zur Kernzone, befinden sich Heckengewächse sowie kleine und junge Geholze. " +
                "In der Kernzone wachsen Sträucher, die Schatten gut vertragen, und Bäume."

        }
    },
    {
        id: "2026-01-27",
        data: {
            questionText: "Die auch als Studentenblume bekannte Gartenpflanze Tagestes kann ...?",
            options: {
                a: "gestampft und in Wasser vermischt als Textil-Imprägnierung dienen",
                b: "die Luftqualität von Räumen durch Färbung ihrer Blätter anzeigen",
                c: "als Lockmittel für Schnecken verwendet werden",
            },
            correctAnswer: "c",
            explanation: "Die farbenfrohe Gartenpfalnze Tagetes gehört zur Familie der Korbblütler und stammt ursprünglich aus Mittel- und Südamerika. " +
                "Da sie einen Geruch verströmt, der für Schnecken besonders attraktiv ist, setzen sie Gemüsegärtner gerne als Lockmittel ein, um ihre  Erntezu schützen. " +
                "Dafür wird die Tagetes um das Gemüsebeet herum gepflanzt. Sobald sich die Schnecken abends um die Tagetes sammeln, können sie entfernt und an einen anderen Ort umgesiedelt werden."

        }
    },
    {
        id: "2026-01-28",
        data: {
            questionText: "Erkenntnissen der Unisersity of Cambridge zufolge können Menschen dreimal so schnell lernen, wenn sie vorher ...?",
            options: {
                a: "einer Raumtemperatur zwischen 6 und 9 Grad Celsius ausgesetzt waren",
                b: "für drei Minuten arythmisch zu einem Metronom klatschen",
                c: "ein auf ihre Gehirnwellen abgestimmtes Flackerbild anschauen",
            },
            correctAnswer: "c",
            explanation: "Die Aktivitat des menschlichen Gehirns erzeugt rhythmische Schwingungen. Wenn wir wach und entspannt sind, dominieren in der Regel sogenannte Alphawellen. " +
                "Forschende der University of Cambridge ermitteltenten 2020 die jeweilige Alpha-Spitzenfrequenz von Probanden und zeigtenen ihnen dann für 1,5 Sekunden einen Impuls: " +
                "ein weiRes Quadrat auf schwarzem Grund, das im Rhythmus ihrer personlichen Alphawellen-Frequenz flackerte. " +
                "Durch diesen einmaligen Impuls verdreifachte sich in anschließenden Tests die Lerngeschwindigkeit der TeilInehmenden. " +
                "Der Effekt des sogenannten Entrainments hielt noch am nachsten Tag an."

        }
    },
    {
        id: "2026-01-29",
        data: {
            questionText: "Mit einer entsprechend zurechtgeschnittenen PET-Flasche ...?",
            options: {
                a: "können Einmachgläser leichter geöffnet werden",
                b: "bleibt Wäsche beim Waschen in der Waschmaschine fusselfrei",
                c: "lässt sich Hackfleisch mit einem Holzstäbchen zum Spieß formen",
            },
            correctAnswer: "c",
            explanation: "Für diesen Trick wird zunächst eine PET-Flasche mithilfe eines Cuttermessers halbiert und " +
                "der untere Teil der Flasche kopfüber auf die Arbeitsfläche gestellt. Dann wird der Flaschenhals mit gewürztem Hackfleisch befüllt " +
                "und auf den Flaschenboden des unteren Teils gesteckt. Im nächsten Schritt wird der Deckel aufgedreht und ein Holzstäbchen durchgesteckt. " +
                "Wird der Flaschenhals nun langsam heruntergedrückt, wird das Fleisch allmählich herausgepresst und formt sich um das Holzstäbchen. " +
                "Zuletzt wird das Stäbchen mit dem Fleisch aus der Öffnung gezogen und fertig ist der Hackfleischspieß."

        }
    },
    {
        id: "2026-01-30",
        data: {
            questionText: "Im Gegensatz zum Schlussstein eines Bogens musste der Schlusstein eines gewölbes zu früheren Zeiten ...?",
            options: {
                a: "aus weichem Material wie Sandstein bestehen",
                b: "zuerst gesetzt werden und nicht zuletzt",
                c: "mindestens doppelt so schwer sein wie die anderen Steine",
            },
            correctAnswer: "b",
            explanation: "Als Schlussstein wird der Stein am Scheitelpunkt eines Bogens oder eines Gewölbes bezeichnet. " +
                "Bei beiden Bauformen wurde die Konstruktion mit einem hölzernen Rahmen, dem Lehrgerüst, " +
                "gestützt und bei Bögen der keilförmige Schlussstein zuletzt eingesetzt. Bei den komplexer konstruierten Gewölben hingegen " +
                "wurde der meist runde Stein zuerst auf dem Lehrgerüst platziert und von dort ausgehend aufgemauert. Erst nach Entfernen des Gerüstes setzten sich die Schlusssteine, " +
                "und die Konstruktionen waren selbsttragend."

        }
    },
    {
        id: "2026-01-31",
        data: {
            questionText: "Im 18. Jahrhundert gab es in englischen Spielbanken Angesellte welche die Aufgabe hatten, ...?",
            options: {
                a: "im Falle einer Polizeirazzie die Würfel herunterzuschlucken",
                b: "Frustschläge von unglücklichen Verlierern entgegenzunehmen",
                c: "die Gewinnchance der Spiler durch Händeschütteln einzuschätzen",
            },
            correctAnswer: "a",
            explanation: "Im 18. und 19. Jahrhundert wurden in englischen Spielbanken ungewöhnliche Methoden praktiziert, " +
                "um das weit verbreitete, illegale Glücksspiel vor den Behörden zu verstecken. " +
                "Aufgrund strenger Glücksspielgesetze wurden Mitarbeiter wohl nur dafür eingestellt, die Würfel zu schlucken, " +
                "um bei Polizeirazzien Beweise zu beseitigen und so den illegalen Betrieb zu verschleiern. " +
                "Auf diese Weise sollten Strafen vermieden werden. Der 'GamingAct' von 1845 war ein Gesetz, " +
                "das Betrug unter Strafe stellte, die Durchsuchung von Spielhallen erleichterte und den Nachweis des Betriebs einerSpielhalle vereinfachte."

        }
    }

];

// 3. Upload Function
async function seedDatabase() {
    const ARTIFACT_ID = 'default-app'; // Ensure this matches your frontend config
    console.log(`🚀 Starting seed for ${ARTIFACT_ID}...`);

    for (const q of questionsToAdd) {
        // Path: artifacts -> [ID] -> public -> data -> questions -> [Date]
        const docRef = db.doc(`artifacts/${ARTIFACT_ID}/public/data/questions/${q.id}`);

        await docRef.set(q.data);
        console.log(`✅ Wrote question for date: ${q.id}`);
    }

    console.log('🎉 Done!');
}

seedDatabase();