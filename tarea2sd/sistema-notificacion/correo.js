const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "email.prueba.t2@gmail.com",
    pass: "cxxl ynfw hnzd nhxc",
  },
});

const enviarCorreo = async (destinatario, asunto, cuerpo) => {
  try {
    const info = await transporter.sendMail({
      from: '"BUM" <email.prueba.t2@gmail>', // Remitente
      to: destinatario, // Destinatario
      subject: asunto, // Asunto del correo
      text: cuerpo, // Cuerpo del correo en texto plano
    });
    console.log('Correo enviado exitosamente\n');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = enviarCorreo;