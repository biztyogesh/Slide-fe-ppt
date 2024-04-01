import CustomButton from "components/CustomButton";
import { useFieldArray } from "react-hook-form";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import DefaultColorPalleteForm from "./DefaultColorPalleteForm";

export default function ColorPalletsForm(props: any) {
  const { control, errors, name, label } = props;
  const firstLetterCapitalized = label.charAt(0).toUpperCase();

  const { fields, append, remove } = useFieldArray({
    name: name,
    control,
  });

  const handleAppendPallete = () => {
    append("");
  };

  const handleRemovePalletes = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <div className="flex flex-row flex-align-center margin-l-4 ">
        {label && <div className="text-4 text-bold">{label}</div>}
        <CustomButton
          type="button"
          iconProps={{
            name: CUSTOM_SVG_ICON.PlusCircle,
            svgType: SVGType.CUSTOM,
            size: "small",
          }}
          iconPosition={ICON_POSITION.LEFT}
          primaryButton
          transparent
          round
          buttonText="Add Palletes"
          noOutline
          handleClick={handleAppendPallete}
        />
      </div>
      <div className="flex flex-column">
        {fields.map((field: any, index: number) => {
          return (
            <div key={index} className="flex flex-row">
              <div className="flex flex-row flex-justify-center flex-align-center background-secondary-color width-5 margin-t-2 margin-b-4 text-5 text-primary-color">
                {firstLetterCapitalized}
                {index + 1}
              </div>

              <DefaultColorPalleteForm
                label={`Pallete ${index + 1}`}
                name={`${name}[${index}]`}
                control={control}
                errors={errors}
              />
              {fields.length !== 1 && (
                <CustomButton
                  type="button"
                  transparent
                  primaryButton
                  iconProps={{
                    name: CUSTOM_SVG_ICON.Cross,
                    svgType: SVGType.CUSTOM,
                    size: "small",
                    baseclassname: "text-danger-color",
                  }}
                  noOutline
                  iconPosition={ICON_POSITION.LEFT}
                  handleClick={() => handleRemovePalletes(index)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
