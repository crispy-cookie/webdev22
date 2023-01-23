import mongoose, { Schema } from 'mongoose';

// Schritt 1 Verbinde mit Datenbank
// mongoose.connect(mongoUrl)

// Model > Klasse

/*
mongoose => {
  const Vorlage = mongoose.model('vorlage'),
  mongoose.Schema({
      title: String,
      desc: String
  });
return Vorlage;
};
*/

/* Attribute:
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
*/


async function initializeDatabase () {
  try {
    await mongoose.connect('mongodb://localhost:27017/eventhelper');
    const test = await mongoose.Connection;
    console.log(test.name + ' : Erfolgreich');
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
}


let event_schema = new mongoose.Schema({
  name:{ type: String, required: true}, 
  timestamp: Date, 
  seating: {type: mongoose.Schema.Types.ObjectId, ref: 'Seating'}, //Veranstaltung hält eine reference ID zu ihren Sitzplan
  guestlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guests'}] //Veranstaltung hält Arrays von IDs der Gäste
}); //type: Schema.Types.ObjectId alternativ type: String
let events = new mongoose.model("Events", event_schema);

let guest_schema = new mongoose.Schema({
  name: String, 
  has_child: Boolean, 
  status: {type: String, enum:['unbekannt', 'eingeladen', 'zugesagt', 'abgesagt'], default:'unbekannt'}
});
let guests = new mongoose.model("Guests", guest_schema);

let seating_schema = new mongoose.Schema({
  associated_event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'}, //Jeder Sitzplan gehört zu einem Event
  count_table: Number, 
  count_seats_per_table: Number, 
  seat_variant: {type: String, enum:['einseitig', 'zweiseitig']},
  seat_mapping: {type: Map, of: [mongoose.Schema.Types.ObjectId]} //Überlegung hier Keys sind die Tische und Values die IDs der Gäste an den Tischen
                                                                  //Überprüfung das Values nicht die Anzahl der Plätze pro Tische überschreiten und das Keys nicht mehr als Anzahl der werden
                                                                  //nicht ganz zufrieden mit der Lösung da keys beliebige Namen haben können, evtl. genauer nachschauen wie Mongoose Maps funktionieren

});
let seatings = new mongoose.model("Seatings", seating_schema);

export { initializeDatabase, events,  guests, seatings };
