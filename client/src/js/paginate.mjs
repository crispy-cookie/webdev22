/*
* 
* Clientseitiges Fetch und Paganinieren
* 
*/

// Fenstergroesse ermitteln
const heightOutput = document.querySelector("#height");
const widthOutput = document.querySelector("#width");

function reportWindowSize() {
    heightOutput.textContent = window.innerHeight;
    widthOutput.textContent = window.innerWidth;
    // hier dann fetch aufrufen
}

window.onresize = reportWindowSize; // Aktualisierung
reportWindowSize(); // Initialer Aufruf zur Anzeige der Fenstergroesse



// Veranstaltungen
// TODO: Ist es sinnvoll nach Klassen aufzuteilen?
//    Also fuer Veranstaltungen, Gaeste, Seating jeweils eigene fetch-Methoden zu schreiben?
async function fetchGet() {
    try {
        const response = await
            fetch('http://localhost:8080/'); // !! ACHTUNG PORT beachten !! Globale Abfrage wie umsetzen?
        const result = await response.json();
        listVeranstaltungen(result);
    } catch (error) {
        console.error(error.message);
    }
}

// Beispiel noch nicht angepasst
async function fetchPost() {
    try {
        const response = await fetch('http://localhost:8080/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ episode_id: 8, title: "Test" })
        });
        const result = await response.json();
        console.dir(result);
    } catch (error) {
        console.error(error.message);
    }
}

// Mockup Hilfsfunktionen einzusetzen bei fehlender Datenbank
async function listVeranstaltungen(result) {
    addElem(result.name);
    addElem(result.zeit);
    addElem(result.blabla);
}

function addElem(text) {
    const paragraph = document.createElement("p");
    const textNode = document.createTextNode(text);
    document.body.appendChild(paragraph);
    paragraph.appendChild(textNode);
}

listVeranstaltungen();
