import './body.css'
import { useEffect,useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import NavBar from '../navBar/NavBar';
import Item from './item/Item';
import Pagination from '../pagination/Pagination';
import Footer from '../footer/Footer';
import handleSecureRequest from '../../actions/handleSecureRequest';

const Body = () => {
    const {user} = useAuth();
    const [data,setData] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(null);

    useEffect(() => {
        const getItems = async () => {
            try {
                const token = user.token;
                const perPage = 9;
                const response = await handleSecureRequest(page,perPage,token);
                if(response) {
                    setData(response.rows);
                    setTotalPages(Math.ceil(response.countItems.count / perPage))
                }else {
                    throw new Error('errr in getItems')
                }
            }catch (error) {
                setError(`Internal server error: Try later`)
            }finally {
                setLoading(false);
            }
        };
        getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page]);


    if (error) return <div className="errorMsg" role="alert">{error}</div>;
    if (loading) return <p>Загрузка...</p>;

    return (
        <div className='bodyPage'>
            <NavBar/>
            <main className='mainCont'>
                <div className='promo-img'> </div>

                <h1>Ընթացիկ աճուրդներ</h1>
                <div className="itemsCont">
                    {data.length === 0 && (
                        <div>Items not found</div>
                    )}
                    {data.length > 0 && data.map(elem => (
                        <Item key={elem.id} elem={elem} />
                    ))}
                </div>

                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </main>
            <Footer />
        </div>
    )
}

export default Body;