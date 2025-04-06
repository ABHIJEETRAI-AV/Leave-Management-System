import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useEffect } from 'react';
import add from '/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import close from '/src/assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'

function EmployeeSignUp(props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState(null);
  const [signup, setSignup] = useState(false);
  const adminData = localStorage.getItem('adminData')
  const AdminData = JSON.parse(adminData)
  console.log(AdminData[0]._id)
  console.log(AdminData)

  async function postdata(data) {

    const realData = {
      data: data,
      adminId: localStorage.getItem('token')
    }

    console.log(realData)

    try {
      const response = await fetch('http://leave-management-system-backend-nu.vercel.app/EmployeeSignUp', {
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



  async function getEmployeeData(AdminData) {

    const reponse = await fetch('http://leave-management-system-backend-nu.vercel.app/getEmployeeData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: AdminData

      })
    })


    const data = await reponse.json()
    setData(data)

  }

  useEffect(() => {
    getEmployeeData(AdminData[0]._id)
  }, [])



  return (
    <div className='w-[100%] h-[100%] bg-red-50 '>

      <div className={`w-[100%] h-[14rem] border-2 border-black flex flex-col items-center justify-between  bg-black  ${signup ? 'blur-sm' : ''}`}>

        <div className=' flex flex-row items-center justify-between w-[100%] h-[70%] border-2 border-black'>
          <div className=' flex flex-col items-start justify-around ml-[2rem]'>


            <h1 className='text-[2.5rem] font-[600] text-white'>Employees</h1>
          </div>
          <div className='flex flex-row items-center justify-around h-[20%] w-[10%] rounded-[20px] border-2 border-white mr-[2rem] bg-white/60' onClick={() => setSignup(!signup)}>
            <button ><img src={add} alt="" className='w-[100%] h-[100%]' /></button>
            <p>Add employee</p>
          </div>
        </div>




        <div className='w-[90%] h-[25%]  grid grid-cols-3 justify-items-center gap-x-4 gap-y-4 justify-around relative bottom-[-10%]'>

          {data && data.map((employee, index) => (
            <EmployeeList key={index} employee={employee} />
          ))}

          {/* <EmployeeList  key='1' employee='employee'/>
  <EmployeeList  key='1' employee='employee'/>
  <EmployeeList  key='1' employee='employee'/> */}

        </div>

      </div>


      {signup && <form onSubmit={handleSubmit((data) => {
        console.table(data)

        postdata(data)




      })}

        className='w-[30%] h-[25rem]  flex flex-col items-center justify-between fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-[20px] shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)] '
      >

        <div className='w-[100%] h-[15%] flex flex-row items-center justify-between  bg-black rounded-t-[20px] border-t-3 border-l-3 border-r-3 border-white'>
          <h1 className='text-[2rem] font-[600] w-[90%] flex justify-center items-center text-white'>Add Employee</h1>
          <button className='w-[10%] flex justify-center items-end' onClick={() => setSignup(!signup)}><img src={close} alt="" /></button>
        </div>
        <input placeholder="Username"  {...register("fullName")} className='border-b-2 border-black w-[50%] ' />
        <input placeholder="Email"  {...register("email")} className='border-b-2 border-black w-[50%] '/>


        <input placeholder="Password"  {...register("password")} className='border-b-2 border-black w-[50%] ' />



        <input type="submit" className='mb-[1rem] w-[30%] h-[2rem] rounded-[20px] flex flex-row items-center justify-center border-2 border-black bg-black text-white'/>
      </form>}


    </div>
  )
}

export default EmployeeSignUp



function EmployeeList(props) {
  return (
    <div className='w-[80%] h-[15rem]  flex flex-col items-center justify-around bg-white rounded-[20px] shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)]'>

      <div className='w-[5rem] h-[5rem] rounded-[50%] border-2 border-black'><img src={props.employee && props.employee.profilePicture} alt="" className='w-[100%] h-[100%] rounded-[50%] fill-white' /></div>
      <h1 className='text-[1.5rem] font-[500] '>{props.employee.fullName}</h1>
      <p>{props.employee._id}</p>
      <button className='w-[30%] rounded-[20px] flex flex-row items-center justify-center border-2 border-black bg-black text-white'>More</button>

    </div>
  )
}

