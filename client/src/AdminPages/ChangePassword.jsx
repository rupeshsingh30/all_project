import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../CommonComponents/ErrorMessage';
import AadminNav from '../CommonComponents/AadminNav';

const ChangePassword = () => {

    const [showToast, setShowToast] = useState(false)
    const [msg, setMsg] = useState("")
    const [type, setType] = useState("")
    
    const navigate = useNavigate();
    const aid = localStorage.getItem('aid')
    const aname = localStorage.getItem('name')
    const aemail = localStorage.getItem('email')
    const apass = localStorage.getItem('password')
    const token = localStorage.getItem('token')

    const [cpassdt, setCpassdt] = useState({
        admin_email:aemail,
        old_pass:"",
        admin_pass:""
    })

    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setCpassdt({
            ...cpassdt,
            [name]:value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/createadmin/updatepass',cpassdt)          
            console.log(res.data,">>>>>",res.data.chpasssts )

            setShowToast(true)
            setMsg(res.data.msg)
            if (res.data.chpasssts === 0) {
                setType('success')
            } else {
                setType('error')
            }
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (token === null) {
            navigate('/adminlogin')
        }
    })
    return (
        <div>
            <AadminNav/>
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            <div className="container">
                <div className='row justify-content-center mt-5'>
                    <h2 className='content-center'>Change Password of {aname}</h2>
                    <div className="mb-3">
                        <label htmlFor="old_pass" className="form-label">Old password</label>
                        <input type="password" className="form-control" id="old_pass" name='old_pass' placeholder='Enter old  password' onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="admin_pass" className="form-label">Admin Password</label>
                        <input type="password" className="form-control" id="admin_pass" name='admin_pass' placeholder='Enter new password' onChange={handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>


        </div>
    )
}

export default ChangePassword