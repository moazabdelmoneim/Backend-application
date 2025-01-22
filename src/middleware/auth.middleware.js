import userModel from '../DB/models/user.model.js'
import { endpoints } from '../modules/user/user.endpoint.js'
import { asyncHandler } from '../utils/error/error.js'
import { compareEncryption } from '../utils/security/encryption.js'
import { verifyToken } from '../utils/security/token.js'

export const userRoles = {
    user: 'user',
    admin: 'admin'
}


export const authentication = () => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers;

        // Check if authorization header exists
        if (!authorization) {
            return next(new Error('Missing token', { cause: 401 }));
        }

        const [bearer, token] = authorization.split(' ') || [];
        if (!bearer || !token) {
            return next(new Error('Invalid token format. Expected Bearer <token>', { cause: 400 }));
        }

        let signature;
        switch (bearer.toLowerCase()) {
            case 'admin':
                signature = process.env.TOKEN_SIGNATURE_ADMIN;
                break;
            case 'bearer':
                signature = process.env.TOKEN_SIGNATURE;
                break;
            default:
                return next(new Error('Invalid bearer type. Use "Bearer" or "Admin"', { cause: 401 }));
        }

        const decoded = verifyToken({ token, signature });
        if (!decoded?.id) {
            return next(new Error('Invalid token payload', { cause: 401 }));
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return next(new Error('User not found or inactive', { cause: 404 }));
        }

        if (user.changePasswordTime && user.changePasswordTime.getTime() >= decoded.iat * 1000) {
            return next(new Error('Invalid credentials', { cause: 400 }));
        }
        
        // Optional decryption if needed for downstream processing
        user.phone = compareEncryption({
            cipher: user.phone,
            signature: process.env.ENCRYPTION_SIGNATURE
        });

        req.user = user; // Attach user to request object
        next();
    });
};



export const authorization = (accessRoles = []) => {
    return asyncHandler(async (req, res, next) => {
        const userRole = req.user?.role;

        if (!accessRoles.includes(userRole)) {
            return next(new Error(`Unauthorized: Access requires one of [${accessRoles.join(', ')}]`, { cause: 403 }));
        }

        next();
    });
};
