import React, { useEffect } from 'react'
import add from '/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import person from '/src/assets/person_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import article from '/src/assets/article_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import people from '/src/assets/emoji_people_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';




// console.log (AdminData)

// console.log(username)
function DashboardAdmin() {

  const [data, setData] = React.useState([])
  const [tableData, setTableData] = React.useState([])
  const [isLoadingData, setIsLoadingData] = React.useState(true)
  const [isLoadingTable, setIsLoadingTable] = React.useState(true)
  const adminData = localStorage.getItem('adminData')
  const AdminData = JSON.parse(adminData)
  const username = AdminData[0].username

  async function getEmployeeData(AdminData) {

    const reponse = await fetch('https://leave-management-system-backend-nu.vercel.app/getEmployeeData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: AdminData[0]._id

      })
    })


    const data = await reponse.json()
    setData(data)
    setIsLoadingData(false)

  }

  useEffect(() => {
    getEmployeeData(AdminData)
  }, [])


  async function getLeaveRequest(AdminData) {

    const response = await fetch('https://leave-management-system-backend-nu.vercel.app/LeaveRequestData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ adminId: AdminData[0]._id })
    })
    const data = await response.json()
    console.log(data)
    setTableData(data)
    setIsLoadingTable(false)
  }

  useEffect(() => {
    getLeaveRequest(AdminData)
  }, [])


  function employeeOnLeaveCounter(data) {
    const count = data.filter(employee => employee.isActive === true).length;
    return count;


  }


  return (
    <div className='bg-red-50 h-[100%]'>
      <div className='w-[100%] h-[14rem] border-2 border-black flex flex-col items-center justify-between bg-black'>
        <div className=' flex flex-row items-center justify-between w-[100%] h-[70%] border-2 border-black'>
          <div className=' flex flex-col items-start justify-around ml-[2rem]'>

            <p className='text-white'>Hello {username}</p>
            <h1 className='text-[2.5rem] font-[600] text-white'>Welcome Back</h1>
          </div>
          <div className='flex flex-row items-center justify-around h-[20%] w-[10%] rounded-[20px] border-2 border-white mr-[2rem] bg-white/60'>
            <button ><img src={add} alt="" className='w-[100%] h-[100%]' /></button>
            <p>Add employee</p>
          </div>
        </div>

        <div className=' flex flex-row items-center justify-around w-[100%] h-[25%] relative bottom-[-20%]'>
          <DataCard
            head="Total Employees"
            sub={data.length}
            img={person}
            color='bg-cyan-500'


          />
          <DataCard

            head="Active Employees"
            sub={employeeOnLeaveCounter(data)}
            img={people}
            color='bg-red-300'


          />
          <DataCard
            head="Total Leaves Requests"
            sub={tableData.filter(request => request.leaveRequest.status === "Pending").length}
            img={article}
            color='bg-yellow-500'


          />
        </div>
      </div>

      <div className='w-[100%] h-[20rem]  absolute bottom-[0] flex flex-row items-center justify-around'>

        <div className='w-[30%] h-[90%]  rounded-[20px] flex flex-col items-center justify-around bg-white/90 shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)]' >
          <h1 className='flex items-start w-[90%] text-[1.3rem] font-[600] text-lime-800 mt-[0.5rem]'>Employees on leave </h1>

          <div className='w-[90%] h-[90%]  flex flex-col gap-3 items-center justify-around overflow-y-scroll'>

           
          {!isLoadingData ? data.map((employee, index) => (
              data[index].isActive === false && (
                <EmployeeOnLeave
                  key={index}
                  img={employee.profilePicture}
                  employeeName={employee.fullName}

                />
              )
            )) : <Skeleton height={50} width={350} count={4} /> }




          </div>
        </div>
        <div className='w-[60%] h-[90%] k rounded-[20px] flex flex-col items-center justify-around bg-white/90 shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)]' >
          <h1 className='flex items-start w-[90%] text-[1.3rem] font-[600] text-lime-800 mt-[0.5rem]'>Leave requests :</h1>

          <div className='w-[90%] h-[90%]  flex flex-col items-center gap-3 justify-around overflow-y-scroll'>
          {!isLoadingTable ? tableData.map((leave, index) => (
              leave.leaveRequest.status === 'Pending' && (
                <LeaveRequests
                  employeeName={leave.employeeName}
                  img= {leave.img}
                  key={index}
                  leave={leave}
                />
              )
            )) : <Skeleton height={50} width={800} count={4} />}
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardAdmin




function DataCard(props) {
  return (
    <div className='w-[25%] h-[10rem]  rounded-[20px] flex flex-row items-center justify-between bg-white shadow-[1px_20px_23px_-3px_rgba(0,_0,_0,_0.55)]'>
      <div className={`flex flex-col items-center justify-center h-[100%] w-[40%] ${props.color} rounded-l-[18px]`}><div className='flex flex-col items-center justify-center h-[6rem] w-[6rem] rounded-[50%] '><img src={props.img} alt="" className='w-[90%] h-[90%] fill-white' /></div> </div>
      <div className='flex flex-col items-center justify-around h-[100%] w-[60%]'>

        <h1 className='text-[1.2rem] font-[400]'>{props.head}</h1>
        <p className='text-[1.5rem]'>{props.sub}</p>
      </div>

    </div>
  )
}

function EmployeeOnLeave(props) {
  return (
    <div className='w-[100%] min-h-[5rem]  rounded-[20px] flex flex-row items-center justify-around bg-black/10'>

      <img src={props.img} alt="" className='w-[3rem] h-[3em] rounded-[50%] bg-white' />
      <h1>{props.employeeName}</h1>
      <p>subheading</p>


    </div>
  )
}

function LeaveRequests(props) {
  return (
    <div className='w-[100%] min-h-[5rem]  rounded-[20px] flex flex-row items-center justify-around bg-black/10'>

      <img src={props.img} alt="" className='w-[3rem] h-[3em] rounded-[50%] bg-white' />
      <h1>{props.employeeName}</h1>
      <p>{props.leave.leaveRequest.leaveType}</p>
      <p>{props.leave.leaveRequest.leaveDays}</p>


    </div>
  )
}

