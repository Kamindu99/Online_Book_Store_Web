const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const BookModel = require('../models/BookModel')
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
    const { subject, message, booksList } = req.body;

    const base64ToBuffer = (base64Image) => {
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        return Buffer.from(base64Data, 'base64');
    };

    try {
        // Find all active users
        const users = await UserModel.find({ isActive: true });
        const newBookList = await Promise.all(
            booksList.map(async (bookId) => {
                const book = await BookModel.findById(bookId);
                return {
                    bookCode: book.bookCode,
                    bookName: book.bookName,
                    imageUrl: book.imageUrl, // assuming imageUrl is in base64 format
                };
            })
        );

        // Store the results of the emails sent
        const emailPromises = users.map((user) => {
            const mailOptions = {
                from: 'wanigasinghebookcollection@gmail.com',
                to: user.email,  // Send email to each user's email
                subject: subject,
                html:
                    `<div
                        style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
                        <div style="text-align: center;">
                            <img src="https://res.cloudinary.com/dmfljlyu1/image/upload/v1726644594/booklogo_jyd8ys.png"
                                alt="Wanigasinghe Books Collection" style="width: 150px; margin-bottom: 20px;">
                        </div>

                        <h2 style="color: #4CAF50; text-align: center;">Hello Kamindu Gayantha,</h2>

                        <p style="font-size: 16px; line-height: 1.6;">
                            We’re excited to share that new titles have just been added to our collection! Our latest selection has been
                            handpicked to inspire, educate, and entertain book lovers like you.
                        </p>

                        <p> ${message} </p>

                        <h3 style="color: #333;">✨ New Arrivals ✨</h3>
                         <ul style="font-size: 16px; color: #555; line-height: 1.8;">
                            ${newBookList.map((book, index) => `
                                <li>
                                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                        <img src="cid:bookImage${index}" alt="Book Image" style="height: 80px; border-radius: 5px; margin-right: 10px;" />
                                        <div>
                                            <strong>${book.bookName}</strong><br/>
                                            Book Code: ${book.bookCode}
                                        </div>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>

                        <p style="font-size: 16px; line-height: 1.6;">
                            Each of these books is now available at <strong>Wanigasinghe Books Collection</strong>. Don’t miss out on reading
                            them!
                        </p>
                        <p>Thank you for using Wanigasinghe Books Collection.</p>
                        <br />
                        <p style="font-size: 14px; color: #555;margin:0">Best regards,</p>
                        <p style="font-size: 14px; color: #555;margin:0">Kamindu Gayantha,</p>
                        <p style="font-size: 14px; color: #555;margin:0">System Administrator,</p>
                        <p style="font-size: 14px; color: #555;margin:0">Wanigasinghe Books Collection</p>
                        <div>
                            <img src="https://res.cloudinary.com/dmfljlyu1/image/upload/v1726644594/booklogo_jyd8ys.png" alt="Company Logo"
                                width="170" />
                        </div>
                        <br />
                        <p style="font-size: 12px; color: red;margin:0">This is an automated email. Please do not reply to this email.</p>
                    </div>`,
                attachments: newBookList.map((book, index) => ({
                    filename: `bookImage${index}.jpg`,
                    content: base64ToBuffer(book.imageUrl),
                    cid: `bookImage${index}` // Content-ID reference in the HTML
                }))
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
