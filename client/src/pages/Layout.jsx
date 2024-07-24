import { NavBar } from './NavBar';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

export const Layout = () => {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}