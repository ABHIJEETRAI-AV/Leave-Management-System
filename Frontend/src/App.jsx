import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import HomeAdmin from './Components/admin/HomeAdmin'

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

          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
