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
        id: "2026-02-02", // Make sure this matches today's date if you want to test now!
        data: {
            questionText: "Wer hat in seinem Berufsalltag mit den sogenannten  Flavours 'charmant' und 'seltsam' zu tun?",
            options: {
                a: "britische Bäcker bei der Zubereitung von Scones",
                b: "Geologen bei der Bestimmung von Gesteinsformationen",
                c: "Quantenphysiker bei der Untersuchung von Quarks",
            },
            correctAnswer: "c",
            explanation: "Quantenphysiker bei der Untersuchung von Quarks Hadronen, also Atomteilchen, " +
                "zu denen Protonen und Neutronen gehören, werden von sogenannten Quarks gebildet. " +
                "Unter anderem anhand ihrer Masse und Ladung werden sie in sechs verschiedene „Flavours“ beziehungsweise Geschmacksrichtungen eingeteilt: " +
                "aufwärts, abwärts, charmant, seltsam, oben und unten. Der Name „Charm“ wurde metaphorisch verwendet, " +
                "um die „charismatische“ Natur dieses Quarks zu beschreiben. Charm-Quarks haben eine besonders starke Wechselwirkung mit anderen Quarks. " +
                "Ein „seltsames“ Quark bezieht sich auf ungewöhnliche Quarkzustände, etwa wenn sie sich nicht wie üblich in Zweier- oder Dreiergruppen, " +
                "sondern in Vierer- oder Fünfer-Gruppen zusammensetzen."
        }
    },
    {
        id: "2026-02-03",
        data: {
            questionText: "Fühlen sich Libellen-Weibchen während der Paarungszeit von männlichen Artgenossen verfolgt, ...?",
            options: {
                a: "können sie für wenige Sekunden eine Art Turbo-Motor dazuschalten.",
                b: "stellen sie sich tot.",
                c: "stoßen sie männliche Duftstoffe aus",
            },
            correctAnswer: "b",
            explanation: "Die Paarung von Libellen ist anstrengend und birgt für die Weibchen ein hohes Risiko, verletzt zu werden. " +
                "Während des Aktes verhakt sich das Männchen nämlich fest in Kopfnähe des Weibchens, während es versucht, " +
                "die Eier eines anderen Männchens zu entfernen. Um ihr eigenes Überleben zu sichern, haben die Weibchen eine 2017 beobachtete Strategie entwickelt: " +
                "Sie stellen sich tot und fliegen erst weiter, wenn die Gefahr vorbei und der männliche Artgenosse verschwunden ist."
        }
    },
    {
        id: "2026-02-04",
        data: {
            questionText: "Misophoniker ...?",
            options: {
                a: "haben keinerlei Rythmusgefühl beim Tanzen.",
                b: "können Alltagsgeräusche wie kauen nicht ertragen.",
                c: "bringen beim Sprechen regelmäßig Buchstaben durcheinander.",
            },
            correctAnswer: "b",
            explanation: "Bei einer Misophonie handelt es sich um eine Störung der emotionalen Kontrollmechanismen im Gehirn, " +
                "die Auswirkungen auf die Herzfrequenz oder Schweißproduktion haben. Betroffene Menschen erleben eine verminderte Toleranz " +
                "in Zusammenhang mit einer selektiven Wahrnehmung von Geräuschen. Dadurch sind verschiedene Alltagsgeräusche wie zum Beispiel Kauen, " +
                "Räuspern, Atmen oder Niesen für Menschen mit Misophonie unerträglich. Sie verspüren Aggressionen und Ekel und im schlimmsten Fall droht sogar ein Wutausbruch."
        }
    },
    {
        id: "2026-02-05",
        data: {
            questionText: "Was sorgt beim Einlegen von Salzgurken für weicheres Fruchtfleisch?",
            options: {
                a: "Gläser direkt verschließen und über Kopf lagern.",
                b: "Gurken nur zur Hälfte mit Flüssigkeit bedecken.",
                c: "kleine Stücke Roggenbrot aus Sauerteig in die Salzlake geben.",
            },
            correctAnswer: "c",
            explanation: "Um aus Einlegegurken haltbare Salzgurken zu machen, wird das Gemüse in einer Salzlake eingelegt. " +
                "Dazu sollten kleine Stücke Roggenbrot aus Sauerteig hinzugegeben werden. Die darin enthaltenen Milchsäurebakterien stoßen einen Fermentationsprozess an, " +
                "der für einen säuerlicheren Geschmack und weicheres Fruchtfleisch sorgt. Das Gefäß sollte die ersten Tage nur mit einem Tuch abgedeckt werden, " +
                "damit entstehende Gase entweichen können. Nach circa einer Woche kann das Gefäß luftdicht verschlossen werden."
        }
    },
    {
        id: "2026-02-06",
        data: {
            questionText: "Zur Vorbereitung einer Mission der indischen Raumfahrtbehörde 1981 wurde der Satellit zunächst...?",
            options: {
                a: "in einer Kfz-WErkstatt für Busse und Lkw ausgebeult.",
                b: "mithilfe eines Ochsenwagens auf ein Feld gezogen.",
                c: "in einem Yoga-Zentrum im Himalaya geerdet.",
            },
            correctAnswer: "b",
            explanation: "Das „Ariane Passenger PayLoad Experiment“, kurz APPLE, war der erste experimentelle Kommunikationssatellit der indischen Raumfahrtbehörde ISRO. " +
                "Bevor er 1981 mit der Ariane-1-Rakete erfolgreich in die Umlaufbahn geschossen werden konnte, wurden zahlreiche Tests durchgeführt. " +
                "Für einen davon wurde ein nicht-magnetisches Umfeld benötigt, weswegen der Satellit kurzerhand auf einen hölzernen Ochsenwagen gespannt " +
                "und in ein offenes Feld gezogen wurde, wo der Test erfolgreich durchgeführt werden konnte."
        }
    },
    {
        id: "2026-02-07",
        data: {
            questionText: "Während seiner Zeit als US-Präsident hat Jimmy Carter sein Jackett einmal ...?",
            options: {
                a: "auf links getragen, um seine Unangepasstheit zu beweisen.",
                b: "bei einem Treffen mit Helmut Schmidt als Picknickdecke benutzt.",
                c: "versehentlich mit den Atomwaffencodes in die Reinigung gegeben.",
            },
            correctAnswer: "c",
            explanation: "Der 39. Präsident der Vereinigten Staaten, Jimmy Carter, ist eben auch nur ein Mensch. " +
                "Medienberichten zufolge soll er während seiner Amtszeit als Präsident einmal einen Anzug zur Reinigung gebracht haben, " +
                "in dessen Jacketttasche noch der sogenannte Biscuit, eine Karte mit den Atomwaffencodes, steckte. " +
                "Zu seinem Glück sind die Golden Codes auf eine Plastikkarte aufgedruckt und daher wasserdicht - und ohne den dazugehörigen Atomkoffer ohnehin nutzlos."
        }
    },
    {
        id: "2026-02-09",
        data: {
            questionText: "Menschen mit natürlich roten Haaren ...?",
            options: {
                a: "machen etwa zwei Prozent der Bevölkerung in Deutschland aus.",
                b: "sind weniger anfällig für Pollen-Allergien.",
                c: "besitzen ein Extra-gen, das den roten Farbstoff Karmin erzeugt.",
            },
            correctAnswer: "a",
            explanation: "Welche Haarfarbe ein Mensch hat, bestimmt das Pigment Melanin. Es kommt in zwei Varianten in unterschiedlicher Menge vor: " +
                "Das Eumelanin färbt Haare dunkel bis schwarz, während das deutlich seltenere Phäomelanin für blonde oder rote Haare sorgt. " +
                "Das Mischungsverhältnis der Pigmente bestimmt das MCIR-Gen. Ist dessen Funktion gestört, wird viel mehr Phäomelanin produziert, wodurch Haare rot werden. " +
                "Weil das allerdings in Deutschland selten vorkommt, machen Menschen mit roten Haaren nur etwa zwei Prozent der Bevölkerung aus."
        }
    },
    {
        id: "2026-02-10",
        data: {
            questionText: "Warum pfeift eine Flötenakazie im Wind?",
            options: {
                a: "Ihre Dorenen haben Löcher, weil Ameisen darin wohnen.",
                b: "Von der Rinde abstehende Holzfasern geraten in Schwingung.",
                c: "Ihre Blätter rollen sich zu Röhren auf, wenn sie angefresen werden.",
            },
            correctAnswer: "a",
            explanation: "Flötenakazien wachsen in den Savannen Ostafrikas. Ihr Name spielt auf einen Pfeifton an, den die Bäume im Wind erzeugen. " +
                "Auslöser sind wulstige Hohlkörper an ihren Dornen, in denen oft kreisrunde Löcher zu finden sind. Diese zeugen von der Symbiose des Baumes mit einer Ameisenart, " +
                "die sich  in den Dornen niedergelassen hat. Der Baum versorgt sie mit Nektar, während die Ameisen jeden Eindringling mit schmerzhaften Bissen vom Fressen der Blätter abhalten. " +
                "Zieht Wind an den Hohlkörpern vorbei, beginnt die Flötenakazie zu pfeifen"
        }
    },
    {
        id: "2026-02-11",
        data: {
            questionText: "Im Juni 2023 stahl ein Dieb in Kiel ein angeschlossenes Fahrrad, indem er ...?",
            options: {
                a: "es mit einer Kette an seinem Motorboot befestigte und losfuhr",
                b: "einen vier Meter hohen Baum fällte",
                c: "den Fahrradständer mitsamt zwei Betonplatten davontrug",
            },
            correctAnswer: "b",
            explanation: "Auf besonders kreative Art und Weise wurde ein E-Bike im Kieler Stadtteil Schilksee gestohlen. Die 18-jährige Besitzerin hatte das Fahrrad am 28. Juni 2023 " +
                "gegen 22 Uhr mit einem Faltschloss an einem Baum gesichert. Als sie nachts gegen 01:50 Uhr zurückkehrte, war der mehr als vier Meter hohe Baum " +
                "in etwa 1,40 Meter Höhe abgesägt worden und das wertvolle Elektrofahrrad verschwunden."
        }
    },
    {
        id: "2026-02-12",
        data: {
            questionText: "Wie lässt sich beim Backen das Aroma von abgeriebener Zitronen- oder Orangenschale intensievieren    ",
            options: {
                a: "Schale vor dem Verarbeiten einige Minuten in Apfelessig einlegen",
                b: "Schale mit etwas Zucker zwischen den Fingern reiben",
                c: "Zitrusfrucht vor dem Abreiben in der Mikrowelle erwärmen",
            },
            correctAnswer: "b",
            explanation: "Damit das Aroma von Zitronen- oder Orangenabrieb noch intensiver wird, hilft es, die Schalen mit etwas Zucker zwischen den Fingern zu reiben. " +
                "Die ätherischen Öle der Zitrusfrüchte werden durch die abrasive Textur des Zuckers extrahiert und es gelangt noch mehr Aroma in den Kuchen."
        }
    },
    {
        id: "2026-02-13",
        data: {
            questionText: "Trinkhalme aus Papier ...?",
            options: {
                a: "verbrauchen bei der Herstellung mehr Plastik als Pastiktrinkhalme",
                b: "lösen sich in alkohlischen Getränken wesentlich schneller auf",
                c: "können krebserregende Chlorpropanole enthalten",
            },
            correctAnswer: "c",
            explanation: "Um den Plastikverbrauch zu reduzieren, wird häufig auf Trinkhalme aus Papier gesetzt. Laut Verbraucherzentrale Nordrhein-Westfalen ist dabei aber Vorsicht geboten: " +
                "Damit das Papier bei Kontakt mit dem Getränk nicht sofort aufweicht, werden den Strohhalmen während der Produktion häufig Harze beigemischt. " +
                "Dabei kann der Alkohol Chlorpropanol entstehen, der als krebserregend gilt. In knapp der Hälfte der Papiertrinkhalme sind Untersuchungen zufolge Chlorpropanole zu finden. " +
                "Die Verbraucherzentrale rät daher, auf Trinkhalme besser zu verzichten."
        }
    },
    {
        id: "2026-02-14",
        data: {
            questionText: "Was ist das Besondere an Joseph Haydns 45. Sinfonie, auch bekannt als 'Abschiedssinfonie'?",
            options: {
                a: "Haydn komponierte sie während eines Vulkanausbruchs.",
                b: "Im Schlusssatz verlasen die Musiker nach und nach die Bühne.",
                c: "Hydn schrieb sie im Alter von 78 Jahren.",
            },
            correctAnswer: "b",
            explanation: "Der Österreicher Joseph Haydn diente von 1761 bis 1803 im Eisenstädter Schloss im damaligen Ungarn dem Fürsten Esterhäzy als Hofkomponistund Kapellmeister." +
                "Die Musiker des Hoforchesters verbrachten die Ssommermonate oft fernab ihrer Familien. In seiner „Abschiedssinfonie“ von 1772 wollte Haydn den Wunsch nach Heimkehr " +
                "symbolisch ausdrücken, indem die Musiker im Schlusssatz nach und nach das Orchester verlassen ließ, bis nur noch zwei Violinen übrig waren. " +
                "Nach der Uraufführung 1772 gewährte Fürst Esterházy, der die Symbolik sofort verstand, den Musikern die Möglichkeit, vorübergehend zu ihren Familien zurückzukehren."
        }
    },
    {
        id: "2026-02-16",
        data: {
            questionText: "Wieso taufte der britische Seeman John Meares eine Landzunge an der Westküste der USA 1788 'Cape Disappointment'?",
            options: {
                a: "Er konnte eine Flusseinfahrt nicht finden.",
                b: "Dortiges Goldvorkommen war bei seiner Ankunft längst abgebaut.",
                c: "Seine Gelibete lehnte dort mehrfach seinen Heiratsantrag ab.",
            },
            correctAnswer: "a",
            explanation: "„Cape Disappointment“ in Washington ist eine Landzunge an der US-Westküste. Dort mündet der Columbia River in den Pazifischen Ozean. " +
                "Den Namen erhielt das Kap vom britischen Pelzhändler John Meares. Auf der Suche nach Handelswegen von Kanada über den Pazifik segelte Meares 1788 zur besagten Bucht. " +
                "Ein spanischer Offizier hatte ihm mitgeteilt, dass er dort über eine Flussmündung ins Landesinnere gelangen könne. Aufgrund eines Unwetters und hoher Wellen " +
                "konnte Meares die Flusseinfahrt nicht finden und war sich sicher, der Offizier habe ihn reingelegt. Ergriffen von seinem Unmut taufte er das Kap " +
                "'Cape Disappointment', also 'Kap der Enttäuschung'."

        }
    },
    {
        id: "2026-02-17",
        data: {
            questionText: "Papageien und Tintenfische ...?",
            options: {
                a: "gehen beide auf den Vorfahren 'Nectocaris pteryx' zurück",
                b: "bestehen den auf Impulskontrolle ausgelegten Marshmallow-Test",
                c: "erzeugen bei ihrer Fortbewegung ähnliche Wirbel in Luft und Wasser",
            },
            correctAnswer: "b",
            explanation: "Trotz ihrer unterschiedlichen Lebensräume bestanden sowohl Tintenfische als auch Papageien bei zwei unterschiedlichen Studien von 2021 einen Test, " +
                "der ihre Impulskontrolle untersuchte. Die Papageien mussten einem Sonnenblumenkern widerstehen und erhielten, wenn sie warten konnten, " +
                "eine Walnuss. Bei den Tintenfischen wartete eine Garnele als Belohnung, wenn sie sich nicht sofort auf das dargebotene Futter stürzten. " +
                "Beide Arten schlossen den auf sie angepassten „Marshmallow“-Test erfolgreich ab - ein Experiment, das in den 1970er-Jahren bekannt wurde " +
                "und anhand eines Marshmallows die Impulskontrolle von Kindern untersuchte."

        }
    },
    {
        id: "2026-02-18",
        data: {
            questionText: "Im Jahr 2022 ließen finnische Forscher Studienteilnehmer eine 'Körperkarte' ausmalen, um ...?",
            options: {
                a: "die häufigsten Schmerzpunkte zu lokalisieren",
                b: "zu visualisieren, wo Liebesgefühle wahrgenommen werden",
                c: "die kitzligsten Körperstellen eines Menschen herauszufinden",
            },
            correctAnswer: "b",
            explanation: "Forschende der finnischen Aalto-Universität ließen 2022 im Rahmen einer Studie " +
                "sogenannte Körperkarten ausmalen. In den simplen Abbildungen des menschlichen Körpers sollten " +
                "die Teilnehmenden markieren, wo sie Reaktionen auf bestimmte Emotionen empfinden. " +
                "Dafür wurden ihnen verschiedene Formen der Liebe in Wortform und in zufälliger Reihenfolge vorgestellt. " +
                "Die Ergebnisse zeigten, dass die Liebe zu Freunden und Familie vorwiegend im Kopf und Oberkörper wahrgenommen" +
                " wird. Partnerschaftliche und leidenschaftliche Liebe wird im ganzen Körper empfunden. " +
                "Die Forschenden weisen jedoch darauf hin, dass sich das körperliche Empfinden von Liebe individuell sehr unterscheiden kann."

        }
    },
    {
        id: "2026-02-19",
        data: {
            questionText: "Womit lassen sich eingebrannte textilreste auf einem Bügeleisen leicht entfernen?",
            options: {
                a: "geschroteter Reis",
                b: "beschichtetes Backpapier",
                c: "Radiergummi",
            },
            correctAnswer: "c",
            explanation: "Wurde ein Kleidungsstück zu heiß gebügelt und Textilreste haben sich auf der Sohle " +
                "des Bügeleisens eingebrannt, hilft ein heller einfarbiger Radiergummi. Wichtig ist, " +
                "das Bügeleisen erst abkühlen zu lassen. Dank der Adhäsionskraft können die Rückstände mit dem Radiergummi " +
                "abgerubbelt werden. Anschließend noch mit einem Tuch nachpolieren und das Gerät ist wieder einsatzbereit."

        }
    },
    {
        id: "2026-02-20",
        data: {
            questionText: "Um etwas zwei Prozent des Gesamtbedarfs in Deutschland zu decken, wurden 2022 hierzulande rund 1,7 Millionen ...?",
            options: {
                a: "Kilogramm Bienenhonig erzeugt",
                b: "Kubikmeter Holz geschlagen",
                c: "Tonnen Erdöl produziert",
            },
            correctAnswer: "c",
            explanation: "Im Jahr 2022 wurden 34,1 Millionen Kilogramm Honig in Deutschland erzeugt. " +
                "Das entspricht knapp 45 Prozent des deutschen Jahres-Gesamtkonsums von 78,6 Millionen Kilo. " +
                "Dies ist im Vergleich zur Förderung von Erdöl ein enorm hoher Anteil, denn mit 1,7 Millionen Tonnen wurden " +
                "2022 nur zwei Prozent des Gesamtbedarfs Deutschlands auf deutschem Boden produziert. " +
                "90 Prozent der deutschen Gesamtproduktion von Erdöl stammte dabei aus Schleswig-Holstein und Niedersachsen."

        }
    },
    {
        id: "2026-02-21",
        data: {
            questionText: "Als sich eine Frau im Jahr 2012 in Island an einer Vermisstensuche beteiligte, ...?",
            options: {
                a: "erfuhr sie per Zufall, dass sie eine Zwillingsschwester hat",
                b: "realisierte sie erst Stunden später, dass sie selbst gesucht wurde",
                c: "entdeckte sie ein Bronze-Suspensorium aus Wikingerzeiten",
            },
            correctAnswer: "b",
            explanation: "Im August 2012 alarmierte ein Busfahrer in Island die Polizei, weil eine Touristin, " +
                "die mit einer Reisegruppe die Vulkanregion Eldgjä erkundete, nach einem Halt nicht zum Bus zurückgekehrt war. " +
                "Daraufhin wurde ein Suchtrupp aus rund 50 Personen organisiert. Daran beteiligte sich auch eine der " +
                "übrigen Reisenden. Einige Stunden später realisierte die Frau, dass sie selbst die gesuchte Person war. " +
                "Die Touristin hatte sich während des Stopps umgezogen, weshalb sie von den Mitreisenden " +
                "nicht erkannt worden war. Zudem hatte sich der Fahrer Medienberichten zufolge offenbar verzählt."

        }
    },
    {
        id: "2026-02-23",
        data: {
            questionText: "Bei einer 'Schnarchladung' ...?",
            options: {
                a: "handelt es sich um eine Supermarktware mit wenig Nachfrage",
                b: "wird das Kopfteil bei Matrazen stärker gefüttert",
                c: "werden E-AUtos langsam und schonend geladen",
            },
            correctAnswer: "c",
            explanation: "Der Akku eines Elektroautos ist fragil und wird durch häufige Schnellladevorgänge stark belastet, " +
                "was seine Zellen intensiv beansprucht und die Lebensdauer der Batterie reduzieren kann. " +
                "Das Laden des Elektroautos mit weniger Leistung dauert zwar einige Stunden länger, ist dafür aber schonender." +
                " Diese langsamen Ladevorgänge werden in Fachkreisen auch 'Schnarchladung' genannt und garantieren eine " +
                "längere Lebensdauer des Akkus."

        }
    },
    {
        id: "2026-02-24",
        data: {
            questionText: "Ist es grundsätzlich notwendig, Hunden für eine optimale Nährstoffversorgung regelmäßig wwechselnde Futtersorten anzubieten?",
            options: {
                a: "Ja, nur so entstehen kurzkettige Fettsäuren für eine gute Darmflora.",
                b: "Nur, wenn es sich um Trockenfutter handelt.",
                c: "Nein, dieselbe hochwertige Sorte kann über Jahre verfüttert werden.",
            },
            correctAnswer: "c",
            explanation: "Obwohl Menschen und Hunde größtenteils die gleichen Geschmäcker wahrnehmen können, " +
                "ist der Geschmackssinn von Hunden aufgrund der geringeren Anzahl von Geschmacksrezeptoren " +
                "viel weniger ausgeprägt. Dadurch haben sie nicht das Bedürfnis, jeden Tag etwas anderes zu essen. " +
                "Laut Experten ist Abwechslung zwar möglich, aber nicht notwendig. Handelt es sich um qualitativ " +
                "hochwertiges Futter, das der Hund gut verträgt, ist die Verfütterung über einen längeren Zeitraum bedenkenlos."

        }
    },
    {
        id: "2026-02-25",
        data: {
            questionText: "Das Risiko einer Borrelienübertragung sinkt je schneller eine Zecke nach einem Stich entfernt wird, da die Bakterien ...?",
            options: {
                a: "nur Zellteilung betreiben, solange die Zecke am WWirt hängt",
                b: "im Zeckendarm leben und erst beim Blutsaugen aktiviert werden",
                c: "nur kurzzeitg von den menschlichen T-Zellen bekämpft werden",
            },
            correctAnswer: "b",
            explanation: "Bei Spaziergängen durch Gebüsch und hohes Gras besteht das Risiko, von Zecken gestochen zu werden." +
                " Dabei können sogenannte Borrelien, die Erreger der Borreliose, auf den Menschen übertragen werden. " +
                "Je nach Region ist in Deutschland rund ein Drittel der Zecken von Borrelien befallen. " +
                "Das Infektionsrisiko ist umso geringer, je schneller die Zecke gefunden und entfernt wird. " +
                "Das liegt daran, dass die Borrelien-Bakterien im Darm der Zecke sitzen und erst durch das Saugen aktiviert " +
                "werden. Circa 12 bis 24 Stunden nach dem Zeckenstich haben sie sich bis in den Speichel ausgebreitet " +
                "und können auf den Menschen übertragen werden."

        }
    },
    {
        id: "2026-02-26",
        data: {
            questionText: "Wer einen PKW selbst polieren möchts, sollte ...?",
            options: {
                a: "in einem rechteckigen Raster arbeiten, nicht kreisförmig",
                b: "die Politur auf den Lack auftragen, nicht auf die Polierscheibe",
                c: "die zu polierende Stelle vorher nicht waschen, sondern nur abstauben",
            },
            correctAnswer: "a",
            explanation: "Für ein optimales Ergebnis sollte der Lack zunächst gesäubert und dann das Poliermittel " +
                "direkt auf die Polierscheibe oder den Lappen aufgetragen werden. Entscheidend ist, " +
                "niemals kreisförmig zu arbeiten, sondern immer in einem rechteckigen Raster im sogenannten Kreuzstich. " +
                "So wird verhindert, dass sogenannte Hologrammmuster im Lack entstehen."

        }
    },
    {
        id: "2026-02-27",
        data: {
            questionText: "Der weltweit einzigartige AUfzug des Neuen Rathauses in Hannover ...?",
            options: {
                a: "weird von den Fahrenden selbst per Pedalantrieb bewegt",
                b: "wird wegen einer Fehlzeichnung seit 1913 von oben bestiegen",
                c: "fährt mit einer Neigung von 17 Grad an der Kuppel entlang",
            },
            correctAnswer: "c",
            explanation: "Das Neue Rathaus in Hannover wurde 1913 eingeweiht und ist seit dem Sitz der Stadtverwaltung. " +
                "Weltweit einzigartig ist der Aufzug, der Besucherinnen und Besucher zur Aussichtsplattform " +
                "in etwa 100 Metern Höhe bringt. Die als Kuppelaufzug bekannte Aufzugsanlage fährt in " +
                "einem Winkel von 17 Grad an der Kuppel entlang und folgt dabei deren Neigung. " +
                "Der heutige Aufzug wurde 2008 in Betrieb genommen und löste die 1908 eingerichtete Originalanlage ab."
        }
    },
    {
        id: "2026-02-28",
        data: {
            questionText: "Was wird benötigt, um das Traditionsgebäck 'Meißner Fummel' selbst herzustellen...?",
            options: {
                a: "Küchengarn",
                b: "Seidentuch",
                c: "Strohalm",
            },
            correctAnswer: "c",
            explanation: "Die „Meißner Fummel“ ist ein Gebäck mit geschützter Ursprungsbezeichnung aus der sächsischen Stadt Meißen" +
                " und besteht größtenteils aus ... Luft. Der Ursprung soll auf das Jahr 1710 zurückgehen, " +
                "als täglich ein Depeschenreiter des sächsischen Kurfürsten August des Starken zwischen Meißen und Dresden " +
                "die Post beförderte. Verärgert, weil der Kurier unterwegs dem Meißner Wein zusprach, beauftragte der Kurfürst " +
                "die Bäckerzunft in Meißen, ein zerbrechliches Backwerk herzustellen, das der Kurier nach seiner Rückkehr " +
                "aus Meißen im Ganzen vorzuzeigen hatte. Um die dünnwandige Fummel, eine Art Teigtasche, selber herzustellen, " +
                "bedarf es Fingerspitzengefühl und eines Strohhalms. Mit diesem wird das Hohlgebäck vor dem Backen aufgeblasen."

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