import mongoose from 'mongoose'
import {config} from 'dotenv'

const initializeDatabaseConnection = () =>
{
    config();
    const {MONGO_URI, NODE_ENV} = process.env;

    let mongoUri = MONGO_URI;
    if (NODE_ENV === "development")
    {
        mongoUri = "mongodb://localhost:27017";

    }
    mongoose.connect(mongoUri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('connected to the database'));
};

export default initializeDatabaseConnection;