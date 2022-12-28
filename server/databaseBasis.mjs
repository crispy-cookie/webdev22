import { MongoClient } from 'mongodb';
import Mongoose from 'mongoose';

export default const mongoUrl = 'mongodb://localhost:27017/library';

export default (async function ManagemongoDB () {
  let client = null;
  try {
    client = new MongoClient(mongoUrl);
    // console.log('created MongoClient'); // debugBreakpoint
    await client.connect();
    // await console.log('connected MongoClient'); // debugBreakpoint
  } catch (error) {
      console.error(error);
      process.exit(-1);
  }
  try {
    const db = client.db('library');
    const collection = db.collection('books');

    console.log('MongoClient bereit zur Eingabe'); // debugBreakpoint
    /*
    await collection.insertOne({ author: 'Stevenson, Louis', title: 'Die Schatzinsel' });
    await collection.insertMany([
      { author: 'Verne, Jules', title: 'Die geheimnisvolle Insel' },
      { author: 'Verne, Jules', title: '20.000 Meilen unter dem Meer' },
      { author: 'Verne, Jules', title: 'Matthias Sandorf' }
    ]);
    */

    let books = await collection.find().toArray();
    for ( const book of books) { console.log('%s: %s', book.author, book.title); }

  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
})();


// Hilfsfunktionen
/*
export default (async function mongoDBconnect () {
  let client = null;
  try {
    client = new MongoClient('mongodb://localhost:27017/library');
    await client.connect();
  } catch (error) {
      console.error(error);
      process.exit(-1);
  }
  try {
    const db = client.db('library');
    const collection = db.collection('books');

    console.log('MongoClient bereit zur Eingabe'); // debugBreakpoint

    readDB();
    writeDB();

  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
})();

export default (async function readFromDB() {
  let books = await collection.find().toArray();
  for ( const book of books) {
    console.log('%s: %s', book.author, book.title);
  }
  client.close();
})

export default (async function writeIntoDB() {
  await collection.insertOne({ author: 'Stevenson, Louis', title: 'Die Schatzinsel' });
  await collection.insertMany([
    { author: 'Verne, Jules', title: 'Die geheimnisvolle Insel' },
    { author: 'Verne, Jules', title: '20.000 Meilen unter dem Meer' },
    { author: 'Verne, Jules', title: 'Matthias Sandorf' }
  ]);
  client.close();
})
*/