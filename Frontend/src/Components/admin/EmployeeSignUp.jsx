import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useEffect } from 'react';

function EmployeeSignUp(props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [data, setData] = useState(null);
    const adminData = localStorage.getItem('adminData')
    const AdminData = JSON.parse(adminData)
    console.log(AdminData[0]._id)
    console.log(AdminData)

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

    

     async function getEmployeeData(AdminData){
    
        const reponse = await fetch('http://localhost:3000/getEmployeeData', {
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
        <div className='w-[100%] h-[100%] border-2 border-black flex flex-col gap-[2rem] items-center justify-center'>
            <form onSubmit={handleSubmit((data) => {
                console.table(data)
                
                postdata(data)

               


            })} 
            
             className='w-[70%] h-[15rem] border-2 border-black flex flex-col items-center justify-around mt-[2rem]'
            >

                <input placeholder="Username"  {...register("fullName")} />
                <input placeholder="Email"  {...register("email")} />


                <input placeholder="Password"  {...register("password")} />



                <input type="submit" />
            </form>

            <div className='w-[90%] border-2 border-black grid grid-cols-3 justify-items-center gap-4 justify-around'>

                {data && data.map((employee, index) => (
                    <EmployeeList key={index} employee={employee} />
                ))}

               
                
            </div>
        </div>
    )
}

export default EmployeeSignUp



 function EmployeeList(props) {
  return (
    <div className='w-[80%] h-[15rem] border-2 border-black flex flex-col items-center justify-center'>

        <img src="" alt="" />
        <h1>{props.employee.fullName}</h1>
        <p>{props.employee._id}</p>
        <button>More</button>
      
    </div>
  )
}

