require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/hello", (req, res) => {
    res.json({ message: "Hello World" });
  });
  

app.post('/enviar-email', async (req, res) => {
    // const { email, frase } = req.body;

    const email = req.query.email;
    const frase = req.query.frase;

    if (!email || !frase) {
        return res.status(400).json({ error: 'E-mail e frase são obrigatórios.' });
    }

    // Configuração do transporte do Nodemailer (use suas credenciais no .env)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Substitua pelo hostname do seu servidor SMTP (ex: smtp.gmail.com)
  port: 587, // Substitua pela porta apropriada (ex: 587 para TLS, 465 para SSL)
  secure: false, // Use `true` se a porta for 465 (SSL/TLS)
  auth: {
    user: process.env.EMAIL_USER, // Substitua pelo seu endereço de e-mail
    pass: process.env.EMAIL_PASS, // Substitua pela sua senha de e-mail ou uma senha de aplicativo
  },
});

    const mailOptions = {
        from: process.env.EMAIL_USER, // Seu e-mail
        to: email, // O e-mail para onde você quer enviar
        subject: `Nova mensagem de ${process.env.EMAIL_USER}`,
        text: `O seguinte e-mail: ${process.env.EMAIL_USER} enviou a seguinte mensagem: ${frase}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', info.messageId);
        res.json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});