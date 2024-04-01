import { Fragment, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createLayout,
  requestLayoutDetail,
  updateLayouts,
} from "store/rext/action";
import { getLayoutFormData, getTemplateFormData } from "store/selectors";
import { useForm } from "react-hook-form";
import { HookFormInput, HookFormTagInput } from "components/FormInputs";
import CustomButton, {
  ICON_POSITION,
} from "components/CustomButton/CustomButton";
import { SVGType } from "components/SvgIcon";
import { hookformRequired } from "utils/FormValidations";
import Loading from "components/Loading";

import "./style.scss";

interface ILayoutForm {
  name: string;
  templateId: string;
}

export const DEFAULT_VALUE: ILayoutForm = {
  name: "",
  templateId: "",
};

function LayoutForm() {
  const { slideLayoutId , templateTypeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: layoutDetail, fetching: layoutFetching } = useSelector(getLayoutFormData);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return layoutDetail || DEFAULT_VALUE;
    }, [layoutDetail]),
  });

  useEffect(() => {
    if (slideLayoutId) {
      dispatch(requestLayoutDetail({ slideLayoutId }));
    }
  }, [slideLayoutId, dispatch]);

  const handleOnSubmit = (data : any) => {
    console.log(data , "layout");
    const transformedData = {
      name : data.name,
      templateTypeId: layoutDetail.templateTypeId || templateTypeId
    }    
    if (slideLayoutId) {
      dispatch(updateLayouts({ slideLayoutId }, transformedData));
    } else {
      dispatch(createLayout(transformedData));
    }
  };
  useEffect(() => {
    if (slideLayoutId) {
      reset(layoutDetail);
    } else {
      reset(DEFAULT_VALUE);
    }
  }, [reset, slideLayoutId, layoutDetail]);

  return (
    <Fragment>
      <CustomButton
        primaryButton
        type="button"
        handleClick={() => navigate(-1)}
        iconProps={{
          name: "arrow left",
          svgType: SVGType.SEMANTIC,
          size: "large",
          baseclassname: "text-default-color",
        }}
        iconPosition={ICON_POSITION.RIGHT}
        transparent
        noOutline
        baseclassname={"cursor-pointer"}
      />
      {layoutFetching && <Loading />}
      {!layoutFetching && (
        <div className="flex flex-row flex-justify-center width-65 height-75 background-white-shade-1 layout-form-wrapper">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="width-50 margin-3 layout-form-container"
          >
            <h3 className="margin-l-3 padding-t-4">
              {slideLayoutId ? "Update Layout" : "Create Layout"}
            </h3>
            <div className="">
              <HookFormInput
                name="name"
                id="name"
                label="Name"
                control={control}
                errors={errors}
                baseClassName="width-90 margin-l-4"
              />
            </div>
            <div className="flex flex-row">
              <CustomButton
                buttonText={slideLayoutId ? "Update" : "Create"}
                type="submit"
                primaryButton
                round
                baseclassname={"cursor-pointer padding-2 margin-l-3"}
              />
            </div>
          </form>
          <div className="width-50 flex flex-column">
            <img
              src={"/images/formImage.png"}
              alt="template"
              className="width-100 height-100"
            />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default LayoutForm;
