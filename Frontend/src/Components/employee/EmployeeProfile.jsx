
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from "react-hook-form";
import close from '/src/assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'


function EmployeeProfile() {


    const [picture, setPicture] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [employeeData, setEmployeeData] = useState(null)
    const [url, setUrl] = useState(null)

    async function handleFile(file) {

        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "b2z6mh0c");
            data.append("cloud_name", "dtzgh8app");

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/dtzgh8app/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const img = await res.json();

            setUrl(img.url)
            setPicture(false)
            alert("Profile picture changed successfully")
        }


    }

    async function upload(url) {

        const response = await fetch('http://localhost:3000/uploadImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: url,
                token: localStorage.getItem('employeetoken')
            })
        })

        const data = await response.json();
        setEmployeeData(data)
        console.log(data)
    }

    useEffect(() => {
        upload(url)
    }, [url])

    return (
        <div>
            <div className={`w-[100%] h-[14rem] border-2 border-black flex flex-col items-center justify-between bg-black ${picture||changePassword ? "blur-sm" : ""}`}>
                <div className=' flex flex-row items-center justify-between w-[100%] h-[70%] border-2 border-black'>
                    <div className=' flex flex-col items-start justify-around ml-[2rem]'>


                        <h1 className='text-[2.5rem] font-[600] text-white'>Profile</h1>
                    </div>
                    {/* <div className='flex flex-row items-center justify-around h-[20%] w-[10%] rounded-[20px] border-2 border-white mr-[2rem] bg-white/60'>
                        <button ><img src={add} alt="" className='w-[100%] h-[100%]' /></button>
                        <p>Apply Leave</p>
                    </div> */}
                </div>

                <div className='w-[90%] h-[30%] relative bottom-[-5%]  flex flex-row  justify-center gap-[12rem]'>
                    <div className='flex flex-col items-center justify-start  w-[20%] h-[20rem] gap-4'>
                        <div className='w-[15rem] h-[15rem] rounded-[50%] shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)] bg-white flex items-center justify-center'>{employeeData && <img src={employeeData.profilePicture} alt="" className='w-[90%] h-[90%] rounded-[50%] ' />}</div>
                        <button className='w-[50%] h-[3rem] rounded-[20px] flex flex-row items-center justify-center  bg-purple-500 text-white shadow-[0px_2px_15px_-3px_rgba(0,_0,_0,_0.55)]' onClick={() => setPicture(true)}>Change Picture</button>
                    </div>

                    <div className='w-[40%] h-[25rem]  bg-white rounded-[20px] shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)] flex flex-col items-center justify-around'>

                        <h1 className='w-[80%] flex flex-row items-center justify-start gap-4'>Name: <div className='text-black text-[1.5rem] font-[500]'>{employeeData && employeeData.fullName} </div></h1>
                        <h1 className='w-[80%] flex flex-row items-center justify-start gap-4'>Email: <div className='text-black text-[1.5rem] font-[500]'>{employeeData && employeeData.email}</div> </h1>
                        {/* <h1>Designation: {employeeData.designation && employeeData.designation}</h1>
                        <h1>Department: {employeeData.department && employeeData.department}</h1>
                        <h1>Mobile Number: {employeeData.mobile && employeeData.mobile}</h1> */}
                        <button className='w-[50%] h-[3rem] rounded-[20px] flex flex-row items-center justify-center  bg-purple-500 text-white shadow-[0px_2px_15px_-3px_rgba(0,_0,_0,_0.55)]' onClick={() => setChangePassword(true)}>Change Password</button>

                    </div>

                </div>
            </div>

            {picture && <div className='w-[40%] h-[20rem] rounded-[20px] flex flex-row items-center justify-around bg-white shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>

                <input type="file" className='text-black' onChange={(e) => { handleFile(e.target.files[0]) }} />

            </div>}

            {changePassword && <ChangePassword 
            setChangePassword={setChangePassword}
            />}


        </div>
    )
}

export default EmployeeProfile



function ChangePassword({ setChangePassword }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    async function postdata(data) {

        const realData = {
            role: 'employee',
            data: data,
            token: localStorage.getItem('employeetoken')
        }

        if (data.newPassword === data.checkPassword) {
            try {
                const response = await fetch('http://localhost:3000/changePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(realData)
                })
            }
            catch (err) {
console.log(err)
            }
        }
        else {
            alert('Passwords do not match')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
                console.table(data)

                postdata(data)




            })}

                className='w-[30%] h-[25rem]  flex flex-col items-center justify-between fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-[20px] shadow-[0px_21px_23px_-3px_rgba(0,_0,_0,_0.55)] '
            >

                <div className='w-[100%] h-[15%] flex flex-row items-center justify-between  bg-black rounded-t-[20px] border-t-3 border-l-3 border-r-3 border-white'>
                    <h1 className='text-[2rem] font-[600] w-[90%] flex justify-center items-center text-white'>Change Password</h1>
                    <button className='w-[10%] flex justify-center items-end' onClick={() => setChangePassword(false)}><img src={close} alt="" /></button>
                </div>
                <input placeholder="Password"  {...register("password")} className='border-b-2 border-black w-[50%] ' />
                <input placeholder="New Password"  {...register("newPassword")} className='border-b-2 border-black w-[50%] ' />


                <input placeholder="Retype Password"  {...register("checkPassword")} className='border-b-2 border-black w-[50%] ' />



                <input type="submit" className='mb-[1rem] w-[30%] h-[2rem] rounded-[20px] flex flex-row items-center justify-center border-2 border-black bg-black text-white' />
            </form>
        </div>
    )
}

