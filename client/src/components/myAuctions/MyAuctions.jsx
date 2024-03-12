import './myAuctions.css';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import CartItem from './CartIem';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import getUserAuction from '../../actions/getUserAuctions';

const MyAuctions = () => {
    const {user} = useAuth();
    const [auctions,setAuctions] = useState([]);
    const [error,setError] = useState('');

    useEffect(() => {
        const getitems = async () => {
            try {
                const res = await getUserAuction(user);
                setAuctions(res);
            }catch (error) {
                setError(error)
            }
        };

        getitems();
    },[user]);

    if (error) return <div className="errorMsg" role="alert">{error}</div>;


    return (
        <>
            <NavBar />
            <div className='container-my-auction'>
                {auctions?.length > 0 ? auctions.map(elem => {
                    return (
                        <CartItem key={elem.partipication.id} elem={elem}/>
                    )
                }) : (
                    <div style={{'textAlign':'center'}}>
                        Դուք դեռ չեք մասնակցել աճուրդի <br />
                        <Link to={'/main'}><button type='submit' className='go-to-main'>Դեպի գլխավոր էջ</button></Link>
                    </div>
                )}

            </div>
            <Footer />
        </>
    )
}

export default MyAuctions;