import { HookFormInput, HookFormTextarea } from "components/FormInputs";
import CustomButton from "components/CustomButton";
import { useFieldArray } from "react-hook-form";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import classNames from "classnames";
import "./style.scss"

export function SuggestionPromptsForm(props: any) {
  const { control, errors, name , label } = props;

  const { fields, append, remove } = useFieldArray({
    name: name,
    control,
  });

  const handleAppendSuggestions = () => {
    append(""); 
  };

  const handleRemoveSuggestions = (index: number) => {
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
        handleClick={handleAppendSuggestions}
      />
      </div>
      <div className="flex flex-column margin-l-4  width-100">
        {fields.map((field: any, index: number) => {
          return (
            <div key={field.id} className={classNames(["flex flex-row width-75"])}>
              <HookFormTextarea
                control={control}
                errors={errors}
                validation={{}}
                rows={3}
                name={`${name}[${index}]`}
                // placeholder={`Suggestion ${index + 1}`}
                id={`${name}[${index}]`}
                baseClassName="width-100 margin-l-2"
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
                handleClick={() => handleRemoveSuggestions(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
