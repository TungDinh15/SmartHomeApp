const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
require('./models/db');

const User = require('./models/user');
const userRouter = require('./routes/user')

const app = express();

// app.use((req, res, next) => {
//     req.on('data', (chunk) => {
//         const data = JSON.parse(chunk);
//         req.body = data;
//         next();
//     })
// });

app.use(express.json());
app.use(userRouter);

const test = async (email, password) => {
    const user = await User.findOne({ email: email });
    const result = await user.comparePassword(password);
    console.log(result);
};

test('tung4@gmail.com', 'ahehe');

app.get('/test', (req, res) => {
    res.send('Hello World')
});

const email = 'tung1@gmail.com'

// Print to website local
app.get('/', (req, res) => {
    res.send('Hello world');
})

// Listen and notice on port
app.listen(8000, () => {
    console.log('listening on port')
})