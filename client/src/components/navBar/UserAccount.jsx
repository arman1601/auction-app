import './userAccount.css'
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const UserAccount = () => {
    const {user,logout} = useAuth();
    const [isDropdownVisible,setDropdownVisible] = useState(false);
    const handleUserMouse = () => {
        setDropdownVisible(!isDropdownVisible)
    }

    return (
        <div className="nav-link nav-user" onMouseEnter={handleUserMouse} onMouseLeave={handleUserMouse}> 
            hello,<br/>
            {user ? user.username : ''}
            {isDropdownVisible && (
                <div className="dropdown">
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>34</li>
                        <li><button className = 'dropdown-btn' onClick={logout}>Logout</button></li>
                    </ul>
                </div>
            )}
            
        </div>
    )
}

export default UserAccount;