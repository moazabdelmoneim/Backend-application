import userModel from '../../../DB/models/user.model.js';
import { userRoles } from '../../../middleware/auth.middleware.js';
import { asyncHandler } from '../../../utils/error/error.js';
import { successRes } from '../../../utils/response/success.res.js';
import { compareHash } from '../../../utils/security/hash.js';
import { generateToken } from '../../../utils/security/token.js';



export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new Error("Invalid account or email not found", { cause: 404 }));
    }

    if (!user.confirmEmail) {
        return next(new Error("Please confirm your email first", { cause: 403 }));
    }

    if (!compareHash({ plainText: password, hashed: user.password })) {
        return next(new Error("Invalid email or password", { cause: 401 }));
    }

    const token = generateToken({
        payload: { id: user._id, isLoggedIn: true },
        signature: user.role === userRoles.admin 
            ? process.env.TOKEN_SIGNATURE_ADMIN 
            : process.env.TOKEN_SIGNATURE,
        options: { expiresIn: "1h" },
    });
    if (user.isDeleted) {

        user.isDeleted=false
        await user.save()
    }
    return successRes({
        res,
        message: "Login successful",
        data: { token },
    });
});
