const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "zamariservices@gmail.com",
    pass: "ivhyrsgysqmwjebl",
  },
});


async function Nodemailer(to, text) {
  
  const info = await transporter.sendMail({
    from: "zamariservices@gmail.com", // sender address
    to: to, // list of receivers
    subject: "Welcome to zamari ", // Subject line
    text: text, // plain text body
    html: `<b>Welcome to ZAMARI</b> 
    <p>${text}</p>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = Nodemailer
