import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navigator(){
    const navigate = useNavigate();
    const logout = (()=>{
        ChangeUserStatus();
        sessionStorage.clear();
        navigate('/login');
    });

    return(
        <nav className='navbar navbar-expand-sm'>
            <div className='container-fluid justify-content-between'>
                <Link to='/' className='navbar-brand'>Home</Link>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <a className='nav-link' onClick={logout}> Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
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