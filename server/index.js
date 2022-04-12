const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/key');

const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const connect = mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));