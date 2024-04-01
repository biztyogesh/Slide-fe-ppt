import { useNavigate } from "react-router-dom";

import CustomButton from "components/CustomButton";
import SvgIcon, { SVGType } from "components/SvgIcon";
import { URLRoutes } from "URLRoutes";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "store/selectors";
import { requestLogout } from "store/actions";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(getAuthState);

  const handleClick = () => {
    navigate(URLRoutes.clients.dashboard);
  };
  
  const handleLogout = () => {
    dispatch(requestLogout());
  };
  

  return (
    <div className="background-secondary-color flex flex-align-center  header">
      <div className="text-9 text-primary-color text-bold cursor-pointer margin-l-3 width-70" onClick={handleClick}>
        GPT-PPT
      </div>
      <div className="flex flex-row flex-end width-30">
        <div className="width-70 text-4 text-align-center text-primary-color flex  flex-justify-end">
          <SvgIcon svgType={SVGType.SEMANTIC} name={"user circle"}/>{user?.email}
        </div>
        <CustomButton buttonText="Logout" baseclassname={"margin-l-4"} handleClick={handleLogout} transparent primaryButton noPadding noOutline buttonTextClass={"text-primary-color"}/>
      </div>
    </div>
  );
}
