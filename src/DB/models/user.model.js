import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import { userRoles } from "../../middleware/auth.middleware.js";

const roleTypes = {
    User: 'user',
    Admin: 'admin'
}
const userSchema = new Schema({

    userName: {
        type: String,
        required: [true, 'please enter your name'],
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    confirmEmailOtp:String,
    password: {
        type: String,
        required: true
    },
    phone: String,
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    image: String,
    DOB: Date,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.user,
    },
    changePasswordTime: Date,
    isDeleted:{ 
        type:Boolean ,
        default:false
    }
}, { timestamps: true })


const userModel = mongoose.model.User || model("User", userSchema)
export default userModel