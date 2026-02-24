import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';

// Native Node import for JSON
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

//Initialize Admin SDK (Bypasses all rules)
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

//Define your questions here

const questionsToAdd = [
    {
        id: "2026-12-01",
        data: {
            questionText: "Was hat ein Start-Up der ETH Zürich 2023 für Halter von Haustieren entwickelt?",
            options: {
                a: "Beutel, der die Hinterlassenschaften von Hunden zersetzt",
                b: "Pfeife, mit der Wellensittiche ihhr Stimmvolumen trainieren können",
                c: "Katzenklappe, die Katzen mit Beute den Zutritt ins Haus verweigert",
            },
            correctAnswer: "c",
            explanation: "Hauskatzen bringen oft tote Vögel oder Mäuse ins Haus. Für dieses Problem hat ein " +
                "Start-up der ETH Zürich mit Hilfe von künstlicher Intelligenz eine Lösung gefunden. " +
                "Inspiriert von ihren eigenen Katzen entwickelten die Zwillinge Oliver und Denis Widler 2023 " +
                "eine Hightech-Katzenklappe. Diese setzt auf ein nachtsichtfähiges System mit Bewegungsmelder, " +
                "Infrarotkamera und Infrarotbeleuchtung. Ein eigens entwickelter Algorithmus prüft " +
                "automatisch, ob die Katze Beute im Maul hat. Ist das der Fall, bleibt die Katze " +
                "ausgesperrt ... da hilft auch kein Miauen!"
        }
    },
    {
        id: "2026-12-02",
        data: {
            questionText: "Die Keratin-Zellen der Oberhaut und der Haarfollikel ...?",
            options: {
                a: "enthalten eine geringe Menge Salzsäure zur pH-Regulierung",
                b: "blockeirren in Kontakt mit Wasser die Bildung von Vitamin D3",
                c: "sind in der Lage, den roten Blutfarbstoff Hämoglobin herzustellen",
            },
            correctAnswer: "c",
            explanation: "Forschhende am Zentrum fur Integrative Medizin in Yokohama untersuchten 2023 " +
                "Hautproben von Menschen aus dem Oberarm und Oberschenkel auf ihre Genativitat hin. Dabei " +
                "beobachteten sie, dass in den Keratinzellen der Oberhaut und Haarfollikel solche Gene " +
                "besonders aktiv waren, die für die Hämoglobin-Produktion zuständing sind. Dass der rote " +
                "Blutfarbstoff auch in den Keratinzellen entsteht, ist neu. Bislang wurde davon ausgegangen, " +
                "dass dieser nur im Knochenmark gebildet wird. Das Hämoglobin in der Hhautschützt die Zellen " +
                "offenbar vor oxidativem Stress, insbesondere durc UV-Strahlung. Es bindet Sauerstoff und fangt " +
                "schädliche Sauerstoffradikale ein"
        }
    },
    {
        id: "2026-12-03",
        data: {
            questionText: "Wer im Besitz einer elektrischen Massagepistole ist, kann damit im Handummmdrehen ...?",
            options: {
                a: "eine Walnuss sauber in zwei HHälften teilen",
                b: "Granatapfel-Hälften entkernen",
                c: "den Dotter vom Eiweiß trennen",
            },
            correctAnswer: "b",
            explanation: "Mit einer Massagepistole kann ein Granatapfel schnell entkernt werden. Dazu einfach den " +
                "Granatapfel halbieren und mit der Schnittfläche über eine Schüssel halten. Wird nun mit der " +
                "Massagepistole von oben über die Schale gestrichen, fallen die Kerne aufgrund der Vibrationen ganz " +
                "von alleine heraus."
        }
    },
    {
        id: "2026-12-04",
        data: {
            questionText: "Bei der aus Norwegen stammenden Abfahrtsski-Technik Telemarken ...?",
            options: {
                a: "sind lediglich die Spitzen der Skischuhe durch eine Bindung fixiert",
                b: "wird auf Eis statt Schnee gefahren",
                c: "beträgt das Mindestgefälle der Piste 40 Prozent",
            },
            correctAnswer: "a",
            explanation: "Im 19. Jahrhundert praktiziert wurde. Sie ist nach der Region Telemark in Norwegen benannt, " +
                "wo sie erfunden wurde. Beim Telemarken beugen sich die Skifahrer in einer charakteristischen Pose, " +
                "bei der ein Knie tief gebegt ist und das andere Bein zurückgestreckt wird, wobei lediglich die " +
                "Spitzen der Skischuhe durch eine Bindung fixiert sind. Die Telemarken-Technik ermöglicht mehr " +
                "Bewegungsfreiheit und eine sanftere Abfahrt im Vergleich zum alpinen Skifahren."
        }
    },
    {
        id: "2026-12-05",
        data: {
            questionText: "Wieso rollte im Noovember 2023 ein ziviler Panzer durch die Döberitzer Heide bei Berlin?",
            options: {
                a: "Er übte für das weltweit einzige Panzer-Ballett in Belgien",
                b: "Er befreite den festgefahrenen Trecker eines Tannenbaumdiebs",
                c: "Er verdichtete den Boden zur Rettung von Urzeitkrebsen",
            },
            correctAnswer: "c",
            explanation: "Mit einem Gewicht von 42,5 Tonnen rollte ein ziviler Leopard-1-Panzer im November 2023 durch " +
                "das 5.000 Hektar große Gebiet der Döberitzer Heide bei Berlin. Ziel der Fahrt durch das " +
                "Naturschutzgebiet war es, die Wege des ehemaligen Truppenübungsplaätzes zu verdichten, um die " +
                "Brutplätze der heimischen Urzeitkrebse, Triops cancriformis, zu erhalten. Denn nur durch einen " +
                "verdichteten Boden können die wichtigen Pfützen entstehen, in denen sich die vom Aussterben " +
                "bedrohten Krebse vermehren können."
        }
    },
    {
        id: "2026-12-07",
        data: {
            questionText: "Mithilfe des 'arriba'-Computerprogramms können ...?",
            options: {
                a: "Hausärzte über die Notwendigkeit von Behandlungen entscheiden",
                b: "Piloten das Auftreten von Turbuulenzen berechnen",
                c: "Architekten die Deckenhöhe für eine ideale Raumakustik bestimmen",
            },
            correctAnswer: "a",
            explanation: "„arriba” ist ein von den Abteilungen für Allgemeinmedizin der Universitäten " +
                "Marburg und Rostock entwickeltes Computerprogramm für Hausarzte. Durch die Eingabe von " +
                "Patienten-Daten wie Alter, Geschlecht, Raucgewohnheiten, Blutdruck- und Cholesterinwerten " +
                "wird das individuelle Risiko, etwa für Schlaganfall oder Herzinfarkt, ermittelt und mit " +
                "Smileysanschaulich visualisiert. „arriba” unterstützt Ärzte und Patienten so beider " +
                "fundierten Entscheidungsfindung über die Notwendigkeit und Gestaltung einer Therapie."
        }
    },
    {
        id: "2026-12-08",
        data: {
            questionText: "Eine Speisezwiebel ist ausgereift und kann geerntet werden, wenn ...?",
            options: {
                a: "mindestens ein Drittel ihres Laubs abgestorben ist",
                b: "ihre Blätter öeicht nach Aceton riechen",
                c: "sie zum Stängel hin einen rosafarbenen Rand bildet",
            },
            correctAnswer: "a",
            explanation: "Ein exakter Erntezeitpunkt für Zwiebeln lässt sich nicht festlegen. Ihre Reife hängt " +
                "sowohl von der Sorte als auch von der Anbaumethode ab. Eine Zwiebel gilt aber als ausgereift " +
                "und kann geerntet werden, wenn mindestens ein Drittel des Laubs abgestorben ist. Das verwelkte " +
                "Laub zeigt an, dass die Zwiebel ihre Nährstoffe an die Knolle weitergegeben hat und somit " +
                "erntereif ist."
        }
    },
    {
        id: "2026-12-09",
        data: {
            questionText: "Laut einer Umfrage unter Kaffeetrinkern von 2023 rund 44 Prozent der Befragten ...?",
            options: {
                a: "das Kaffeetrinken bei Magenproblemen nicht einschränken",
                b: "niemals auf Haferdrinks als Milchalternative zurückgreifen",
                c: "eher auf Kulturveranstaltungen als auf Kaffee verzichten",
            },
            correctAnswer: "c",
            explanation: "Eine Gruppe aus 1.500 Teilnehmer-/innen, die mindestens einmal im Monat Kaffee konsumieren, " +
                "wurde gefragt, auf was sie eher verzichten würde. Rund 44,1 Prozent der Befragten gaben an, eher auf " +
                "Kulturveranstaltungen wie Kinobesuche oder Konzerte zu verzichten als auf ihre durchschnittlich " +
                "dreieinhalb Tassen Kaffee am Tag. Trotz steigender PReise wollen rund 70,6 Prozent der Befragten bisher " +
                "nicht beim Kaffee sparen."
        }
    },
    {
        id: "2026-12-10",
        data: {
            questionText: "Ein Weinkorken, der mit Nähnadeln gspickt wird, hilft dabei, ...?",
            options: {
                a: "ein Steak exakt auf den Punkt zu braten",
                b: "dünne Soßen in Sekundenschnelle einzudicken",
                c: "Kaffe in einer Siebträgermmaschine ausgewogen zu extrahhieren",
            },
            correctAnswer: "c",
            explanation: "Kaffee in einer Siebträgermaschine ausgewogen Zu extrahieren Das sogenannte WDT-Tool -" +
                " kurz für Weiss Distribution Technique nach seinem Erfinder Chris Weiss - wird immer beliebter " +
                "unter Hobby-Baristas. Um eine einfache Version davon selbstherzustellen, muss lediglich ein " +
                "Weinkorken mit einigen Nähnadeln gespickt werden. Damit kann das Kaffeepulver im Siebträger " +
                "gleichmäßig verteilt und von Klumpen befreit werden. So wird der Kaffee ausgewogen extrahiert " +
                "und kein Pulver verschwendet."
        }
    },
    {
        id: "2026-12-11",
        data: {
            questionText: "An welchen Stellen Tiere Musterungen im Fell bzw. in den Schuppen entwickeln, bestimmt derselbe physikalische Effekt wie beim ...?",
            options: {
                a: "Auswaschen von Schmutz aus dreckiger Kleidung",
                b: "Trocknen von Nagellack auf Fingernägeln",
                c: "Bedrucken von Papier mit einem Laserdruckstrahldrucker",
            },
            correctAnswer: "a",
            explanation: "Zebras sind gestreift, Giraffen gefleckt und tropische Fische bunt gemustert. " +
                "Forschende der University of Colorado Boulder zeigten, dass neben genetischer Veranlagung " +
                "die sogenannte Diffusiophorese zur Ausprägung der individuellen Fell- und Schuppenzeichnungen " +
                "bei Tieren führt. Derselbe physikalische Prozess greift auch beim Wäschewaschen. Zwischen " +
                "Seifenlauge und Wasser besteht ein Konzentrationsgefälle, sodass die Schmutzpartikel dorthin " +
                "wandern, wo die Seifenkonzentration geringer ist. Im Gewebe diffundieren Farbpigmente aufgrund " +
                "bestimmter Moleküle ebenfalls durch ein Konzentrationsgefälle, wo sie sich an manchen Stellen " +
                "verstärkt ansammeln, was für klar umrissene Musterungen sorgt."
        }
    },
    {
        id: "2026-12-12",
        data: {
            questionText: "Norwegen ...?",
            options: {
                a: "leigt nördlich, östlich, südlich und wewstlich von Finnland",
                b: "wächst seit 19994 jährlich um etwa fünf Quadratmeter Landfläche",
                c: "hat mehr Inseln  als Einwohner",
            },
            correctAnswer: "a",
            explanation: "Das an Schweden und Finnland grenzende Norwegen liegt nördlich und westlich von " +
                "Finnland. Tatsächlich ragt es aber auch in östlicher und südlicher Richtung über dessen " +
                "Grenzen hinaus. So liegt Norwegens südlichster Ort Mandal am 58. Breitengrad, während " +
                "Finnland mit der Stadt Hanko an den 60. Breitengrad heranreicht."
        }
    },
    {
        id: "2026-12-14",
        data: {
            questionText: "Was macht die Parfümart 'Eau de Solide' aus?",
            options: {
                a: "Sie darf nur im französischen Grasse hergestellt werden",
                b: "Sie hat nur sehr geringen Duftkonzentration",
                c: "Sie wird nur in durchsichhtigen Flaschen abgefüllt",
            },
            correctAnswer: "b",
            explanation: "Neben den bekannten Konzentrationsstufen „Parfum“, „Eau de Parfum“, " +
                "„Eau de Toilette“ und „Eau de Cologne“ existiert im Bereich der Duftarten noch das " +
                "sogenannte Eau de Solide, auch „Eau Fraiche“ oder „Splash Cologne“ genannt. Mit einem " +
                "Duftstoffanteil von nur 1 bis 3 Prozent hat die Parfumart die geringste Duftkonzentration " +
                "und behält daher ihre Wirkung nur bis zu 2 Stunden. „Eau de Solide“ riecht wesentlich zarter " +
                "als die konzentrierten Parfum-Varianten und ist vor allem in warmen Sommermonaten beliebt."
        }
    },
    {
        id: "2026-12-15",
        data: {
            questionText: "Eine Termmitenkönigin ...?",
            options: {
                a: "wird in der Regel jedes Jahr von einer neuen Königin ersetzt",
                b: "ernährt sich mitunter von Termiten, die sich sselbst opfern",
                c: "legt etwa alle 3 Sekunden ein Ei",
            },
            correctAnswer: "c",
            explanation: "Termiten leben in staatenbildenden Kolonien, an deren Spitze die Termitenkönigin " +
                "steht. Obwohl die Königin meist vollständig bewegungsunfähig ist, kann sie bis zu 20 Jahre " +
                "alt werden und sichert den Fortbestand ihrer Kolonie. Ihre Bewegungsunfähigkeit resultiert " +
                "aus einem stark angeschwollenen Hinterleib, in dem sich vergrößerte Eierstöcke befinden. Ihr " +
                "Volumen ermöglicht es der Termitenkönigin, bis zu 20.000 Eier täglich zu produzieren. So " +
                "legt sie etwa alle drei Sekunden ein Ei."

        }
    },
    {
        id: "2026-12-16",
        data: {
            questionText: "Beim Wohntrend 'Colour Drenching' werden Räume ...?",
            options: {
                a: "immer nur in zwei Komplementäärfarben dekoriert",
                b: "mit bunten Ornamenten anstatt mit Bildern verziert",
                c: "und darin befindliche Objekte im selben Farbton gestrichen",
            },
            correctAnswer: "c",
            explanation: "„Colour Drenching“ heißt so viel wie „in Farbe tränken“: Bei diesem aus " +
                "Großbritannien stammenden Wohn-Trend werden nicht nur die Wände, sondern weitere Objekte in " +
                "einem Raum oder Zimmerbereich im selben Farbton gestrichen. Dadurch wirken kleine Räume " +
                "größer. Werden also Bodenleisten im selben Ton wie die Wand gestrichen, entsteht gerade in " +
                "kleinen Räumen die Illusion, dass diese höher sind. Ein weiterer Nebeneffekt ist das optische " +
                "Verschwinden von ungeliebten Objekten wie Heizkörpern oder prominenten Einbauschränken."

        }
    },
    {
        id: "2026-12-17",
        data: {
            questionText: "Welcher trick kann angewendet werden, wenn während eines Tauchgangs Wasser in die Tauchmaske gerät?",
            options: {
                a: "in Rückenlage begeben und die Maske nach vorne ziehen",
                b: "oben auf den Maskenrand drücken und per Nase ausatmen",
                c: "Hände an den seitlichen Maskenrand legen und zur Mitte drücken",
            },
            correctAnswer: "b",
            explanation: "Dringt während eines Tauchgangs Wasser in die Tauchmaske, können Taucherinnen und " +
                "Taucher auf einen Trick zurückgreifen. Beim sogenannten Maske-Ausblasen wird mit zwei " +
                "Fingern der obere Maskenrand leicht angedrückt. Dann über die Nase ausatmen und dabei den " +
                "Kopf in den Nacken legen. Die einströmende Luft sammelt sich oben und drückt das Wasser nach " +
                "unten aus der Maske heraus, ohne dass dabei neues Wasser hineingerät."

        }
    },
    {
        id: "2026-12-18",
        data: {
            questionText: "Im Unterschied zurr Heißverseifung muss Seife, die im Kaltrührverfahren hergestellt wird, ...?",
            options: {
                a: "Abstand zu anderen Seifen haben, um Verformungen zu verhindern",
                b: "vor der  Verwendung noch sehs bis acht Wochen reifen",
                c: "deutlichh schneller und doppelt so lange gerührt werden",
            },
            correctAnswer: "b",
            explanation: "Seife kann entweder im Kalt- oder Heißrührverfahren gewonnen werden. Bei Letzterem " +
                "werden Fette oder Öle mit Natronlauge unter Hitze vermischt und gekocht. Diese Hitze " +
                "beschleunigt die Verseifung, wodurch die Seife nach einer Reifezeit von etwa 2 bis 4 Wochen " +
                "verwendet werden kann. Beim Kaltrührverfahren wird die Mischung nicht oder nur leicht " +
                "erhitzt und in Formen gegossen. Da sie nicht gekocht wird, muss sie sechs bis acht Wochen " +
                "lang reifen und aushärten. Vorteil des Kaltrührverfahrens ist die Erhaltung empfindlicher " +
                "Inhaltstoffe wie etwa ätherische Öle, weshalb die Seife als qualitativ hochwertiger gilt."

        }
    },
    {
        id: "2026-12-19",
        data: {
            questionText: "Warum werden die Winterschulferien in Österreich auch 'Energieferien' genannt?",
            options: {
                a: "Danach finden wichtige und arbeitsintensive Schulprüfungen statt.",
                b: "Sie wurden 174 eingeführt, um Heizöl einzusparen",
                c: "ZUr AUstreibung böser Wintergeister wurde im Wald Holz gesammelt",
            },
            correctAnswer: "b",
            explanation: "Sie wurden 1974 eingeführt, um Heizöl einzusparen. " +
                "Im Februar können sich Schülerinnen und Schüler in Österreich über die " +
                "sogenannten Energieferien freuen. Sie wurden ursprünglich als Reaktion " +
                "auf die Ölpreiskrise von 1973 eingeführt. Mit sechs unterrichtsfreien Tagen " +
                "im Februar 1974 sollte Heizöl in den Schulen gespart werden. Tatsächlich war der Effekt kaum " +
                "spürbar, aber eine freie Woche, heute offiziell Semesterferien genannt, blieb."

        }
    },
    {
        id: "2026-12-21",
        data: {
            questionText: "Das Lied „You'll Be in My Heart“ aus dem zeichentrickfilm „Tarzan“ von 1999 ...?",
            options: {
                a: "wurde von Phil Collins in fünf Sprachen eingesungen",
                b: "wird bevorzugt bei der Kalibibrierung von Im-Ohr-Hörgeräten verwendet",
                c: "hält sich seit 25 Jahren in den Top 50 der japansichen Charts",
            },
            correctAnswer: "a",
            explanation: "Ursprünglich wurde Phil Collins als Songwriter für den Zeichentrickfilm „Tarzan“ " +
                "engagiert, weil er als Schlagzeuger der Band „Genesis“ geeignet schien, die Handlung im " +
                "Regenwald mit einem kraftvollen Beat zu unterlegen. Letztlich wichen die Macher des Films " +
                "jedoch davon ab, die Charaktere selbst singen zu lassen und Phil Collins sang einen Großteil " +
                "der Filmmusik in gleich fünf verschiedenen Sprachen ein. Darunter auch den Hit " +
                "„You’ll be in my heart“ im englischen Original, auf Deutsch, Französisch, Italienisch und Spanisch."

        }
    },
    {
        id: "2026-12-22",
        data: {
            questionText: "Junge Wallace-Flgfräsche ...?",
            options: {
                a: "nutzen Blätter, um auf dem Wasser zu gleiten",
                b: "sammeln Schlangenhaut, um Sonnenbrände zu vermeiden",
                c: "sehen getarnt aus wie Kothaufen, um unappetitlich zu wirken",
            },
            correctAnswer: "c",
            explanation: "Der Wallace-Flugfrosch lebt in den Regenwäldern Ostasiens und kann dank seiner " +
                "Häute zwischen den Zehen und Fortsätzen an Armen und Beinen rund 16 Meter weit fliegen. " +
                "Eine Studie von 2023 des Tiergartens Schönbrunn in Wien zeigt, dass sich junge Flugfrösche " +
                "mit einer roten Färbung und vielen weißen Punkten vermutlich als Kothaufen tarnen, um nicht " +
                "von Fressfeinden verzehrt zu werden. Damit beabsichtigen sie, zwar gesehen zu werden, " +
                "aber besonders unappetitlich zu wirken."

        }
    },
    {
        id: "2026-12-23",
        data: {
            questionText: "Ursprünglich wurde transparenter Lipgloss ...?",
            options: {
                a: "beim Synchhronschwimmen als Haargel verwendet",
                b: "für das Make-Up in Schwarz-Weiß-Filmen erfunden",
                c: "als Mittel zur Sichtbarmamchung von Fingerabdrücken entwickelt",
            },
            correctAnswer: "b",
            explanation: "Die Zeiten des Schwarz-Weiß-Films Anfang des 20. Jahrhunderts stellten eine große " +
                "Herausforderung für die Filmindustrie dar. Nicht alle Farben ließen sich gut in Schwarz-Weiß " +
                "abbilden. Das war auch ein Problem für Maskenbildner. Viele der damals verfügbaren " +
                "Lippenprodukte wirkten zu matt oder dunkel. Der polnisch-amerikanische Star-Maskenbildner " +
                "Maksymilian Faktorowicz erfand 1928 den Lipgloss ursprünglich als transparent-glänzende " +
                "Lippenpomade, die sich bestens für Schwarz-Weiß-Filme eignete."

        }
    },
    {
        id: "2026-12-24",
        data: {
            questionText: "Um alle Kinder rechtzeitig zu ebschenken, müsste der Weihnachtsmann theoretisch mit 1.040 km/s fliegen, sodass die vorderen Rentiere ...?",
            options: {
                a: "von der Erde aus betrachtet wie fleiscfarbene Fäden aussehen würden",
                b: "so viel Auftrieb bekämen, dass sie direkt ins All schießen würden",
                c: "sofort in Flammen aufgehen und verglühenwürden",
            },
            correctAnswer: "c",
            explanation: "Wie könnte der Weihnachtsmann an Weihnachten alle Geschenke rechtzeitig " +
                "ausliefern? Als Grundlage werden 91,8 Millionen Haushalte genommen, in " +
                "denen mindestens ein Kind lebt, das an den Weihnachtsmann glaubt. Auf seiner Reise von Ost " +
                "nach West hätte der Weihnachtsmann durch die verschiedenen Zeitzonen 31 Stunden Zeit, um " +
                "120,8 Millionen Kilometer zurückzulegen und 822,6 Kinder pro Sekunde zu besuchen. Dabei wäre " +
                "er mit einer Geschwindigkeit von 1.040 Kilometern pro Sekunde unterwegs, also mit " +
                "3.000-facher Schallgeschwindigkeit und hätte 378.000 Tonnen Geschenke dabei. Der " +
                "Luftwiderstand wäre vergleichbar mit einem Raumschiff, das wieder in die Erdatmosphäre " +
                "eintritt. Die vorderen Rentiere würden sofort in " +
                "Flammen aufgehen und verglühen, die nachfolgenden kurz darauf."

        }
    },
    {
        id: "2026-12-25",
        data: {
            questionText: "Was machte der florenttinische Herrscher Piero de' Medici, als es 1494 in FLorenz überraschenderweise anfign zu schneien?",
            options: {
                a: "Er verpasste Papst Alexander VI. ein Veilchen mit einem Schneeball",
                b: "Er verließ aus Angst vor nassen Füßen 28 Tage lang nciht das Haus",
                c: "Er beauftragte Michelangelo, einen Schneemann zu bauen",
            },
            correctAnswer: "c",
            explanation: "Der Winter Anfang des Jahres 1494 war für die italienische Stadt Florenz " +
                "ungewöhnlich kalt. Im Januar zog sogar ein unerwarteter Schneesturm auf, " +
                "der die Stadt mit weißen Schneemassen bedeckte. Der damalige florentinische Herrscher " +
                "Piero de’ Medici hatte daraufhin einen Einfall. Er beauftragte den jungen aufstrebenden " +
                "Künstler Michelangelo, in dem schneebedeckten Hof der Medici-Familie einen Schneemann zu " +
                "bauen. Die als wunderschön beschriebene Schneeskulptur Michelangelos schmolz allerdings " +
                "nach nur wenigen Tagen wieder."
        }
    },
    {
        id: "2026-12-26",
        data: {
            questionText: "Die Bezeichnung „Muggles“ für Menschen ohne Zauberkräfte leitete die „Harry Potter“-Autorin J.K. Rowling ab von ...?",
            options: {
                a: "ihrem leichtgläubigen Physiklehrer Edword Muggleton",
                b: "ihrer Sammelleidenschaft für Kaffeetassen",
                c: "der umgangssprachlichen Bezeichnung „mug“ für Trottel",
            },
            correctAnswer: "c",
            explanation: "„Muggles“, die im Deutschen „Muggel“ heißen, sind in der Welt von Harry Potter " +
                "Menschen, die keinerlei Zauberkräfte besitzen und von der Existenz einer Zaubererwelt im " +
                "Normalfall nichts wissen. Zwar existiert das Wort mit verschiedenen Bedeutungen seit dem " +
                "13. Jahrhundert, doch die Autorin J.K. Rowling erklärte in einem Interview, dass sie die " +
                "Bezeichnung vom englischen Begriff „mug“ abgeleitet hat. Ein „mug” ist ein Trottel, " +
                "der zwar dumm ist, aber dabei trotzdem auf seine Art liebenswürdig. Die Endung wählte " +
                "Rowling, um das Wort weicher klingen zu lassen."
        }
    },
    {
        id: "2026-12-28",
        data: {
            questionText: "Marine Hitzewellen ...?",
            options: {
                a: "führen zu einer zunehmenden Übersäuerung der Binnenmeere",
                b: "kommen nur in tropischen Gebieten vor",
                c: "sind in der Tiefe intensiver und länger als an der Wasseroberfläche",
            },
            correctAnswer: "c",
            explanation: "Die Wissenschaft spricht von sogenannten marinen Hitzewellen, wenn die " +
                "Wassertemperaturen an fünf aufeinanderfolgenden Tagen 90 Prozent der Messwerte des " +
                "30-jährigen Vergleichszeitraums übertreffen. Eine Studie von 2023 der Universität von Faro " +
                "wertete erstmalig Temperaturdaten der Jahre 1993 bis 2021 bis zu einer Tiefe von 2.000 " +
                "Metern aus und kombinierte sie mit Daten zur Artenvielfalt. Dabei stellte das Team fest, " +
                "dass marine Hitzewellen in 50 bis 200 Metern Tiefe intensiver und länger andauern als an der " +
                "Oberfläche. Laut Forschenden sind Organismen in dieser Tiefe demnach vermehrt bedroht, " +
                "da durch den Klimawandel Phasen mit anhaltend hohen Temperaturen zunehmen."

        }
    },
    {
        id: "2026-12-29",
        data: {
            questionText: "Welche Folge hat der Klimawandel für die in Argentinien lebenden Riesen-Kielschhwanzleguane?",
            options: {
                a: "Sie sind weniger anspruchsvoll in ihrer Partnerwahl",
                b: "Sie halten einen Sommerschlaf",
                c: "Sie regulieren ihre Körpertemperatur über ihre Zunge",
            },
            correctAnswer: "a",
            explanation: "Wechselwarme Reptilien wie die argentinischen Riesen-Kielschwanzleguane regulieren ihre " +
                "Körpertemperatur über die Umgebungstemperatur. Ideal sind 33 Grad Celsius. Forschende der " +
                "Universität Córdoba beschrieben in einer Studie von 2023, dass die Leguane bereits bei wenigen Grad " +
                "mehr längere Zeit Unterschlupf suchten und so weniger Kontakt zu Artgenossen hatten. Um der Hitze " +
                "schneller zu entkommen, wurden sie zudem weniger anspruchsvoll in ihrer Partnerwahl, die sich " +
                "sonst stärker an Körpergewicht und Farbe orientierte. Steigende Temperaturen infolge des " +
                "Klimawandels könnten so zu einer eher zufälligen Partnerwahl führen."

        }
    },
    {
        id: "2026-12-30",
        data: {
            questionText: "Dürfen Blindenhunde blinde Personen in Arztpraxen, Restaurants oder Supermärkte begleiten, wenn dort Hundeverbot herrscht?",
            options: {
                a: "Nur, wenn die blinde Person ohne menschliche Begleitung erscheint",
                b: "Nein, die jeweilige Einrichtung kann das verbieten und durchsetzen",
                c: "Ja, denn sie gelten rechtlich als medizinisches Hilfsmittel",
            },
            correctAnswer: "c",
            explanation: "In manchen Geschäften oder Gaststätten herrscht ein Hundeverbot. Die Inhaber " +
                "machen dann von ihrem Hausrecht Gebrauch. Ist ein Mensch allerdings auf einen " +
                "Blindenführerhund angewiesen, darf der Vierbeiner mit den Laden betreten. Laut Paragraf 33 " +
                "des Sozialgesetzbuchs gilt ein Blindenhund als medizinisches Hilfsmittel, vergleichbar mit " +
                "einem Rollstuhl. Ein Verbot wäre ein Verstoß gegen das Allgemeine Gleichbehandlungsgesetz."

        }
    },
    {
        id: "2026-12-31",
        data: {
            questionText: "Für die Aufzeichnung des Sketches „Dinner for One“ 1963 in Hamburg bestand Hauptdarsteller Freddie Frinton darauf, ...?",
            options: {
                a: "May Warden alias Miss Sophie am Schluss nach oben zu begleiten",
                b: "verdünnten Gin aus allen Gläsern zu trinken",
                c: "sein mitgebrachtes Tigerfell statt eines Eisbärenfells zu benutzen",
            },
            correctAnswer: "c",
            explanation: "Bereits viele Jahre vor den Fernsehaufzeichnungen 1963 führten Freddie Frinton und " +
                "May Warden „Dinner for One“ in britischen Theatern auf. Als es dann auch im Hamburger " +
                "NDR-Studio hieß: „Good evening, Miss Sophie.“ „Good evening, James. — You may now serve " +
                "the soup“, hatte Frinton seine Rolle als Butler James fest verinnerlicht. Um vor der Kamera " +
                "ganze elf Mal gekonnt zwischen Esstisch und Anrichte zu stolpern, bestand er darauf, " +
                "sein mitgebrachtes Tigerfell als Requisite zu benutzen, statt eines unvertrauten " +
                "Eisbärenfells der NDR-Bühnenausstattung."

        }
    },
    {
        "id": "2025-12-24",
        "data": {
            "questionText": "Warum schmücken Menschen in der Ukraine ihre Weihnachtsbäume traditionell oft mit künstlichen Spinnweben?",
            "options": {
                "a": "Um böse Geister zu fangen, die die Geschenke stehlen wollen",
                "b": "Weil einer Legende nach eine Spinne den Baum einer armen Witwe über Nacht festlich dekorierte",
                "c": "Als Symbol für das Netz der Verwandtschaft, das die Familie an Weihnachten zusammenhält"
            },
            "correctAnswer": "b",
            "explanation": "Dieser Brauch geht auf die 'Legende der Weihnachtsspinne' zurück. Eine arme Witwe konnte sich keinen Schmuck für ihren Baum leisten. Als sie am Weihnachtsmorgen erwachte, hatte eine Spinne ihr Netz über den Baum gewoben, das sich (je nach Version der Geschichte) in Gold und Silber verwandelte. Deshalb gelten Spinnennetze oder spinnenförmiger Schmuck am Baum in der Ukraine als Glücksbringer."
        }
    },
    {
        "id": "2025-12-25",
        "data": {
            "questionText": "Was meldeten die Astronauten der Gemini-6-Mission im Dezember 1965 der Bodenstation, bevor sie überraschend 'Jingle Bells' auf einer Mundharmonika spielten?",
            "options": {
                "a": "Ein unbekanntes Flugobjekt auf einer polaren Umlaufbahn (den Weihnachtsmann)",
                "b": "Einen kritischen Ausfall der Sauerstoffversorgung",
                "c": "Dass sie vergessen hatten, die Geschenke einzupacken"
            },
            "correctAnswer": "a",
            "explanation": "Die Astronauten Walter Schirra und Thomas Stafford erlaubten sich einen Scherz und meldeten ein 'Objekt, das wie ein Satellit aussieht und von Norden nach Süden fliegt', gefolgt von einem Piloten in einem 'roten Anzug'. Daraufhin holten sie eine heimlich an Bord geschmuggelte Mundharmonika und Glöckchen hervor und spielten 'Jingle Bells'. Es war das erste Lied, das jemals im Weltraum gespielt wurde."
        }
    },
    {
        "id": "2025-12-26",
        "data": {
            "questionText": "Welche bemerkenswerte körperliche Veränderung durchlaufen Rentiere, um sich an die extrem dunklen arktischen Winter anzupassen?",
            "options": {
                "a": "Ihr Geweih wird hohl, um Töne besser zu leiten",
                "b": "Sie wachsen fast doppelt so viel Fell an den Hufen",
                "c": "Ihre Augenfarbe wechselt von Goldgelb zu Dunkelblau"
            },
            "correctAnswer": "c",
            "explanation": "Rentiere sind die einzigen Säugetiere, deren Augenfarbe sich saisonal ändert. Im Sommer ist das Tapetum lucidum (die reflektierende Schicht hinter der Netzhaut) goldgelb, um das Dauerlicht der Arktis zu reflektieren. Im dunklen Winter ändert sich die Struktur durch den Augeninnendruck, und die Augen erscheinen tiefblau. Dies erhöht die Lichtempfindlichkeit drastisch und hilft ihnen, Fressfeinde im Dunkeln besser zu erkennen."
        }
    },
    {
        "id": "2025-12-22",
        "data": {
            "questionText": "A?",
            "options": {
                "a": "a",
                "b": "b",
                "c": "n"
            },
            "correctAnswer": "c",
            "explanation": "Rentiere sind die einzigen Säugetiere, deren Augenfarbe sich saisonal ändert. Im Sommer ist das Tapetum lucidum (die reflektierende Schicht hinter der Netzhaut) goldgelb, um das Dauerlicht der Arktis zu reflektieren. Im dunklen Winter ändert sich die Struktur durch den Augeninnendruck, und die Augen erscheinen tiefblau. Dies erhöht die Lichtempfindlichkeit drastisch und hilft ihnen, Fressfeinde im Dunkeln besser zu erkennen."
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