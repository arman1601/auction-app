import './styles/mainPage.css';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../hooks/AuthProvider.jsx';
import { AuctionCard } from '../components/auctionCard/AuctionCard.jsx';
import { Pagination } from '../components/pagination/Pagination.jsx';
import { ScrollToTop } from '../components/models/scrollToTop/ScrollToTop.jsx';
import { handleSecureRequest } from '../actions/handleSecureRequest.js';
import { Error } from './Error.jsx';
import { Loading } from '../components/models/loading/Loading.jsx';

export const MainPage = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    const getItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const perPage = 9;
            const response = await handleSecureRequest(page, perPage);
            if (response) {
                setData(response.rows);
                setTotalPages(Math.ceil(response.countItems.count / perPage));
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        getItems();
    }, [getItems, user]);

    if (error) return <Error error={error} />;
    if (isLoading) return <Loading />;

    return (
        <div className='bodyPage'>
            <main className='mainCont'>
                <div className='promo-img'> </div>

                <h1>Ընթացիկ աճուրդներ</h1>
                {data.length === 0 && (
                    <div>In this time we didnt have active auctions. Please check later.</div>
                )}
                <div className='itemsCont'>
                    {data.length > 0 && data.map(elem => (
                        <AuctionCard key={elem.id} elem={elem} />
                    ))}
                </div>

                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </main>
            <ScrollToTop />
        </div>
    );
};
