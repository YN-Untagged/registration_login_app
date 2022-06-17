import React from 'react';
import swal from 'sweetalert';
import {useNavigate} from "react-router-dom";
import '../css/login.css';

function Login () {
    const navigate = useNavigate();

    const checkUser=((e)=>{
        e.preventDefault();

        const form = e.target;
        const validated = ValidateLogin(form.email.value, form.password.value);
        if(validated){
            navigate('/');
        }
        else{
            swal({
                title: 'Invalid login.',
                text: 'You have entered in valid login details. Please enter valid login details or register a new account.',
                icon: 'error',
            });
        }   
    });

    const registerUser = ((e)=>{
        e.preventDefault();

        const form = e.target;

        if(form.password.value === form.cpassword.value){
            RegisterUser(form);
        }
        else{
            swal({
                title: `Passwords don't match.`,
                text: `Your password doesn't match the confirm password. Please enter matching password`,
                icon: 'error',
            });
        }
    });

    const saveImage = ((e)=>{
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = function(){
            sessionStorage.setItem('profile', reader.result);
        };
    });
    
    const flipToLogin = (()=>{
        FlipTo('login');
    });

    const flipToRegister= (()=>{
        FlipTo('register');
    })

    return (
        <div className='container-fluid vh-100 d-flex justify-content-center login_container'>
            <div className='flip-card d-flex justify-content-center'>
                <div>
                
                    <div className='flip-card-inner'>
                        <div className='flip-card-front'>
                            <form id='login-form' onSubmit={checkUser}>
                                <h1>Login</h1>
                                
                                <div className='input-group mb-5'>	
                                    <span className='input-group-text'><i className='fas fa-envelope'></i></span>
                                    <input className='form-control form-control-lg' type='email' name='email' placeholder='Email' id='email' required />
                                </div>

                                <div className='input-group mb-5'>
                                    <span className='input-group-text'><i className='fas fa-lock'></i></span>
                                    <input className='form-control form-control-lg' type='password' name='password' placeholder='Password' required />
                                </div>
                                
                                <button className='btn btn-dark btn-lg' type='submit' id='login-btn'>Login</button>
                            </form>
                        </div>
                        <div className='flip-card-back'>
                            <form id='register-form' onSubmit={registerUser}>
                                <h1>Register</h1>
                                <div className='input-group mb-5'>
                                    <span className='input-group-text'><i className='fas fa-user-tie'></i></span>
                                    <input className='form-control' type='text' name='name' placeholder='Name' required /> <span>&emsp;&emsp;</span>
                                    <input className='form-control' type='text' name='surname' placeholder='Surname' required />
                                </div>
                                <div className='input-group mb-5'>	
                                    <span className='input-group-text'><i className='fas fa-id-card-alt'></i></span>
                                    <input className='form-control' type='text' name='empNo' placeholder='Employee No.' pattern='[A-Z]{3}[-][0-9]{4}' required />
                                </div>
                                <small className='format_text'>Format: EMP-0000</small>
                                <div className='input-group mb-5'>	
                                    <span className='input-group-text'><i className='fas fa-envelope'></i></span>
                                    <input className='form-control' type='email' name='email' placeholder='Email' required />
                                </div>
                                <div className='input-group mb-5'>	
                                    <span className='input-group-text'><i className='fas fa-lock'></i></span>
                                    <input className='form-control' type='password' name='password' placeholder='Password' required />
                                </div>
                                <div className='input-group mb-5'>	
                                    <span className='input-group-text'><i className='fas fa-lock'></i></span>
                                    <input className='form-control' type='password' name='cpassword' placeholder='Confirm Password' required />
                                </div>
                                <div className='input-group mb-5'>
                                    <input className='form-control' type='file' name='profile' onChange={saveImage}/>
                                </div>

                                <button className='btn btn-dark btn-lg' type='submit' id='reg-btn'>Register</button>
                            </form>
                            
                        </div>
                    </div>
                    <div className='d-flex justify-content-between btn_container'>
                        <button className='btn btn-light flip_btn' onClick={flipToRegister}>Register</button>
                        <button className='btn btn-dark flip_btn' onClick={flipToLogin}> Login</button>
                    </div>
                </div>
                
            </div>   
        </div>
    );
}

export default Login;

function RegisterUser(form){
    //Check if user account doesn't already exists
    const user = CheckUser(form.email.value, form.empNo.value);

    //If no user is found, add user to storage
    if(user === null){
        let src = 'images/profile.jpg'; 
        const employees = JSON.parse(localStorage.getItem('employees')),
        date = new Date();

        if(sessionStorage.getItem('profile') !== null ){
            src = sessionStorage.getItem('profile');
        } 

        const user = {
            name: form.name.value,
            surname: form.surname.value,
            empNo: form.empNo.value,
            email: form.email.value,
            password: form.password.value,
            src: src,
            lastSeen: date
        }

        employees.push(user);
        localStorage.setItem('employees',JSON.stringify(employees));

        sessionStorage.removeItem('profile');
        form.reset();
        document.getElementById('email').value = user.email;
        FlipTo('login');

        swal({
            title: 'Registered successfully',
            text: 'Your account has been registered',
            icon: 'success',
        });
    }
    else{
        //if user account is found return error message
        swal({
            title: 'Registration Failed.',
            text: 'The email or employee number you have entered has already been used. Please try a different email/employee number or login if you already have an account.',
            icon: 'error',
        });
    }

}

function CheckUser(email, empNo){
    const employees = JSON.parse(localStorage.getItem('employees'));

    for(var i = 0; i < employees.length; i++){
        //Find user with same email or employee number
        //if found return user details
        if(employees[i].email === email || employees[i].empNo === empNo){
            sessionStorage.setItem('userIndex', i);
            return employees[i];
        }
    }

    return null;
}

function ValidateLogin(email, password){

    let valid = false;
    const user = CheckUser(email, null);
    const employees = JSON.parse(localStorage.getItem('employees'));
    const userIndex = parseInt(sessionStorage.getItem('userIndex'));

    //if user is found
    if(user !== null){
        //check if input password matches stored password
        if(user.password === password ){
            valid = true;

            //change user states
            employees[userIndex].online = true;

            //update database(localStorage)
            localStorage.setItem("employees", JSON.stringify(employees));
            sessionStorage.setItem('user', JSON.stringify(employees[userIndex]));
        }
    }

    return valid;
}

function FlipTo(page){
    if(page === 'login'){
        document.getElementsByClassName('flip-card-inner')[0].style.transform =  'rotateY(0deg)';
    }
    else{
        document.getElementsByClassName('flip-card-inner')[0].style.transform =  'rotateY(180deg)';
    }

}