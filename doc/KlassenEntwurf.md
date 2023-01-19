# Klassen (WIP)
## Auflistung der Klassen mit Attributen
| Gaesteliste                                                           |  Kommentar  |
|-----------------------------------------------------------------------|-------------|
| name:String                                                           |             |
| kind: Boolean                                                         |             |
| einladungsstatus: ['unbekannt', 'eingeladen', 'zugesagt', 'abgesagt'] | enumeration |


| Veranstaltungen |
|-----------------|
| name:String     |
| timestamp: Date |

| Sitzplan           |      Kommentar      |
|--------------------|---------------------|
| anzTische: Number  |                     |
| anzSitze: Number   | bestuhlung/anzSitze |
| bestuhlung: Number | bestuhlung/anzSitze |
|                    | siehe Erläuterung   |

### Erläuterung Sitzplan
Bestuhlung/anzSitze
4/6
9/10
n/m

## Assoziationen der Klassen
Komposition (Veranstaltung enthält X) <br />
1:1 Beziehung (_"they live and die with it"_) <br />
```
+-----------+                                                                    +---------------+                                                                    +--------+
|Gaesteliste| <- (1) (Komposition) (Veranstaltung enthält einen Sitzplan) (1) -> |Veranstaltungen| <- (1) (Komposition) (Veranstaltung enthält einen Sitzplan) (1) -> |Sitzplan|
+-----------+                                                                    +---------------+                                                                    +--------+
```
