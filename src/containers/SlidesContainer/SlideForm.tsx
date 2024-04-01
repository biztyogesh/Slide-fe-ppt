import { useEffect, useMemo, forwardRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { hookformRequired } from "utils/FormValidations";
import CustomButton from "components/CustomButton/CustomButton";
import { HookFormInput } from "components/FormInputs";
import LayerForm from "./LayerForm";
import { DEFAULT_VALUES, MetaTypeOptions } from "./utils";
import { HookFormTextarea } from "components/FormInputs/HookFormTextarea";
import "./style.scss";

const requiredValidation = {
  ...hookformRequired("Required"),
};

let defaultOptions = [
  { label: "Select", value: "" },
  { label: "IMAGE", value: MetaTypeOptions.IMAGE },
  { label: "SHAPE", value: MetaTypeOptions.SHAPE },
  { label: "TEXT", value: MetaTypeOptions.TEXT },
  { label: "CHART", value: MetaTypeOptions.CHART },
  { label: "TABLE", value: MetaTypeOptions.TABLE },
  { label: "LIST", value: MetaTypeOptions.LIST },
];

interface Props {
  activeSlide?: any;
  getdata?: (data: any) => void;
  initialData: any;
}

function SlideForm(props: Props, ref: any) {
  const { activeSlide, getdata, initialData } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: useMemo(() => {
      return initialData || DEFAULT_VALUES;
    }, [initialData]),
  });
  
  const onSubmit = (data: any) => {
    if (getdata) {
      getdata(data);
    }
  };

  useEffect(() => {
    if (activeSlide) {
      reset(initialData);
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [reset, activeSlide]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="height-100 position-relative">
        <div className="text-5 text-bold padding-l-4 padding-t-2">{activeSlide ? "" : "Create New Slide"}</div>
        <div className="flex flex-row">
          <HookFormInput
            validation={requiredValidation}
            control={control}
            errors={errors}
            id="slideName"
            name="name"
            label="Slide Name"
            placeholder="Enter Slide Name"
            baseClassName="width-25 padding-l-4"
            labelClassName="padding-t-2"
          />
          <HookFormTextarea id="postfix" name="postfix" label="Postfix" control={control} errors={errors} rows={2} baseClassName="width-40 padding-l-4" />
          <HookFormTextarea id="rules" name="rules" label="Rules" control={control} errors={errors} rows={2} baseClassName="width-40 padding-l-4 margin-r-4" />
        </div>
        <LayerForm
          validation={{}}
          control={control}
          errors={errors}
          name="layers"
          watch={watch}
          reset={reset}
          ref={ref}
          setValue={setValue}
          defaultOptions={defaultOptions}
        />
        <div className="flex flex-align-center flex-justify-center margin-t-2">
          <CustomButton
            type="submit"
            buttonText={activeSlide ? "Update" : "Create"}
            gradientButton
            // disabled={slideFetching}
            baseclassname={"padding-6 cursor-pointer"}
            buttonTextClass={"text-5"}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default forwardRef(SlideForm);
