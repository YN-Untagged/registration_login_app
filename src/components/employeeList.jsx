import React from 'react';
import moment from 'moment';

function EmployeeList () {
    const employees = JSON.parse(localStorage.getItem("employees"));
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    return (
        <ul className='list-group'>
            { 
                employees.map((employee)=>
                    <li className='class="list-group-item d-flex justify-content-between align-items-center'>
                        {employee.email === user.email ?(
                            <a>
                                {employee.name + ' ' + employee.surname} <span>(You)</span>
                            </a>
                        ) 
                        : (
                            <a>
                                {employee.name + ' ' + employee.surname} <span>({employee.email})</span>
                            </a>
                        )}
                        
                        { employee.online ? (
                            <span className='badge bg-success'>online</span>
                        )
                        : (
                            <div className='align-items-center'>
                                <span className='badge bg-danger'>Offline</span><br/>
                                {
                                    moment(employee.lastSeen).isSame(Date.now(), 'day') ?
                                    (
                                        <span>{ moment(employee.lastSeen).format('HH:mm')}</span>
                                    )
                                    : moment(employee.lastSeen).isSame(Date.now, 'week') ?
                                    (
                                        <span> { moment(employee.lastSeen).format('dddd, HH:mm')}</span>
                                    )
                                    : moment(employee.lastSeen).isSame(Date.now, 'year') ?
                                    (
                                        <span> { moment(employee.lastSeen).format('MMMM DD, HH:mm')}</span>
                                    )
                                    :(
                                        <span> { moment(employee.lastSeen).format('YYYY MMMM DD, HH:mm')}</span>
                                    )
                                }
                                
                            </div>
                        )}
                    </li>
                )
            }
        </ul>
    );
}

export default EmployeeList;
