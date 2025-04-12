import './index.css'
import {useForm} from 'react-hook-form'
import { useState } from 'react'

function App() {
  const {register, handleSubmit, setError, formState: {errors, isSubmitting}, reset} = useForm()
  const [successMessage, setSuccessMessage] = useState('')

  const delay = (d) =>{
    return new Promise((resolve) => {
      setTimeout(()=>{
      resolve()
    }, d*1000);
  })
  }
  
  const onSubmit = async (data) => {
    await delay(2)
  
    try {
      let r = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
  
      if (!r.ok) {
        throw new Error(`Server responded with status ${r.status}`)
      }
  
      // let res = await r.json()
      reset()
      setSuccessMessage("Form submitted successfully!")
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      console.error('Submission failed:', error)
      setError('myform', { message: 'Something went wrong, please try again.' })
    }
  }
  

  return (
    <>
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-center fixed top-30">Basic Form</h1>
      {isSubmitting ? (
        <div className="text-black text-2xl font-bold text-center">Loading...</div>
      ) : (
    <div className="flex flex-col justify-center items-center h-screen">
      <form action="" className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" className="border-2 border-black p-2 rounded-md w-[400px] focus:outline-none focus:border-blue-500" {...register("name", {required: {value: true, message: "Name is required"}})}/>
        {errors.name && <p className="text-red-500 mt-[-15px] w-[400px]">{errors.name.message}</p>}
        <input type="email" placeholder="Email" className="border-2 border-black p-2 rounded-md w-[400px] focus:outline-none focus:border-blue-500" {...register("email", {required: {value: true, message: "Email is required"}, pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address"}})}/>
        {errors.email && <p className="text-red-500 mt-[-15px] w-[400px]">{errors.email.message}</p>}
        <input type="password" placeholder="Password" className="border-2 border-black p-2 rounded-md w-[400px] focus:outline-none focus:border-blue-500" {...register("password", {required: {value: true, message: "Password is required"}, minLength: {value: 8, message: "Password must be at least 8 characters"}, validate: (value) => {
          if(value.length < 8) {
            return "Password must be at least 8 characters"
          }
          return true
        }, pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"}})}/>
        {errors.password && <p className="text-red-500 mt-[-15px] w-[400px]">{errors.password.message}</p>}
        <input disabled={isSubmitting} type="submit" value="Submit" className="bg-blue-500 w-[400px] text-white p-2 rounded-md cursor-pointer hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 transition-all duration-300"/>
        {successMessage && (
  <div className="text-green-500 font-medium text-center w-[400px]">
            {successMessage}
          </div>
        )}
        {errors.myform && <div className="text-red-500 mt-[-15px] w-[400px] text-center">{errors.myform.message}</div>}
      </form>
    </div>
    )}
    </main>
    </>   
  )
}

export default App
