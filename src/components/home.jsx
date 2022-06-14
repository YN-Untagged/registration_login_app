import React from 'react';
import Navigator from './navigator';
import Login from './login';

function Home (){

    if(sessionStorage.getItem('userName') === null ){
        return (<Login/>);
    } 
    
    return (
        <div className='container-fluid'>
            <Navigator/>
            <h1>Welcome!</h1>
        </div>
    );
}

export default Home;
