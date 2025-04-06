import React, { use } from 'react'
import { useState } from 'react'
import DashboardAdmin from './DashboardAdmin';
import EmployeeSignUp from './EmployeeSignUp';
import LeaveManager from './LeaveManager';
import AdminProfile from './AdminProfile';
import account from '/src/assets/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import Logout from '/src/assets/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';



function Home() {

  const [dashboard, setDashboard] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [leave, setLeave] = useState(false);
  const [Username, setUsername] = useState('');
  const [data, setData] = useState();
   const [account, setAccount] = useState(false);
   const [profile, setProfile] = useState(false);
   const [dp, setDp] = useState('');
   const navigate = useNavigate();
  // const [adminId, setAdminId] = useState('')

  const route = useLocation();

  // console.log(route.state.token.token)
  localStorage.setItem('token', route.state.token.token)

  async function getAdminData(token) {
    const response = await fetch('https://leave-management-system-backend-nu.vercel.app/getAdminData',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({
          token: token,
          role: 'Admin'
        })
      }
    )

    const data = await response.json();
    const username = data[0].username;
    setDp(data[0].image);
    setUsername(username);
    setData(data);
    
  }

  useEffect(() => {
    getAdminData(route.state.token.token)
  }, [])

  // console.log( data[0]._id)

  // setAdminId (data[0]._id)

  localStorage.setItem('adminData', JSON.stringify(data))
  // console.log(localStorage.getItem('adminData'))
  return (
    <div className='h-[100%]'>
      <nav className='flex flex-row items-center justify-around w-[100%] h-[5rem] border-b-2 border-b-white/20 bg-black text-white'>
        <div className='w-[10%] h-[100%] flex items-center justify-center '><p className='bg-gradient-to-tl
from-slate-800
via-violet-500
to-zinc-400
bg-clip-text
text-transparent text-[2rem] font-[700]'>Zamari</p></div>
        <div className='flex flex-row items-center justify-around w-[50%] h-[100%] border-2 border-black' >
          <button onClick={(e) => { setDashboard(true); setEmployee(false); setLeave(false); setProfile(false) }}>Dashboard</button>
          <button onClick={(e) => { setEmployee(true); setDashboard(false); setLeave(false); setProfile(false); }}>Employees</button>
          <button onClick={(e) => { setLeave(true); setEmployee(false); setDashboard(false); setProfile(false); }}>Leave Manager</button>
        </div>
        <div className='w-[15%] h-[100%] flex items-center justify-center'>
          <div className='flex flex-row items-center justify-around w-[70%] h-[60%] rounded-[30px] bg-white/40 shadow-[9px_6px_23px_-3px_rgba(193,_166,_242,_0.55)]' onClick={(e) => { setAccount(!account) }}>
          <img src={data && dp} alt="" className='h-[2rem] w-[2rem] rounded-[50%] ' />
            <p className='text-[1.2rem] font-[500] text-black'>{Username}</p>
          </div>
        </div>
      </nav>
      <div className='h-[100%]' onClick={(e) => { setAccount(false) }}>
        {
          (dashboard) ? <DashboardAdmin /> : ""
        }{
          (employee) ? <EmployeeSignUp



          /> : ""
        }
        {
          (leave) ? <LeaveManager /> : ""
        }

        {
          (account) ? <AccountCard setProfile={setProfile}
            setDashboard={setDashboard}
            setEmployee={setEmployee}
            setLeave={setLeave}
            navigate={navigate} /> : ""
        }
        {
          (profile) ? <AdminProfile /> : ""
        }
      </div>
    </div>
  )
}

export default Home




function AccountCard({ setProfile, setDashboard, setEmployee, setLeave, navigate }) {

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('adminData')
    

    console.log("Navigating to login...");

    navigate('/')



  }

  function setprofile() {
    setProfile(true)
    setDashboard(false)
    setEmployee(false)
    setLeave(false)
  }
  return (
    <div className='w-[15rem] h-[10rem] flex flex-col items-center justify-around fixed top-[10%] right-[5%]  bg-white rounded-[20px] shadow-[0px_20px_15px_-3px_rgba(0,_0,_0,_0.1)]'>

      <div className='w-[90%] h-[45%] flex flex-row items-center justify-start gap-3' onClick={(e) => { setprofile() }}>
        <img src={account} alt="" />
        <h1 >Profile</h1>
      </div>
      <hr className='w-[90%] bg-black' />
      <div className='w-[90%] h-[45%] flex flex-row items-center justify-start gap-3' onClick={() => { logout() }}>
        <img src={Logout} alt="" />
        <h1>Logout</h1>
      </div>

    </div>
  )
}
