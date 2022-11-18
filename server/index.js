import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

import accountController from './controllers/account.js';
app.use('/api/account', accountController);

import deviceController from './controllers/devices.js';
app.use('/api/device', deviceController);

mongoose.connect(process.env.MONGODB);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo database connection established successfully');
})

app.listen(process.env.SERVERPORT, () => {
    console.log(`Server is running under port ${process.env.SERVERPORT}`);
})