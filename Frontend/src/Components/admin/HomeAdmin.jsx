import React, { use } from 'react'
import { useState } from 'react'
import DashboardAdmin from './DashboardAdmin';
import EmployeeSignUp from './EmployeeSignUp';
import LeaveManager from './LeaveManager';
import { useLocation } from 'react-router';
import { useEffect } from 'react';



function Home() {

  const [dashboard, setDashboard] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [leave, setLeave] = useState(false);
  const [Username, setUsername] = useState('');
  const [data, setData] = useState();
  // const [adminId, setAdminId] = useState('')

  const route = useLocation();

  // console.log(route.state.token.token)
  localStorage.setItem('token', route.state.token.token)

  async function getAdminData(token) {
    const response = await fetch('http://localhost:3000/getAdminData',
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
          <button onClick={(e) => { setDashboard(true); setEmployee(false); setLeave(false) }}>Dashboard</button>
          <button onClick={(e) => { setEmployee(true); setDashboard(false); setLeave(false) }}>Employees</button>
          <button onClick={(e) => { setLeave(true); setEmployee(false); setDashboard(false); }}>Leave Manager</button>
        </div>
        <div className='w-[15%] h-[100%] flex items-center justify-center'>
          <div className='flex flex-row items-center justify-around w-[70%] h-[60%] rounded-[30px] bg-white/40 shadow-[9px_6px_23px_-3px_rgba(193,_166,_242,_0.55)]'>
            <img src="" alt="" className='h-[2rem] w-[2rem] rounded-[50%] border-2 border-black' />
            <p className='text-[1.2rem] font-[500] text-black'>{Username}</p>
          </div>
        </div>
      </nav>
      <div className='h-[100%]'>
        {
          (dashboard) ? <DashboardAdmin /> : ""
        }{
          (employee) ? <EmployeeSignUp



          /> : ""
        }
        {
          (leave) ? <LeaveManager /> : ""
        }
      </div>
    </div>
  )
}

export default Home
