const mongoose = require('mongoose');

// MongoDB connection and notifications
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndexes: true,
    })
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch(error => console.log(err.message))