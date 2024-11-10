const Product = require('./models/BookTransferModel')
const BookModel = require('./models/BookModel');
const UserModel = require('./models/UserModel');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

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

// Scheduled job to check for overdue books and send reminders
cron.schedule('* * * * *', async () => {

    const today = new Date().toISOString().split('T')[0];

    // Find books with a return date equal to today and not marked as returned
    const overdueBooks = await Product.find({ isActive: true });

    overdueBooks.forEach(async (overdueBook) => {
        const userDetails = await UserModel.findById(overdueBook.userId);
        const bookDetails = await BookModel.findById(overdueBook.bookId);

        const reminderMailOptions = {
            from: 'wanigasinghebookcollection@gmail.com',
            to: userDetails.email,
            subject: 'Reminder: Book Return Due',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #FF0000;">Reminder to Return Book</h2>
                    <p>Dear ${userDetails.firstName} ${userDetails.lastName},</p>
                    <p>This is a reminder that the book you borrowed from Wanigasinghe Books Collection is due for return:</p>
                    <ul>
                        <li>Book Code: ${bookDetails.bookCode}</li>
                        <li>Book Name: ${bookDetails.bookName}</li>
                        <li>Return Date: ${overdueBook.returnDate}</li>
                    </ul>
                    <p>Please return the book on time to avoid any penalties.</p>
                </div>
            `,
        };

        transporter.sendMail(reminderMailOptions, (error, info) => {
            if (error) {
                console.error('Reminder email sending failed:', error);
            } else {
                console.log('Reminder email sent successfully:', info.response);
            }
        });
    });
});
