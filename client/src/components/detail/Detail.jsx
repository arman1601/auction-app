import './detail.css';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useState,useEffect} from 'react';
import axios from 'axios';
import NavBar from '../navBar/NavBar';
import AddToCart from './addToCart/AddToCart';
import Footer from '../footer/Footer';
import CalculateDate from './addToCart/CalculateTime';
import { countries } from './slider/data.js';
import API_URL from '../../API_URL.js';
import Carousel from './slider/Carousel';
import Modal from './modal/Modal';

const Detail = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [elem,setElem] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    const [isModalVisible,setIsModalVisible] = useState(false);

    useEffect(() => {
        const postItem = async () => {
            try {
                const token = user.token;
                const response = await axios.get(`${API_URL}/api/auctions/item/${id}`,
                    { headers : { Authorization : token ? `Bearer ${token}` : '' } }
                )
                const data = response.data.data;
                if(!data) {
                    throw new Error('There was an error processing your request. Please try again later.');
                }
                if(data) {
                    setElem(data)
                }
                setLoading(false);
            }catch (error) {
                setLoading(false);
                setError(error.message)
            }
        };
        postItem();

    },[id,user]);

    if (error) return <div className="alert alert-danger" role="alert">{error}</div>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
        <NavBar/>
            {isModalVisible && <Modal isActive ={isModalVisible} setActive={setIsModalVisible}/>}
            <div className='detail'>
                <div className='detailCont-header'>
                    <h1>{elem.title}</h1>
                    <div style={{display:'flex',flexDirection : 'column',alignItems : 'end',gap : '1%'}}>
                        <h4>Աճուրդի մեկնարկը :
                            <span>{new Date(elem.auction_start).toLocaleDateString()} թ.</span>
                        </h4>
                        <CalculateDate auction_start={elem.auction_start} auction_end={elem.auction_end}/>
                    </div>
                </div>
                    <div className='detail-desc'>
                        <div className='detail-desc-cont'>
                            <Carousel images={countries}/>

                            <div className='detail-desc-text'>
                                <h2>Նկարագրություն</h2>
                                <h4>Առաջարկվում է մեկնարկային գինը բանկի կողմից : <span>{elem.price}</span> դրամ</h4>
                                <p>{elem.description}</p>
                            </div>
                        </div>

                        <div className='detail-info'>
                            <AddToCart elem={elem} showModal={() => setIsModalVisible(true)} />
                        </div>
                    </div>
                </div>
            <Footer />
        </>

        
    )
}

export default Detail;

