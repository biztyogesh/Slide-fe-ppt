import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createTemplates,
  requestTemplateDetail,
  updateTemplate,
} from "store/rext/action";
import { getTemplateFormData } from "store/selectors";
import { useForm } from "react-hook-form";
import { HookFormInput } from "components/FormInputs";
import CustomButton, {
  ICON_POSITION,
} from "components/CustomButton/CustomButton";
import { SVGType } from "components/SvgIcon";
import { hookformRequired } from "utils/FormValidations";
import Loading from "components/Loading";
import DefaultColorPalleteForm from "./DefaultColorPalleteForm";
import ColorPalletsForm from "./ColorPalletsForm";

import "./style.scss";

const requiredValidation = {
  ...hookformRequired("Required"),
};

interface ITemplateForm {
  name: string;
  templateTypeId: string;
}

export const DEFAULT_VALUE: ITemplateForm = {
  name: "",
  templateTypeId: "",
};

function TemplateForm() {
  const { templateId, templateTypeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: templateDetail, fetching: templateFetching } =
    useSelector(getTemplateFormData);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return templateDetail || DEFAULT_VALUE;
    }, [templateDetail]),
  });

  useEffect(() => {
    if (templateId) {
      dispatch(requestTemplateDetail({ templateId }));
    }
  }, [templateId, dispatch]);

  const handleOnSubmit = (data: any) => {
    const transformedData = {
      name: data.name,
      staticImageDir: data.staticImageDir,
      templateTypeId: templateDetail.templateTypeId || templateTypeId,
      defaultColorPallete: data.defaultColorPallete,
      colorPalletes: data.colorPalletes,
    };
    // console.log(data, transformedData, templateDetail);
    if (templateId) {
      dispatch(updateTemplate({ templateId }, transformedData));
    } else {
      dispatch(createTemplates(transformedData));
    }
  };

  useEffect(() => {
    if (templateId) {
      reset(templateDetail);
    } else {
      reset(DEFAULT_VALUE);
    }
  }, [reset, templateId, templateDetail]);

  return (
    <div className="height-100">
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
      {templateFetching && <Loading />}
      {!templateFetching && (
        <div className="flex flex-row flex-justify-center height-85">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className=" margin-3 width-80 background-white-shade-1 templateform-container"
          >
            <div className="text-6 text-bold margin-4">
              {templateId ? "Update Template" : "Create Template"}
            </div>
            <div className="padding-l-4 padding-r-4 height-70 width-100 overflow-auto">
              <HookFormInput
                name="name"
                id="name"
                label="Name"
                control={control}
                errors={errors}
                validation={requiredValidation}
                baseClassName="width-50 margin-l-4"
              />
              <HookFormInput
                name="staticImageDir"
                id="staticImageDir"
                label="Static Image Directory"
                control={control}
                errors={errors}
                validation={requiredValidation}
                baseClassName="width-50 margin-l-4"
              />
              <DefaultColorPalleteForm
                label="Default Color Pallete"
                name="defaultColorPallete"
                control={control}
                errors={errors}
              />
              <ColorPalletsForm
                label="Color Palletes"
                name="colorPalletes"
                control={control}
                errors={errors}
              />
            </div>
            <div className="flex flex-row flex-justify-center flex-align-center margin-t-4">
              <CustomButton
                buttonText={templateId ? "Update" : "Create"}
                type="submit"
                primaryButton
                round
                baseclassname={"cursor-pointer padding-2 margin-l-3"}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TemplateForm;
