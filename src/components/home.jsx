import React from 'react';
import Navigator from './navigator';
import Login from './login';
import EmployeeList from './employeeList';

function Home (){

    if(sessionStorage.getItem('user') === null ){
        return (<Login/>);
    } 
    
    return (
        <div className='container-fluid page'>
            <div className='side_nav'>
                <Navigator/>
            </div>
            
            <div className='main_container'>
                <EmployeeList />
            </div>
        </div>
    );
}

export default Home;
