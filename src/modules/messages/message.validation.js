import joi from 'joi'
import { Types } from 'mongoose';

export const validObjctId=(value,helper)=>{
    return Types.ObjectId.isValid(value)
        ?true
        :helper.message('invalid object id');

}
export const sendMessage=joi.object().keys({
    message:joi.string().min(5).max(5000).required(),
    recipientId:joi.string().custom(validObjctId).required()

}).required()