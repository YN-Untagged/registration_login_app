import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './css/App.css';
import Home from './components/home';
import Login from './components/login';

function App() {

  if(localStorage.getItem('employees') === null){
    const date = new Date();
    let employees =[{ name: 'Employee', surname : 'Dummy', empNo : 'Emp101', email: 'employee1@mail.com', password : "pass123", src: 'images/profile.jpg', online: false, lastSeen: date}];
    localStorage.setItem('employees', JSON.stringify(employees));
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
