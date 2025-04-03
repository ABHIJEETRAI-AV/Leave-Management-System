import React from 'react'

function EmployeeLeaveManager() {


    const leaveData = JSON.parse(localStorage.getItem('leaveData') || '[]')
    

    console.log(leaveData)
    return (
        <div className='flex flex-row items-center justify-around mt-[2rem]'>
            <div className='w-[90%]  border-2 border-black flex flex-col items-center justify-between '>

                <EmployeeLeaveDataCard 
                
                tableData={leaveData}
                />

            </div>
        </div>
    )
}

export default EmployeeLeaveManager



function EmployeeLeaveDataCard({tableData}) {
    console.log(tableData)
    return (
        <div className='w-[100%]  border-2 border-black rounded-[20px] flex flex-row items-center justify-around'>

            <table className='w-[100%] h-[100%] border-2 border-black'>
                <thead >
                    <tr className='w-[100%] h-[100%] border-2 border-black flex flex-row items-center justify-between'>
                        
                            <th className='flex items-center justify-center border-2 border-black' >Leave Type</th>
                            <th  className='flex items-center justify-center border-2 border-black'>Leave Days</th>
                            <th className='flex items-center justify-center border-2 border-black' >Start Date</th>
                            <th className='flex items-center justify-center border-2 border-black'>End Date</th>
                            <th className='flex items-center justify-center border-2 border-black'>Status</th>
                            <th className='flex items-center justify-center border-2 border-black'>Action</th>
                            
                        
                    </tr>
                </thead>
                <tbody className='w-[100%] h-[100%] border-2 border-black flex flex-col items-center gap-4'>

                    
                    
                    {tableData.map((row, index) => (
                        <tr key={index} className='w-[100%] h-[100%] border-2 border-black flex flex-row items-center justify-between' >
                            <td>{row.leaveType}</td>
                            <td>{row.leaveDays}</td>
                            <td>{row.startDate}</td>
                            <td>{row.endDate}</td>
                            <td>{row.status}</td>
                            <td>More</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}

