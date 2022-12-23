import mongoose from "mongoose";
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    deviceType: String, //scooter//bicycle
    currentLocation: {
        latitude: Number,
        longtitude: Number,
    },
    batteryLevel: Number,
    rentAmountPerDay: Number,
    deviceStatus: String,
    rents: [{
        accountId: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
        rentDates: {
            fromDate: Date,
            toDate: Date
        }
    }]
})

export default mongoose.model('Device', deviceSchema);