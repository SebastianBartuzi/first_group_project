const mailer = require("nodemailer");

const sendEmail = (details) => {
    const transporter = mailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailConfig = {
        from: process.env.EMAIL_SOURCE,
        to: details.target,
        subject: details.subject,
        html: details.text
    }

    transporter.sendMail(mailConfig, function(err, info){
        if(err)
            console.log(err);
        else
            console.log(info);
    })
}

module.exports = sendEmail;