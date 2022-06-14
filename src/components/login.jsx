import React, { useState } from 'react';
import swal from 'sweetalert';
import {useNavigate} from "react-router-dom";

function Login () {
    const navigate = useNavigate();

    const checkUser=((e)=>{
        e.preventDefault();
        CheckUser(e.target.email.value);
        navigate('/');     
    });

    const registerUser = ((e)=>{
        e.preventDefault();
        RegisterUser();
    })

    return (
        <div className='container-fluid'>
            <div>
                <div>
                    <form id='login-form' onSubmit={checkUser}>
                        <input type='email' name='email' placeholder='Email' required />
                        <input type='password' name='password' placeholder='Password' required />
                        <button type='submit'>Login</button>
                    </form>
                </div>
                <div>
                    <form id='register-form' onSubmit={registerUser}>
                        <input type='text' name='name' placeholder='Name' required />
                        <input type='text' name='surname' placeholder='Surname' required />
                        <input type='text' name='empNo' placeholder='Employee No.' required />
                        <input type='email' name='email' placeholder='Email' required />
                        <input type='password' name='password' placeholder='Password' required />
                        <input type='password' name='cpassword' placeholder='Confirm Password' required />
                        <input type='file' name='profile'/>
                        <button type='submit'>Register</button>
                    </form>
                </div>
            </div>    
        </div>
    );
}

export default Login;

function RegisterUser(){
    swal({
        title: 'Registered successfully',
        text: 'Your account has been registered',
        icon: 'success',
    });
}

function CheckUser(userName){
    sessionStorage.setItem('userName', userName);
}
