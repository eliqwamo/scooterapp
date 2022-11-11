import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import account from '../models/account.js';
import bcryptjs from 'bcryptjs';

router.post('/signup', async(req,res) => {
    const {firstName, lastName, email, password, fbid} = req.body;
    const _id = mongoose.Types.ObjectId();
    const hash = await bcryptjs.hash(password,10);

    const _account = new account({
        _id: _id,
        fbid: fbid,
        expoPushToken: '',
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        avatar: '',
        contact: {mobile: '',address: '',city: '',country: '',zipcode: ''}
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

export default router;