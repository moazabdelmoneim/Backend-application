import mongoose, { Schema, Types, model } from "mongoose";


const messageSchema = new Schema({

    message: { type: String, required: true, minLength: 5, maxLength: 5000, trim: true },
    recipientId: { type: Types.ObjectId, required: true, ref: 'User' }


}, { timestamps: true })


const messageModel = mongoose.model.Message || model('Message', messageSchema)
export default messageModel