import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';

function EmployeeSignUp() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    async function postdata(data){

       const realData = {
        data: data,
        adminId: localStorage.getItem('token')
       }

       console.log(realData)

        try{
            const response = await fetch('http://localhost:3000/EmployeeSignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(realData)
            })
        }
        catch(err){

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

                <input placeholder="Username"  {...register("fullName")} />
                <input placeholder="Email"  {...register("email")} />


                <input placeholder="Password"  {...register("password")} />



                <input type="submit" />
            </form>
        </div>
    )
}

export default EmployeeSignUp
