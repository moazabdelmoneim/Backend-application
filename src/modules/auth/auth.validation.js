
import joi from "joi"
import { generalFields } from "../../middleware/validation.middleware.js"



export const signup =joi.object().keys({
        userName: generalFields.userName.required(),
        email: generalFields.email.required(),
        password: generalFields.password.required(),
        confirmationPassword: generalFields.confirmationPassword.valid(joi.ref('password')).required(),
        phone: generalFields.phone,
    }).required() 




export const signup_custom = {
    body: joi.object().keys({
        userName: joi.string().alphanum().case('upper').min(2).max(20).required(),
        email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#&<>@\"~;$^%{}?])(?=.*[a-zA-z]).{8,}$/)).required(),
        confirmationPassword: joi.string().valid(joi.ref("password")).required(),
        phone: joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
    }).required(),
    params:  joi.object().keys({
        id: joi.boolean().required()
    }).required()
}

export const loginValidationSchema = joi.object().keys({

    email: generalFields.email.required(),
    password: generalFields.password.required(),


}).required()