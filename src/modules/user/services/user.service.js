import messageModel from '../../../DB/models/message.model.js'
import userModel from '../../../DB/models/user.model.js'
import { asyncHandler } from '../../../utils/error/error.js'
import { successRes } from '../../../utils/response/success.res.js'
import { compareHash, generateHash } from '../../../utils/security/hash.js'

export const profile = asyncHandler(async (req, res, next) => {
    const user = req.user
    const objectUser = user.toObject()
    delete objectUser.password
    const messages=await messageModel.find({recipientId:req.user._id})
    return successRes({ res, message: "login successfully", data:{user: objectUser, messages}})
})
export const shareProfile = asyncHandler(async (req, res, next) => {
    const user = await userModel.findOne({_id:req.params.userId,isDeleted:false}).select("userName email ")
    return user? successRes({ res, data: {user} }):next(new Error('invalid user',{cause:404}))
})

export const updateProfile = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(
        req.user._id, 
        req.body, 
        { new: true, runValidators: true } 
    );

    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }

    return successRes({
        res,
        message: "Updated successfully",
        data: { user }, 
    });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
    const { password, oldPassword } = req.body;

    if (!compareHash({ plainText: oldPassword, hashed: req.user.password })) {
        return next(new Error('Invalid old password', { cause: 409 }));
    }


    const hashedPassword = generateHash({ plainText: password });

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        {
            password: hashedPassword,
            changePasswordTime: new Date(), 
        },
        { new: true, runValidators: true }
    );

    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }

    return successRes({
        res,
        message: "Password updated successfully",
        data: { user },
    });
});
export const freezeAccount = asyncHandler(async (req, res, next) => {
    
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        {
            isDeleted:true,
            changePasswordTime: new Date(), 
        },
        { new: true, runValidators: true }
    );


    return successRes({
        res,
        message: "account freezed successfully",
        data: { user },
    });
});
