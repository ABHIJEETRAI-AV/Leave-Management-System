import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';


function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState(null);


  async function postData(data) {
    const response = await fetch('http://localhost:3000/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

  )}

  return (
    <div>
      <form onSubmit={handleSubmit((data) => {
        console.table(data)
        setData(data)
        postData(data)

      })}>

        <input placeholder="Username"  {...register("username")} />
        <input placeholder="Email"  {...register("email")} />


        <input placeholder="Password"  {...register("password")} />



        <input type="submit" />
      </form>
    </div>
  )
}

export default SignUp
