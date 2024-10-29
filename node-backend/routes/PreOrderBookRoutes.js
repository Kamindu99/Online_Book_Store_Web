const express = require('express');
const router = express.Router();
const PreOrderBookModel = require('../models/PreOrderBookModel')
const BookModel = require('../models/BookModel')
const Category = require('../models/CategoryModel')
const UserModel = require('../models/UserModel');
const nodemailer = require('nodemailer');
const { saveBookTransfer } = require('../services/BookTransferService');

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

router.post("/", async (req, res) => {
    const preOrderBook = new PreOrderBookModel(req.body);
    try {
        const savedPreOrderBookModel = await preOrderBook.save();
        res.json(savedPreOrderBookModel);

        if (savedPreOrderBookModel) {
            try {
                // Update the book status to 'Listed'
                const updatedBook = await BookModel.findByIdAndUpdate(
                    preOrderBook.bookId,
                    { status: 'Ordered', isActive: false }, // Update status to 'Ordered'
                    { new: true }         // Return updated document
                );

                if (!updatedBook) {
                    return res.status(404).json({ status: "Book not found" });
                }
            } catch (bookError) {
                return res.status(500).json({ status: "Error updating book status", error: bookError.message });
            }
        }

    } catch (err) {
        res.json({ message: err });
    }
})

router.route("/").get(async (req, res) => {
    try {
        // Extract query parameters
        const { page = 0, per_page = 10, search = '', sort = '_id', direction = 'asc', userId = '', isActive = '' } = req.query;
        // Build search query
        // Convert page and per_page to integers
        const pageNumber = parseInt(page);
        const pageSize = parseInt(per_page);

        // Define sort object
        const sortOrder = direction === 'desc' ? -1 : 1; // descending (-1) or ascending (1)
        const sortObj = {};
        sortObj[sort] = sortOrder;

        let searchQuery = {};

        // If a userId is provided, filter by userId
        // If a search term is provided, search by bookName
        // if (search) {
        //     searchQuery.bookName = new RegExp(search, 'i'); // Case-insensitive search
        // }

        // If a userId is provided, filter by userId
        if (userId) {
            searchQuery.userId = userId;
        }

        if (isActive) {
            searchQuery.isActive = isActive;
        }

        // Fetch total number of matching products
        const total = await PreOrderBookModel.countDocuments(searchQuery);

        // Fetch paginated and sorted products
        const preOrderBooks = await PreOrderBookModel.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        // Fetch the book details for each preOrderBook
        const results = await Promise.all(preOrderBooks.map(async (preOrderBook) => {
            const bookDetails = await BookModel.findById(preOrderBook.bookId);
            const userDetails = await UserModel.findById(preOrderBook?.userId);
            const categoryDetails = await Category.findById(bookDetails?.categoryId);
            return {
                ...preOrderBook.toObject(),
                bmBook: {
                    ...bookDetails.toObject(),
                    categoryName: categoryDetails?.categoryName,
                },
                umUser: {
                    id: userDetails._id,
                    name: `${userDetails.firstName} ${userDetails.lastName}`
                }
            };
        }));

        // Calculate total pages
        const totalPages = Math.ceil(total / pageSize);

        // Build the response
        const response = {
            pagination: {
                page: pageNumber,
                size: pageSize,
                total: total,
                totalPages: totalPages
            },
            result: results
        };

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.route("/approve/:id").put(async (req, res) => {

    const preOrderId = req.params.id;
    const updatedOrder = {
        status: req.body.status,
        approverComment: req.body.approverComment,
        approvedDate: new Date().toISOString().slice(0, 10),
        isActive: req.body.status === "Cancelled" || req.body.status === "Rejected" || req.body.status === "Borrowed" ? false : true
    };

    // Step 1: Update the product
    try {
        // Update the product to set `isActive` to false
        const updatedProduct = await PreOrderBookModel.findByIdAndUpdate(preOrderId, updatedOrder, { new: true });

        const product = await PreOrderBookModel.findById(preOrderId);
        const userDetails = await UserModel.findById(product.userId);
        const bookDetails = await BookModel.findById(product.bookId);

        const base64ToBuffer = (base64Image) => {
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
            return Buffer.from(base64Data, 'base64');
        };

        const currentDate = new Date()?.toDateString();

        // Email details
        const mailOptions = {
            from: 'wanigasinghebookcollection@gmail.com',
            to: userDetails.email,
            subject: 'Book Order ' + (updatedOrder.status === "Approved" ? 'Approved' : 'Rejected'),
            html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h2 style="color: #4CAF50;">Hello ${userDetails.firstName} ${userDetails.lastName},</h2>
                            <p>Your book order has been ${updatedOrder.status === "Approved" ? 'approved' : 'rejected'}.
                            ${updatedOrder.status === "Approved" ? 'You can now collect the book from the library.' : 'Please contact the library for more information.'}</p>
                            Please find the book details below:</p>
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
                                <li><strong>Response Date:</strong> ${currentDate}</li>
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

        if (!updatedProduct) {
            return res.status(404).json({ status: "Book order not found" });
        }

        // Step 2: Update the book status (if bookId exists)
        if (updatedProduct) {
            try {
                if (updatedOrder.status === "Rejected") {
                    // Update the book status to 'Listed'
                    const updatedBook = await BookModel.findByIdAndUpdate(
                        product.bookId,
                        { status: 'Listed', isActive: true }, // Update status to 'Ordered'
                        { new: true }         // Return updated document
                    );

                    if (!updatedBook) {
                        return res.status(404).json({ status: "Book not found" });
                    }
                    // Step 3: Send final response with updated product and book
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Email sending failed:', error);
                            return res.status(500).json({ message: 'Email sending failed.' });
                        }
                        console.log('Email sent successfully:', info.response);
                        res.status(200).json({
                            status: "Book pre-order rejected and book status updated",
                            updatedProduct
                        });
                    });
                } else if (updatedOrder.status === "Approved") {
                    // Step 3: Send final response with updated product and book
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Email sending failed:', error);
                            return res.status(500).json({ message: 'Email sending failed.' });
                        }
                        console.log('Email sent successfully:', info.response);
                        res.status(200).json({
                            status: "Book pre-ordered and book status updated",
                            updatedProduct
                        });
                    });
                } else if (updatedOrder.status === "Borrowed") {
                    try {
                        const result = await saveBookTransfer({
                            bookId: updatedProduct?.bookId,
                            userId: updatedProduct?.userId,
                            transferedate: new Date().toISOString().slice(0, 10),
                        });
                        res.status(200).json(result);
                    } catch (error) {
                        res.status(500).json({ message: 'Error saving Book', error: error.message });
                    }
                } else if (updatedOrder.status === "Cancelled") {
                    // Update the book status to 'Listed'
                    const updatedBook = await BookModel.findByIdAndUpdate(
                        product.bookId,
                        { status: 'Listed', isActive: true }, // Update status to 'Ordered'
                        { new: true }         // Return updated document
                    );

                    if (!updatedBook) {
                        return res.status(404).json({ status: "Book not found" });
                    }
                    res.status(200).json({
                        status: "Pre-order cancelled",
                        updatedProduct
                    });
                } else if (updatedOrder.status === "Not Borrow") {
                    // Update the book status to 'Listed'
                    const updatedBook = await BookModel.findByIdAndUpdate(
                        product.bookId,
                        { status: 'Listed', isActive: true }, // Update status to 'Ordered'
                        { new: true }         // Return updated document
                    );

                    if (!updatedBook) {
                        return res.status(404).json({ status: "Book not found" });
                    }
                    res.status(200).json({
                        status: "Pre-order Not Borrow",
                        updatedProduct
                    });
                } else {
                    res.status(200).json({
                        status: "Book pre-ordered and book status updated",
                        updatedProduct
                    });
                }

            } catch (bookError) {
                return res.status(500).json({ status: "Error updating book status", error: bookError.message });
            }
        } else {
            // If no bookId, just return the updated product
            return res.status(200).json({
                status: "Book returned",
                updatedProduct
            });
        }
    } catch (productError) {
        // Error handling for product update failure
        return res.status(500).json({ status: "Error updating product", error: productError.message });
    }


})

router.route("/:bookId/:userId").delete(async (req, res) => {
    let { bookId, userId } = req.params;
    await PreOrderBookModel
        .findOneAndDelete({ bookId, userId })
        .then(() => {
            res.status(200).send({ status: "deleted" });
        })
        .catch((err) => {
            res.status(500).send({ status: "error in delete", err });
        });
});

module.exports = router;