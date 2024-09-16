const express = require('express');
const router = express.Router();
const Product = require('../models/BookTransferModel')
const BookModel = require('../models/BookModel');

router.post("/", async (req, res) => {
    // Step 1: Save the product
    try {
        const product = new Product(req.body); // Create a new product instance from request body
        const savedProduct = await product.save(); // Save the product to the database

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
                res.status(200).json({
                    status: "Book transfer saved and book status updated",
                    savedProduct,
                    updatedBook
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
        const { page = 0, per_page = 10, search = '', sort = 'bookId', direction = 'asc' } = req.query;

        // Convert page and per_page to integers
        const pageNumber = parseInt(page);
        const pageSize = parseInt(per_page);

        // Define sort object
        const sortOrder = direction === 'desc' ? -1 : 1; // descending (-1) or ascending (1)
        const sortObj = {};
        sortObj[sort] = sortOrder;

        // Build search query (assuming search on bookName, you can add more fields as needed)
        const searchQuery = {
            ...search ? { bookName: new RegExp(search, 'i') } : {}, // Search filter
            isActive: true // Only get active products
        };

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

            // Return the product with the embedded book details (bmBook)
            return {
                ...product.toObject(), // Convert Mongoose object to plain JavaScript object
                bmBook: bookDetails // Add book details here
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
    const { bookId, person, transferedate } = req.body;
    const updatedProduct = {
        bookId,
        person,
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
        const updatedProduct = await Product.findByIdAndUpdate(transferId, { isActive: false }, { new: true });

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
                return res.status(200).json({
                    status: "Book returned and book status updated",
                    updatedProduct,
                    updatedBook
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