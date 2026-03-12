const Admin = require('../../models/Admin');
const AdminToken = require('../../models/AdminToken');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY



const router = express.Router();

// http://localhost:8000/createadmin/adminlogin
router.post('/adminlogin', async (req, res) => {
    // const { admin_name, admin_pass } = req.body;

    try {
        const newAdmin = await Admin({
            admin_name: req.body.admin_name,
            admin_email: req.body.admin_email,
            admin_pass: await bcrypt.hash(req.body.admin_pass,8)
        })

        const savedAdmin = await newAdmin.save();
        // res.status(200).json(savedAdmin)
        res.status(200).json({ message: 'Admin registered successfully', admin: savedAdmin });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
});


// http://localhost:8000/createadmin/login
router.post('/login', async (req, res) => {
    const { admin_email, admin_pass } = req.body;
    try {
        const login = await Admin.findOne({ admin_email });
        if (!login) {
            // return res.status(404).json({ msg: 'Admin not found',sts:1 });  // for  postman testing
            return res.status(200).json({ msg: 'Admin not found',sts:1 });  // for using of axios have to passed status 200
        }else{
            if (await bcrypt.compare(admin_pass, login.admin_pass)) {
                // Passwords match, generate JWT token
                const token = jwt.sign({ adminId: login._id }, secretKey, { expiresIn: '1h' });
                const adminTokenSave = new AdminToken({
                    adminId: login._id,
                    token: token,
                    expiresAt: new Date(Date.now() + 3600000) // 1 hour expiration
                });
                await adminTokenSave.save();
                return res.status(200).json({ msg: 'Login successful', token, login: login, sts:0 });
                
                // // Create or update the admin token in the database
                // const adminToken = await AdminToken.findOneAndUpdate(
                //     { adminId: login._id },
                //     { token, expiresAt: new Date(Date.now() + 3600000) }, // 1 hour expiration
                //     { upsert: true, new: true }
                // );
                // res.status(200).json({ message: 'Login successful', token, login: login, sts:0 });
            } else {
                // Passwords do not match
                // res.status(401).json({ msg: 'Invalid password', sts:2 });   // for  postman testing
                res.status(200).json({ msg: 'Invalid password', sts:2 });  // for using of axios have to passed status 200
            }
        }
        
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }

})


// http://localhost:8000/createadmin/checktoken
router.post('/checktoken',async(req, res)=>{
    const token = req.body.token

    try {
        const tokenchk = await AdminToken.findOne({token})
        if (!token) {
            return res.json({'tokensts':1})  // No token found
        } else {
            return res.json({'tokensts':0}) //Token found 
        }
    } catch (error) {
        console.error(error)
    }
})

// http://localhost:8000/createadmin/updatepass
router.post('/updatepass', async(req, res)=>{
    const { admin_email, old_pass, admin_pass} = req.body;

    try {
        const passchk = await Admin.findOne({admin_email})
        // console.log(passchk)
        if (await bcrypt.compare(old_pass, passchk.admin_pass)) {
            // console.log({'msg':"old password matched"})
            const hashpass = await bcrypt.hash(admin_pass,12)
            const chpasschk = await Admin.findOneAndUpdate(
            { admin_email: admin_email },
            { $set: { admin_pass: hashpass } },
            { new: true }
        )
            res.json({'chpasssts':0,'msg':'password is changed'})
        } else {
            // console.log({'msg':"old password do not matched"})
            res.json({'chpasssts':1,'msg':'password not changed'})
        }
    } catch (error) {
        console.error(error)
    }
})


// http://localhost:8000/createadmin/logout
router.post('/logout',async(req, res)=>{
    const token = req.body.token
    // console.log(token)
    try {
        const logout = await AdminToken.findOneAndDelete({token})
        // console.log(logout)
        if (!logout) {
            res.json({'logoutsts':1,'msg':'logout Failded'})
        } else {
            res.json({'logoutsts':0,'msg':'logout succesfully'})
        }
    } catch (error) {
        console.error(error)
    }
})
module.exports = router;