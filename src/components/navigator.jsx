import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navigator(){
    const navigate = useNavigate();
    const logout = (()=>{
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