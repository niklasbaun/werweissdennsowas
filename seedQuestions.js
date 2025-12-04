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
        id: "2026-05-01", // Make sure this matches today's date if you want to test now!
        data: {
            questionText: "Welche Fahrzeugsinformation ist Teil jedes britischen Kfz-Kennzeichens?",
            options: {
                a: "Art des Kraftstoffs",
                b: "Zeitraum der Erstzulassung",
                c: "Geburtsort des Fahrzeughalters",
            },
            correctAnswer: "b",
            explanation: "Das derzeitige Format britischer Kfz-Kennzeichen besteht seit September 2001. Dabei geben die ersten " +
                "beiden Buchstaben das Erstzulassungsgebiet des Wagens an. Die hinteren drei Buchstaben dienen der Unterscheidung " +
                "und werden fortlaufend vergeben. Die mittleren Ziffern stellen einen Code dar, der für einen halbjährigen Zeitraum " +
                "der Erstzulassung steht. Die Zeiträume September bis Februar sowie März bis August werden fortlaufend einem " +
                "Code zugeordnet und können anhand einer Tabelle abgelesen werden."
        }
    },
    {
        id: "2026-05-02",
        data: {
            questionText: "Als Forscher mehrere Haarlocken Ludwig van Beethovens im März 2023 untersuchten, fanden sie heraus, dass ...?",
            options: {
                a: "eine genetische verbindung zu Vincent van Gogh besteht",
                b: "er keinen vollständigen Hörverlust erlitten haben kann",
                c: "er genetisch kein van Beethoven ist",
            },
            correctAnswer: "c",
            explanation: "Ein internationales Forschungsteam unter der Leitung der University of Cambridge entschlüsselte " +
                "im März 2023 das Genom Ludwig van Beethovens. Dabei fanden sie mithilfe einer Genanalyse von fünf Haarlocken heraus, " +
                "dass er biologisch offenbar nicht von der Familie van Beethoven abstammt. Das Erbgut passt nicht zu seinen bisher " +
                "kolportierten Vorfahren aus dem belgischen Mechelen. In väterlicher Linie muss also mindestens ein Sohn " +
                "außerehelich entstanden sein, wodurch es keine direkte Verwandtschaftslinie nach Belgien gibt."
        }
    },
    {
        id: "2026-05-04",
        data: {
            questionText: "'GAGA Hühnerhof AG' ...?",
            options: {
                a: "simuliert die Existenz landwirtschaftlicher Betrieb auf dem Mars",
                b: "ist im Matheunterricht eine Eselsbrücke zur Winkelbestimmung",
                c: "war der Arbeitstitel der 'Schulmädchen-Report' Filmreihe",
            },
            correctAnswer: "b",
            explanation: "Die „GAGA HühnerHof AG“ ist keine Arbeitsgemeinschaft auf einem Bauernhof. Vielmehr können " +
                "Schülerinnen und Schüler diesem Begriff im Matheunterricht begegnen. Es handelt sich um eine Eselsbrücke für " +
                "trigonometrische Formeln zur Winkelbestimmung in einem rechtwinkligen Dreieck. Bestandteile der Formeln sind die " +
                "drei Seiten des Dreiecks Gegenkathete, Ankathete und Hypotenuse. Die Buchstaben „GAGA‘, die zwei Hs " +
                "„HühnerHof“ und „AG“ werden in zwei Zeilen unterhalb der vier Funktionen geschrieben und die benötigte Formel kann abgelesen werden."
        }
    },
    {
        id: "2026-05-05",
        data: {
            questionText: "Die winzigen Flimmerhärchen der Steinkoralle ...?",
            options: {
                a: "schützen die Korallen vor schädlichen Sauerstoffkonzentrationen",
                b: "werden täglich neu gebildet, weil sie von Algen abgerieben werden",
                c: "scheiden Kalk ab und bilden so Riffe",
            },
            correctAnswer: "a",
            explanation: "Bei steigenden Wassertemperaturen stoßen Korallen die für ihre Färbung sorgenden symbiotischen " +
                "Algen ab und bleichen aus. Denn die Algen bilden dann hohe, für die Nesseltiere schädliche Sauerstoffkonzentrationen." +
                " Doch nicht alle Korallenarten sind davon gleich stark betroffen. Eine internationale Untersuchung der " +
                "Steinkorallenart Porites lutea von 2022 ergab, dass sie durch das Schlagen ihrer Flimmerhärchen kleine Wirbel " +
                "im Wasser erzeugt, die das sauerstoffreiche Wasser wegtransportieren. So können Steinkorallen die " +
                "Sauerstoffbelastung in ihrer Umgebung etwa um die Hälfte reduzieren."
        }
    },
    {
        id: "2026-05-06",
        data: {
            questionText: "Gut jedes zehnte Paar in Deutschland zwischen 18 und 69 Jahren ...?",
            options: {
                a: "schläft in getrennten Zimmern",
                b: "war vor der Beziehung bereits befreundet",
                c: "hat sich über das Internet oder eine Dating-App kennengelernt",
            },
            correctAnswer: "a",
            explanation: "Einer repräsentativen Online-Befragung in Deutschland von 2023 zufolge haben rund 24 Prozent und " +
                "damit knapp ein Viertel der teilnehmenden Paare den Partner über das Internet oder eine Dating-App gefunden. " +
                "Mit 22 Prozent war mehr als jedes fünfte Paar vor der Beziehung bereits befreundet. Laut einer Online-Studie " +
                "im Auftrag einer Partnervermittlung von 2023 geht mit knapp elf Prozent gut jedes zehnte Paar nächtlichen " +
                "Störfaktoren aus dem Weg und schläft in getrennten Zimmern. Bei Paaren unter 30 sind es fünf Prozent und " +
                "bei Paaren über 50 Jahren 15 Prozent."
        }
    },
    {
        id: "2026-05-07",
        data: {
            questionText: "Um unschöne Ränder und Ablagerungen aus Blumenvasen zu entferenen,eignen sich Wasser und ...?",
            options: {
                a: "ein paar Tropfen Rum-Aroma",
                b: "Eierschalen",
                c: "Gelatine",
            },
            correctAnswer: "b",
            explanation: "Stehen Schnittblumen einige Tage In der Vase, können sich unschöne Ränder und Ablagerungen bilden. " +
                "Diese lassen sich mithilfe eines Hausmittels unkompliziert entfernen, Dafür wird die Vase zu etwa zwei Dritteln " +
                "mit Wasser und zu etwa einem Drittel mit zerbrochenen Eierschalen befüllt und geschüttelt. Im Anschluss können " +
                "die Eierschalen entsorgt und die Vase ausgespült werden. Die Ablagerungen haben sich gelöst und die Vase sicht " +
                "wieder sauber aus."
        }
    },
    {
        id: "2026-05-08",
        data: {
            questionText: "WErden Seifenblasen mit reinem Sauerstoff gefüllt, so ...?",
            options: {
                a: "steigen sie senkrecht nach oben wie Heliumballons",
                b: "können sie von einem Magneten angezogen werden",
                c: "sind sie 10-mal widerstandsfähiger als mit normaler Atemluft",
            },
            correctAnswer: "b",
            explanation: "Sauerstoff ist paramagnetisch, das bedeutet, dass er ohne äußeres Magnetfeld keine messbare " +
                "magnetische Ordnung zeigt. Wird er jedoch einem äußeren Magnetfeld ausgesetzt, so wird er von diesem angezogen. " +
                "Diese Eigenschaft kann mit Hilfe von Seifenblasen sichtbar gemacht werden: Werden diese mit reinem Sauerstoff " +
                "gefüllt, so können die entstandenen Blasen mit einem starken Magneten angezogen werden."
        }
    },
    {
        id: "2026-05-09",
        data: {
            questionText: "Ranzige Butter bei den Mahlzeiten der Harvard University führte 1766 zur ...?",
            options: {
                a: "ersten Studentenrevolte auf einem amerikanischen Campus",
                b: "Gründung einer universitätseigenen Käserei, die bis heute besteht",
                c: "Erfindung der Konservendose",
            },
            correctAnswer: "a",
            explanation: "Mit Beginn der amerikanischen Revolution 1763 nahm die Qualität von Lebensmitteln auf dem Campus der " +
                "Harvard University rapide ab. Ein Abendessen mit ranziger Butter veranlasste schließlich im September 1766 " +
                "den Studenten Asa Dunbar dazu, in der Mensa auf seinen Stuhl zu steigen und bessere Butter zu fordern. Schnell " +
                "schlossen sich weitere Studenten dem Protest an. Die 'Butter Rebellion' hielt mehrere Wochen an und gipfelte " +
                "in der Suspendierung von mehr als der Hälfte der Studentenschaft. Die erste Studentenrevolte auf einem " +
                "amerikanischen Campus endete erst, als der Aufsichtsrat der Universität eingriff, die ranzige Butter ersetzte " +
                "und die Suspendierungen aufhob."
        }
    },
    {
        id: "2026-05-11",
        data: {
            questionText: "Was testete die UNESCO-Welterberegion Hallstatt in Österreich 2023 an einem See, um Selfie-Fotografien zu reduzieren?",
            options: {
                a: "Ansiedlung und Pflege von Stechmücken am Seeufer",
                b: "kostenlose Selfie-Fotobox mit dem See als Hintergrundmotiv",
                c: "Sichtschutzzaun am belibtesten Aussichtspunkt",
            },
            correctAnswer: "c",
            explanation: "ie malerische Kulisse der UNESCO-Welterberegion Hallstatt zieht jährlich etwa eine Million Besuchende und damit " +
                "ähnlich viele Selfie-Fotografierende an. Um auf den Andrang am beliebtesten Aussichtspunkt zu reagieren und ihn zu " +
                "reduzieren, testete die Gemeinde am Ufer des Hallstätter Sees einen kurzen Holzzaun als Sichtschutz. Auf ganzer Uferlänge " +
                "aufgebaut, planten die Zuständigen, jede zweite Latte aus dem Zaun zu entfernen. Touristen hätten durch die schmale Lücke " +
                "ein Bild vom See, davor aber kein ordentliches Selfie von sich schießen können. Auf Protest der Anwohnenden hin wurde " +
                "der Zaun aber nach kurzer Zeit wieder abgebaut."
        }
    },
    {
        id: "2026-05-12",
        data: {
            questionText: "Die Chilipflanze Tabasco wurde nach dem gleichnamigen mexikanischen Bundesstaat benannt und ...?",
            options: {
                a: "wird dort Gouverneuren zur Amtseinführung feierlich überreicht",
                b: "wurde bis ins 20.Jh. zur Behandlung von Schürfwunden verwendet",
                c: "heißt übersetzt 'Land in dem die Erde heiß und feucht ist'",
            },
            correctAnswer: "c",
            explanation: "Tabasco ist eine Chili-Sorte der Art Capsicum frutescens und ist durch die gleichnamige Soße weltberühmt. " +
                "Tabasco ist aber auch der Narne eines Bundestaats in Mexiko, wo die Sorte bereits im 19. Jahrhundert gezüchtet " +
                "wurde, und bedeutet übersetzt aus der Sprache der indigenen Bevölkerung so viel wie 'Land, in dem die Erde heiß " +
                "und feucht ist'. Weil die Chilipflanze Tabasco genau diese Eigenschaften für ein gutes Wachstum braucht, erhielt " +
                "sie diesen Namen."
        }
    },
    {
        id: "2026-05-13",
        data: {
            questionText: "Wer sein Gedächtnis- und Konzentrationsleistung für den nächsten Tag steigern möchte, sollte beim nächtlichen Schlaf ...?",
            options: {
                a: "auf der rechten Seite liegen",
                b: "eine Schlafmaske benutzen",
                c: "für eine hohe Luftfeuchtigkeit im Raum sorgen",
            },
            correctAnswer: "b",
            explanation: "Störende Lichteinflüsse, wie zum Beispiel vorbeifahrende Autos oder Mondlicht, beeinflussen die Schlafqualität " +
                "auch auf der Gedächtnis-Ebene. Das konnten Forschende aus Cardiff Anfang 2023 anhand der signifikante Auswirkungen " +
                "durch das Benutzen von Schlafmasken nachweisen. Indem störendes Licht dauerhaft ausgeblendet wurde, verbesserte sich der " +
                "Rhythmus und die Schlafstruktur der Probanden bereits nach einer Woche. Da sie mehr Zeit im Tiefschlaf verbrachten, " +
                "fühlten sie sich tagsüber wacher, reagierten schneller und konnten eine bessere Gedächtnis- und " +
                "Konzentrationsleistung abrufen."
        }
    },
    {
        id: "2026-05-14",
        data: {
            questionText: "Ein herkömmlicher Kleiderbügel mit Hosenhalter kann dabei helfen, ...?",
            options: {
                a: "gekräuseltes Geschenkband wieder zu glätten",
                b: "einen aufgeblasenen Luftballon zuzuknoten",
                c: "verstreutes Konfetti schnell aufzusammeln",
            },
            correctAnswer: "b",
            explanation: "Das Zuknoten eines aufgeblasenen Ballons ist für viele eine schier unmögliche Aufgabe. Helfen kann dabei ein " +
                "herkömmlicher Kleiderbügel mit Hosenhalter. Einfach das Ballonventil über die obere und untere Stange des Bügels " +
                "ziehen und den so größer werdenden Spalt nutzen, um den Knoten zu verschließen."
        }
    },
    {
        id: "2026-05-15",
        data: {
            questionText: "Nachdem die Studentin Jocelyn Bell Burnell 1967 den ersten rotierenden Neutronenstern entdeckt hatte, ...?",
            options: {
                a: "wurde der Missionsplan von Apollp 11 grundlegend geändert",
                b: "erhielt ihr Doktorvater für ihre Leistung den Nobelpreis",
                c: "gelang es ihr, erstmal einen Laserstrahl zu erzeugen",
            },
            correctAnswer: "b",
            explanation: "„Die Britin Jocelyn Bell Burnell zog 1965 nach Cambridge, um dort am Institut für Radioastronomie zu " +
                "promovieren. 1967 begann sie, Daten aus dem All mit einem von ihr aufgebauten Radioteleskop zu sammeln. Dabei " +
                "registrierte sie ein Objekt, das alle 1,3 Sekunden einen Impuls abgab und sich später als der erste entdeckte " +
                "rotierende Neutronenstern, auch Pulsar genannt, entpuppte. Die Entdeckung führte 1974 zur Verleihung des Nobelpreises " +
                "für Physik, den allerdings ihr Doktorvater Antony Hewish 'für seine entscheidende Rolle bei der Entdeckung der " +
                "Pulsare' erhielt und die später sehr erfolgreiche Bell Burnell in keiner Form würdigte."

        }
    },
    {
        id: "2026-05-16",
        data: {
            questionText: "Warum wurde am Set des Films 'GoodFellas' nach dem Dreh bestimmter Szenen 'keine Bewegung!' gerufen?",
            options: {
                a: "Ray Liotta und Joe Pesci trugen Goldketten, die Al Capone gehörten",
                b: "Die Kamera sollte die erschrockenen Gesichter des Casts einfangen",
                c: "Robert de Niro nutzte private Geldscheine des Requisiteurs",
            },
            correctAnswer: "c",
            explanation: "Das Drama „GoodFellas — Drei Jahrzehnte in der Mafia“ des Regisseurs Martin Scorsese erschien im Jahr 1990." +
                " Gedreht wurde es im Jahr zuvor unter anderem im New Yorker Stadtteil Queens sowie auf Long Island. Nach dem " +
                "Dreh bestimmter Szenen musste der Requisiteur Robert Griffon 'Keine Bewegung!' rufen. Dies war nötig, damit er " +
                "die Geldscheine, die Schauspieler Robert De Niro im Film verteilt, einsammeln konnte. Das Geld stammte " +
                "nämlich vom Konto des Requisiteurs. De Niro hatte darauf bestanden, mit echtem Geld zu drehen, da er kein Fan " +
                "von Falschgeld war und wollte, dass es sich echt anfühlte."

        }
    },
    {
        id: "2026-05-18",
        data: {
            questionText: "Clive Campbell legte 1973 mit einem Freund auf einer Party den Grundstein für eine neue Musikrichtung, indem sie ...?",
            options: {
                a: "die Musik langsamer abspielten und die Bässe erhöhten",
                b: "ohne Musikkenntnisse mit Saxofon und Gitarre improvisierten",
                c: "rythmisch auf instrumentale Liedpassage sprachen",
            },
            correctAnswer: "c",
            explanation: "In den 1970er-Jahren veranstaltete Clive Campbell als 'Kool DJ Herc' regelmäßig Partys für seine Nachbarn " +
                "in der New Yorker Bronx. Auf einer Party für seine Schwester am 11. August 1973 probierte er etwas Neues aus. Ihm " +
                "war aufgefallen, dass in den instrumentalen Passagen der Lieder besonders leidenschaftlich getanzt wurde. Also nahm " +
                "er sich zwei Plattenspieler und spielte nur diese sogenannten Breaks, während sein Freund 'Coke La Rock' dazu" +
                " im Rhythmus ins Mikrofon sprach. Der neue Musikstil kam gut an und sprach sich schnell herum, weshalb " +
                "die Party als Geburtsstunde des Hip-Hops gilt."

        }
    },
    {
        id: "2026-05-19",
        data: {
            questionText: "Bei den in Gruppen lebenden Zebramangusten zetteln die Weibchen häufig Kämpfe mit rivalisierenden Gruppen an, um ...?",
            options: {
                a: "während des Kampfes fremdgehen zu können",
                b: "heimlich abzuhauen und sich eine neue Gruppe zu suchen",
                c: "danach zu schlichten und Chefin beider Gruppen zu werden",
            },
            correctAnswer: "a",
            explanation: "Zebramangusten leben im südlichen Afrika in Gruppen von etwa 10 bis 30 Tieren. Treffen sie auf andere Mangusten, " +
                "kommt es häufig zu Gruppenkämpfen um Nahrung und Lebensraum. Empfängnisbereite Weibchen werden daher von den Männchen " +
                "streng bewacht. Weil die Tiere innerhalb einer Gruppe allerdings häufig nah verwandt sind, nähern sich die " +
                "Weibchen oft absichtlich rivalisierenden Gruppen, um Kämpfe anzuzetteln. So gelingt es ihnen, sich unbemerkt mit " +
                "genetisch weiter entfernten Männchen anderer Gemeinschaften fortzupflanzen und den Genpool zu erweitern. " +
                "Danach kehren alle zu ihren ursprünglichen Gruppen zurück."

        }
    },
    {
        id: "2026-05-20",
        data: {
            questionText: "Der italienische Parmesankäse Parmigiano Reggionao ...?",
            options: {
                a: "wird im Konservierungsprozess mit einem dünnen Ölfilm bestrichen",
                b: "stammt ursprünglich aus Korsika",
                c: "wird immer mit tierischem Lab hergestellt",
            },
            correctAnswer: "c",
            explanation: "Lab spielt bei der Käseherstellung eine entscheidende Rolle. Dabei handelt es sich um bestimmte Enzyme, " +
                "die für die Gerinnung der Milch verantwortlich sind. Es wird zwischen mikrobiellem Lab und tierischem Lab " +
                "unterschieden. Bei Ersterem werden die Enzyme mithilfe von Mikroorganismen wie Bakterien oder Pilzen hergestellt. " +
                "Tierisches Lab wird meist aus den Mägen junger Kälber gewonnen. Viele Käsesorten werden heutzutage vegetarisch, " +
                "also mit mikrobiellem Lab, produziert. Der italienische Parmesankäse Parmigiano Reggiano wird nach wie vor nach " +
                "traditionellem Rezept und ausnahmslos mit tierischem Lab hergestellt."

        }
    },
    {
        id: "2026-05-21",
        data: {
            questionText: "Wer beim Schnellladen von Lithium-Ionen-Batterien eine Ladepause von wenigen Minuten einlegt, ...?",
            options: {
                a: "kann damit die Lebensdauer der Batterie auf bis zu 40 Jahre steigern",
                b: "sollte das Gerät kurz aus- und wieder einschalten",
                c: "kann die Ladekapazität beeintrachtigende Ablagerungen reduzieren",
            },
            correctAnswer: "c",
            explanation: "Bei der Verwendung von Lithium-Ionen-Batterien, die zum Beispiel als Akkus in Smartphones oder E-Autos " +
                "verbaut sind, ist es laut aktuellem Forschungsstand hilfreich, mitten im Schnellladevorgang eine Ladepause " +
                "von drei bis vier Minuten einzulegen. Beim Laden kann es zu metallischen Lithiumablagerungen an der " +
                "negativen Elektrode kommen, und zwar umso häufiger, je schneller die Batterie geladen wird. Dadurch stehen weniger " +
                "Lithium-Ionen als Ladungsträger zur Verfügung, was die Ladekapazität beeinträchtigt. Die Ablagerungen lösen sich " +
                "jedoch zum Großteil wieder auf, wenn das Schnellladen für ein paar Minuten unterbrochen wird."

        }
    },
    {
        id: "2026-05-22",
        data: {
            questionText: "In der Regel sind Beschäftigte auf Dienstreisen ...?",
            options: {
                a: "im hotelzimmer nicht gesetzlich unfallversichert",
                b: "nicht berechtigt, sich abends privat zu verabreden",
                c: "außerahlb der Dienstzeit verpflichtet, telefonisch erreichbar zu sein",
            },
            correctAnswer: "a",
            explanation: "Nur bestimmte Wege und Tätigkeiten fallen unter die gesetzliche Unfallversicherung. Daher stehen " +
                "Arbeitnehmer und Arbeitnehmerinnen während einer Dienstreise nicht pauschal unter Versicherungsschutz. " +
                "Versichert sind sie auf dem Weg zur Unterkunft nur bis zur Türschwelle des Hotelzimmers oder der Wohnungstür " +
                "der Dienstwohnung. Sobald das Zimmer betreten wird, befinden sich die Dienstreisenden außerhalb des " +
                "Versicherungsschutzes. Gleiches gilt auch für private Freizeitgestaltung, wie zum Beispiel besuchte " +
                "Kinovorstellungen oder Sightseeing während der Dienstreise."

        }
    },
    {
        id: "2026-05-23",
        data: {
            questionText: "Der Name der Modefarbe Taupe ...?",
            options: {
                a: "wwurde von Gianni Versace als ALias für Grau eingeführt",
                b: "leitet sich von der Fellfarbe französischer Maulwurfe ab",
                c: "bedeutete zu Luthers Zeiten Taube und Toupet",
            },
            correctAnswer: "b",
            explanation: "Die Farbe Taupe ist ein dunkles Grau mit einem Stich ins Braune. Die Bezeichnung leitet sich vom " +
                "französischen Wort „taupe“ ab, das wiederum von dem lateinischen „talpa“ abstammt. Beide Wörter bezeichnen den " +
                "Maulwurf, da der Farbton ursprünglich der durchschnittlichen Farbe von französischen Maulwürfen entsprach. " +
                "Im Laufe der Zeit wurde er um zusätzliche Schattierungen erweitert."

        }
    },
    {
        id: "2026-05-25",
        data: {
            questionText: "Die Geburt von Kunquian Catherine Zhu im Jahr 2000 führte vier Jahre später ...?",
            options: {
                a: "zu einer Verfassungsänderung der Republik Irland",
                b: "zur Entwicklung eines Impfstoffs gegen Windpocken",
                c: "zur Einführung eines neuen Zeichens auf der chinesischen Tastatur",
            },
            correctAnswer: "a",
            explanation: "Kungian Catherine Zhu kam als zweites Kind chinesischer Eltern am 6. September 2000 in Nordirland zur Welt. " +
                "Weil sie auf der irischen Insel geboren wurde, erhielt sie automatisch die irische Staatsbürgerschaft, nicht aber " +
                "die britische. Nach der Geburt zog ihre Mutter mit ihr nach Wales und beantragte für beide unbefristete " +
                "Aufenthaltstitel im Vereinigten Königreich. Da zu diesem Zeitpunkt zwar ihr Kind, aber nicht sie selbst berechtigt " +
                "war, ging der Fall bis vor den Europäischen Gerichtshof. Dieser gab ihrem Antrag 2004 statt. Als Konsequenz wurde " +
                "die Verfassung der Republik Irland dahingehend geändert, dass das Geburtsortprinzip für Neugeborene nur noch " +
                "dann greift, wenn mindestens ein Elternteil die irische Staatsbürgerschaft besitzt oder darauf Anspruch hat."

        }
    },
    {
        id: "2026-05-26",
        data: {
            questionText: "Was sollte beim Beschneiden einer Magnolie beachtet werden?",
            options: {
                a: "Der Ast sollte nur angeschnitten werden, um ihn dann abzubrechen.",
                b: "Nur Äste mit einer DIcke von mehr als 3 cm dürfen gekürzt werden.",
                c: "Die Äste sollten schräg angesetzt geschnitten werden.",
            },
            correctAnswer: "c",
            explanation: "Die Gattung der Magnolien gehört zur Familie der Magnoliengewächse mit rund 300 Arten, die hauptsächlich " +
                "aus Ostasien sowie Nord- und Südamerika kommen. Die Gehölzpflanzen mit ihrer prachtvollen Blütenfülle sollten " +
                "nur geschnitten werden, wenn sie zu groß für den Standort werden und auch dann nur alle drei bis fünf Jahre. " +
                "Beim Schnitt, der unmittelbar nach der Blüte erfolgen sollte, muss auf ein scharfes Schnittwerkzeug sowie " +
                "auf eine glatte und schräg angesetzte Schnittfläche geachtet werden, um Wasser auf der Schnittfläche zu vermeiden. " +
                "So kann eine gute Wundheilung gewährleistet werden und die Pflanze verliert nicht ihre Blühkraft."

        }
    },
    {
        id: "2026-05-27",
        data: {
            questionText: "Forschende der Universität in Toronto fanden 2023 heraus, dass Menschen ihre Augen weniger bewegen, wenn sie ...?",
            options: {
                a: "beim Lesen den Finger nicht unter die LEsezeile halten",
                b: "einer Tätigkeit nachgehen, die überweigend draußen stattfindet",
                c: "sich beim Zuhören von geprochener Sprache anstrengen müssen",
            },
            correctAnswer: "c",
            explanation: "Forschende der University of Toronto untersuchten 2023 junge Erwachsene und ließen sie Experimente mit " +
                "unterschiedlich anstrengenden Höranforderungen durchlaufen. Dabei wurden die Pupillen und Augenbewegungen der " +
                "Teilnehmer per Eye-Tracker aufgezeichnet. Die Forschenden stellten fest, dass sich die Augen weniger bewegen, " +
                "je mehr sich die Probandinnen und Probanden beim Zuhören von gesprochener Sprache anstrengen müssen. Diese Methode " +
                "könnte bei der Beurteilung helfen, wie sehr eine Person von der Verschreibung eines Hörgeräts oder Implantats " +
                "profitiert."
        }
    },
    {
        id: "2026-05-28",
        data: {
            questionText: "Verkochter Reis, der nicht mehr zum Verzehr geeignet ist, lässt sich ...?",
            options: {
                a: "zum Ball geformt als Marderschutz in den Pkw-Moterraum legen",
                b: "zu Brei gekocht als Kleber für Pappmaché verwenden",
                c: "gekühlt zur Konservierung frischer Miesmuscheln nutzen",
            },
            correctAnswer: "b",
            explanation: " Wenn Reis bei der Zubereitung verkocht und dadurch nicht mehr genießbar ist, kann er dennoch " +
                "weiterverwendet werden. Hierzu wird er weitergekocht und bei Bedarf noch etwas Wasser hinzugegeben, bis eine " +
                "breiige Konsistenz erreicht ist. Um die Haltbarkeit zu verlängern, kann dem Gemisch eine großzügige Menge Salz " +
                "zugegeben werden, bevor es püriert und anschließend im Kühlschrank aufbewahrt wird. Nach dem Abkühlen kann der " +
                "Brei durch die beim Kochen gelöste Stärke als Kleber verwendet werden und eignet sich zum Beispiel für " +
                "verschiedene Basteleien aus Pappmache."

        }
    },
    {
        id: "2026-05-29",
        data: {
            questionText: "Beim 'Open Hiring'-Konzept in der Personalbeschaffung ...?",
            options: {
                a: "werden Lebensläufe vor der Auswahl anonymisiert",
                b: "wird der schnellste Bewerber ohne Bewerbungsgespräch eingestellt",
                c: "werden ausschließlcih Quereinsteiger ohne Erfahrung gesucht",
            },
            correctAnswer: "b",
            explanation: "Das „Open Hiring“, auf Deutsch „Offene Einstellung“, wurde Anfang der 1980er-Jahre in einer Großbäckerei " +
                "in Yonkers, New York, ins Leben gerufen und verbreitete sich weltweit. Dabei stehen nicht die Ausbildung und \
                die Qualifikationen von Bewerbenden im Mittelpunkt, sondern ihre Motivation und ihr Potenzial. Wer sich auf eine \
                Ausschreibung am schnellsten bewirbt, zuerst zu einem vereinbarten Termin erscheint oder auf der Warteliste oben \
                steht, bekommt den Job. Langwierige Auswahlverfahren und Bewerbungsgespräche fallen weg, sodass Stellen \
                unkompliziert und vorurteilsfrei besetzt werden."

        }
    },
    {
        id: "2026-03-30",
        data: {
            questionText: "Wer im 'Mad House' steckt, ...?",
            options: {
                a: "muss beim Dartsport das Doppel-1-Feld treffen",
                b: "schlägt beim Golf vom Grün aus, kann das Loch aber nciht sehen",
                c: "kann beim Billiard eine Kugel nur mit Berührung der schwarzen spielen",
            },
            correctAnswer: "a",
            explanation: "Ziel beim Darts ist es, in so wenig Versuchen wie möglich 501 Punkte exakt auf Null zu bringen. " +
                "Der letzte Pfeil muss dabei in einem Doppelfeld stecken. Hat ein Spieler 40 Punkte übrig, so muss er die Doppel-20 " +
                "treffen. Erwischt er die einfache 20, hat er die Möglichkeit, das Spiel über die Doppel-10 zu beenden. Bei einem " +
                "Restwert von 2 Punkten muss er das Doppel-1-Feld treffen. Erwischt er eine einfache 1 oder jedes andere Feld " +
                "auf der Scheibe, zählt dies allerdings als „überworfen“ und der Wurf endet sofort. Gerade Amateurspieler " +
                "verzweifeln häufig an diesem Feld, weshalb sie dabei im Dartsjargon im „Mad House“, also im „Irrenhaus“ stecken."

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