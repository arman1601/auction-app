import {useState,useEffect,useCallback,useMemo} from 'react';
import PropTypes from 'prop-types';

const CalculateDate  = ({auction_end}) =>{ 
    const [timeRemaining,setTimeRemaining] = useState(null);
    
    const calculateTimeRemaining  = useCallback(() => {
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
        
    },[auction_end]);

    useEffect(() => {
      calculateTimeRemaining();

      const timerId = setInterval(calculateTimeRemaining, 60000);
      return () => clearInterval(timerId);
    },[calculateTimeRemaining]);
    
    const memoizedTimeRemaining = useMemo(() => timeRemaining, [timeRemaining]);

    if (!memoizedTimeRemaining) {
      return null;
    }

    const {days,hours,minutes} = memoizedTimeRemaining;

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
                  <span >{days} օր <span>:</span>&nbsp;{hours} ժամ &nbsp;<span>:</span>&nbsp;{minutes} րոպե</span>
                </p>
            </div>
            )}

        </div>
    )
}

CalculateDate.propTypes = {
  auction_end : PropTypes.string,

}

export default CalculateDate;