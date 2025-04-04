import React, { useEffect } from 'react'
import { useState } from 'react'

function LeaveManager() {

  const [DataCard, setDataCard] = useState(false)
  const adminData = localStorage.getItem('adminData')
  const AdminData = JSON.parse(adminData)
  // console.log(AdminData)
  const AdminID = AdminData[0]._id
  const [tableData, setTableData] = useState([])
  // console.log(AdminID)

  async function getLeaveRequest() {

    const response = await fetch('http://localhost:3000/LeaveRequestData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ adminId: AdminID })
    })
    const data = await response.json()
    console.log(data)
    setTableData(data)
  }

  useEffect(() => {
    getLeaveRequest()
  }, [])






  return (
    <div>
      <table className='w-[100%] h-[100%] border-2 border-black'>
        <thead >
          <tr className='w-[100%] h-[100%] border-2 border-black flex flex-row items-center justify-between'>
            <th className='flex items-center justify-center border-2 border-black' >Employee</th>

            <th className='flex items-center justify-center border-2 border-black' >Leave Type</th>
            <th className='flex items-center justify-center border-2 border-black'>Leave Days</th>
            <th className='flex items-center justify-center border-2 border-black' >Start Date</th>
            <th className='flex items-center justify-center border-2 border-black'>End Date</th>
            <th className='flex items-center justify-center border-2 border-black'>Status</th>
            <th className='flex items-center justify-center border-2 border-black'>Action</th>


          </tr>
        </thead>
        <tbody className='w-[100%] h-[100%] border-2 border-black flex flex-col items-center gap-4'>



          {tableData.map((row, index) => (
            (row.leaveRequest.status === "Pending") && (
              <tr key={index} className='w-[100%] h-[100%] border-2 border-black flex flex-row items-center justify-between'>
                <td>{row.employeeName}</td>
                <td>{row.leaveRequest.leaveType}</td>
                <td>{row.leaveRequest.leaveDays}</td>
                <td>{row.leaveRequest.startDate}</td>
                <td>{row.leaveRequest.endDate}</td>
                <td>{row.leaveRequest.status}</td>
                <td onClick={() => { setDataCard(true) }}>More <div>{DataCard && <DecisionCard row={row} setDataCard={setDataCard} />}</div></td>
              </tr>
            )
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default LeaveManager;



function DecisionCard(props) {

  async function leaveDecider(num) {
    const leaveId = props.row.leaveRequest._id
    console.log(leaveId)

    if (num === 1) {
      var decision = "Approved"
    }
    else {
      var decision = "Rejected"
    }
    console.log(leaveId)
    const response = await fetch('http://localhost:3000/LeaveDecider', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ decision: decision, leaveId: leaveId })
    })
    const data1 = await response.json()
    console.log(data1)
    alert(`Leave ${decision}`)

  }

  return (
    <div className='w-[40rem] h-[30rem] border-2 border-black rounded-[20px] flex flex-col items-center justify-around fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <div className='flex flex-row items-center justify-between w-[90%]'>
        <h1>Employee : {props.row.employeeName}</h1>
        <h1>Leave Type : {props.row.leaveRequest.leaveType}</h1>
      </div>
      <div className='flex flex-row items-center justify-between w-[90%]'>
        <h1>From : {props.row.leaveRequest.startDate}</h1>
        <h1>to : {props.row.leaveRequest.endDate}</h1>
      </div>
      <div className='flex flex-row items-center justify-between w-[90%]'>

        <h1>Reason : {props.row.leaveRequest.reason}</h1>
      </div>
      <div className='flex flex-row items-center justify-between w-[90%]'>
        <button onClick={() => { leaveDecider(1), props.setDataCard(false) }}>Approve</button>
        <button onClick={() => { leaveDecider(0), props.setDataCard(false) }}> Reject</button>
      </div>


    </div>
  )
}

