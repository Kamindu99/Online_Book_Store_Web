const express = require('express');
const router = express.Router();
const Product = require('../models/FavouriteModel')
const BookModel = require('../models/BookModel')
const Category = require('../models/CategoryModel')

router.post("/", async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        res.json({ message: err });
    }
})

router.route("/").get(async (req, res) => {
    try {
        // Extract query parameters
        const { userId = '' } = req.query;

        // Build search query
        let searchQuery = { isActive: true };

        // If a userId is provided, filter by userId
        if (userId) {
            searchQuery.userId = userId;
        }

        // Fetch paginated and sorted products
        const products = await Product.find(searchQuery)

        // Fetch the book details for each product
        const results = await Promise.all(products.map(async (product) => {
            const bookDetails = await BookModel.findById(product.bookId);
            const categoryDetails = await Category.findById(bookDetails?.categoryId);
            return {
                ...product.toObject(),
                bmBook: {
                    ...bookDetails.toObject(),
                    categoryName: categoryDetails?.categoryName
                }
            };
        }));

        // Build the response
        const response = results;

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.route("/:bookId/:userId").delete(async (req, res) => {
    let { bookId, userId } = req.params;
    await Product
        .findOneAndDelete({ bookId, userId })
        .then(() => {
            res.status(200).send({ status: "deleted" });
        })
        .catch((err) => {
            res.status(500).send({ status: "error in delete", err });
        });
});


module.exports = router;