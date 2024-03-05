import {useState,useEffect} from 'react';
import PropTypes from 'prop-types';

const CalculateDate  = ({auction_start,auction_end}) =>{ 
    const [timeRemaining,setTimeRemaining] = useState(null);
    
    useEffect(() => {
        const calculateTimeRemaining  = () => {
            const end = new Date(auction_end);
            const dateNow = new Date();
            const difference = Math.floor(end-dateNow) ; 

            let timeLeft = {};
  
            if (difference >  0) {
              timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
              };
            } else {
              timeLeft = {
                minutes : "Closed",
              };
            }
            setTimeRemaining(timeLeft);
        };

        calculateTimeRemaining();
        
        const timerId = setInterval(calculateTimeRemaining, 60000);
        return () => clearInterval(timerId);

    },[auction_end,auction_start]);
    
    if(!timeRemaining) {
        return null;
    }

    const {days,hours,minutes} = timeRemaining;

    return (
        <div className='date-cont'>
            {minutes === 'Closed' ?  (
              <div style={{color : 'red'}}>Աճուրդն ավարտված է</div>
            ) : (
              <div>
                <h3 className="text">
                  Մինչև աճուրդի ավարտը
                </h3>
                <p className='countdown'>
                  {days} օր <span>:</span>&nbsp;{hours} ժամ &nbsp;<span>:</span>&nbsp;{minutes} րոպե
                </p>
            </div>
            )}

        </div>
    )
}

CalculateDate.propTypes = {
  auction_start : PropTypes.string.isRequired,
  auction_end : PropTypes.string.isRequired,

}

export default CalculateDate;