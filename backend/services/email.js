const nodemailer = require('nodemailer')
const config = require('config')

async function sendEmail(to,subject,text){
    try{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.get('email.user'),
              pass: config.get('email.pass')
            }
        })

        let mailOptions = {
            from: config.get('email.user'),
            to: to,
            subject: subject,
            text: text
        }

        let result = await transporter.sendMail(mailOptions)
        if(result.success)
            return {success:false,error:e.message}
        else
            return {success:true}
    }catch(e){
        return {success:false,error:e.message}
    }
}

exports.sendEmail=sendEmail