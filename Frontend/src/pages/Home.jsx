import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios'
import { Alert, Box, Button, Input, TextField, Typography } from '@mui/material';
import { getBmiValue } from '../utils/Api';


function Home() {

    const id = localStorage.getItem("ID") || null;
    const [inputData, setInputData] = useState({ userId: id, height: "", weight: "" });

    const [bmi, setBmi] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };
    const fetchBmi = async (data) => {
        const res = await getBmiValue(data);
        setBmi(res.bmi);
        console.log(res, "fbi")
    }


    const handleSubmit = async () => {

        if (inputData.height.length && inputData.weight.length) {
            await fetchBmi(inputData);
            setInputData({
                height: "",
                weight: ""
            })
        }
    }






    const { height, weight } = inputData;

    return (

        <Box width={{ xs: "90%", sm: "42%", md: "32%", lg: "32%", xl: "32%" }} m='auto' mt={'50px'}>
            {bmi ? <Typography textAlign={'center'} pb={'22px'}> Your Bmi is : {bmi}</Typography> : ""}
            <Box width={'100%'} display={'flex'} justifyContent={'space-between'} >
                <TextField id="outlined-basic" type='number' label="Height(feets)" variant="outlined" name="height"
                    value={height}
                    onChange={handleChange} />
                <TextField id="outlined-basic" type='number' label="Weight(kgs)" variant="outlined"
                    name="weight"
                    value={weight}
                    onChange={handleChange} /></Box>
            <Box width='30%' margin={'auto'} marginTop={'30px'} >    <Button variant="contained" onClick={handleSubmit}> Calculate</Button></Box>



        </Box>

    );
}

export default Home;