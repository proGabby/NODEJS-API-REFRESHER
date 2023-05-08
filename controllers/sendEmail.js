const nodemailer = require('nodemailer');

//sending emaill with ethereal
const sendEmailEthereal = async () => {
    // let testAccount = await nodemailer.createTestAccount();
  
    //nodemailer configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'rene63@ethereal.email',
        pass: 'TQb7BjVTe4fwSEds8w'
      },
    });
  
    //sending email with define details
   const info = await transporter.sendMail({
      from: '"inimfon willie" <iniwillie10@gmail.com>',
      to: 'gaby12645@gmail.com',
      subject: 'Hello',
        text: 'Welcome to my app',
        
      html: '<h2>Sending Emails with Node.js</h2>',
    });

    console.log('Message sent: %s', info.messageId);
  

  };


  module.exports = sendEmailEthereal;