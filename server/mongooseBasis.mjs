import mongoose from 'mongoose';
import ManagemongoDB from './databaseBasis.mjs';
import { MongoClient } from 'mongodb';
//import mongoUrl from './databaseBasis.mjs';

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

mongoose => {
  const Vorlage = mongoose.model('vorlage'),
  mongoose.Schema({
    title: String,
    desc: String
  });
  return Vorlage;
};
mongoose => {
  const Veranstaltung = mongoose.model('veranstaltung'),
    mongoose.Schema({
      name: String,
      timestamp: Date,
      gaesteliste: String,
      sitzplan: String
  });
};
mongoose => {
  const Gaesteliste = mongoose.model('gaesteliste'),
    mongoose.Schema({
      name: String,
      kind: Boolean,
      einladungsstatus: ['unbekannt', 'eingeladen', 'zugesagt', 'abgesagt']
  });
  // Enumeration (als Array) { "einladungsstatus": "unbekannt", "eingeladen", "zugesagt", "abgesagt" }
};
mongoose => {
  const Sitzplan = mongoose.model('sitzplan'),
    mongoose.Schema({
      anzTische: Number,
      anzSitze: Number,
      Bestuhlung: Number // als ID vlt, Keine Ahnung was ich mir dabei gedacht habe
  });
};

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