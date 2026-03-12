const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    admin_name: { type: String, required: true, unique: true },
    admin_pass: { type: String, required: true }, // Consider hashing passwords in production
    admin_email: { type: String, required: true, unique: true }   
});


module.exports = mongoose.model('eshop_admin', adminSchema);