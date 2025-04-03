import React, { use } from 'react'
import { useState } from 'react'
import DashboardEmployee from './DashboardEmployee';
import LeaveApplication from './LeaveApplication';
import { useLocation } from 'react-router';
import { useEffect } from 'react';



function Home() {

  const [dashboard, setDashboard] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [leave, setLeave] = useState(false);
  const [Username, setUsername] = useState('');
  const [data, setData] = useState();

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
          role: 'employee'

        })
      }
    )

     const data = await response.json();
    const username = data[0].fullName;
    setUsername(username);
    setData(data);
  }

  useEffect(() => {
    getAdminData(route.state.token.token)
  }, [])

  // console.table( data)

  localStorage.setItem('employeeData', JSON.stringify(data) )
  // console.log(localStorage.getItem('adminData'))
  return (
    <div>
      <nav className='flex flex-row items-center justify-around w-[100%] h-[5rem] border-2 border-black'>
        <div className='w-[10%] h-[100%] flex items-center justify-center '><p className='bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent text-[2rem] font-[700]'>Zamari</p></div>
        <div className='flex flex-row items-center justify-around w-[50%] h-[100%] border-2 border-black' >
          <button onClick={(e) => { setDashboard(true); setEmployee(false); setLeave(false) }}>Dashboard</button>
          <button onClick={(e) => { setEmployee(true); setDashboard(false); setLeave(false) }}>Employees</button>
          <button onClick={(e) => { setLeave(true); setEmployee(false); setDashboard(false);  }}>Leave Manager</button>
        </div>
        <div className='w-[15%] h-[100%] flex items-center justify-center'>
          <div className='flex flex-row items-center justify-around w-[70%] h-[60%] border-2 border-black rounded-[30px]'>
            <img src="" alt="" className='h-[2rem] w-[2rem] rounded-[50%] border-2 border-black' />
            <p>{Username}</p>
          </div>
        </div>
      </nav>
      <div>
        {
          (dashboard) ? <DashboardEmployee /> : ""
        }{
          (employee) ? <EmployeeSignUp /> : ""
        }
         {
          (leave) ? <LeaveApplication /> : ""
        }
      </div>
    </div>
  )
}

export default Home
