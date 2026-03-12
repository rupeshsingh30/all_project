import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AadminNav from '../CommonComponents/AadminNav';

const AdminHome = () => {

  const navigate = useNavigate();
  const aid=localStorage.getItem('aid')
  const aname =localStorage.getItem('name')
  const aemail =localStorage.getItem('email')
  const apass =localStorage.getItem('password')
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if (token === null){
      navigate('/adminlogin')
    }
  })
  return (
    <div>
      <AadminNav/>
      <p>Welcom {aname}-{aid} - {aemail} - {apass}</p>
    </div>
  )
}

export default AdminHome