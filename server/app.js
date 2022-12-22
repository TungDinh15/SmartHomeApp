const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
require('./models/db');

// const User = require('./models/user');
const userRouter = require('./routes/user')

const app = express();

app.use(express.json());
app.use(userRouter);

app.get('/test', (req, res) => {
    res.send('Hello World')
});

// Print to website local
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Backend localhost'
    });
})

// Listen and notice on port
app.listen(8000, () => {
    console.log('listening on port')
})





