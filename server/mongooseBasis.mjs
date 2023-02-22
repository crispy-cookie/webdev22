import mongoose from 'mongoose';

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

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timestamp: Date,
  seating: { type: mongoose.Schema.Types.ObjectId, ref: 'Seating' }, // Veranstaltung hält eine reference ID zu ihren Sitzplan
  guestlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guests' }] // Veranstaltung hält Arrays von IDs der Gäste
}); // type: Schema.Types.ObjectId alternativ type: String
const Events = mongoose.model('Events', eventSchema);

const guestSchema = new mongoose.Schema({
  name: String,
  has_child: Boolean,
  status: { type: String, enum: ['unbekannt', 'eingeladen', 'zugesagt', 'abgesagt'], default: 'unbekannt' }
});
const Guests = mongoose.model('Guests', guestSchema);

const seatingSchema = new mongoose.Schema({
  associated_event: { type: mongoose.Schema.Types.ObjectId, ref: 'Events' }, // Jeder Sitzplan gehört zu einem Event
  count_table: Number,
  count_seats_per_table: Number,
  seat_variant: { type: String, enum: ['einseitig', 'zweiseitig'] },
  seat_mapping: { type: Map, of: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guests' }] } } // Überlegung hier Keys sind die Tische und Values die IDs der Gäste an den Tischen

});
const Seatings = mongoose.model('Seatings', seatingSchema);

export { initializeDatabase, Events, Guests, Seatings };
