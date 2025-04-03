import React, { useEffect } from 'react'
import add from '/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import { useState } from 'react'




// console.log (AdminData)

// console.log(username)
function DashboardEmployee({setDashboard, setEmployee, setLeave}) {


  const [data, setData] = useState([]);

  const adminData = localStorage.getItem('employeeData')
  const AdminData = JSON.parse(adminData)
  const username = AdminData[0].fullName
  const employeeId = AdminData[0]._id


  async function getLeave(employeeId) {
    const response = await fetch('http://localhost:3000/getLeave',
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

  
  localStorage.setItem('leaveData', JSON.stringify(data) );
  return (
    <div>
      <div className='w-[100%] h-[14rem] border-2 border-black flex flex-col items-center justify-between '>
        <div className=' flex flex-row items-center justify-between w-[100%] h-[70%] border-2 border-black'>
          <div className=' flex flex-col items-start justify-around ml-[2rem]'>

            <p>Hello {username}</p>
            <h1 className='text-[2.5rem] font-[600]'>Welcome Back</h1>
          </div>
          <div className='flex flex-row items-center justify-around h-[20%] w-[10%] rounded-[20px] border-2 border-black mr-[2rem] ' onClick={() => { setLeave(true); setEmployee(false); setDashboard(false);  }}>
            <button  ><img src={add} alt="" className='w-[100%] h-[100%]' /></button>
            <p >Apply Leave</p>
          </div>
        </div>

        <div className=' flex flex-row items-center justify-around w-[100%] h-[25%] relative bottom-[-20%]'>
          <DataCard
          
          heading='Total Leaves :'

          sub={AdminData[0].totalLeaves}

          img={'u'}
          
          />
          <DataCard  
          
          heading='Balance Leaves :'

          sub={AdminData[0].totalLeaves}

          img={'u'}
          />
          <DataCard  
          
          heading='Taken Leaves :'

          sub={20-AdminData[0].totalLeaves}

          img={'u'}
          />
        </div>
      </div>

      <div className='w-[100%] h-[20rem] border-2 border-black absolute bottom-[0] flex flex-row items-center justify-around'>





        <div className='w-[30%] h-[90%] border-2 border-black rounded-[20px] flex flex-col items-center justify-around' >
          <h1 className='w-[90%] text-[1.3rem] font-[600]'>Pending leaves :</h1>
          <div className='flex flex-col items-center gap-5 border-2 border-black w-[95%] min-h-[80%] overflow-y-scroll'>

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




        <div className='w-[60%] h-[90%] border-2 border-black rounded-[20px] flex flex-col items-center justify-around'>
          <h1 className='w-[90%] text-[1.3rem] font-[600]'>Leave history :</h1>
          <div className='flex flex-col items-center gap-5 border-2 border-black w-[95%] min-h-[80%] overflow-auto'>

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
    <div className='w-[25%] h-[10rem] border-2 border-black rounded-[20px] flex flex-row items-center justify-around'>
      <img src="" alt="" className='w-[6rem] h-[6em] rounded-[50%] border-2 border-black' />
      <div className='flex flex-col items-center justify-around h-[100%] w-[60%]'>
        <h1>{props.heading}</h1>
        <p>{props.sub}</p>
      </div>

    </div>
  )
}

function PendingLeaves({ leave }) {
  return (
    <div className='w-[100%] min-h-[25%] border-2 border-black rounded-[20px] flex flex-row items-center justify-around'>
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
    <div className='w-[100%] h-[25%] border-2 border-black rounded-[20px] flex flex-row items-center justify-around'>
      {/* <img src="" alt="" className='w-[6rem] h-[6em] rounded-[50%] border-2 border-black' /> */}
      <div className='flex flex-row items-center justify-around h-[100%] w-[60%]'>
        <h1>{leave.leaveType}</h1>
        <p>{leave.leaveDays}</p>
      </div>

    </div>
  )
}

