import React, { useEffect } from 'react'
import { useState } from 'react'
import add from '/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import close from '/src/assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'

function LeaveManager() {

  const [DataCard, setDataCard] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);

  const adminData = localStorage.getItem('adminData')
  const AdminData = JSON.parse(adminData)
  // console.log(AdminData)
  const AdminID = AdminData[0]._id
  const [tableData, setTableData] = useState([])
  // console.log(AdminID)

  async function getLeaveRequest() {

    const response = await fetch('http://leave-management-system-backend-nu.vercel.app/LeaveRequestData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ adminId: AdminID })
    })
    const data = await response.json()
    // console.log(data)
    setTableData(data)
  }

  useEffect(() => {
    getLeaveRequest()
  }, [])






  return (
    <div>

      <div className={`w-[100%] h-[14rem] border-2 border-black flex flex-col items-center justify-between  bg-black  `}>

        <div className={` flex flex-row items-center justify-between w-[100%] h-[70%] border-2 border-black ${DataCard ? 'blur-sm' : ''}`}>
          <div className=' flex flex-col items-start justify-around ml-[2rem]'>


            <h1 className='text-[2.5rem] font-[600] text-white'>Leave Requests</h1>
          </div>
          <div className='flex flex-row items-center justify-around h-[20%] w-[10%] rounded-[20px] border-2 border-white mr-[2rem] bg-white/60' >
            <button ><img src={add} alt="" className='w-[100%] h-[100%]' /></button>
            <p>Add employee</p>
          </div>
        </div>

        <div className='w-[90%] h-[30%] flex flex-col gap-12 relative bottom-[-10%] '>

          <table className='w-[100%]   rounded-[20px] shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)] '>
            <thead className='w-[100%] h-[4rem] bg-amber-100 rounded-t-[20px] flex items-center justify-center' >
              <tr className='w-[100%] h-[100%]  flex flex-row items-center justify-around'>
                <th className='flex items-center justify-center ' >Employee</th>

                <th className='flex items-center justify-center ' >Leave Type</th>
                <th className='flex items-center justify-center '>Leave Days</th>
                <th className='flex items-center justify-center ' >Start Date</th>
                <th className='flex items-center justify-center '>End Date</th>
                <th className='flex items-center justify-center '>Status</th>
                <th className='flex items-center justify-center '>Action</th>


              </tr>
            </thead>
            <tbody className='w-[100%] h-[100%]  flex flex-col items-center gap-4'>



              {tableData.map((row, index) => (
                (row.leaveRequest.status === "Pending") && (
                  <tr key={index} className='w-[100%] h-[3rem]  flex flex-row items-center justify-around'>
                    <td className='flex items-center justify-center '>{row.employeeName}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.leaveType}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.leaveDays}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.startDate}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.endDate}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.status}</td>
                    <td onClick={() => { setSelectedRow(row); setDataCard(true); console.log(selectedRow) }} className='flex items-center justify-center w-[4rem] h-[2rem] rounded-[20px]  bg-purple-500 text-white shadow-[0px_2px_15px_-3px_rgba(0,_0,_0,_0.55)]'>More <div>{DataCard && <DecisionCard key={index} row={selectedRow} setDataCard={setDataCard}  />}</div></td>
                  </tr>
                )
              ))}
            </tbody>
          </table>

          <table className='w-[100%]   rounded-[20px] shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)] '>
            <thead className='w-[100%] h-[4rem] bg-amber-100 rounded-t-[20px] flex items-center justify-center' >
              <tr className='w-[100%] h-[100%]  flex flex-row items-center justify-around'>
                <th className='flex items-center justify-center ' >Employee</th>

                <th className='flex items-center justify-center ' >Leave Type</th>
                <th className='flex items-center justify-center '>Leave Days</th>
                <th className='flex items-center justify-center ' >Start Date</th>
                <th className='flex items-center justify-center '>End Date</th>
                <th className='flex items-center justify-center '>Status</th>
                <th className='flex items-center justify-center '>Action</th>


              </tr>
            </thead>
            <tbody className='w-[100%] h-[100%]  flex flex-col items-center gap-4'>



              {tableData.map((row, index) => (
                (row.leaveRequest.status != "Pending") && (
                  <tr key={index} className='w-[100%] h-[3rem]  flex flex-row items-center justify-around'>
                    <td className='flex items-center justify-center '>{row.employeeName}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.leaveType}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.leaveDays}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.startDate}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.endDate}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.status}</td>
                    <td className='flex items-center justify-center'>{row.leaveRequest.updatedAt}</td>
                    {/* <td onClick={() => { setSelectedRow(row); setDataCard(true); console.log(selectedRow) }} className='flex items-center justify-center w-[4rem] h-[2rem] rounded-[20px]  bg-purple-500 text-white shadow-[0px_2px_15px_-3px_rgba(0,_0,_0,_0.55)]'>More <div>{DataCard && <DecisionCard key={index} row={selectedRow} setDataCard={setDataCard}  />}</div></td> */}
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
        

      </div>

    </div>
  )
}

export default LeaveManager;



function DecisionCard(props) {

  async function leaveDecider(num) {
    const leaveId = props.row.leaveRequest._id
    // console.log(props.row)

    if (num === 1) {
      var decision = "Approved"
    }
    else {
      var decision = "Rejected"
    }
    console.log(leaveId)
    const response = await fetch('http://leave-management-system-backend-nu.vercel.app/LeaveDecider', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ decision: decision, leaveId: leaveId })
    })
    // const data1 = await response.json()
    // console.log(data1)
    props.setDataCard(false)
    alert(`Leave ${decision}`)
    

  }

  return (
    <div className='w-[40rem] h-[30rem]  rounded-[20px] flex flex-col items-center justify-between fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white text-black shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)]'>
      <div className='text-[2rem] w-[100%] h-[4rem] font-[500] flex items-center justify-center rounded-t-[20px] bg-black text-white border-t-2 border-white border-l-2 border-r-2'>Leave Details</div>
      <div className='flex flex-row items-center justify-between w-[90%]'>
        <h1 className='w-[50%]  flex flex-row items-center justify-start gap-2 text-blue-600'>Employee : <div className='text-[1.5rem] font-[500] text-black'>{props.row.employeeName} </div></h1>
        <h1>Leave Type : {props.row.leaveRequest.leaveType}</h1>
      </div>
      <div className='flex flex-row items-center justify-between w-[90%]'>
        <h1>From : {props.row.leaveRequest.startDate}</h1>
        <h1>to : {props.row.leaveRequest.endDate}</h1>
      </div>
      <div className='flex flex-row items-center justify-between w-[90%]'>

        <h1>Reason : {props.row.leaveRequest.reason}</h1>
      </div>
      <div className='flex flex-row items-center justify-between w-[90%] mb-[2rem]'>
        <button onClick={() => { leaveDecider(1) }} className='w-[30%] h-[2.5rem] rounded-[20px] flex flex-row items-center justify-center  bg-green-600 text-white'>Approve</button>
        <button onClick={() => { leaveDecider(0) }} className='w-[30%] h-[2.5rem] rounded-[20px] flex flex-row items-center justify-center  bg-red-600 text-white'> Reject</button>
      </div>


    </div>
  )
}

