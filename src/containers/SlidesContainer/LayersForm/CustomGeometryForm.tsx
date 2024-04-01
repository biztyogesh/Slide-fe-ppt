import React from "react";
import { HookFormInput } from "components/FormInputs";
import CustomButton from "components/CustomButton";
import { useFieldArray } from "react-hook-form";
import LabelComponent from "components/LabelComponent";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";

function CustomGeometryForm(props: any) {
  const { control, errors, name } = props;

  const { fields, append, remove } = useFieldArray({
    name: `${name}.optionsMeta.points`,
    control,
  });

  const handleAppendPoints = () => {
    append({});
  };

  const handleRemovePoints = (index: number) => {
    remove(index);
  };

  return (
    <LabelComponent label="Custom Geometry Points">
      <CustomButton
        type="button"
        transparent
        primaryButton
        iconProps={{
          name: CUSTOM_SVG_ICON.PlusCircle,
          svgType: SVGType.CUSTOM,
          size: "huge",
          baseclassname: "text-secondary-color",
        }}
        noOutline
        iconPosition={ICON_POSITION.LEFT}
        handleClick={handleAppendPoints}
      />
      <div className="flex flex-column">
        {fields.map((field: any, index: number) => {
          return (
            <div key={field.id} className="flex flex-row ">
              <HookFormInput
                control={control}
                errors={errors}
                validation={{}}
                name={`${name}.optionsMeta.points[${index}].x`}
                label={`X ${index + 1}`}
                id={`${name}.optionsMeta.points[${index}].x`}
                baseClassName="width-15 margin-l-3"
              />
              <HookFormInput
                control={control}
                errors={errors}
                validation={{}}
                name={`${name}.optionsMeta.points[${index}].y`}
                label={`Y ${index + 1}`}
                id={`${name}.optionsMeta.points[${index}].y`}
                baseClassName="width-15 margin-l-3"
              />
  
              <CustomButton
                type="button"
                transparent
                primaryButton
                iconProps={{
                  name: CUSTOM_SVG_ICON.Delete,
                  svgType: SVGType.CUSTOM,
                  size: "huge",
                  baseclassname: "text-danger-color",
                }}
                noOutline
                iconPosition={ICON_POSITION.LEFT}
                handleClick={() => handleRemovePoints(index)}
              />
            </div>
          );
        })}
      </div>
    </LabelComponent>
  );
}

export default CustomGeometryForm;
