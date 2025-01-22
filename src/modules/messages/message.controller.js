import { Router } from "express";
import { sendMessage } from "./services/message.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as msgValidator from'./message.validation.js'

const router=Router();

router.post("/",validation(msgValidator.sendMessage),sendMessage)

export default router;