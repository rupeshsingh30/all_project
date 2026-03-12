// require('dotenv').config()
import React, { useState } from 'react'
import ErrorMessage from '../CommonComponents/ErrorMessage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

    const [showToast, setShowToast] = useState(false)
    const [msg, setMsg] = useState("")
    const [type, setType] = useState("")

    const [logindt,setLogindt] = useState({
        admin_email:'',
        admin_pass:""
    })

    const navigate = useNavigate()

    const handleInputChange = (e)=>{
        const {name,value} = e.target
        setLogindt({
            ...logindt,
            [name]:value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        // console.log(logindt)
        try {
            const res = await axios.post(process.env.REACT_APP_ADMIN_URL,logindt)
            // console.log(res.data)
            if (res.data.sts === 0){
                console.log(res)
                localStorage.setItem('aid',res.data.login._id)
                localStorage.setItem('email',res.data.login.admin_email)
                localStorage.setItem('name',res.data.login.admin_name)
                localStorage.setItem('password',res.data.login.admin_pass)
                localStorage.setItem('token',res.data.token)
                navigate('/adminhome')

            }else{
                setShowToast(true)
                setMsg(res.data.msg)
                setType('error')
                setTimeout(() => {
                    setShowToast(false)
                }, 3000);
            
            }
            
        } catch (error) {
            console.error(error,error)
        }
    }
    return (
        <div>
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            {/* <button onClick={handleLogin}>Test</button> */}
            <div className="container">
                {/* <form> */}
                <div className='row justify-content-center mt-5'>
                    <h2 className='content-center'>Admin Login</h2>
                    <div className="mb-3">
                        <label htmlFor="admin_email" className="form-label">Admin Email</label>
                        <input type="email" className="form-control" id="admin_email" name='admin_email'  onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="admin_pass" className="form-label">Admin Password</label>
                        <input type="password" className="form-control" id="admin_pass" name='admin_pass' onChange={handleInputChange}/>
                    </div >
                    <div className='mb-3 text-center'>Forget Password <a href='adminpassreset'>Click here</a></div>
                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin