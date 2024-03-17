import React from 'react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner'
import PostDevices from './pages/PostDevices';
import GetDevices from './pages/GetDevices';


const App = () => {
  const [id, setId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [post, setPost] = useState(true)

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update input value
  };
  const idSubmitHandler = (e) => {
    setId(inputValue)
    e.preventDefault();
    toast.success('Success')
  }

  const postHandler = () => {
    setPost(!post)
  }

  return (
    <>
    <Toaster richColors position='bottom-center' />
    {id===""?
       <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black to-gray-800">
        <h1 className='text-white md:text-3xl sm:text-xl text-sm absolute top-0 my-10 font-sans'>Control Your Smart Devices Through Our Portal</h1>
        <form className='mb-10 flex flex-col justify-center items-center' onSubmit={idSubmitHandler}>
        <label className="flex justify-center my-2 text-white">Enter your team id to proceed</label>
        <input type="text" className="peer h-10 rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 w-max md:w-80 lg:w-96 ring-2 ring-slate-600" placeholder='Enter your teamId here' value={inputValue} onChange={handleInputChange}/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white m-5 p-2 rounded sm:w-[100px] w-fit" type="submit">
  Submit
</button>
        </form>
      </div>:post===true? <> <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 absolute top-0 right-0 m-5 mr-5" onClick={postHandler}>Get Status</button>
  <PostDevices id={id}/></>:post===false? <>
  <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 absolute top-0 right-0 m-5 mr-5" onClick={postHandler}>Configure Devices</button>
    <GetDevices id={id}/>
  </>:""
}
  </>
  );
};

export default App;
