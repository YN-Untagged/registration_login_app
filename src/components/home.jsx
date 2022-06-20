import React from 'react';
import Navigator from './navigator';
import EmployeeList from './employeeList';
import Login from './login';
import {Route, Navigate} from 'react-router-dom';

function Home (){
    
    return (
        sessionStorage.getItem('user') === null ? (
            <Login/>
        ) 
        : (
            <div className='container-fluid page'>
                <div className='side_nav'>
                    <Navigator/>
                </div>
                
                <div className='main_container'>
                    <EmployeeList />
                </div>
            </div>
        )
        
    );
}

export default Home;
