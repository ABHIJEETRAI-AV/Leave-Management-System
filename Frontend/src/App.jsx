import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import HomeAdmin from './Components/admin/HomeAdmin'
import Home from './Components/employee/HomeEmployee'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-[100vh]'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="signUp" element={<SignUp />} />
            <Route path="homeAdmin" element={<HomeAdmin />} />
            <Route path="homeEmployee" element={<Home />} />

          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
