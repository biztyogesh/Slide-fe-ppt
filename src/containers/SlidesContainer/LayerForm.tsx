import {
  MutableRefObject,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useFieldArray } from "react-hook-form";
import CustomButton, {
  ICON_POSITION,
} from "components/CustomButton/CustomButton";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import BaseLayerForm from "./LayersForm/BaseLayerForm";

function LayerForm(props: any, ref: any) {
  const { name, control, watch, errors, reset, setValue , defaultOptions } = props;
  const [expandedLayers, setExpandedLayers] = useState<boolean[]>([]);
  const layerFormRef: MutableRefObject<any> = useRef(null);
  const { fields, append, remove, move } = useFieldArray({
    name: name,
    control,
  });

  const handleAddLayer = () => {
    append({ metaType: "", chatMeta: {}, optionsMeta: {} });
    setExpandedLayers([...expandedLayers, false]);
  };

  const toggleExpansion = (index: number) => {
    const newExpandedLayers = [...expandedLayers];
    newExpandedLayers[index] = !newExpandedLayers[index];
    setExpandedLayers(newExpandedLayers);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToTop() {
          if (layerFormRef.current) {
            layerFormRef.current.scrollTop = { top: 0, behaviour: "smooth" };
          }
        },
      };
    },
    []
  );

  return (
    <div ref={layerFormRef} className="layerForm">
      <div className="flex flex-justify-end margin-b-3">
        <CustomButton
          iconProps={{
            name: CUSTOM_SVG_ICON.PlusCircle,
            svgType: SVGType.CUSTOM,
            size: "huge",
          }}
          iconPosition={ICON_POSITION.LEFT}
          buttonText="Add More Layers"
          handleClick={handleAddLayer}
          primaryButton
          transparent
          noOutline
          baseclassname={"cursor-pointer"}
        />
      </div>

      {fields.map((field, index) => {
        return (
          <div
            key={index}
            className="flex flex-row width-95 padding-2 accordian"
          >
            <div
              key={index}
              className="flex flex-justify-center flex-align-center width-6 layer"
              onClick={() => toggleExpansion(index)}
            >
              <h1 className="text-bold text-primary-color cursor-pointer">
                L{index + 1}
              </h1>
            </div>

            {expandedLayers[index] && (
              <BaseLayerForm
                watch={watch}
                reset={reset}
                name={`${name}.${index}`}
                key={field.id}
                field={field}
                control={control}
                errors={errors}
                remove={remove}
                index={index}
                setValue={setValue}
                defaultOptions={defaultOptions}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
export default forwardRef(LayerForm);
