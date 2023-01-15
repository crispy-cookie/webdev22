## Klassen (WIP)

<table>
<thead>
  <tr>
    <th>Gaesteliste</th>
    <th>Kommentar</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>name: String</td>
    <td></td>
  </tr>
  <tr>
    <td>kind: Boolean</td>
    <td></td>
  </tr>
  <tr>
    <td>einladungsstatus: ['unbekannt', 'eingeladen', 'zugesagt', 'abgesagt']</td>
    <td>enumeration</td>
  </tr>
</tbody>
</table>

^^	1		   ^^
|| Komposition || (Veranst enthält eine Gaestel)
||	1		   ||

<table>
<thead>
  <tr>
    <th>Veranstaltung</th>
    <th>Kommentar</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>name: String</td>
    <td></td>
  </tr>
  <tr>
    <td>timestamp: Date</td>
    <td></td>
  </tr>
</tbody>
</table>

||	1		   ||
|| Komposition || (Veranst enthält einen Sitzp)
vv	1		   vv

<table>
<thead>
  <tr>
    <th>Sitzplan</th>
    <th>Kommentar</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>anzTische: Number</td>
    <td></td>
  </tr>
  <tr>
    <td>anzSitze: Number</td>
    <td>bestuhlung/anzSitze</td>
  </tr>
  <tr>
    <td>Bestuhlung: Number</td>
    <td>bestuhlung/anzSitze</td>
  </tr>
</tbody>
</table>

### Beispiel Sitzplan
Bestuhlung/anzSitze
4/6
9/10
n/m


# Anderes Format
## Klassen (WIP)

| Gaesteliste                                                           |  Kommentar  |
|-----------------------------------------------------------------------|-------------|
| name:String                                                           |             |
| kind: Boolean                                                         |             |
| einladungsstatus: ['unbekannt', 'eingeladen', 'zugesagt', 'abgesagt'] | enumeration |

^^	1		   ^^
|| Komposition || (Veranst enthält eine Gaestel)
||	1		   ||

| Veranstaltungen |
|-----------------|
| name:String     |
| timestamp: Date |

||	1		   ||
|| Komposition || (Veranst enthält einen Sitzp)
vv	1		   vv

| Sitzplan           |      Kommentar      |
|--------------------|---------------------|
| anzTische: Number  |                     |
| anzSitze: Number   | bestuhlung/anzSitze |
| bestuhlung: Number | bestuhlung/anzSitze |

### Beispiel
Bestuhlung/anzSitze
4/6
9/10
n/m

### horizontale Darstellung 
| Gaesteliste                                                           | Kommentar |		| Veranstaltungen |			| Sitzplan           | Kommentar  |
|-----------------------------------------------------------------------|-----------|		|-----------------|			|--------------------|------------|
| name:String                                                           |           |		| name:String     |			| anzTische: Number  |            |
| kind: Boolean                                                         |           |		| timestamp: Date |			| anzSitze: Number   |            |
| einladungsstatus: ['unbekannt', 'eingeladen', 'zugesagt', 'abgesagt'] | enum      |		|				  |			| Bestuhlung: Number | als ID vlt |
