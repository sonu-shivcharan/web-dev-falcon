import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "ProjectManger",
      link: "https://sonu.drudh.tech",
    },
  });
  const emailText = mailGenerator.generatePlaintext(options.mailgen.content);
  const emailHTML = mailGenerator.generate(options.mailgen.content);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "sonu.dev@dev.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log("failed to send the email", error);
  }
};
const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our APP",
      action: {
        instructions:
          "To verify you email please click on the following button",
        button: {
          color: "#f9e109",
          text: "Verify",
          link: verificationUrl,
        },
      },
    },
    outro: "Boom",
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instructions:
          "To reset your password please click on the following button",
        button: {
          color: "#f9e109",
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
    },
    outro: "Need help? reply to this email",
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
