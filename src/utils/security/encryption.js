import CryptoJS from "crypto-js"


export const generateEncryption = ({ plainText = "", signature = process.env.ENCRYPTION_SIGNATURE } = {}) => {
    const encryption = CryptoJS.AES.encrypt(plainText, signature)
    return encryption
}


export const compareEncryption = ({ cipher = "", signature = process.env.ENCRYPTION_SIGNATURE } = {}) => {
    const decoded = CryptoJS.AES.decrypt(cipher, signature).toString(CryptoJS.enc.Utf8)
    return decoded
}
