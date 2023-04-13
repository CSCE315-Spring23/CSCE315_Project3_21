import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';


export default function LoginPage() {
 return (
    <div style={{padding : "10px"}}>
        <TextField 
        required
        id="userTextbox" 
        label = "Username"
        />
        <TextField
        required
        id="passTextbox"
        label = "Password"
        type = "password"
        />
        <Button variant="contained" component = {Link} to="/RestockReportPage">Restock Report Page</Button>
    </div>
 )
}
