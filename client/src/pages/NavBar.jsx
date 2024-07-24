import './styles/navBar.css';
import { UserAccount } from '../components/nav-links/UserAccount';
import { SavedItems } from '../components/nav-links/SavedItems';
import { Logo } from '../components/nav-links/Logo'
    
export const NavBar = () => {

    return (
        <div className='navbar'>
            <Logo />
            <div className='nav-items'>
                <div className='nav-link navlink-hidden'>
                    <span>Գնումների բաժին</span>
                    <p>gnumner@loremipsum.com</p>
                </div>
                <div className='nav-link navlink-hidden'>
                    <span>Երկ-ուրբաթ 9:00 - 18:00</span>
                    <p>+123777777777</p>
                </div>
                <SavedItems/>
                <UserAccount />
            </div>
            <hr/>
        </div>
    )
}
