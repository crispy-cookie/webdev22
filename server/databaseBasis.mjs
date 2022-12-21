import { MongoClient } from 'mongodb';
import Mongoose from 'mongoose';

export default (function managemongoDB () {
  let client = null;
  try {
    client = new MongoClient('mongodb://localhost:27017/library');
    console.log('created MongoClient');
     client.connect();
    console.log('connected MongoClient');
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
  try {
    const db = client.db('library');
    const collection = db.collection('books');

     collection.insertOne({ author: 'Stevenson, Louis', title: 'Die Schatzinsel' });
     collection.insertMany([
      { author: 'Verne, Jules', title: 'Die geheimnisvolle Insel' },
      { author: 'Verne, Jules', title: '20.000 Meilen unter dem Meer' },
      { author: 'Verne, Jules', title: 'Matthias Sandorf' }
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
})();