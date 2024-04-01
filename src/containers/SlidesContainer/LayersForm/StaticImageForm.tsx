import React from "react";
import { HookFormInput } from "components/FormInputs";
import CustomButton from "components/CustomButton";
import { useFieldArray } from "react-hook-form";
import LabelComponent from "components/LabelComponent";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";

function StaticImageForm(props: any) {
  const { control, errors, name } = props;

  const { fields, append, remove } = useFieldArray({
    name: `${name}.chatMeta.images`,
    control,
  });

  const handleAppendPoints = () => {
    append(""); 
  };

  const handleRemovePoints = (index: number) => {
    remove(index);
  };

  return (
    <LabelComponent label="Static Image Form">
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
            <div key={field.id} className="flex flex-row">
              <HookFormInput
                control={control}
                errors={errors}
                validation={{}}
                name={`${name}.chatMeta.images[${index}]`}
                label={`Image ${index + 1}`}
                id={`${name}.chatMeta.images[${index}]`}
                baseClassName="margin-l-3"
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

export default StaticImageForm;
