import joi from "joi";



export const generalFields = {
    userName: joi.string().alphanum().case('upper').min(2).max(20).messages({
        'string.min': 'the minimum length of the name is 2',
        'string.empty': 'the name field cannot be empty ',
        'any.required': 'the name field is required'
    }),
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#&<>@\"~;$^%{}?])(?=.*[a-zA-z]).{8,}$/)),
    confirmationPassword: joi.string().valid(joi.ref("password")),
    phone: joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
    id: joi.boolean()
}

export const validation = (schema) => {
    return (req, res, next) => {

        const inputData = { ...req.body, ...req.params }

        const validationResult = schema.validate(inputData, { abortEarly: false })

        if (validationResult.error) {
            return res.status(400).json({ message: 'validation error', validationResult: validationResult.error.details })
        }
        // const validationErrors=[]
        // for(const key of Object.keys(schema)){
        //     const validationResult = schema[key].validate(req[key], { abortEarly: false });
        //     if (validationResult.error){
        //         validationErrors.push({key,validationResult: validationResult.error.details})
        //     }      
        // }

        // if(validationErrors.length>0){
        //     return res.status(400).json({message:"validation error ",err : validationErrors})
        // }




        //     const validationResult = schema.validate(req.body, { abortEarly: false });

        //     if (validationResult.error) {
        //         return res.status(400).json({
        //             message: 'Validation error',
        //             validationResult: validationResult.error.details,
        //         });
        //     }

        return next();
    };
};





export const validation_costum = (schema) => {
    return (req, res, next) => {
        const validationErrors = []
        for (const key of Object.keys(schema)) {
            const validationResult = schema[key].validate(req[key], { abortEarly: false });
            if (validationResult.error) {
                validationErrors.push({ key, validationResult: validationResult.error.details })
            }
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({ message: "validation error ", err: validationErrors })
        }

        return next();
    };
};
