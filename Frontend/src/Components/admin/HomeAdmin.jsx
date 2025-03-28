import React from 'react'
import { useState } from 'react'  
import DashboardAdmin from './DashboardAdmin';
import EmployeeSignUp from './EmployeeSignUp';

function Home() {

  const [dashboard, setDashboard] = useState(false);
  const [employee, setEmployee] = useState(false);
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
