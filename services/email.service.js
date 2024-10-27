const nodemailer = require('nodemailer');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service like Outlook, Yahoo, etc.
    auth: {
        user: process.env.EMAIL_USERNAME, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
    },
});

// Function to send email notification
exports.sendApprovalNotification = async (question, recipientEmail) => {
    const mailOptions = {
        from: '"Document Bot" <no-reply@documentc.com>',
        to: recipientEmail, // Recipient's email
        subject: 'Action Required: Approval needed for newly added answer',
        text: `A new answer has been added to the DoConnect application for the question, "${question}". The recipient is requested to review and either approve or delete the newly added answer.

        Note: This is an auto-generated email; please do not reply.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Approval notification email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
