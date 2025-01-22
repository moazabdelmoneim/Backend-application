import joi from 'joi'
import { Types } from 'mongoose';
import { generalFields } from '../../middleware/validation.middleware.js'

export const validObjctId=(value,helper)=>{
    return Types.ObjectId.isValid(value)
        ?true
        :helper.message('invalid object id');

}
export const shareProfile=joi.object().keys({
    userId:joi.string().custom(validObjctId).required()
}).required()



export const updateProfileValidation=joi.object().keys({
    userName:generalFields.userName,
    phone:generalFields.phone,
    DOB:joi.date().less('now')
}).required()

export const passwordValidation=joi.object().keys({
    oldPassword: generalFields.password.required(),
    password: generalFields.password.not(joi.ref('oldPassword')).required(),
    confirmationPassword: generalFields.password.valid(joi.ref('password')).required()

}).required()