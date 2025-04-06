import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import add from '/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'

function LeaveApplication() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    async function postdata(data) {

        const realData = {
            data: data,
            adminId: localStorage.getItem('employeetoken')
        }

        console.log(realData)

        try {
            const response = await fetch('https://leave-management-system-backend-nu.vercel.app/leaveApplication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(realData)
            })
        }
        catch (err) {

        }
    }

    const [data, setData] = useState(null);


    return (
        <div className='bg-red-50 h-[100%]'>
            <div className='w-[100%] h-[14rem] border-2 border-black flex flex-col items-center justify-between bg-black '>
                <div className=' flex flex-row items-center justify-between w-[100%] h-[70%] border-2 border-black'>
                    <div className=' flex flex-col items-start justify-around ml-[2rem]'>


                        <h1 className='text-[2.5rem] font-[600] text-white'>Apply for Leave</h1>
                    </div>
                    {/* <div className='flex flex-row items-center justify-around h-[20%] w-[10%] rounded-[20px] border-2 border-white mr-[2rem] bg-white/60'>
                        <button ><img src={add} alt="" className='w-[100%] h-[100%]' /></button>
                        <p>Apply Leave</p>
                    </div> */}
                </div>

                <div className='w-[90%] h-[30%] flex justify-center  relative bottom-[-10%]'>
                    <form onSubmit={handleSubmit((data) => {
                        console.table(data)
                        setData(data)
                        postdata(data)



                    })}
                        className='flex flex-col items-center justify-around h-[25rem] w-[80%]  rounded-[20px] bg-white shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)]'>

                        <div className='w-[90%] flex flex-row items-center justify-between '>

                            <div className='flex flex-col items-center justify-between w-[45%]'>
                                <h1 className='w-[100%] flex flex-col items-start justify-center '>Leave Type :</h1>
                                <select id="role" {...register("leaveType")} placeholder="dropdown" defaultValue="" className='border-2 border-black/20 rounded-[5px] w-[100%] text-black p-1'>

                                    <option value="" disabled className='text-black/20'>
                                        Leave Type
                                    </option>

                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Earned Leave">Earned Leave</option>
                                </select>
                            </div>

                            <div className='flex flex-col items-center justify-between w-[45%]'>
                                <h1 className='w-[100%] flex flex-col items-start justify-center '>Leave Days :</h1>
                                <input placeholder="leaveDays"  {...register("leaveDays")} className='border-2 border-black/20 rounded-[5px] w-[100%] text-black p-1' />
                            </div>

                        </div>

                        <div className='w-[90%] flex flex-row items-center justify-between '>

                            <div className='flex flex-col items-center justify-between w-[45%]'>
                                <h1 className='w-[100%] flex flex-col items-start justify-center '>Start Date :</h1>
                                <input placeholder="Password" type='date' {...register("startDate")} className='border-2 border-black/20 rounded-[5px] w-[100%] text-black p-1'/>
                            </div>


                            <div className='flex flex-col items-center justify-between w-[45%]'>
                                <h1 className='w-[100%] flex flex-col items-start justify-center '>End Date :</h1>
                                <input placeholder="Password" type='date' {...register("endDate")} className='border-2 border-black/20 rounded-[5px] w-[100%] text-black p-1'/>
                            </div>
                        </div>
                        <div className='w-[90%] flex flex-row items-center justify-between '>
                            <div className='flex flex-col items-center justify-between w-[45%]'>
                                <h1 className='w-[100%] flex flex-col items-start justify-center '>Reason :</h1>
                                <input placeholder="Add more details" type='text' {...register("reason")} className='border-2 border-black/20 rounded-[5px] w-[100%] text-black p-1' />
                            </div>

                            <div className='flex flex-col items-center justify-between w-[45%]'>
                                <h1 className='w-[100%] flex flex-col items-start justify-center '>Attachement :</h1>
                                <input placeholder="Attach required documents" type='file' {...register("attachement")} className='border-2 border-black/20 rounded-[5px] w-[100%] text-black p-1' />
                            </div>

                        </div>



                        <input type="submit"  className='w-[40%] h-[2.5rem] bg-black text-white rounded-[20px]'/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LeaveApplication
