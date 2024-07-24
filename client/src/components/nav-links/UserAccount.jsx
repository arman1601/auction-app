import './userAccount.css'
import { useState } from "react";
import { useAuth } from '../../hooks/AuthProvider';

export const UserAccount = () => {
    const {user,logout} = useAuth();
    const [isDropdownVisible,setDropdownVisible] = useState(false);
    const handleUserMouse = () => {
        setDropdownVisible(!isDropdownVisible)
    }
    
    return (
        <div className="nav-link nav-user" onMouseEnter={handleUserMouse} onMouseLeave={handleUserMouse}> 
            Ողջույն,<br/>
            <span>{user ? user.username : ''}</span>
            {isDropdownVisible && (
                <div className="dropdown">
                    <ul>
                        <li>in process</li>
                        <li>in process</li>
                        <li>in process</li>
                        <li><button className = 'dropdown-btn' onClick={logout}>Logout</button></li>
                    </ul>
                </div>
            )}
            
        </div>
    );
};
