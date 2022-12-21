import Mongoose from 'mongoose';
import ManagemongoDB from './databaseBasis.mjs';

Mongoose.set('strictQuery', true);

(async function () {
    try {
        await Mongoose.connect('mongodb://localhost:27017/mydb');
        await console.log('Mongoose connected to MongoDB');
    }
    catch (error) {
        console.error(error);
        process.exit(-1);
    }
})();