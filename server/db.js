require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
})

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
})

mongoose.export = mongoose;