import userModel from '../../../DB/models/user.model.js';
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../../utils/email/send.email.js';
import { confirmationEmail } from '../../../utils/email/template/confirmEmail.js';
import { asyncHandler } from '../../../utils/error/error.js';
import { compareHash, generateHash } from '../../../utils/security/hash.js';
import { generateEncryption } from '../../../utils/security/encryption.js';
import { verifyToken } from '../../../utils/security/token.js';
import { successRes } from '../../../utils/response/success.res.js';
import { emailEvent } from '../../../utils/events/email.event.js';





export const signup = asyncHandler(async (req, res, next) => {

    const { userName, email, password, phone, confirmationPassword, role } = req.body;



    if (await userModel.findOne({ email })) {
        return next(new Error('email already exist', { cause: 409 }))
    }
    const encryptedPhone = generateEncryption({ plainText: phone, signature: process.env.ENCRYPTION_SIGNATURE })
    const hashPassword = generateHash({ plainText: password, salt: 10 })
    const user = await userModel.create({ userName, email, password: hashPassword, phone: encryptedPhone, role })
    const emailToken = jwt.sign({ email }, process.env.EMAIL_TOKEN_SIGNATURE)
    const emaillink = `${process.env.FE_URL}/confirm-email/${emailToken}`
    const html = confirmationEmail({ link: emaillink })
    await sendEmail({ to: email, subject: "confirm email", html })
    return successRes({ res, message: 'done', data: { user }, status: 201 })

})
export const signupOtp = asyncHandler(async (req, res, next) => {

    const { userName, email, password, phone, confirmationPassword, role } = req.body;



    if (await userModel.findOne({ email })) {
        return next(new Error('email already exist', { cause: 409 }))
    }
    const encryptedPhone = generateEncryption({ plainText: phone, signature: process.env.ENCRYPTION_SIGNATURE })
    const hashPassword = generateHash({ plainText: password, salt: 10 })
    const user = await userModel.create({ userName, email, password: hashPassword, phone: encryptedPhone, role })
    emailEvent.emit('sendConfirmEmail', { email })
    return successRes({ res, message: 'check the OTP in your mail', data: { user }, status: 201 })

})
export const confirmEmail = asyncHandler(async (req, res, next) => {

    const { authorization } = req.headers
    const decoded = verifyToken({ token: authorization, signature: process.env.EMAIL_TOKEN_SIGNATURE })
    const user = await userModel.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true }, { new: true })
    return successRes({ res, message: 'done', data: { user } })


})
export const verifyOtp = asyncHandler(async (req, res, next) => {

    const {email,code}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return next(new Error('in_valid account',{cause:404}))
    }
    if(user.confirmEmail){
        return next(new Error('already verified',{cause:409}))
    }
    if(!compareHash({plainText:code,hashed:user.confirmEmailOtp})){
        return next(new Error('in_valid code',{cause:400}))
    }
    const userResult = await userModel.findOneAndUpdate({ email}, { confirmEmail: true ,$unset:{confirmEmailOtp:0}}, { new: true })
    return successRes({ res, message: 'done', data: { userResult } })


})
