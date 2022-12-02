import jsonwebtoken from 'jsonwebtoken';
import Account from '../models/account.js';

export default (req,res,next) => {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        jsonwebtoken.verify(token, process.env.TOKEN_KEY, (err, authData) => {
            if(err){

            } else {
                const accountId = authData.data.id;
                Account.findById(accountId)
                .then(user => {
                    req.user = user;
                    next();
                })
                .catch(error => {
                    console.log(error.message);
                })
            }
        })
    } else {

    }
}