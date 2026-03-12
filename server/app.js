require('dotenv').config();
const express = require('express');     
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db'); // Import the database connection

//  All routees API
const adminLoginRoute = require('./routes/Admin/adminlogin');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// All routes api 
app.use('/createadmin', adminLoginRoute);

const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.send('Welcome to the Server API');
})

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});