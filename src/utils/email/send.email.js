
import nodemailer from 'nodemailer'



export const sendEmail= async({to="",cc="",bcc="",subject="saraha app",text="",html="",attachments=[]}={})=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"saraha admin 👻" <${process.env.EMAIL}>`, // sender address
            to,
            cc,
            bcc,
            subject,
            text,
            html,
            attachments
        });
    
    return info
}