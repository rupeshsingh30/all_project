import React from 'react'
import AadminNav from '../CommonComponents/AadminNav'

const ForgetPassResent = () => {


    // const [showToast, setShowToast] = useState(false)
    // const [msg, setMsg] = useState("")
    // const [type, setType] = useState("")

    
    const handleInputChange = async()=>{

    }

    const handleSubmit = async(e)=>{

    }
  return (
    <>
        <div>
            <AadminNav/>
            {/* <ErrorMessage showToast={showToast} msg={msg} type={type} /> */}
            <div className="container">
                <div className='row justify-content-center mt-5'>
                    <h2 className='content-center'>Forget Password</h2>
                    <div className="mb-3">
                        <label htmlFor="admin_email" className="form-label">Admin Email</label>
                        <input type="password" className="form-control" id="admin_email" name='admin_email' placeholder='Enter email' onChange={handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>


        </div>
    </>
  )
}

export default ForgetPassResent