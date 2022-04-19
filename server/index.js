const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/key');

const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/api/hello', (req,res) => {
    res.send('Hello NodeJs!');
})

app.use('/api/users', require('./routes/users'));

app.use('/uploads', express.static('uploads'));
if(process.env.NODE_ENV === 'production') {
    
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, '../client','build','index.html'));
    });
}

const connect = mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.listen(port, () => console.log(`Server is running on port ${port}`));