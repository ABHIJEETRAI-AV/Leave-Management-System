import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';

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
            const response = await fetch('http://localhost:3000/leaveApplication', {
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
        <div>
            <form onSubmit={handleSubmit((data) => {
                console.table(data)
                setData(data)
                postdata(data)


            })}>

                <select id="role" {...register("leaveType")} placeholder="dropdown" defaultValue="" className='border-2 border-black rounded-[5px] w-[65%] text-black p-1'>

                    <option value="" disabled className='text-black/20'>
                        Leave Type
                    </option>

                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Earned Leave">Earned Leave</option>
                </select>
                <input placeholder="leaveDays"  {...register("leaveDays")} />


                <input placeholder="Password" type='date' {...register("startDate")} />

                <input placeholder="Password" type='date' {...register("endDate")} />

                <input placeholder="Add more details" type='text' {...register("reason")} />



                <input type="submit" />
            </form>
        </div>
    )
}

export default LeaveApplication
