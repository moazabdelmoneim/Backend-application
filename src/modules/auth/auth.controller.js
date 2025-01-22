import { Router } from "express";
import * as registrationService from './services/registration.service.js'
import { login } from "./services/login.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import { loginValidationSchema, signup } from "./auth.validation.js";


const router = Router(); 


router.post("/signup",validation(signup), registrationService.signup)
router.post("/signup-OTP",validation(signup), registrationService.signupOtp)
router.patch("/confirm-email", registrationService.confirmEmail)
router.patch("/confirm-email-OTP", registrationService.verifyOtp)
router.post("/login",validation(loginValidationSchema), login);


export default router;