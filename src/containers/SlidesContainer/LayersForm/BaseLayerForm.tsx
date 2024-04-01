import { HookFormSelect } from "components/FormInputs/HookSelect";
import CustomButton from "components/CustomButton";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import MetaTypeImageForm from "./MetaTypeImageForm";
import MetaTypeShapeForm from "./MetaTypeShapeForm";
import MetaTypeTextForm from "./MetaTypeTextForm";
import MetaTypeListForm from "./MetaTypeListForm";
import { MetaTypeOptions } from "../utils";
import { hookformRequired } from "utils/FormValidations";
import MetaTypeTableForm from "./MetaTypeTableForm";
import MetaTypeChartForm from "./MetaTypeChartForm";

interface Props {
  field: any;
  control: any;
  errors: any;
  name: string;
  watch: any;
  reset?: any;
  defaultOptions?: any;
  remove: any;
  index: number;
  setValue: any;
}

const requiredValidation = {
  ...hookformRequired("Required"),
};


function BaseLayerForm(props: Props) {
  const {
    control,
    errors,
    name,
    watch,
    field,
    remove,
    index,
    setValue,
    defaultOptions,
  } = props;

  const metaType = watch(`${name}.metaType`);

  const handleMetaTypeChange = (newValue: any) => {
    if (newValue !== metaType) {
      setValue(`${name}.chatMeta`, {});
      setValue(`${name}.optionsMeta`, {});
    }
  };

  const handleRemoveLayer = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex flex-column width-94">
      <div className="flex flex-row flex-align-center">
        <HookFormSelect
          control={control}
          validation={requiredValidation}
          errors={errors}
          options={defaultOptions}
          id={field.id}
          name={`${name}.metaType` as const}
          label={"Select MetaType"}
          baseClassName="width-25 margin-l-4"
          handleChange={handleMetaTypeChange}
        />
        {/* {index > 0 && ( */}
          <div className="width-10">
            <CustomButton
              type="button"
              transparent
              primaryButton
              iconProps={{
                name: CUSTOM_SVG_ICON.Delete,
                svgType: SVGType.CUSTOM,
                size: "large",
                baseclassname: "text-danger-color padding-t-2",
              }}
              noOutline
              iconPosition={ICON_POSITION.LEFT}
              handleClick={() => handleRemoveLayer(index)}
              baseclassname={"margin-l-4 cursor-pointer"}
            />
          </div>
        {/* )} */}
      </div>
      {metaType === MetaTypeOptions.IMAGE && (
        <MetaTypeImageForm name={name} control={control} errors={errors} watch={watch}/>
      )}
      {metaType === MetaTypeOptions.SHAPE && (
        <MetaTypeShapeForm name={name} control={control} errors={errors} watch={watch} />
      )}
      {metaType === MetaTypeOptions.TEXT && (
        <MetaTypeTextForm
          name={name}
          control={control}
          errors={errors}
          watch={watch}
        />
      )}
      {metaType === MetaTypeOptions.TABLE && (
        <MetaTypeTableForm
          name={name}
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      )}
        {metaType === MetaTypeOptions.CHART && (
        <MetaTypeChartForm name={name} control={control} errors={errors} watch={watch} />
      )}
      {metaType === MetaTypeOptions.LIST && (
        <MetaTypeListForm
          name={name}
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      )}
    </div>
  );
}

export default BaseLayerForm;
