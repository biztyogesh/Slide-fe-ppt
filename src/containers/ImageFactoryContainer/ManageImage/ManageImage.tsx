import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "components/CustomButton";
import { HookFormInput, HookFormTagInput } from "components/FormInputs";
import ImageUploader from "components/ImageUploader/ImageUploader";
import { hookformRequired } from "utils/FormValidations";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getImageFactoryManageState } from "store/selectors";
import { useNavigate } from "react-router-dom";
import { SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import { requestImageFactoryManage } from "store/rext";
import Loading from "components/Loading";
import UsePrevious from "containers/HOC/UsePrevious";

const requiredValidation = {
  ...hookformRequired("Required"),
};

interface IDefaultValues {
  image: any;
  x: number;
  y: number;
  radius: number;
  keywords: string[];
  title: string;
}

const DEFAULT_VALUES: IDefaultValues = {
  x: 0,
  y: 0,
  radius: 0,
  keywords: [],
  image: "",
  title: ""
};

function ImageForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetching, error } = useSelector(getImageFactoryManageState);
  const wasfecthing = UsePrevious(fetching);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const disabled: boolean = watch("image");

  const handleOnSubmit = useCallback(async (data: any) => {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("x", data.x);
    formData.append("y", data.y);
    formData.append("radius", data.radius);
    formData.append("title", data.title);

    const Keywords = getValues("keywords");
    if (Keywords && Keywords.length > 0) {
      formData.append("keywords", JSON.stringify(Keywords));
    }

    dispatch(requestImageFactoryManage(formData));
  }, []);

  const handleReset = () => {
    reset(DEFAULT_VALUES);
    window.location.reload();
  };

  useEffect(() => {
    if (wasfecthing && !fetching && !error) {
      toast.info("Uploading done");
    }
  }, [wasfecthing, fetching])


  return (
    <div className="width-100 height-96">
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
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-row margin-t-4 height-98"
      >
        <ImageUploader
          name="image"
          control={control}
          errors={errors}
          validation={requiredValidation}
          setValue={setValue}
          reset={reset}
          baseClassname="width-60"
        />
        <div className="flex flex-column width-40">
          <div className="text-7 text-bold text-secondary-color padding-t-2 padding-b-6">
            Image Uploader Form
          </div>
          <HookFormInput
            label="Title"
            name="title"
            baseClassName="width-81"
            control={control}
            errors={errors}
            validation={{}}
            disabled={!disabled}
          />
          <div className="flex flex-row">



            <HookFormInput
              label="Focus Point X"
              name="x"
              baseClassName="width-40"
              control={control}
              errors={errors}
              validation={{}}
              disabled={!disabled}
            />
            <HookFormInput
              label="Focus Point Y"
              name="y"
              baseClassName="width-40 margin-l-2"
              control={control}
              errors={errors}
              validation={{}}
              disabled={!disabled}
            />
          </div>
          <HookFormInput
            label="Radius"
            name="radius"
            baseClassName="width-81"
            control={control}
            errors={errors}
            validation={{}}
            disabled={!disabled}
          />
          <HookFormTagInput
            label="Keywords"
            name="keywords"
            control={control}
            errors={errors}
            validation={requiredValidation}
            setValue={setValue}
            getValue={getValues}
            baseClassName="width-81"
            imageTags
          />

          <div className="flex flex-row flex-justify-between width-40 margin-t-2">
            <CustomButton
              baseclassname=""
              type="submit"
              buttonText="Submit"
              gradientButton
              round
            />
            <CustomButton
              buttonText="Reset"
              handleClick={handleReset}
              secondaryButton
              round
            />
          </div>
        </div>
      </form>
      {fetching && <Loading isGlobal/>}
    </div>
  );
}

export default ImageForm;
