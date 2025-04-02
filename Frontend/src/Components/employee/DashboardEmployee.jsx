import React from 'react'
import add from '/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'



// console.log (AdminData)

// console.log(username)
function DashboardEmployee() {
  const adminData = localStorage.getItem('employeeData')
const AdminData = JSON.parse(adminData)
  const username = AdminData[0].fullName
  return (
    <div>
      <div className='w-[100%] h-[14rem] border-2 border-black flex flex-col items-center justify-between '>
        <div className=' flex flex-row items-center justify-between w-[100%] h-[70%] border-2 border-black'>
          <div className=' flex flex-col items-start justify-around ml-[2rem]'>

            <p>Hello {username}</p>
            <h1 className='text-[2.5rem] font-[600]'>Welcome Back</h1>
          </div>
          <div className='flex flex-row items-center justify-around h-[20%] w-[10%] rounded-[20px] border-2 border-black mr-[2rem]'>
            <button ><img src={add} alt="" className='w-[100%] h-[100%]' /></button>
            <p>Apply Leave</p>
          </div>
        </div>

        <div className=' flex flex-row items-center justify-around w-[100%] h-[25%] relative bottom-[-20%]'>
          <DataCard />
          <DataCard />
          <DataCard />
        </div>
      </div>

      <div className='w-[100%] h-[20rem] border-2 border-black absolute bottom-[0] flex flex-row items-center justify-around'>

        <div className='w-[30%] h-[90%] border-2 border-black rounded-[20px]' >
          <h1>Pending leaves :</h1>
        </div>
        <div className='w-[60%] h-[90%] border-2 border-black rounded-[20px]'>
        <h1>Leave history :</h1>
        </div>

      </div>
    </div>
  )
}

export default DashboardEmployee




function DataCard() {
  return (
    <div className='w-[25%] h-[10rem] border-2 border-black rounded-[20px] flex flex-row items-center justify-around'>
      <img src="" alt=""  className='w-[6rem] h-[6em] rounded-[50%] border-2 border-black'/>
      <div className='flex flex-col items-center justify-around h-[100%] w-[60%]'>
        <h1>Heading</h1>
        <p>subheading</p>
      </div>

    </div>
  )
}

