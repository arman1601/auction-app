import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  // const { user,logout } = useAuth();
  // const {expiresIn} = user;

  // const convertExpiresInToTimestamp = (expiresIn) => {
  //     if(!expiresIn) {
  //       return console.log('err')
  //     }

  //     const regex = /(\d+)([hms])/;
  //     const matches = expiresIn.match(regex);

  //     if(!matches) {
  //       return console.log('Invalid format')
  //     }

  //     const value = parseInt(matches[1]);
  //     const unit = matches[2];
  //     let multiplier;
  //     if (unit === 'h') {
  //         multiplier = 60 * 60 * 1000;
  //     }else if (unit === 'm') {
  //         multiplier = 60 * 1000;
  //     }else {
  //         return null;
  //     }

  //     return Date.now() + multiplier  * value;
  // };

  // useEffect(() => {

  //   console.log('mta protected')
  //   const expirationTime = convertExpiresInToTimestamp(expiresIn);


  //   const checkSession = () => {
  //     if(!expiresIn || Date.now() > expirationTime) {
  //       logout();
  //       console.log('Your session time is expired')
  //     }
  //   };

  //   checkSession();

  //   const intervalId = setInterval(checkSession,1000);

  //   return () => clearInterval(intervalId);

  // },[expiresIn,user])

  const {user,logout} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

      if(!user || Date.now() > user.expirationDate) {
        logout();
        navigate('/login');
      }
  },[user,logout])

  return children;
}
