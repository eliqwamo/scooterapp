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


router.post('/getDevices', async(req,res) => {
    const { latitude, longtitude, limit } = req.body;
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