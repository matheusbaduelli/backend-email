const nodemailer = require('nodemailer');

// Cria um objeto transporter usando o transporte SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Substitua pelo hostname do seu servidor SMTP (ex: smtp.gmail.com)
  port: 587, // Substitua pela porta apropriada (ex: 587 para TLS, 465 para SSL)
  secure: false, // Use `true` se a porta for 465 (SSL/TLS)
  auth: {
    user: 'mhs.djc@gmail.com', // Substitua pelo seu endereço de e-mail
    pass: 'grfq nouo zojb jcqv', // Substitua pela sua senha de e-mail ou uma senha de aplicativo
  },
});

// Exemplo de como enviar um e-mail
const mailOptions = {
  from: 'mhs.djc@gmail.com',
  to: 'matheusrdl1997@gmail.com',
  subject: 'E-mail de Teste',
  text: 'Este é um e-mail de teste enviado com o Nodemailer!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Mensagem enviada: %s', info.messageId);
});