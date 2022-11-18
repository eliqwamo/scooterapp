import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import account from '../models/account.js';
import bcryptjs from 'bcryptjs';
import company from '../models/company.js';
import jsonwebtoken from 'jsonwebtoken';
import device from '../models/device.js';

router.post('/add_device', async(req,res) => {

    const _id = mongoose.Types.ObjectId();
    const {
        companyId,
        deviceType,
        currentLocation,
        batteryLevel,
        rentAmountPerDay,
        deviceStatus
    } = req.body;

    const _device = new device({
        _id: _id,
        companyId: companyId,
        deviceType: deviceType,
        currentLocation: currentLocation,
        batteryLevel: batteryLevel,
        rentAmountPerDay: rentAmountPerDay,
        deviceStatus: deviceStatus,
        rents: []
    });
    _device.save()
    .then(device_created => {
        return res.status(200).json({
            status:true,
            messgae: device_created
        })
    })
    .catch(error => {
        return res.status(500).json({
            status:false,
            messgae: error.messgae
        })
    })
})

export default router;