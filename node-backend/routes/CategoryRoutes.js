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

router.route("/:id").get(async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' }); // Handle errors
    }
});

module.exports = router;