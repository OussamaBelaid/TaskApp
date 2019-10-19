const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.sendgridAPIKey)


const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to:email,
        from : 'pedroorax@gmail.com',
        subject : 'this is my first email',
        text : `Welcome to the app ${name} , let me know how you get along with the app`
    }).then((result) => {console.log("succes")}).catch((e) => { console.log("error")})
    
}
 const sendCancelationEmail = (email,name) => {
    sgMail.send({
        to:email,
        from : 'pedroorax@gmail.com',
        subject : 'Sorry to see you go !',
        text : `Goddbye , ${name}. I hope to see you back sometime soon.`
    }).then((result) => {console.log("succes")}).catch((e) => { console.log("error")})
 }
module.exports = {
    sendWelcomeEmail,sendCancelationEmail
}