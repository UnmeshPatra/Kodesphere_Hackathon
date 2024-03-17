import React, { useEffect } from 'react';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import QuantityInput from '../components/NumberInput';
import TempInput from '../components/TempInput';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { HexColorPicker } from "react-colorful";
import { Toaster, toast } from 'sonner'



const GetDevices = ({id}) => {
    const [color, setColor] = useState("#ffff");
    const [speed, setSpeed] = useState(0);
    const [temp, setTemp] = useState(16);
    const [device, setDevice] = useState('');
    const [bulb, setBulb] = useState(0)
    const [ac, setAc] = useState(0)
    const [data, setData] = useState({})
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://kodessphere-api.vercel.app/devices/${id}`);
          setData(response.data);
          toast.success("Success");
  
          // Assuming data.fan, data.bulb, data.led, data.ac exist in the API response structure
          setSpeed(response.data.fan.value);
          setBulb(response.data.bulb.value);
          setColor(response.data.led.value);
          setTemp(response.data.ac.value.temp);
          setAc(response.data.ac.value.state);
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error(error.message);
        }
      };
      fetchData();
      
    }, []); 
    const reloadHandler = () => {
      axios.get(`https://kodessphere-api.vercel.app/devices/${id}`)
      .then(response => {
        setData(
          response.data
        )
        toast.success("Success")
        setSpeed(data.fan.value)
        setBulb(data.bulb.value)
        setColor(data.led.value)
        setTemp(data.ac.value.temp)
        setAc(data.ac.value.state)

      })
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error(error.message)
      });
    }
  
    // const handleInputChange = (event) => {
    //   setInputValue(event.target.value); // Update input value
    // };
    // const idSubmitHandler = (e) => {
    //   setId(inputValue)
    //   e.preventDefault();
    //   toast.success('Success')
    // }
    const handleDevice = (event) => {
      setDevice(event.target.value);
    };
  
return(
<div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black to-gray-800">
<div className="mx-auto p-5 flex flex-col justify-between items-center border-purple-400 bg-gradient-to-b from-blue-300 to-purple-400 rounded-xl sm:h-[500px] transition-all duration-500 sm:min-w-[500px] shadow-teal-300 shadow-lg hover:shadow-xl h-fit">
    <div className="flex flex-col sm:flex-row pb-10 items-center sm:item sm:items-start
     sm:justify-between h-max transition-all duration-500 sm:mt-5 mt-1 w-max sm:h-[490px]">
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
<div className={`h-[300px] sm:w-[200px] w-fit ${device===""? "flex items-center":""}`}>
    {device==="fan"? <div>
      <label className='flex justify-center items-center'>Speed</label>
    <p className='text-center'>{speed}</p>
    <img src="/fan.png" className={`${speed!==0? "animate-spin":""} w-[200px] p-4`}/>
    </div>:device==="bulb"?<div className='flex flex-col items-center justify-center'>
    <p>{bulb}</p><div className="h-[150px]">
    {bulb===1? <img src="/bulb_on.png" className='w-[150px] p-5'/>:<img src="/bulb_off.png" className='w-[150px] p-5'/>}</div>
    </div>:device==="ac"?<>
    <div className='flex flex-col items-center'>
    <label className='text-sm m-1'>Condition</label>
    <p>{ac}</p>
    <label className='text-sm m-1'>Temperature</label>
    <p>{temp}</p>
    {ac===1? <img src="/ac_on.png" className='w-[200px] p-5'/>:<img src="/ac_off.png" className='w-[200px] p-5'/>}
    </div>
    </>:device==="led"? <div className='flex justify-center sm:w-[200px] w-[140px] items-center m-5'><div style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }}  className='w-[100px] h-[100px] items-center'>
    </div></div>:<p className='text-white'>Please Select a Device</p>}
  </div>
  </div>

  
  <div className='flex flex-col justify-center'>
  <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={reloadHandler}>Reload</button>
  </div>
</div>

</div>
)
}

export default GetDevices;
