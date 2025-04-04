import React, { useEffect } from 'react'
import add from '/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'



// console.log (AdminData)

// console.log(username)
function DashboardAdmin() {

  const [data, setData] = React.useState([])
  const [tableData, setTableData] = React.useState([])
  const adminData = localStorage.getItem('adminData')
const AdminData = JSON.parse(adminData)
  const username = AdminData[0].username

  async function getEmployeeData(AdminData){

    const reponse = await fetch('http://localhost:3000/getEmployeeData', {
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
    
  }

  useEffect(() => {
    getEmployeeData(AdminData)
  }, [])


   async function getLeaveRequest(AdminData) {
  
      const response = await fetch('http://localhost:3000/LeaveRequestData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adminId: AdminData[0]._id })
      })
      const data = await response.json()
      console.log(data)
      setTableData(data)
    }
  
    useEffect(() => {
      getLeaveRequest(AdminData)
    }, [])
  

   function employeeOnLeaveCounter(data) {
    const count = data.filter(employee => employee.isActive === true).length;
    return count;


  }


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
            <p>Add employee</p>
          </div>
        </div>

        <div className=' flex flex-row items-center justify-around w-[100%] h-[25%] relative bottom-[-20%]'>
          <DataCard 
          head = "Total Employees"
          sub= {data.length}

          
          />
          <DataCard 
          
          head = "Active Employees"
          sub= {employeeOnLeaveCounter(data)}

          
          />
          <DataCard
          head = "Total Leaves Requests"
          sub= {tableData.filter(request => request.leaveRequest.status === "Pending").length}
          
          
          />
        </div>
      </div>

      <div className='w-[100%] h-[20rem] border-2 border-black absolute bottom-[0] flex flex-row items-center justify-around'>

        <div className='w-[30%] h-[90%] border-2 border-black rounded-[20px] flex flex-col items-center justify-around' >
          <h1>Employees on leave :</h1>

          <div className='w-[90%] h-[90%] border-2 border-black flex flex-col items-center justify-around'>

          {data.map((employee, index) => (
              data[index].isActive === true && (
                <EmployeeOnLeave 
                key ={index}
                employeeName={employee.fullName}
                
                />
              )
            ))}


            

          </div>
        </div>
        <div className='w-[60%] h-[90%] border-2 border-black rounded-[20px] flex flex-col items-center justify-around' >
        <h1>Leave requests :</h1>

        <div className='w-[90%] h-[90%] border-2 border-black flex flex-col items-center justify-around'>
        {tableData.map((leave, index) => (
              leave.leaveRequest.status === 'Pending' && (
                <LeaveRequests
                  employeeName={leave.employeeName}
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

export default DashboardAdmin




function DataCard(props) {
  return (
    <div className='w-[25%] min-h-[10rem] border-2 border-black rounded-[20px] flex flex-row items-center justify-around'>
      <img src="" alt=""  className='w-[6rem] h-[6em] rounded-[50%] border-2 border-black'/>
      <div className='flex flex-col items-center justify-around h-[100%] w-[60%]'>
        <h1>{props.head}</h1>
        <p>{props.sub}</p>
      </div>

    </div>
  )
}

function EmployeeOnLeave(props) {
  return (
    <div className='w-[100%] min-h-[5rem] border-2 border-black rounded-[20px] flex flex-row items-center justify-around'>
      
      
        <h1>{props.employeeName}</h1>
        <p>subheading</p>
      

    </div>
  )
}

function LeaveRequests(props) {
  return (
    <div className='w-[100%] min-h-[5rem] border-2 border-black rounded-[20px] flex flex-row items-center justify-around'>
      
      
        <h1>{props.employeeName}</h1>
        <p>{props.leave.leaveRequest.leaveType}</p>
      

    </div>
  )
}

