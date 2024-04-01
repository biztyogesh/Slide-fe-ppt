import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import  CustomButton , { ICON_POSITION } from "components/CustomButton/CustomButton";
import { HookFormInput } from "components/FormInputs";
import LayerForm from "../LayerForm";
import { MetaTypeOptions } from "../utils";

import "./style.scss";

let defaultOptions = [
  { label: "Select", value: "" },
  { label: "IMAGE", value: MetaTypeOptions.IMAGE },
  { label: "SHAPE", value: MetaTypeOptions.SHAPE },
  { label: "TEXT", value: MetaTypeOptions.TEXT },
  { label: "TABLE", value: MetaTypeOptions.TABLE },
  { label: "LIST", value: MetaTypeOptions.LIST },
  { label: "CHART", value: MetaTypeOptions.CHART },
];

interface Props {
  control: any;
  errors: any;
  name: string;
  watch: any;
  setValue?: any;
}

function MetaTypeListForm({ control, errors, name, watch , setValue }: Props) {
  const [expand, setExpand] = useState<boolean[]>([]);
  const { fields, append, remove } = useFieldArray({
    name: `${name}.optionsMeta.layers`,
    control,
  });

  const handleAppend = () => {
    append({
      layers: [
        {
          metaType: "",
          chatMeta: {},
          optionsMeta: {},
        },
      ],
    });
    setExpand([...expand, false]);
  };

  const handleRemoveLayer = (index: number) => {
    remove(index);
  };

  const toggleExpansion = (index: number) => {
    const newExpandedLayers = [...expand];
    newExpandedLayers[index] = !newExpandedLayers[index];
    setExpand(newExpandedLayers);
  };

  const getExpandIcon = (expanded:any) => {
    return expanded ? CUSTOM_SVG_ICON.CaretUp : CUSTOM_SVG_ICON.CaretDown;
  }

  return (
    <div className="width-90 list-container">
      <div className="flex flex-align-center">
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-25  padding-l-4 padding-t-3"
          label="Id"
          id={`${name}.chatMeta.id`}
          name={`${name}.chatMeta.id`}
        />
        <CustomButton
          iconProps={{
            name: CUSTOM_SVG_ICON.PlusCircle,
            svgType: SVGType.CUSTOM,
            size: "small",
          }}
          iconPosition={ICON_POSITION.LEFT}
          handleClick={handleAppend}
          noOutline
          transparent
          primaryButton
          buttonText="Add Layers"
        />
      </div>

      {fields.map((field, optionIndex) => {
        return (
          <div key={field.id} className="flex flex-column margin-2">
            <div className="flex flex-row flex-justify-between padding-2 nested-layer"  onClick={() => toggleExpansion(optionIndex)}>
              <span className="flex flex-justify-center flex-align-center text-6 text-bold text-primary-color cursor-pointer">
                Layer {optionIndex + 1}
                <CustomButton
                  iconProps={{
                    svgType: SVGType.CUSTOM,
                    name: getExpandIcon(expand[optionIndex]),
                    size: "small",
                    baseclassname: "text-primary-color text-align-center",
                  }}
                  iconPosition={ICON_POSITION.RIGHT}
                  handleClick={() => toggleExpansion(optionIndex)}
                  baseclassname={`toggle-icon ${expand ? "expanded" : "collapsed"} margin-l-3`}
                  transparent
                  noOutline
                  primaryButton
                />
              </span>
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
                  handleClick={() => handleRemoveLayer(optionIndex)}
                  baseclassname={"cursor-pointer"}
                />
            </div>
            {expand[optionIndex] && <LayerForm name={`${name}.optionsMeta.layers.${optionIndex}.layers`} control={control} watch={watch} errors={errors} defaultOptions={defaultOptions} setValue={setValue}/>}
          </div>
        );
      })}
    </div>
  );
}

export default MetaTypeListForm;
