import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import { getAuthState } from "store/selectors";
import { URLRoutes } from 'URLRoutes';
import Header from "components/Header/Header";
import ModalManager from "containers/ModalManager";
import "./style.scss";
import { useEffect } from "react";


export default function SecureRoute() {
  const { isAuthenticated, fetchingUser } = useSelector(getAuthState);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!fetchingUser && !isAuthenticated) {
      navigate(URLRoutes.clients.login);
    }
  }, [fetchingUser, isAuthenticated])


  return (
    <div className="main flex flex-column">
      <Header />
      <div className="outlet width-100 position-relative">
        <Outlet />
      </div>
      <ModalManager />
      <ToastContainer />
    </div>
  );
}
