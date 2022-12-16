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
import { getDistance } from 'geolib';
import auth from './auth.js';

/**
 * @swagger
 * definitions:
 *  Account:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: The account email address
 *     example: eli100@qwamo.com
 *    password:
 *     type: string
 *     description: The account password
 *     example: 123456
 *  GetOverview: 
 *   type: object
 *   properties:
 *    latitude:
 *     type: float
 *     description: The account location latitude
 *     example: 31.250980961290715
 *    longtitude:
 *     type: float
 *     description: The account location longtitude
 *     example: 34.79196187269632
 *    limit:
 *     type: int
 *     description: Limit the distance from devices
 *     example: 500
 */



router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, fbid } = req.body;
    const _id = mongoose.Types.ObjectId();
    const hash = await bcryptjs.hash(password, 10);

    const _account = new account({
        _id: _id,
        fbid: fbid,
        expoPushToken: '',
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        avatar: '',
        contact: { mobile: '', address: '', city: '', country: '', zipcode: '' }
    });
    _account.save()
        .then(account_created => {
            return res.status(200).json({
                status: true,
                message: 'Account created successfully'
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        })
})



/**
 * @swagger
 * /api/account/getDevices:
 *  post:
 *   summary: Get devices by user location
 *   description: Add latitude, longtitude and limit in meters
 *   tags: [Accounts]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/GetOverview'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Error in operation
 */
router.post('/getDevices', auth, async(req,res) => {



    const { latitude, longtitude, limit } = req.body;

    console.log(latitude);
    console.log(longtitude);
    console.log(limit);

    const devices = await device.find().populate('companyId');
    let devicesArr = [];

        devices.forEach(device => {
            const distance = getDistance(
                { latitude: latitude, longitude: longtitude },
                { latitude: device.currentLocation.latitude, longitude: device.currentLocation.longtitude  }
            );
            const _device = {
                device: device,
                dist: distance
            };
            if(parseInt(distance) <= parseInt(limit)){
                devicesArr.push(_device);
            }
        })

        return res.status(200).json({
            status: true,
            devices: devicesArr.sort((a, b) => a.dist - b.dist)
        });
})



/**
 * @swagger
 * /api/account/login:
 *  post:
 *   summary: Create login
 *   description: add email and password to login
 *   tags: [Accounts]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Account'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Error in operation
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await account.findOne({ email: email });
    if (user) {
        const data = {
            id: user._id,
            email: user.email,
            fbid: user.fbid,
            expoPushToken: user.expoPushToken,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar
        }
        const token = await jsonwebtoken.sign({ data }, process.env.TOKEN_KEY);
        const userCompany = await company.find({accountId: user._id});

        return res.status(200).json({
            status: true,
            user: user,
            token: token,
            userCompany: userCompany
        });
    } else {
        return res.status(200).json({
            status: false,
            message: 'User not exist'
        });
    }
})

router.post('/create_company', async (req, res) => {
    const _id = mongoose.Types.ObjectId();
    const { accountId, companyName, companyLogo } = req.body;
    const _company = new company({
        _id: _id,
        accountId: accountId,
        companyName: companyName,
        companyLogo: companyLogo
    })
    _company.save()
        .then(company_created => {
            return res.status(200).json({
                status: true,
                message: company_created
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        })
})

export default router;