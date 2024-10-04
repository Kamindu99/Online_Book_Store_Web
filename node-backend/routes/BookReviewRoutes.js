const express = require('express');
const router = express.Router();
const BookReviewModel = require('../models/BookReviewModel')
const UserModel = require('../models/UserModel');

router.post("/", async (req, res) => {
    const product = new BookReviewModel(req.body);
    try {
        const savedCategoryModel = await product.save();
        res.json(savedCategoryModel);
    } catch (err) {
        res.json({ message: err });
    }
})

router.route("/").get(async (req, res) => {
    try {
        // Extract query parameters
        const { page = 0, per_page = 10, sort = 'createdDate', direction = 'asc', bookId = '', isActive = true } = req.query;

        // Convert page and per_page to integers
        const pageNumber = parseInt(page);
        const pageSize = parseInt(per_page);

        // Define sort object
        const sortOrder = direction === 'desc' ? -1 : 1; // descending (-1) or ascending (1)
        const sortObj = {};
        sortObj[sort] = sortOrder;

        // Build search query (assuming search on bookName, you can add more fields as needed)

        // Build search query
        let searchQuery = { isActive: isActive };

        // If a bookId is provided, filter by bookId
        if (bookId) {
            searchQuery.bookId = bookId;
        }

        // Fetch total number of matching products
        const total = await BookReviewModel.countDocuments(searchQuery);

        // Fetch paginated and sorted products
        const products = await BookReviewModel.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        // Fetch the book details for each product
        const results = await Promise.all(products.map(async (product) => {
            // Fetch the book details from the BookModel using the bookId
            const userDetails = await UserModel.findById(product.userId);

            // Return the product with the embedded book details (bmBook)
            return {
                ...product.toObject(), // Convert Mongoose object to plain JavaScript object
                umUser: {
                    id: userDetails._id,
                    name: `${userDetails.firstName} ${userDetails.lastName}`,
                    profileImage: userDetails.profileImage
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

module.exports = router;