import {useState,useEffect} from 'react';

const ScrollToTop = () => {
    const [isVisible,setIsVisible] = useState(false);
    const handleScroll = () => window.scrollY > 200 ? setIsVisible(true) : setIsVisible(false);
    const scrollUp = () => window.scrollTo({top:0,behavior:'smooth',})

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <div className={`scroll-top ${isVisible ? 'visible' : ''}`} onClick={scrollUp}>
            Վերև <span>
              <img src="/img/arrow-top.png" alt="" />
            </span>
        </div>
    )
}

export default ScrollToTop;