import React, { useEffect, useState } from 'react';
import { getHistory } from '../utils/Api';
import { Box } from '@mui/material';
import { FormatDate } from '../utils/FormatDate';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function History() {
    const [history, setHistory] = useState();
    const userId = localStorage.getItem("ID") || null;
    async function fetchHistory(userId) {
        const data = await getHistory(userId);
        console.log(data, "dj");
        setHistory(data);
    }
    var dat = FormatDate("2023-04-10T18:06:34.821Z"
    )

    useEffect(() => {
        fetchHistory(userId)
        console.log(
            dat, "dat"
        )
    }, [])

    return (
        <Box width={{ xs: "80%", sm: "70%", md: "60%", lg: "50%" }} margin={'auto'}>

            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>BMI Value</TableCell>
                        <TableCell align="left"> Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history?.length ? <>   {history?.map((ele) => (
                        <TableRow
                            key={ele?.bmi}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell> {Math.floor(ele.bmi)} </TableCell>
                            <TableCell align="left">   {FormatDate(ele.timestamp)}
                            </TableCell>
                        </TableRow>
                    ))}</> : "No Record found"}
                </TableBody>
            </Table>


        </Box>
    );
}

export default History;