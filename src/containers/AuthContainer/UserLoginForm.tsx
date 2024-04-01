import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "semantic-ui-react";

import CustomButton from "components/CustomButton";
import { HookFormInput } from "components/FormInputs";
import { URLRoutes } from "URLRoutes";
import { hookformRequired } from "utils/FormValidations";
import { getAuthState } from "store/selectors";
import "./style.scss";
import { requestLogin } from "store/actions";

const requiredValidation: any = {
  ...hookformRequired("Required"),
};

function UserLoginForm() {
  const { isAuthenticated } = useSelector(getAuthState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});


  useEffect(() => {
    if(isAuthenticated) {
      navigate(URLRoutes.clients.dashboard);
    }
  }, [isAuthenticated])

  const handleOnSubmit = async (data: any) => {
    dispatch(requestLogin(data));
  };
  
  return (
    <div className="flex flex-row flex-justify-center flex-align-center height-100">
      <div className="flex flex-column width-30 login-container">
        <div className="text-6 text-bold padding-t-6 padding-l-6">Welcome</div>
        <Divider inverted />
        <form onSubmit={handleSubmit(handleOnSubmit)} className="padding-6">
          <HookFormInput
            validation={requiredValidation}
            control={control}
            errors={errors}
            label="Username or Email"
            id="email"
            name="email"
          />
          <HookFormInput
            validation={requiredValidation}
            control={control}
            errors={errors}
            label="Password"
            id="password"
            name="password"
            type="password"
          />
          <CustomButton
            buttonText="Login"
            type="submit"
            baseclassname={"width-30"}
            primaryButton
          />
        </form>
      </div>
    </div>
  );
}

export default UserLoginForm;
