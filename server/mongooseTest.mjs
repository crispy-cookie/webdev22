import Mongoose from 'mongoose';
import ManagemongoDB from './databaseBasis.mjs';
import { MongoClient } from 'mongodb';

( async function managemongoDB () {
  let client = null;
  try {
    client = new MongoClient('mongodb://127.0.0.1:1234/library');
    console.log('created MongoClient');
    await client.connect();
    await console.log('connected MongoClient');
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
    try {
    const db = client.db('library');
    const collection = db.collection('books');

    await collection.insertOne({ author: 'Stevenson, Louis', title: 'Die Schatzinsel' });
    await collection.insertMany([
      { author: 'Verne, Jules', title: 'Die geheimnisvolle Insel' },
      { author: 'Verne, Jules', title: '20.000 Meilen unter dem Meer' },
      { author: 'Verne, Jules', title: 'Matthias Sandorf' }
    ]);

    let books = await collection.find().toArray();
    for ( const book of books) { console.log('%s: %s', book.author, book.title); }

    await Mongoose.connect('mongodb://127.0.0.1:1233/library');
    await console.log('Mongoose connected to MongoDB');
  } catch (error) {
    console.error(error);
  }/* finally {
    client.close();
  }*/
})();

/*(async function MongooseConnect () {
    try {
        await Mongoose.connect('mongodb://127.0.0.1:27017/library');
        await console.log('Mongoose connected to MongoDB');
    }
    catch (error) {
        console.error(error);
        process.exit(-1);
    }
});*/