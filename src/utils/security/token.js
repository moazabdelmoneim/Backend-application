import jwt from 'jsonwebtoken'


export const generateToken = ({ payload = "", signature = process.env.TOKEN_SIGNATURE, options = {} } = {}) => {
    const token = jwt.sign(payload, signature, options)
    return token
}
export const verifyToken = ({ token = "", signature = process.env.TOKEN_SIGNATURE } = {}) => {
    try {
        const decoded = jwt.verify(token, signature); 
        return decoded;
    } catch (error) {
        throw new Error("Invalid or expired token"); 
    }
};
