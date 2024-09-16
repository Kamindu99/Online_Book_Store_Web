const express = require('express');
const router = express.Router();
const Product = require('../models/BookModel')

router.post("/", async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        res.json({ message: err });
    }
})

router.route("/").get((req, res) => {
    Product.find().then((product) => {
        res.json(product);
    }).catch((err) => {
        console.log(err);

    })
})

router.route("/:id").put(async (req, res) => {
    let productId = req.params.id;
    const { bookCode, bookName, price, author, imageUrl, category, noOfPages } = req.body;
    const updatedProduct = {
        bookCode,
        bookName,
        price,
        author,
        category,
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
    let productId = req.params.id;
    await Product.findById(productId).then((response) => {
        res.status(200).send({ status: "fetched", response });

    }).catch((err) => {
        res.status(500).send({ status: "error in fetch", err });

    })
})

module.exports = router;