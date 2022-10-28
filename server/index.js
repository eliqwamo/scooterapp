import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
//const port = process.env.SERVERPORT;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo database connection established successfully');
})

app.listen(process.env.SERVERPORT, () => {
    console.log(`Server is running under port ${process.env.SERVERPORT}`);
})