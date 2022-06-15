import React from 'react';
import Navigator from './navigator';
import Login from './login';
import EmployeeList from './employeeList';

function Home (){

    if(sessionStorage.getItem('user') === null ){
        return (<Login/>);
    } 
    
    return (
        <div className='container-fluid'>
            <Navigator/>
            <div className='container-fluid'>
                <EmployeeList />
            </div>
        </div>
    );
}

export default Home;
