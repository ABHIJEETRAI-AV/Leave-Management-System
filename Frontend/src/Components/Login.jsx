import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

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

    if (token.message === 'password incorrect') {
      alert('Password incorrect')
    } else {
      if(data.role==='Admin'){
        navigate('/homeAdmin', { state: { token: token } })
      }else{
        navigate('/homeEmployee', { state: { token: token } })
      }
      
    }


  }

  return (
    <div className='flex items-center justify-center h-[100vh] bg-black'>

      <div className='flex items-center justify-between   w-[70%] h-[70%]'>
        <div className='flex flex-col items-center justify-around  w-[50%] h-[100%]'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-[3.5rem] font-[900] text-white'>Welcome Back</h1>
            <p className='text-center text-[1.3rem] font-[200] text-neutral-500'>Login to continue your journey with <div className='text-cyan-400 font-[500]'>ZAMARI</div></p>
          </div>
          <div className='flex flex-col items-center justify-center gap-3'>
            <p className='text-neutral-500'>Don't have an account?</p>
            <button className='bg-white h-[2rem] w-[12rem] rounded-[8px] font-[400] '><NavLink to="/SignUp">Register</NavLink></button>
          </div>
        </div>




        <div className='w-[50%] h-[100%] flex flex-col items-center justify-center'>



          <form onSubmit={handleSubmit((data) => {
            console.table(data)

            postData(data)

          })}
            className='flex flex-col gap-4 items-center justify-around rounded-[10px]  p-4 w-[80%] h-[90%] bg-conic-180 from-white via-rose-400 to-white
bg-clip-padding
backdrop-filter
backdrop-blur
shadow-[0px_0px_20px_3px_rgba(0,_255,_255,_0.5)]
backdrop-saturate-100
backdrop-contrast-100

bg-blend-overlay'

          >

            <h1 className='text-[2rem] font-[600] text-black'>Login</h1>

            <input placeholder="Username"  {...register("username")}

              className='border-2 border-black0 rounded-[5px] w-[65%] text-black p-1'

            />


            <input placeholder="Password"  {...register("password")}

              className='border-2 border-black rounded-[5px] w-[65%] text-black p-1'

            />

            <select id="role" {...register("role")} placeholder="dropdown" defaultValue="" className='border-2 border-black rounded-[5px] w-[65%] text-black p-1'>

              <option value="" disabled className='text-black/20'>
                Select your Role
              </option>

              <option value="Ceo">CEO</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>





            <input type="submit" className='w-[60%] bg-black text-white font-[500] h-[3rem] rounded-[8px]' />
          </form>

        </div>

      </div>


    </div>
  )
}
