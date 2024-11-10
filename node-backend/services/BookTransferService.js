const Product = require('../models/BookTransferModel')
const BookModel = require('../models/BookModel');
const UserModel = require('../models/UserModel');
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

const saveBookTransfer = async (data) => {
    const { bookId, userId, transferedate } = data;
    const returnDate = new Date(new Date(transferedate).getTime() + 7 * 24 * 60 * 60 * 1000)
        .toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });

    // Step 1: Save the product
    const product = new Product({
        bookId,
        userId,
        transferedate,
        returnDate,
        isActive: true
    }); // Create a new product instance from request body

    const savedProduct = await product.save(); // Save the product to the database
    const userDetails = await UserModel.findById(product.userId);
    const bookDetails = await BookModel.findById(product.bookId);

    const base64ToBuffer = (base64Image) => {
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        return Buffer.from(base64Data, 'base64');
    };

    // Email details
    const mailOptions = {
        from: 'wanigasinghebookcollection@gmail.com',
        to: userDetails.email,
        subject: 'Book Borrowed Successfully!',
        html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h2 style="color: #4CAF50;">Hello ${userDetails.firstName} ${userDetails.lastName},</h2>
                            <p>You have successfully borrowed a book from Wanigasinghe Books Collection.</p>
                            <p>Book details:</p>
                            <ul>
                                <li style="list-style: none;">
                                    <img
                                        src="cid:bookImage" 
                                        alt="Book Image"
                                        style=" height: 100px; border-radius: 5px;" 
                                    />
                                </li>
                                <li>Book Code: ${bookDetails.bookCode}</li>
                                <li>Book Name: ${bookDetails.bookName}</li>
                                <li>Borrow Date: ${transferedate}</li>   
                            </ul>
                            <p>Thank you for using Wanigasinghe Books Collection.</p>
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
                    `,
        attachments: [
            {
                filename: 'bookImage.jpg',
                content: base64ToBuffer(bookDetails.imageUrl), // The buffer content
                cid: 'bookImage' // Content-ID reference to use in the HTML
            }
        ]
    };

    // Step 2: Update the book status (if bookId exists)
    if (bookId) {
        try {
            const updatedBook = await BookModel.findByIdAndUpdate(
                bookId,
                { status: 'Out', isActive: false }, // Update the book status
                { new: true } // Option to return the updated book
            );

            if (!updatedBook) {
                return { status: "Book not found" };
            }

            // Step 3: Send final response with saved product and updated book details
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Email sending failed:', error);
                    return { status: "Email sending failed." };
                }
                console.log('Email sent successfully:', info.response);
                return {
                    status: "Book transfer saved and book status updated",
                    savedProduct,
                    updatedBook
                };
            });
        } catch (err) {
            // Error handling for book update failure
            return { status: "Error updating book status" };
        }
    } else {
        // If no bookId is provided, only return saved product
        return { status: "Book transfer saved", savedProduct };
    }

};

// Scheduled job to check for overdue books and send reminders
cron.schedule('32 20 * * *', async () => {
    console.log("Running scheduled check for overdue books...");

    const today = new Date().toISOString().split('T')[0];

    // Find books with a return date equal to today and not marked as returned
    const overdueBooks = await Product.find({ returnDate: today, isActive: true });

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

module.exports = { saveBookTransfer };
