import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi : '3.0.0',
        info: {
            title: 'ScooterApp Api Endpoints',
            version: '1.0.0'
        },
        servers: [
            { 
                url: 'http://localhost:3001'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis:['./controllers/*.js']
}


const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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