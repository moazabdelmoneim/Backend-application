import messageModel from "../../../DB/models/message.model.js";
import userModel from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successRes } from "../../../utils/response/success.res.js";




export const sendMessage=asyncHandler(async(req,res,next)=>{
    const{message,recipientId}=req.body
    if (!await userModel.findOne({_id:recipientId,isDeleted:false})) {
        return next(new Error('in-valid account',{cause:404}))
    }
    const newMessage= await messageModel.create({message ,recipientId})

    return successRes({res,message:'done',status:201,data:{message:newMessage}})
})