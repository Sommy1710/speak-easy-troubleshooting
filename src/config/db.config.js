import mongoose from 'mongoose'
import {config} from 'dotenv'

const initializeDatabaseConnection = () =>
{
    config();
    const {MONGO_URI, STAGING_MONGO_URI, NODE_ENV} = process.env;

    let mongoUri = NODE_ENV === "DEVELOPMENT" ? STAGING_MONGO_URI : MONGO_URI;
   


    mongoose.connect(mongoUri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('connected to the database'));
};

export default initializeDatabaseConnection;