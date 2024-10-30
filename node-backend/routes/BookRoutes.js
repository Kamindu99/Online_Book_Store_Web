const express = require('express');
const router = express.Router();
const Product = require('../models/BookModel')
const UserModel = require('../models/UserModel')
const TransferBooks = require('../models/BookTransferModel')
const BookFavo = require('../models/FavouriteModel')
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
        const { page = 0, per_page = 10, search = '', sort = '_id', direction = 'asc', categoryId = '', userId = '' } = req.query;

        // Convert page and per_page to integers
        const pageNumber = parseInt(page);
        const pageSize = parseInt(per_page);

        // Define sort object
        const sortOrder = direction === 'desc' ? -1 : 1; // descending (-1) or ascending (1)
        const sortObj = {};
        sortObj[sort] = sortOrder;

        // Build search query
        let searchQuery = {};

        // If a search term is provided, search by bookName
        if (search) {
            searchQuery.bookName = new RegExp(search, 'i'); // Case-insensitive search
        }

        // If a categoryId is provided, filter by categoryId
        if (categoryId) {
            searchQuery.categoryId = categoryId;
        }

        // Build search query
        let searchQueryFavo = { isActive: true };

        // If a categoryId is provided, filter by categoryId
        if (userId) {
            searchQueryFavo.userId = userId;
        }

        // Fetch paginated and sorted products
        const favoBooks = await BookFavo.find(searchQueryFavo)

        // Fetch total number of matching products
        const total = await Product.countDocuments(searchQuery);

        // Fetch paginated and sorted products
        const products = await Product.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        const results = await Promise.all(products.map(async (product) => {
            const categoryDetails = await Category.findById(product.categoryId);
            return {
                ...product.toObject(),
                categoryName: categoryDetails ? categoryDetails?.categoryName : {},
                isFavourite: favoBooks.some((favo) => favo.bookId === product._id.toString())
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

router.route("/dashboard-count").get(async (req, res) => {
    try {
        // Fetch total number of books
        const totalBooks = await Product.countDocuments();
        const totalUsers = await UserModel.countDocuments();
        const totalTransfers = await TransferBooks.countDocuments({ isActive: true });

        // Fetch count of books by categoryId using aggregation
        const categoryCounts = await Product.aggregate([
            {
                $group: {
                    _id: "$categoryId", // Group by the "categoryId" field
                    count: { $sum: 1 } // Count the number of books in each categoryId
                }
            }
        ]);

        // Format the response with totalBooks and categoryId counts
        const response = {
            totalBooks: totalBooks,
            totalUsers: totalUsers,
            totalTransfers: totalTransfers,
            category: await Promise.all(categoryCounts.map(async (cat) => {
                const categoryDetails = await Category.findById(cat._id);
                return {
                    categoryId: cat._id,  // Assuming you want to return the original categoryId
                    categoryName: categoryDetails ? categoryDetails.categoryName : {},  // Use categoryDetails
                    count: cat.count
                };
            }))
        };

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.route("/get-book-code").get(async (req, res) => {
    try {
        // Fetch total number of books
        const totalBooks = await Product.countDocuments();

        const response = `${totalBooks + 1}`;

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.route("/fdd").get((req, res) => {
    // Fetch products where isActive is true
    const { categoryId = '', direction = 'asc' } = req.query;

    // Define sort object
    const sortOrder = direction === 'desc' ? -1 : 1; // descending (-1) or ascending (1)
    const sortObj = {};
    sortObj["_id"] = sortOrder;

    let searchQuery = {
        isActive: true
    };
    if (categoryId) {
        searchQuery.categoryId = categoryId;
    }
    Product.find(searchQuery)
        .sort(sortObj)
        .then((products) => {
            res.json(
                products.map((product) => {
                    return {
                        _id: product._id,
                        bookCode: product.bookCode,
                        bookName: product.bookName,
                    }
                }
                )
            ); // Return the filtered products
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred' }); // Handle errors
        });
});

router.route("/:id").put(async (req, res) => {
    let productId = req.params.id;
    const { bookCode, bookName, price, author, imageUrl, categoryId, noOfPages } = req.body;
    const updatedProduct = {
        bookCode,
        bookName,
        price,
        author,
        categoryId,
        noOfPages,
        imageUrl
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

    try {
        const { userId = '' } = req.query;

        // Build search query
        let searchQueryFavo = { isActive: true };

        // If a categoryId is provided, filter by categoryId
        if (userId) {
            searchQueryFavo.userId = userId;
        }

        // Fetch paginated and sorted products
        const favoBooks = await BookFavo.find(searchQueryFavo)

        let productId = req.params.id;
        const product = await Product.findById(productId)
        const categoryDetails = await Category.findById(product.categoryId);

        const response = {
            ...product.toObject(),
            categoryName: categoryDetails ? categoryDetails.categoryName : {},
            isFavourite: favoBooks.some((favo) => favo.bookId === product._id.toString())
        };

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;