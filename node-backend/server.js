const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json({ limit: '10mb', extended: true }));
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

const userAuth = require('./routes/UserRoutes');
app.use("/api/v1/book-management/auth", userAuth);

const favouriteBook = require('./routes/FavouritRoute');
app.use("/api/v1/book-management/favourite", favouriteBook);

const category = require('./routes/CategoryRoutes');
app.use("/api/v1/parameter-management/category", category);

const bookreviews = require('./routes/BookReviewRoutes');
app.use("/api/v1/book-management/reviews", bookreviews);

const preOrderBook = require('./routes/PreOrderBookRoutes');
app.use("/api/v1/book-management/pre-order", preOrderBook);

const sendMail = require('./routes/SendMailRoutes');
app.use("/api/v1/book-management/send-mail", sendMail);