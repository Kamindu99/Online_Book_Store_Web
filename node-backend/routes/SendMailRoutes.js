const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const nodemailer = require('nodemailer');

// Configure your SMTP transport
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "wanigasinghebookcollection@gmail.com",
        pass: 'rkpc rkjt uhth fiak'
    },
});

// Send email to customers to introduce new books
router.post("/", async (req, res) => {
    const { subject, message } = req.body;

    try {
        // Find all active users
        const users = await UserModel.find({ isActive: true });

        // Store the results of the emails sent
        const emailPromises = users.map((user) => {
            const mailOptions = {
                from: 'wanigasinghebookcollection@gmail.com',
                to: user.email,  // Send email to each user's email
                subject: subject,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="color: #4CAF50;">Hello ${user.firstName} ${user.lastName},</h2>
                        <p>We are pleased to inform you that we have added new books to our collection.</p>
                        <p>${message}</p>
                        <ul>
                            <li>Book 1</li>
                            <li>Book 2</li>
                            <li>Book 3</li>
                        </ul>
                        <br/>
                        <p style="font-size: 14px; color: #555;margin:0">Best regards,</p>
                        <p style="font-size: 14px; color: #555;margin:0">Kamindu Gayantha,</p>
                        <p style="font-size: 14px; color: #555;margin:0">System Administrator,</p>
                        <p style="font-size: 14px; color: #555;margin:0">Wanigasinghe Books Collection</p>
                        <div>
                            <img src="https://res.cloudinary.com/dmfljlyu1/image/upload/v1726644594/booklogo_jyd8ys.png" alt="Company Logo" width="170" />
                        </div>
                        <br/>
                        <p style="font-size: 12px; color: red;margin:0">This is an automated email. Please do not reply to this email.</p>
                    </div>
                `
            };

            // Send email and return a promise
            return transporter.sendMail(mailOptions);
        });

        // Wait for all emails to be sent
        await Promise.all(emailPromises);

        res.json({ message: 'Emails sent successfully to all active users.' });

    } catch (err) {
        console.error('Error sending emails:', err);
        res.status(500).json({ message: 'Failed to send emails to some users.' });
    }
});

module.exports = router;
