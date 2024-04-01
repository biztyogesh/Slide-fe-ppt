import React from "react";
import { HookFormInput } from "components/FormInputs";
import CustomButton from "components/CustomButton";
import { useFieldArray } from "react-hook-form";
import LabelComponent from "components/LabelComponent";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";

interface IProps {
    control: any;
    errors: any
    name : string;
    label?:string;
}

export default function RowHeightForm(props: IProps) {
  const { control, errors, name, label } = props;

  const { fields, append, remove } = useFieldArray({
    name: `${name}.optionsMeta.rowH`,
    control,
  });

  const handleAppendPoints = () => {
    append(""); 
  };

  const handleRemovePoints = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex flex-row">
      {label && <div className="text-4 text-bold">{label}</div>}
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
                name={`${name}.optionsMeta.rowH[${index}]`}
                label={`Row Height ${index + 1}`}
                id={`${name}.optionsMeta.rowH[${index}]`}
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
    </div>
  );
}
