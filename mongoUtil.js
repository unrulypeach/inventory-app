const { MongoClient } = require( 'mongodb' );
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const mongoClient = new MongoClient(uri);

const connectToDatabase = async () => {
  try {
    await mongoClient.connect();
    console.log(`Connected to the database`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

module.exports = { mongoClient, connectToDatabase };