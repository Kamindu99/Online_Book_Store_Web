const express = require('express');
const router = express.Router();
const Product = require('../models/BookTransferModel')
const BookModel = require('../models/BookModel');
const UserModel = require('../models/UserModel');
const nodemailer = require('nodemailer');
const Category = require('../models/CategoryModel')

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
    // Step 1: Save the product
    try {
        const product = new Product({
            bookId: req.body.bookId,
            userId: req.body.userId,
            transferedate: req.body.transferedate,
            //returnDate - set to 7 days from transfer date (in yyyy-mm-dd format)
            returnDate: new Date(new Date(req.body.transferedate).getTime() + 7 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
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
                                <li>Borrow Date: ${req.body.transferedate}</li>   
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
        if (req.body?.bookId) {
            try {
                const updatedBook = await BookModel.findByIdAndUpdate(
                    req.body.bookId,
                    { status: 'Out', isActive: false }, // Update the book status
                    { new: true } // Option to return the updated book
                );

                if (!updatedBook) {
                    return res.status(404).json({ status: "Book not found" });
                }

                // Step 3: Send final response with saved product and updated book details
                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Email sending failed:', error);
                        return res.status(500).json({ message: 'Email sending failed.' });
                    }
                    console.log('Email sent successfully:', info.response);
                    res.status(200).json({
                        status: "Book transfer saved and book status updated",
                        savedProduct,
                        updatedBook
                    });
                });
            } catch (err) {
                // Error handling for book update failure
                return res.status(500).json({ status: "Error updating book status", error: err.message });
            }
        } else {
            // If no bookId is provided, only return saved product
            res.status(200).json({
                status: "Book transfer saved",
                savedProduct
            });
        }
    } catch (err) {
        // Error handling for product save failure
        res.status(500).json({ status: "Error saving Book", error: err.message });
    }
});

router.route("/").get(async (req, res) => {
    try {
        // Extract query parameters
        const { page = 0, per_page = 10, search = '', sort = '_id', direction = 'asc', userId = '', isActive = '' } = req.query;

        // Convert page and per_page to integers
        const pageNumber = parseInt(page);
        const pageSize = parseInt(per_page);

        // Define sort object
        const sortOrder = direction === 'desc' ? -1 : 1; // descending (-1) or ascending (1)
        const sortObj = {};
        sortObj[sort] = sortOrder;

        // Build search query (assuming search on bookName, you can add more fields as needed)

        // Build search query
        let searchQuery = {};

        // If a search term is provided, search by bookName
        if (search) {
            searchQuery.bookName = new RegExp(search, 'i'); // Case-insensitive search
        }

        // If a userId is provided, filter by userId
        if (userId) {
            searchQuery.userId = userId;
        }

        if (isActive) {
            searchQuery.isActive = isActive;
        }

        // Fetch total number of matching products
        const total = await Product.countDocuments(searchQuery);

        // Fetch paginated and sorted products
        const products = await Product.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        // Fetch the book details for each product
        const results = await Promise.all(products.map(async (product) => {
            // Fetch the book details from the BookModel using the bookId
            const bookDetails = await BookModel.findById(product.bookId);
            const userDetails = await UserModel.findById(product.userId);
            const categoryDetails = await Category.findById(bookDetails?.categoryId);

            // Return the product with the embedded book details (bmBook)
            return {
                ...product.toObject(), // Convert Mongoose object to plain JavaScript object
                bmBook: {
                    ...bookDetails.toObject(), // Convert Mongoose object to plain JavaScript object
                    categoryName: categoryDetails?.categoryName
                },// Add book details here
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

router.route("/fdd").get((req, res) => {
    Product.find().then((product) => {
        res.json(product);
    }).catch((err) => {
        console.log(err);

    })
})

router.route("/:id").put(async (req, res) => {
    let productId = req.params.id;
    const { bookId, userId, transferedate } = req.body;
    const updatedProduct = {
        bookId,
        userId,
        transferedate
    };

    const update = await Product.findByIdAndUpdate(productId, updatedProduct).then((response) => {
        res.status(200).send({ status: "Updated", response });

    }).catch((err) => {
        res.status(500).send({ status: "error in update", err });

    })
})

router.route("/return/:id/:bookId").put(async (req, res) => {
    const transferId = req.params.id;
    const bookId = req.params.bookId;

    // Step 1: Update the product
    try {
        // Update the product to set `isActive` to false
        const updatedProduct = await Product.findByIdAndUpdate(transferId, {
            isActive: false,
            returnDate: new Date().toISOString().slice(0, 10)
        }, { new: true });
        const product = await Product.findById(transferId);
        const userDetails = await UserModel.findById(product.userId);
        const bookDetails = await BookModel.findById(bookId);

        const base64ToBuffer = (base64Image) => {
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
            return Buffer.from(base64Data, 'base64');
        };

        const currentDate = new Date()?.toDateString();

        // Email details
        const mailOptions = {
            from: 'wanigasinghebookcollection@gmail.com',
            to: userDetails.email,
            subject: 'Book Returned Successfully!',
            html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h2 style="color: #4CAF50;">Hello ${userDetails.firstName} ${userDetails.lastName},</h2>
                            <p>You have successfully returned a book to Wanigasinghe Books Collection.</p>
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
                                <li>Borrow Date: ${product.transferedate}</li>
                                 <li><strong>Return Date:</strong> ${currentDate}</li>
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
            return res.status(404).json({ status: "Book Transfer not found" });
        }

        // Step 2: Update the book status (if bookId exists)
        if (bookId) {
            try {
                // Update the book status to 'Listed'
                const updatedBook = await BookModel.findByIdAndUpdate(
                    bookId,
                    { status: 'Listed', isActive: true }, // Update status to 'Listed'
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
                        status: "Book returned and book status updated",
                        updatedProduct,
                        updatedBook
                    });
                });
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
});

router.route("/:id").delete(async (req, res) => {
    let productId = req.params.id;
    await Product.findByIdAndDelete(productId).then(() => {
        res.status(200).send({ status: "deleted" });

    }).catch((err) => {
        res.status(500).send({ status: "error in delete", err });

    })
})

router.route("/:id").get(async (req, res) => {
    let productId = req.params.id;
    await Product.findById(productId).then((response) => {
        res.status(200).send({ status: "fetched", response });

    }).catch((err) => {
        res.status(500).send({ status: "error in fetch", err });

    })
})

module.exports = router;