const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // ✅ Create the transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    // ✅ Use both text and html fields properly
    const mailOptions = {
        from: `"Your App Name" <${process.env.EMAIL}>`, // adds a friendly sender name
        to: options.email,
        subject: options.subject,
        text: options.text || "Please view this email in HTML format.", // fallback text
        html: options.html, // ✅ actual HTML email content
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
