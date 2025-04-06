import React, { useEffect } from 'react'
import add from '/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import article from '/src/assets/article_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import balance from '/src/assets/account_balance_wallet_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import taken from '/src/assets/task_alt_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import { useState } from 'react'




// console.log (AdminData)

// console.log(username)
function DashboardEmployee({ setDashboard, setEmployee, setLeave, setProfile }) {


  const [data, setData] = useState([]);

  const adminData = localStorage.getItem('employeeData')
  const AdminData = JSON.parse(adminData)
  const username = AdminData[0].fullName
  const employeeId = AdminData[0]._id


  async function getLeave(employeeId) {
    const response = await fetch('http://leave-management-system-backend-nu.vercel.app/getLeave',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({
          employeeId: employeeId,
          role: 'employee'

        })
      })

    const data1 = await response.json();
    // console.log(data1)
    setData(data1)
  }

  useEffect(() => {
    getLeave(employeeId);
  }, []);


  localStorage.setItem('leaveData', JSON.stringify(data));
  return (
    <div className='bg-red-50 h-[100%]'>
      <div className='w-[100%] h-[14rem] border-2 border-black flex flex-col items-center justify-between bg-black'>
        <div className=' flex flex-row items-center justify-between w-[100%] h-[70%] border-2 border-black'>
          <div className=' flex flex-col items-start justify-around ml-[2rem]'>

            <p className='text-white'>Hello {username}</p>
            <h1 className='text-[2.5rem] font-[600] text-white'>Welcome Back</h1>
          </div>
          <div className='flex flex-row items-center justify-around h-[20%] w-[10%] rounded-[20px] border-2 border-white mr-[2rem] bg-white/60' onClick={(e) => { setLeave(true); setEmployee(false); setDashboard(false); setProfile(false); }}>
            <button ><img src={add} alt="" className='w-[100%] h-[100%]' /></button>
            <p>Apply Leave</p>
          </div>
        </div>

        <div className=' flex flex-row items-center justify-around w-[100%] h-[25%] relative bottom-[-20%]'>
          <DataCard

            heading='Total Leaves :'

            sub='20'

            img={article}

            color='bg-cyan-500'

          />
          <DataCard

            heading='Balance Leaves :'

            sub={AdminData[0].totalLeaves}

            img={balance}

            color='bg-red-300'

          />
          <DataCard

            heading='Taken Leaves :'

            sub={20 - AdminData[0].totalLeaves}

            img={taken}

            color='bg-yellow-500'
          />
        </div>
      </div>




      <div className='w-[100%] h-[20rem]  absolute bottom-[0] flex flex-row items-center justify-around'>

        <div className='w-[30%] h-[90%]  rounded-[20px] flex flex-col items-center justify-around bg-white/90 shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)]' >
          <h1 className='flex items-start w-[90%] text-[1.3rem] font-[600] text-lime-800 mt-[0.5rem]'>Pending Leaves </h1>

          <div className='w-[90%] h-[90%]  flex flex-col gap-3 items-center justify-around overflow-y-scroll'>

            {data.map((leave, index) => (
              data[index].status === 'Pending' && (
                <PendingLeaves
                  key={index}
                  leave={leave}
                />
              )
            ))}



          </div>
        </div>
        <div className='w-[60%] h-[90%] k rounded-[20px] flex flex-col items-center justify-around bg-white/90 shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)]' >
          <h1 className='flex items-start w-[90%] text-[1.3rem] font-[600] text-lime-800 mt-[0.5rem]'>Leave history :</h1>

          <div className='w-[90%] h-[90%]  flex flex-col items-center gap-3 justify-around overflow-y-scroll'>
            {data.map((leave, index) => (
              data[index].status === 'Approved' && (
                <LeaveHistory
                  key={index}
                  leave={leave}
                />
              )
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardEmployee




function DataCard(props) {
  return (
    <div className='w-[25%] h-[10rem]  rounded-[20px] flex flex-row items-center justify-between bg-white shadow-[1px_20px_23px_-3px_rgba(0,_0,_0,_0.55)]'>
      <div className={`flex flex-col items-center justify-center h-[100%] w-[40%] ${props.color} rounded-l-[18px]`}><div className='flex flex-col items-center justify-center h-[6rem] w-[6rem] rounded-[50%] '><img src={props.img} alt="" className='w-[90%] h-[90%] fill-white' /></div> </div>
      <div className='flex flex-col items-center justify-around h-[100%] w-[60%]'>
        <h1 className='text-[1.2rem] font-[400]'>{props.heading}</h1>
        <p className='text-[1.5rem]'>{props.sub}</p>
      </div>

    </div>
  )
}

function PendingLeaves({ leave }) {
  return (
    <div className='w-[100%] min-h-[5rem]  rounded-[20px] flex flex-row items-center justify-around bg-black/10'>
      {/* <img src="" alt="" className='w-[6rem] h-[6em] rounded-[50%] border-2 border-black' /> */}
      <div className='flex flex-row items-center justify-around h-[100%] w-[60%]'>
        <h1>{leave.leaveType}</h1>
        <p>{leave.leaveDays}</p>
      </div>

    </div>
  )
}


function LeaveHistory({ leave }) {
  return (
    <div className='w-[100%] min-h-[5rem]  rounded-[20px] flex flex-row items-center justify-around bg-black/10'>
      {/* <img src="" alt="" className='w-[6rem] h-[6em] rounded-[50%] border-2 border-black' /> */}
      <div className='flex flex-row items-center justify-around h-[100%] w-[60%]'>
        <h1>{leave.leaveType}</h1>
        <p>{leave.leaveDays}</p>
      </div>

    </div>
  )
}

