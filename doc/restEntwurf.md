# REST-Entwurf (WIP)
---
## Anwendungs-Beschreibung

Ein Nutzer soll in der Lage sein,
*  Veranstaltungen anzulegen und zu löschen,
*  Gäste in die Gästeliste einer Veranstaltung einzutragen und wieder daraus zu löschen sowie den Status der Einladungen zu pflegen,
*  den Sitzplan einer Veranstaltung anzulegen und zu bearbeiten.

Eine Veranstaltung verfügt mindestens über die Eigenschaften:
*  Name
*  Datum und Uhrzeit des Veranstaltungsbeginns
*  Gästeliste
*  Sitzplan

Die Gästeliste ist eine Menge von Gästen. Jeder Gast verfügt mindestens über die Eigenschaften
*  Name
*  Kind: ja, nein
*  Einladungsstatus: unbekannt, eingeladen, zugesagt, abgesagt

Die Sitzplatzplanung ist stark vereinfacht. Je Veranstaltung muss festgelegt werden
*  Anzahl der rechteckigen Tische
*  Anzahl der Sitzplätze pro Tisch
*  Einseitige oder zweiseitige Bestuhlung aller Tische

---

## Identifikation der Ressourcen
         a)Primäressource     b)Sekundärressource

a)Veranstaltung
	Liste der Veranstaltungen (create, delete)
a)Gast
	Liste der Gäste (add, del, modify)
		Name, Kind, Einladungsstatus
a)Sitzplan (create, modify)
	Tische, Sitze, Bestuhlung
b)Einladungen
	Status


---

## URI-Entwurf

<table>
    <tbody>
        <tr>
            <td>
                Ressource
            </td>
            <td>
                Relative URI
            </td>
            <td>
                &nbsp;
            </td>
            <td>
                Unterstützte HTTP- Verben
            </td>
        </tr>
        <tr>
            <td>
                <hr>
                <p>
                    &nbsp;
                </p>
            </td>
            <td>
                <hr>
                <p>
                    &nbsp;
                </p>
            </td>
            <td>
                <hr>
                <p>
                    &nbsp;
                </p>
            </td>
            <td>
                <hr>
                <p>
                    &nbsp;
                </p>
            </td>
        </tr>
        <tr>
            <td>
                Veranstaltung
            </td>
            <td>
                /events/:id
            </td>
            <td>
                GET
            </td>
            <td>
                (PUT) DELETE
            </td>
        </tr>
        <tr>
            <td>
                Liste der Veranstaltungen
            </td>
            <td>
                /events
            </td>
            <td>
                GET
            </td>
            <td>
                POST
            </td>
        </tr>
        <tr>
            <td>
                Gast
            </td>
            <td>
                /guests/:id
            </td>
            <td>
                GET
            </td>
            <td>
                (PUT) DELETE
            </td>
        </tr>
        <tr>
            <td>
                Liste der Gäste
            </td>
            <td>
                /guests
            </td>
            <td>
                GET
            </td>
            <td>
                POST
            </td>
        </tr>
        <tr>
            <td>
                Sitzplan
            </td>
            <td>
                /seating
            </td>
            <td>
                GET
            </td>
            <td>
                POST
            </td>
        </tr>
        <tr>
            <td>
                Tische
            </td>
            <td>
                /table/:id
            </td>
            <td>
                GET
            </td>
            <td>
                (PUT) DELETE
            </td>
        </tr>
    </tbody>
</table>

---

| Ressource | Relative URI | Unterstützte HTTP- Verben
| --- | --- | --- | --- |
| Veranstaltung | /events/:id | GET | (PUT) DELETE |
| Liste der Veranstaltungen | /events | GET | POST |
| Gast | /guests | GET | POST |
| Liste der Gäste | /guests/:id | GET | (PUT) DELETE |
| Sitzplan | /seating | GET | POST |
| Tische | /table/:id | GET | (PUT) DELETE |

