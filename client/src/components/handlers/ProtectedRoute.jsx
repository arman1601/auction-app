import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(!user) {
      navigate('/login' )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  return children;
}
