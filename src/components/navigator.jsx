import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/navigator.css';

function Navigator(){
    const navigate = useNavigate();
    const logout = (()=>{
        ChangeUserStatus();
        sessionStorage.clear();
        navigate('/login');
    });

    return(
        <ul className='nav flex-column bg-dark vh-100 align-items-center'>
            <li className='nav-item'>
                <a className='nav-link'><span><Link to='/' className='navbar-brand'>Home</Link></span><i className='fa fa-bars fa-2x'></i></a>
            </li>
            <li className='nav-item'>
                <a className='nav-link'><i className='fas fa-user-circle fa-2x'></i> <span>My Profile</span></a>
            </li>
            <li className='nav-item'>
                <a className='nav-link'> <i className='fas fa-bell fa-2x'></i> <span>Notifications</span></a>
            </li>
            <li className='nav-item'>
                <a className='nav-link'> <i className='fas fa-users fa-2x'></i> <span>Users</span></a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' onClick={logout}> <i className='fas fa-sign-out-alt fa-2x'></i> <span>Logout</span></a>
            </li>
        </ul>
    );
}

export default Navigator;

function ChangeUserStatus(){
    const userIndex = parseInt(sessionStorage.getItem('userIndex'));
    const employees = JSON.parse(localStorage.getItem('employees'));

    //Log user out and save time stamp
    employees[userIndex].online = false;
    employees[userIndex].lastSeen = Date.now();

    localStorage.setItem('employees', JSON.stringify(employees));

}