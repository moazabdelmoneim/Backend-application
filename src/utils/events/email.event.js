import { customAlphabet } from "nanoid";
import { EventEmitter } from "node:events";
import { generateHash } from "../security/hash.js";
import userModel from "../../DB/models/user.model.js";
import { sendEmail } from "../email/send.email.js";
import { verifyEmail } from "../email/template/verifyAccount.template.js";





export const emailEvent =new EventEmitter();
emailEvent.on("sendConfirmEmail",async(data)=>{
    const {email}=data;
    const otp= customAlphabet("0123456789",4)();
    const hashOtp= generateHash({plainText:otp})
    await userModel.updateOne({email},{confirmEmailOtp:hashOtp})
    const html= verifyEmail({code:otp})
    await sendEmail({to:email,subject:'confirm email otp',html})
})
