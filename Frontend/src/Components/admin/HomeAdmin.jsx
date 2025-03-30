import React from 'react'
import { useState } from 'react'  
import DashboardAdmin from './DashboardAdmin';
import EmployeeSignUp from './EmployeeSignUp';
import { useLocation } from 'react-router';

function Home() {

  const [dashboard, setDashboard] = useState(false);
  const [employee, setEmployee] = useState(false);

  const route = useLocation();

  console.log(route.state)
  localStorage.setItem('token', route.state.token.token)  
  return (
    <div>
      <div>
        <button onClick={(e) => {setDashboard(true); setEmployee(false)}}>Dashboard</button>
        <button onClick={(e) => {setEmployee(true); setDashboard(false)}}>Employee</button>
      </div>
      <div>
      {
      (dashboard)?<DashboardAdmin/>:""
}{
      (employee)?<EmployeeSignUp/>:""
      }
      </div>
    </div>
  )
}

export default Home
