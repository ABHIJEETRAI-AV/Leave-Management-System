import React from 'react'
import { useForm } from "react-hook-form";
// import { useState } from 'react';

function EmployeeSignUp() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
                console.table(data)


            })}>

                <input placeholder="Username"  {...register("username")} />
                <input placeholder="Email"  {...register("email")} />


                <input placeholder="Password"  {...register("password")} />



                <input type="submit" />
            </form>
        </div>
    )
}

export default EmployeeSignUp
