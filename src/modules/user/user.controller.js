import { Router } from "express";
import * as userServices from './services/user.service.js'
import * as auth from '../../middleware/auth.middleware.js'
import { endpoints } from "./user.endpoint.js";
import { validation } from "../../middleware/validation.middleware.js";
import { passwordValidation, shareProfile, updateProfileValidation } from "./user.validation.js";
const router = Router();

router.get("/profile", auth.authentication(),
    auth.authorization(endpoints.profile),
    userServices.profile)
router.get("/profile/:userId",validation(shareProfile),userServices.shareProfile)

router.patch("/profile",validation(updateProfileValidation), auth.authentication(),
    auth.authorization(endpoints.profile),
    userServices.updateProfile)
router.patch("/profile/Password",validation(passwordValidation), auth.authentication(),
    auth.authorization(endpoints.profile),
    userServices.updatePassword) 
router.delete("/profile/freeze", auth.authentication(),
    auth.authorization(endpoints.profile),
    userServices.freezeAccount) 

export default router;