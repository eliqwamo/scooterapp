import mongoose from "mongoose";
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    fbid: String,
    expoPushToken: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    avatar: String,
    contact: {
        mobile: String,
        address: String,
        city: String,
        country: String,
        zipcode: String
    }
})

export default mongoose.model('Account', accountSchema);