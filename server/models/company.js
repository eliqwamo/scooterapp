import mongoose from "mongoose";
const Schema = mongoose.Schema;

const companySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    accountId: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    companyName: String,
    companyLogo: String
})

export default mongoose.model('Company', companySchema);