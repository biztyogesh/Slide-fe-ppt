import { HookFormInput } from "components/FormInputs";
import { HookFormSelect } from "components/FormInputs/HookSelect";
import { Arrowtypes, DEFAULT_THEME_COLOR } from "../utils";
import TileComponent from "components/TileComponent/TileComponent";
import LabelComponent from "components/LabelComponent/LabelComponent";
import { HookFormCheckbox } from "components/FormInputs/HookFormCheckBox";
import CustomGeometryForm from "./CustomGeometryForm";

interface Props {
  control: any;
  errors: any;
  name: string;
  defaultValue?: any;
  watch?: any;
}

let colorOptions = [
  { label: "Select", value: "" },
  { label: "Color 1", value: DEFAULT_THEME_COLOR.Color1 },
  { label: "Color 2", value: DEFAULT_THEME_COLOR.Color2 },
  { label: "Color 3", value: DEFAULT_THEME_COLOR.Color3 },
  { label: "Color 4", value: DEFAULT_THEME_COLOR.Color4 },
  { label: "Color 5", value: DEFAULT_THEME_COLOR.Color5 },
  { label: "Color 6", value: DEFAULT_THEME_COLOR.Color6 },
];

let ArrowTypeOptions = [
  { label: "NONE", value: Arrowtypes.NONE },
  { label: "ARROW", value: Arrowtypes.ARROW },
  { label: "DIAMOND", value: Arrowtypes.DIAMOND },
  { label: "OVAL", value: Arrowtypes.OVAL },
  { label: "STEALTH", value: Arrowtypes.STEALTH },
  { label: "TRIANGLE", value: Arrowtypes.TRIANGLE },
];

function MetaTypeShapeForm(props: Props) {
  const { errors, control, name, watch } = props;
  const shapeType = watch(`${name}.optionsMeta.shapeType`);

  return (
    <TileComponent title="Enter Details for Shape">
      <LabelComponent label="Options For Shape">
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.optionsMeta.shapeType`}
          label="Shape Type"
          id={`${name}.optionsMeta.shapeType`}
          baseClassName="width-15 margin-l-3"
        />

        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.optionsMeta.x`}
          label="X Position"
          id={`${name}.optionsMeta.x`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.optionsMeta.y`}
          label="Y Position"
          id={`${name}.optionsMeta.y`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormInput
          control={control}
          validation={{}}
          errors={errors}
          name={`${name}.optionsMeta.w`}
          label="Width"
          id={`${name}.optionsMeta.w`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.optionsMeta.h`}
          label="Height"
          id={`${name}.optionsMeta.h`}
          baseClassName="width-15 margin-l-3"
        />
      </LabelComponent>

      <div className="flex flex-row width-100">
        <LabelComponent label="Fill" baseClassName={"width-100"}>
          <HookFormSelect
            control={control}
            errors={errors}
            validation={{}}
            options={colorOptions}
            name={`${name}.optionsMeta.fill.color`}
            label={"Color"}
            id={`${name}.optionsMeta.fill.color`}
            baseClassName="width-20"
          />
          <HookFormInput
            control={control}
            errors={errors}
            validation={{}}
            name={`${name}.optionsMeta.fill.transparency`}
            label="Transparency"
            id={`${name}.optionsMeta.fill.transparency`}
            baseClassName="width-22 margin-l-3"
          />

          <HookFormInput
            validation={{}}
            control={control}
            errors={errors}
            label="Rotate"
            name={`${name}.optionsMeta.rotate`}
            id={`${name}.optionsMeta.rotate`}
            baseClassName="width-20 margin-l-4"
          />
           {shapeType === "roundRect" && (
          <HookFormInput
            control={control}
            errors={errors}
            validation={{}}
            name={`${name}.optionsMeta.rectRadius`}
            label="RectRadius"
            id={`${name}.optionsMeta.h`}
            baseClassName="width-10 margin-l-3"
          />
        )}
        </LabelComponent>
      </div>
      <LabelComponent label="Line" baseClassName={"width-100"}>
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={colorOptions}
          name={`${name}.optionsMeta.line.color`}
          label={"line Color"}
          id={`${name}.optionsMeta.line.color`}
          baseClassName="width-25"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          label="line Width"
          name={`${name}.optionsMeta.line.width`}
          id={`${name}.optionsMeta.line.width`}
          baseClassName="width-15 margin-l-3"
        />

        {(shapeType === "line" || shapeType === "arc") && (
          <HookFormSelect
            control={control}
            errors={errors}
            validation={{}}
            options={ArrowTypeOptions}
            name={`${name}.optionsMeta.line.beginArrowType`}
            label={"Begin Arrow Types"}
            id={`${name}.optionsMeta.line.beginArrowType`}
            baseClassName="width-15 margin-l-3"
          />
        )}

        {(shapeType === "line" || shapeType === "arc") && (
          <HookFormSelect
            control={control}
            errors={errors}
            validation={{}}
            options={ArrowTypeOptions}
            name={`${name}.optionsMeta.line.endArrowType`}
            label={"End Arrow Types"}
            id={`${name}.optionsMeta.line.endArrowType`}
            baseClassName="width-15 margin-l-3"
          />
        )}

        <div className="flex flex-column flex-gap">
          <HookFormCheckbox
            validation={{}}
            control={control}
            label={"FlipH"}
            errors={errors}
            name={`${name}.optionsMeta.flipH`}
            id={`${name}.optionsMeta.flipH`}
            baseClassName="margin-l-3"
          />

          <HookFormCheckbox
            validation={{}}
            control={control}
            errors={errors}
            label={"FlipV"}
            name={`${name}.optionsMeta.flipV`}
            id={`${name}.optionsMeta.flipV`}
            baseClassName="margin-l-3"
          />
        </div>
      </LabelComponent>
      {(shapeType === "blockArc" || shapeType === "arc") && (
        <LabelComponent label="Angle Range" baseClassName={"width-100"}>
        <HookFormInput
            validation={{}}
            control={control}
            errors={errors}
            label="Start Angle"
            name={`${name}.optionsMeta.angleRange[0]`}
            id={`${name}.optionsMeta.angleRange[0]`}
            baseClassName="width-20 margin-l-3"
            defaultValue={0}
          />
        
          <HookFormInput
            validation={{}}
            control={control}
            errors={errors}
            label="End Angle"
            name={`${name}.optionsMeta.angleRange[1]`}
            id={`${name}.optionsMeta.angleRange[1]`}
            baseClassName="width-20 margin-l-3"
            defaultValue={0}
          />
          <HookFormInput
            validation={{}}
            control={control}
            errors={errors}
            label="Thickness Ratio"
            name={`${name}.optionsMeta.arcThicknessRatio`}
            id={`${name}.optionsMeta.arcThicknessRatio`}
            baseClassName="width-20 margin-l-3"
          />
        </LabelComponent>
        )}
      {shapeType === "custGeom" && (
        <CustomGeometryForm control={control} name={name} errors={errors} />
      )}
    </TileComponent>
  );
}

export default MetaTypeShapeForm;
