import bcrypt from 'bcrypt'


export const generateHash = ({ plainText = "", salt = process.env.SALT_ROUND } = {}) => {
    const hash = bcrypt.hashSync(plainText, parseInt(salt))
    return hash
}
export const compareHash = ({ plainText, hashed }) => {
    return bcrypt.compareSync(plainText, hashed);
}