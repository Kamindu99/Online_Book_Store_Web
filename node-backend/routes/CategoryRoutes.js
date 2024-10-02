const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/CategoryModel')

router.post("/", async (req, res) => {
    const product = new CategoryModel(req.body);
    try {
        const savedCategoryModel = await product.save();
        res.json(savedCategoryModel);
    } catch (err) {
        res.json({ message: err });
    }
})

router.route("/fdd").get((req, res) => {

    CategoryModel.find({ isActive: true })
        .then((category) => {
            res.json(category);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred' }); // Handle errors
        });
});

router.route("/").get(async (req, res) => {
    try {
        // Extract query parameters
        const { page = 0, per_page = 10, search = '', sort = '_id', direction = 'asc' } = req.query;

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

        // Fetch total number of matching products
        const total = await CategoryModel.countDocuments(searchQuery);

        // Fetch paginated and sorted products
        const products = await CategoryModel.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        const results = await Promise.all(products.map(async (product) => {
            return {
                ...product.toObject(),
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

router.route("/:id").get(async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' }); // Handle errors
    }
});

module.exports = router;