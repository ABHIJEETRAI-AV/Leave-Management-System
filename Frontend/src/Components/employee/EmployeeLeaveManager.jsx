import React from 'react'
import add from '/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'

function EmployeeLeaveManager({ setDashboard, setEmployee, setLeave, setProfile }) {


    const leaveData = JSON.parse(localStorage.getItem('leaveData') || '[]')


    // console.log(leaveData)
    return (
        <div className='flex flex-row items-center justify-around '>
            <div className='w-[100%]   flex flex-col items-center justify-between '>

                <EmployeeLeaveDataCard
                 setDashboard={setDashboard}
                 setEmployee={setEmployee}
                 setLeave={setLeave}
                 setProfile={setProfile}

                    tableData={leaveData}
                />

            </div>
        </div>
    )
}

export default EmployeeLeaveManager



function EmployeeLeaveDataCard({ tableData,setDashboard, setEmployee, setLeave, setProfile }) {
    // console.log(tableData)
    return (
        <div className='w-[100%]  border-2 border-black  '>



            <div className={`w-[100%] h-[14rem] border-2 border-black flex flex-col items-center justify-between  bg-black  `}>

                <div className={` flex flex-row items-center justify-between w-[100%] h-[70%] border-2 border-black`}>
                    <div className=' flex flex-col items-start justify-around ml-[2rem]'>


                        <h1 className='text-[2.5rem] font-[600] text-white'>Leave Requests</h1>
                    </div>
                    <div className='flex flex-row items-center justify-around h-[20%] w-[10%] rounded-[20px] border-2 border-white mr-[2rem] bg-white/60' onClick={(e) => { setLeave(true); setEmployee(false); setDashboard(false); setProfile(false); }} >
                        <button ><img src={add} alt="" className='w-[100%] h-[100%]' /></button>
                        <p>Apply Leave</p>
                    </div>
                </div>

                <div className='w-[90%] h-[30%] flex flex-col gap-12 relative bottom-[-10%] '>

                    <table className='w-[100%]   rounded-[20px] shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)] '>
                        <thead className='w-[100%] h-[4rem] bg-amber-100 rounded-t-[20px] flex items-center justify-center border-b-1 border-black/10' >
                            <tr className='w-[100%] h-[100%]  flex flex-row items-center justify-around'>


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
                                <tr key={index} className='w-[100%] h-[3rem]  flex flex-row items-center justify-around border-b-1 border-black/10' >
                                    <td>{row.leaveType}</td>
                                    <td>{row.leaveDays}</td>
                                    <td>{row.startDate}</td>
                                    <td>{row.endDate}</td>
                                    <td>{row.status}</td>
                                    <td className='flex items-center justify-center w-[4rem] h-[2rem] rounded-[20px]  bg-purple-500 text-white shadow-[0px_2px_15px_-3px_rgba(0,_0,_0,_0.55)]'>More</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>


            </div>



        </div>
    )
}

