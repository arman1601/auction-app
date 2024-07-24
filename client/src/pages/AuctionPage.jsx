import './styles/auctionPage.css';
import { useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { countries } from '../components/models/slider/data.js';
import { AuctionDedlineDate } from '../components/auctionCard/AuctionDedlineDate.jsx';
import { SubmitProposal } from '../components/models/submitProposal/SubmitProposal';
import Carousel from '../components/models/slider/Carousel';
import { Modal } from '../components/models/modal/Modal';
import { axiosInstance } from '../config.js';
import { Loading } from '../components/models/loading/Loading.jsx';
import { Error } from './Error.jsx';

export const AuctionPage = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [elem,setElem] = useState(null);
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [isModalVisible,setIsModalVisible] = useState(false);

    useEffect(() => {
        const postItem = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(`/api/auctions/item/${id}`)
                const data = response.data.data;
                if(!data) {
                    throw new Error('There was an error processing your request. Please try again later.');
                }
                if(data) {
                    setElem(data)
                }
            }catch (error) {
                setError(error)
            }finally {
                setIsLoading(false);
            }
        };
        postItem();

    },[id,user]);

    if (error) return <Error error={error} />;
    if (isLoading) return <Loading />;

    return (
        <>
            {isModalVisible && <Modal 
                isActive ={isModalVisible} setActive={setIsModalVisible}
                title={'Հաջող'}
                message={'Ձեր առաջարկը ընդունված է'}
                linkText={'Գնալ դեպի իմ աճուրդներ'}
                linkTo={'/personal-auctions'}
            />}
            {elem && 
                <div className='detail'>
                <div className='detailCont-header'>
                    <h1>{elem?.title}</h1>
                    <div style={{display:'flex',flexDirection : 'column',alignItems : 'end',gap : '1%'}}>
                        <h4>Աճուրդի մեկնարկը :
                            <span>{new Date(elem?.auction_start).toLocaleDateString()} թ.</span>
                        </h4>
                        <AuctionDedlineDate auction_start={elem?.auction_start} auction_end={elem?.auction_end}/>
                    </div>
                </div>
                    <div className='detail-desc'>
                        <div className='detail-desc-cont'>
                            <Carousel images={countries}/>

                            <div className='detail-desc-text'>
                                <h2>Նկարագրություն</h2>
                                <h4>Առաջարկվում է մեկնարկային գինը բանկի կողմից : <span>{elem?.price}</span> դրամ</h4>
                                <p>{elem?.description}</p>
                            </div>
                        </div>

                        <div className='detail-info'>
                            <SubmitProposal elem={elem} showModal={() => setIsModalVisible(true)} />
                        </div>
                    </div>
                </div>
            }
            
        </>
    );
};

