import UIkit from 'uikit';
import { MongoClient } from 'mongodb';

const version = UIkit.version;

console.log('UIKit Version Number: ' + version);

(async function () {
  let client = null;

  try {
    client = new MongoClient('mongodb://localhost/mydb');
    await client.connect();
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }

  try {
    const db = client.db('library');
    const collection = db.collection('books');

    // create documents
    await collection.insertOne({
      author: 'Stevenson, Louis',
      title: 'Die Schatzinsel'
    });

    await collection.insertMany([
      {
        author: 'Verne, Jules',
        title: 'Die geheimnisvolle Insel'
      },
      {
        author: 'Verne, Jules',
        title: '20.000 Meilen unter dem Meer'
      },
      {
        author: 'Verne, Jules',
        title: 'Matthias Sandorf'
      }
    ]);

    // read documents
    let books = await collection.find().toArray();
    for (const book of books) {
      console.log('%s: %s', book.author, book.title);
    }

    // filter documents
    books = await collection.find({ author: 'Verne, Jules' }).toArray();
    for (const book of books) {
      console.log('%s: %s', book.author, book.title);
    }

    // update documents
    await collection.updateOne({ title: '20.000 Meilen unter dem Meer' }, { $set: { title: '20.000 Meilen unter den Meeren' } });

    books = await collection.find().toArray();
    for (const book of books) {
      console.log('%s: %s', book.author, book.title);
    }

    // delete documents
    await collection.deleteOne({ title: 'Matthias Sandorf' });
    await collection.deleteMany({});

    console.log('Done');
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
})();
