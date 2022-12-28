import Mongoose from 'mongoose';
//import ManagemongoDB from './databaseBasis.mjs';
import { MongoClient } from 'mongodb';
Mongoose.set('strictQuery', false);

let client = null;
(function managemongoDB () {
  try {
    client = new MongoClient('mongodb://localhost:27017/library');
    console.log('created MongoClient');
    client.connect();
    console.log('connected MongoClient');
  } catch (error) {
    console.error(error);
    console.error("MongoDB");
    process.exit(-1);
  }
  try {
    Mongoose.connect('mongodb://127.0.0.1:27017/library');
    console.log('Mongoose connected to MongoDB');
    }
    catch (error) {
      console.error(error);
      console.error("Mongoose");
      process.exit(-1);
    }
})();

