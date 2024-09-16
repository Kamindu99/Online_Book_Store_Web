const express = require('express');
const router = express.Router();
const Product = require('../models/BookTransferModel')
const BookModel = require('../models/BookModel');

router.post("/", async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        const update = await BookModel.findByIdAndUpdate(req.body?.bookId, {
            status: 'Not Available'
        }).then((response) => {
            res.status(200).send({ status: "Updated", response });

        }).catch((err) => {
            res.status(500).send({ status: "error in update", err });

        })
        res.json(savedProduct);
    } catch (err) {
        res.json({ message: err });
    }
})

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
        const searchQuery = search ? { bookName: new RegExp(search, 'i') } : {};

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