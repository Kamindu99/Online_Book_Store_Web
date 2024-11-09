const express = require('express');
const router = express.Router();
const CalandarModel = require('../models/SystemCalandarModel')

router.post("/", async (req, res) => {
    const holiday = new CalandarModel(req.body);
    try {
        const savedCalandarModel = await holiday.save();
        res.status(200).json(savedCalandarModel);
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

router.route("/fdd").get((req, res) => {

    CalandarModel.find({ isActive: true })
        .then((holiday) => {
            res.status(200).json(holiday);
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
            searchQuery.reason = new RegExp(search, 'i'); // Case-insensitive search
        }

        // Fetch total number of matching holidays
        const total = await CalandarModel.countDocuments(searchQuery);

        // Fetch paginated and sorted holidays
        const holdays = await CalandarModel.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        const results = await Promise.all(holdays.map(async (holiday) => {
            return {
                ...holiday.toObject(),
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

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.route("/:id").get(async (req, res) => {
    try {
        const holiday = await CalandarModel.findById(req.params.id);
        res.status(200).json(holiday);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' }); // Handle errors
    }
});

router.route("/:id").put(async (req, res) => {
    let holidayId = req.params.id;
    const { holidayDate, reason } = req.body;
    const updatedHoliday = {
        holidayDate,
        reason
    };

    const update = await CalandarModel.findByIdAndUpdate(holidayId, updatedHoliday).then((response) => {
        res.status(200).send({ status: "Updated", response });

    }).catch((err) => {
        res.status(500).send({ status: "error in update", err });

    })
})

router.route("/:id").delete(async (req, res) => {
    let holidayId = req.params.id;
    await CalandarModel.findByIdAndDelete(holidayId).then(() => {
        res.status(200).send({ status: "deleted" });
    }).catch((err) => {
        res.status(500).send({ status: "error in delete", err });

    })
})

module.exports = router;