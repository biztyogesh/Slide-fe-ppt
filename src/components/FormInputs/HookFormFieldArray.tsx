import React, { Fragment, useEffect } from "react";
import { HookFormInput } from "components/FormInputs";
import CustomButton from "components/CustomButton";
import { useFieldArray } from "react-hook-form";
import LabelComponent from "components/LabelComponent";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";

interface FieldArrayFormProps {
  baseName: string;
  control: any;
  errors: any;
  fieldName1: string;
  fieldName2: string;
  label: string;
}

export function HookFormFieldArray({
  baseName,
  control,
  errors,
  fieldName1,
  fieldName2,
  label
}: FieldArrayFormProps) {
  const firstLetterCapitalized = label.charAt(0).toUpperCase();
  const { fields, append, remove } = useFieldArray({
    name: `${baseName}`,
    control,
  });

  const handleAppend = () => {
    append({});
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <div className="margin-l-2 flex flex-column">
      <div className="flex flex-row padding-2">
        <label className="text-4 text-bold">{label}</label>
        <CustomButton
                type="button"
                transparent
                primaryButton
                iconProps={{
                  name: CUSTOM_SVG_ICON.PlusCircle,
                  svgType: SVGType.CUSTOM,
                  size: "small",
                  baseclassname: "text-secondary-color",
                }}
                noOutline
                iconPosition={ICON_POSITION.LEFT}
                handleClick={handleAppend}
              />
              </div>
        {fields.map((field: any, index: number) => (
          <div key={field.id} className="flex flex-row">
            <div className="flex flex-row flex-justify-center flex-align-center background-secondary-color width-5 margin-t-2 margin-b-4 text-5 text-primary-color">{firstLetterCapitalized}{index+1}</div>
            <HookFormInput
              control={control}
              errors={errors}
              validation={{}}
              name={`${baseName}[${index}].${fieldName1}`}
              label={`${fieldName1.toUpperCase()} ${index + 1}`}
              id={`${baseName}[${index}].${fieldName1}`}
              baseClassName="width-45 margin-l-3"
            />
            <HookFormInput
              control={control}
              errors={errors}
              validation={{}}
              name={`${baseName}[${index}].${fieldName2}`}
              label={`${fieldName2.toUpperCase()} ${index + 1}`}
              id={`${baseName}[${index}].${fieldName2}`}
              baseClassName="width-45 margin-l-3"
            />
              {fields.length !== 1 && <CustomButton
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
                handleClick={() => handleRemove(index)}
              />}
          </div>
        ))}
    </div>
  );
}
