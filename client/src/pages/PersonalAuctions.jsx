import './styles/personalAuctions.css';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { PersonalAuctionCart } from '../components/auctionCard/PersonalAuctionCart';
import { getUserAuction } from '../actions/getUserAuctions.js';
import { Error } from './Error.jsx';

export const PersonalAuctions = () => {
    const {user} = useAuth();   
    const [auctions,setAuctions] = useState([]);
    const [error,setError] = useState('');

    useEffect(() => {
        const getitems = async () => {
            try {
                console.log(user)
                const res = await getUserAuction(user);
                setAuctions(res);
            }catch (error) {
                console.log(error)
                setError(error)
            }
        };
        getitems();
    },[user]);

    if (error) return <Error error={error} />;

    return (
        <>
            <div className='container-my-auction'>
                {auctions?.length > 0 ? auctions.map(elem => {
                    return (
                        <PersonalAuctionCart key={elem.partipication.id} elem={elem}/>
                    )
                }) : (
                    <div style={{'textAlign':'center'}}>
                        Դուք դեռ չեք մասնակցել աճուրդի <br />
                        <Link to={'/main'}><button type='submit' className='go-to-main'>Դեպի գլխավոր էջ</button></Link>
                    </div>
                )}

            </div>
        </>
    );
};

