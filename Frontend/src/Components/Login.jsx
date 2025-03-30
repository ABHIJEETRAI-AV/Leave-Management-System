import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [token, setToken] = useState(null);

  const navigate = useNavigate();




  async function postData(data) {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const token = await response.json();
     setToken(token)
    console.log(token)
    navigate('/homeAdmin', { state:{ token: token}  })


  }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => {
        console.table(data)

         postData(data)
        
      })}>

        <input placeholder="Username"  {...register("username")} />


        <input placeholder="Password"  {...register("password")} />



        <input type="submit" />
      </form>
    </div>
  )
}
