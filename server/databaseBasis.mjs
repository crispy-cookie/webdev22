import { MongoClient } from 'mongodb';

export default async function managemongoDB () {
  let client = null;
  try {
    client = new MongoClient('mongodb://localhost:8080');
    await client.connect();
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
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
};