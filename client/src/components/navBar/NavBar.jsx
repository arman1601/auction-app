import './navBar.css';
import Logo from './Logo';
import UserAccount from './UserAccount';
import SavedItems from './SavedItems';

const NavBar = () => {

    return (
        <div className="navbar">
            <Logo />
            <div className="nav-items">
                <div className="nav-link navlink-hidden">
                    <span>Գնումների բաժին</span>
                    <p>gnumner@conversebank.am</p>
                </div>
                <div className="nav-link navlink-hidden">
                    <span>Երկ-ուրբաթ 9:00 - 18:00</span>
                    <p>+374777777777</p>
                </div>
                <SavedItems/>
                <UserAccount />

            </div>
            <hr/>
        </div>
    )
}

export default NavBar;