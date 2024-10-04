const express = require('express');
const router = express.Router();
const BookReviewModel = require('../models/BookReviewModel')

router.post("/", async (req, res) => {
    const product = new BookReviewModel(req.body);
    try {
        const savedCategoryModel = await product.save();
        res.json(savedCategoryModel);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;