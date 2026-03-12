import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./AdminPages/AdminLogin";
import AdminHome from "./AdminPages/AdminHome";
import { useEffect, useState } from "react";
import axios from "axios";
import ChangePassword from "./AdminPages/ChangePassword";
import ForgetPassResent from "./AdminPages/ForgetPassResent";
import AdminCategory from "./AdminPages/AdminCategory";


function App() {

  const token = localStorage.getItem('token')
  const [tokendt, setTokendt] = useState({
    token
  })

  useEffect(()=>{
    const checkToken = async()=>{
      try {
        // const res = await axios.post(process.env.REACT_APP_ADMIN_TOKEN_CHECK,tokendt)
        const res = await axios.post("http://localhost:8000/createadmin/checktoken",tokendt)
        console.log(res.data)
        if (res.data.tokensts === 1) {
          localStorage.removeItem('aid')
          localStorage.removeItem('name')
          localStorage.removeItem('email')
          localStorage.removeItem('password')
          localStorage.removeItem('token')
        } else {
          
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkToken();
  },[])

  return (
    <div className="App">
      {/* {process.env.REACT_APP_ADMIN_URL} */}
      <BrowserRouter>
        <Routes>
          <Route exct path="/adminlogin" element={<AdminLogin/>}/>
          <Route exct path="/adminhome" element={<AdminHome/>}/>
          <Route exct path="/adminchangepass" element={<ChangePassword/>}/>
          <Route exct path="/adminpassreset" element={<ForgetPassResent/>}/>
          <Route exct path="/admincategory" element={<AdminCategory/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
