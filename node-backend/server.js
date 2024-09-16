const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());

const PORT = 8000;
const DB_URL = 'mongodb+srv://Kamindu_99:123@mernapp.ffeez.mongodb.net/book_db?retryWrites=true&w=majority';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('DataBase Connected Successful');
    })
    .catch((err) => console.log('DataBase Connection Error', err));

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});

const bookRoute = require('./routes/BookRoutes');
app.use("/api/v1/book-management/book-master", bookRoute);

const booktransferRoute = require('./routes/BookTransferRoutes');
app.use("/api/v1/book-management/book-transfer", booktransferRoute);