import React, { use } from 'react'
import { useState } from 'react'
import DashboardEmployee from './DashboardEmployee';
import LeaveApplication from './LeaveApplication';
import EmployeeLeaveManager from './EmployeeLeaveManager';
import EmployeeProfile from './EmployeeProfile';
import account from '/src/assets/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import logout from '/src/assets/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import { useLocation } from 'react-router';
import { useEffect } from 'react';



function Home() {

  const [dashboard, setDashboard] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [profile, setProfile] = useState(false);
  const [leave, setLeave] = useState(false);
  const [account, setAccount] = useState(false);
  const [Username, setUsername] = useState('');
  const [dp , setDp] = useState('');
  const [data, setData] = useState();

  const route = useLocation();

  // console.log(route.state.token.token)
  localStorage.setItem('employeetoken', route.state.token.token)

  async function getAdminData(token) {
    const response = await fetch('http://localhost:3000/getAdminData',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({
          token: token,
          role: 'employee'

        })
      }
    )

    const data = await response.json();
    const username = data[0].fullName;
    setDp(data[0].profilePicture);
    
    setUsername(username);
    setData(data);
  }

  useEffect(() => {
    getAdminData(route.state.token.token)
  }, [])

  // console.table( data)

  localStorage.setItem('employeeData', JSON.stringify(data))
  // console.log(localStorage.getItem('adminData'))
  return (
    <div>
      <nav className='flex flex-row items-center justify-around w-[100%] h-[5rem] border-b-2 border-b-white/20 bg-black text-white'>
        <div className='w-[10%] h-[100%] flex items-center justify-center '><p className='bg-gradient-to-tl
from-slate-800
via-violet-500
to-zinc-400
bg-clip-text
text-transparent text-[2rem] font-[700]'>Zamari</p></div>
        <div className='flex flex-row items-center justify-around w-[50%] h-[100%] border-2 border-black' >
          <button onClick={(e) => { setDashboard(true); setEmployee(false); setLeave(false); setProfile(false) }}>Dashboard</button>
          <button onClick={(e) => { setEmployee(true); setDashboard(false); setLeave(false); setProfile(false); }}>Leave Manager</button>
          <button onClick={(e) => { setLeave(true); setEmployee(false); setDashboard(false); setProfile(false); }}>Leave Application</button>
        </div>
        <div className='w-[15%] h-[100%] flex items-center justify-center'>
          <div className='flex flex-row items-center justify-around w-[70%] h-[60%] rounded-[30px] bg-white/40 shadow-[9px_6px_23px_-3px_rgba(193,_166,_242,_0.55)]' onClick={(e) => { setAccount(!account) }}>
            <img src={data && dp} alt="" className='h-[2rem] w-[2rem] rounded-[50%] ' />
            <p className='text-[1.2rem] font-[500] text-black'>{Username}</p>
          </div>
        </div>
      </nav>
      <div className='h-[100%] ' onClick={(e) => { setAccount(false) }} >
        {
          (dashboard) ? <DashboardEmployee

            setDashboard={setDashboard}
            setEmployee={setEmployee}
            setLeave={setLeave}
          /> : ""
        }{
          (employee) ? <EmployeeLeaveManager /> : ""
        }
        {
          (leave) ? <LeaveApplication /> : ""
        }
        {
          (account) ? <AccountCard setProfile={setProfile}
            setDashboard={setDashboard}
            setEmployee={setEmployee}
            setLeave={setLeave} /> : ""
        }
        {
          (profile) ? <EmployeeProfile /> : ""
        }
      </div>
    </div>
  )
}

export default Home





function AccountCard({ setProfile, setDashboard, setEmployee, setLeave }) {

  function setprofile(){
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
      <div className='w-[90%] h-[45%] flex flex-row items-center justify-start gap-3'>
        <img src={logout} alt="" />
        <h1>Logout</h1>
      </div>

    </div>
  )
}
