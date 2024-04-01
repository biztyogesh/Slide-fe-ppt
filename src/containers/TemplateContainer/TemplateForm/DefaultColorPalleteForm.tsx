import { HookFormInput } from "components/FormInputs";
import CustomButton from "components/CustomButton";
import { useFieldArray } from "react-hook-form";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import classNames from "classnames";
import "./style.scss"

export default function DefaultColorPalleteForm(props: any) {
  const { control, errors, name , label } = props;

  const { fields, append, remove } = useFieldArray({
    name: name,
    control,
  });

  const handleAppendColors = () => {
    append(""); 
  };

  const handleRemoveColors = (index: number) => {
    remove(index);
  };

  return (
    <div className="width-100">
      <div className="flex flex-row margin-l-4">
      {label && <div className="text-4 text-bold">{label}</div>}
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
        handleClick={handleAppendColors}
      />
      </div>
      <div className="flex flex-row margin-l-4  width-100">
        {fields.map((field: any, index: number) => {
          return (
            <div key={field.id} className={classNames(["flex flex-row width-16"])}>
              <HookFormInput
                control={control}
                errors={errors}
                validation={{}}
                name={`${name}[${index}]`}
                placeholder={`Color ${index + 1}`}
                id={`${name}[${index}]`}
                baseClassName="width-70 margin-l-2"
              />
              <CustomButton
                type="button"
                transparent
                primaryButton
                iconProps={{
                  name: CUSTOM_SVG_ICON.Delete,
                  svgType: SVGType.CUSTOM,
                  size: "small",
                  baseclassname: "text-danger-color",
                }}
                noOutline
                iconPosition={ICON_POSITION.LEFT}
                handleClick={() => handleRemoveColors(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
