import './myAuctions.css';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import { useEffect,useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import getUserAuction from '../../actions/getUserAuctions';

const MyAuctions = () => {
    const [auctions,setAuctions] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        const getitems = async () => {
            try {
                const res = await getUserAuction(user);
                setAuctions(res)
            }catch (error) {
                console.log(error);
            }
        };

        getitems();
    },[user]);

    console.log(auctions,'my auctions')

    return (
        <>
            <NavBar />
            <div className='container-my-auction'>
                
            </div>
            <Footer />
        </>
    )
}

export default MyAuctions;