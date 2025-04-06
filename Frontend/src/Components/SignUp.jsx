import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { NavLink } from 'react-router';


function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState(null);


  async function postData(data) {
    const response = await fetch('http://leave-management-system-backend-nu.vercel.app/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    )
  }

  return (
    <div className='flex flex-row items-center justify-center  h-[100vh] bg-amber-50'>

      <div className='flex items-center justify-center   w-[70%] h-[70%]'>
        <div className='flex flex-col items-center justify-around  w-[50%] h-[100%]'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-[3.5rem] font-[900] text-black'>Welcome !</h1>
            <p className='text-center text-[1.3rem] font-[200] text-neutral-500'>Register and start your journey with <div className='text-orange-700 font-[500]'>ZAMARI</div></p>
          </div>
          <div className='flex flex-col items-center justify-center gap-3'>
            <p className='text-neutral-900'>Already have an account?</p>
            <button className='bg-black text-white h-[2rem] w-[12rem] rounded-[8px] font-[400] '><NavLink to="/">Login</NavLink></button>
          </div>
        </div>
      </div>


      <div className='w-[50%] h-[100%] flex flex-col items-center justify-center'>
        <form onSubmit={handleSubmit((data) => {
          console.table(data)
          setData(data)
          postData(data)



        })}
          className='flex flex-col gap-4 items-center justify-around rounded-[10px]  p-4 w-[80%] h-[90%] bg-black
      bg-clip-padding
      
      backdrop-saturate-100
      backdrop-contrast-100
      
      bg-blend-overlay'>

          <h1 className='text-[2rem] font-[600] text-white'>Sign Up</h1>

          <input placeholder="Username"  {...register("username")}
            className='border-2 border-black0 rounded-[5px] w-[65%] text-neutral-300 p-1'
          />
          <input placeholder="Email"  {...register("email")}
            className='border-2 border-black0 rounded-[5px] w-[65%] text-neutral-300 p-1'
          />


          <input placeholder="Password"  {...register("password")}
            className='border-2 border-black0 rounded-[5px] w-[65%] text-neutral-300 p-1'
          />



          <input type="submit" className='w-[60%] bg-white text-black font-[500] h-[3rem] rounded-[8px]'/>
        </form>
      </div>
    </div>
  )
}

export default SignUp
