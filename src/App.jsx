import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import QuantityInput from './components/NumberInput';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const App = () => {
  const [quantity, setQuantity] = useState('1');
  const [device, setDevice] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const FormSubmitHandler = (e) => {
    e.preventDefault();
    const data ={
      teamid:"Gqjg6Jy",
      device: device,
      value: quantity
    }
    axios
    .post(`https://kodessphere-api.vercel.app/devices`, data)
    .then(()=> {
      
      // enqueueSnackbar('Order Placed', {variant: 'success'})
      console.log("sent")
    })
    .catch((error) => {
      setLoading(false);
      enqueueSnackbar(error.response.data , {variant: 'error'})
      console.log(error);
    })
    
  }
  const handleQuantityChange = (event) => {
    setQuantity(event)
    console.log(quantity)
  };
  const handleDevice = (event) => {
    setDevice(event.target.value);
    console.log(device)
  };

  return (
    <>
  <div className="bg-purple-600 min-h-screen flex items-center text-lg">
    <form onSubmit={FormSubmitHandler} className="p-10 md:w-2/3 lg:w-1/2 mx-auto rounded">
      <div className="shadow">
        <div className="flex items-center bg-purple-400 rounded-t-lg border-purple-500 border-b">
          {/* <label className="w-20 text-right mr-8 p-4 text-purple-200">Name</label>
          <input type="text" name="name" id="name" placeholder="Put in your name" className="flex-1 p-4 pl-0 bg-transparent placeholder-purple-300  outline-none text-white overflow-ellipsis overflow-hidden"/>
        </div>
        <div className="flex items-center bg-purple-400  rounded-b-lg border-purple-500 mb-10">
          <label className="w-20 text-right p-4 mr-8 text-purple-200">Twitter</label>
          <input type="text" name="twitter" id="twitter" placeholder="Put in Twitter pseudonym" className="flex-1 p-4 pl-0 bg-transparent placeholder-purple-300 outline-none text-white overflow-ellipsis overflow-hidden"/>
        </div> */}
        <Box sx={{ minWidth: 120 }} className="m-10">
      <FormControl fullWidth>
        <InputLabel id="container">Device</InputLabel>
        <Select
          labelId="container"
          id="container"
          value={device}
          label="Container"
          onChange={handleDevice}
        >
          <MenuItem value={'fan'}>Fan</MenuItem>
          <MenuItem value={'bulb'}>Bulb</MenuItem>
          <MenuItem value={'led'}>Led</MenuItem>
          <MenuItem value={'ac'}>A.C.</MenuItem>
        </Select>
      </FormControl>
    </Box>
        <div>
          <label>Speed</label>
        <QuantityInput onChange={handleQuantityChange}/>
        </div>
      </div>
      <button className="bg-pink-400 block w-full rounded py-4 text-white font-bold shadow">Submit</button>
        </div>
    </form>

  </div>
  </>
  );
};

export default App;
