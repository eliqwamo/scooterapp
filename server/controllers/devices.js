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


/**
 * @swagger
 * /api/device/get_devices:
 *  get:
 *   tags: [Devices]
 *   summary: Return a list of all devices
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *    500:
 *     description: Error in operation 
 */
router.get('/get_devices', async(req,res) => {
    device.find()
    .then(devices => {
        return res.status(200).json({
            data: devices
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

/**
 * @swagger
 * /api/device/get_device_by_id/{id}:
 *  get:
 *   tags: [Devices]
 *   summary: Get device by device Object id
 *   description: Send the device object id to get the device by id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: device id
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Error in operation
 */
router.get('/get_device_by_id/:id', async(req,res) => {
    const deviceId = req.params.id;
    device.findById(deviceId)
    .then(device => {
        return res.status(200).json({
            data: device
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})



export default router;