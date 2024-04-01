import { HookFormInput } from "components/FormInputs";
import { HookFormSelect } from "components/FormInputs/HookSelect";
import {
  ChartType,
  ChartTypeOptions,
  DEFAULT_THEME_COLOR,
  alignOptions,
  dataSymbolOptions,
  fontFaceOptions,
  legendPositionOptions,
  lineDataSymbols,
} from "../utils";
import TileComponent from "components/TileComponent/TileComponent";
import LabelComponent from "components/LabelComponent/LabelComponent";
import { HookFormCheckbox } from "components/FormInputs/HookFormCheckBox";

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

function MetaTypeChartForm(props: Props) {
  const { errors, control, name, watch } = props;
  const title : boolean = watch(`${name}.optionsMeta.showTitle`)
  const legends : boolean = watch(`${name}.optionsMeta.showLegend`)

  return (
    <TileComponent title="Enter Details for Chart">
      <LabelComponent label="ChatMeta">
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={ChartTypeOptions}
          name={`${name}.chatMeta.chartType`}
          label="Chart Type"
          id={`${name}.chatMeta.chartType`}
          baseClassName="width-10 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.chatMeta.id`}
          label="Id"
          id={`${name}.chatMeta.id`}
          baseClassName="width-10 margin-l-3"
        />
          <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.chatMeta.noOfSeries`}
          label="No. of Series"
          id={`${name}.chatMeta.noOfSeries`}
          baseClassName="width-10 margin-l-3"
        />
         <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.chatMeta.noOfPoints`}
          label="No. of Points"
          id={`${name}.chatMeta.noOfPoints`}
          baseClassName="width-10 margin-l-3"
        />
      </LabelComponent>
      <LabelComponent label="Options For Chart">
        <div className="flex flex-column width-100">
          <div className="flex flex-row width-100">
            <HookFormInput
              control={control}
              errors={errors}
              validation={{}}
              name={`${name}.optionsMeta.x`}
              label="X Position"
              id={`${name}.optionsMeta.x`}
              baseClassName="width-10 margin-l-3"
            />
            <HookFormInput
              control={control}
              errors={errors}
              validation={{}}
              name={`${name}.optionsMeta.y`}
              label="Y Position"
              id={`${name}.optionsMeta.y`}
              baseClassName="width-10 margin-l-3"
            />
            <HookFormInput
              control={control}
              validation={{}}
              errors={errors}
              name={`${name}.optionsMeta.w`}
              label="Width"
              id={`${name}.optionsMeta.w`}
              baseClassName="width-10 margin-l-3"
            />
            <HookFormInput
              control={control}
              errors={errors}
              validation={{}}
              name={`${name}.optionsMeta.h`}
              label="Height"
              id={`${name}.optionsMeta.h`}
              baseClassName="width-10 margin-l-3"
            />
            <HookFormCheckbox
              validation={{}}
              control={control}
              baseClassName="width-10 margin-l-3"
              errors={errors}
              label={"Show Title"}
              name={`${name}.optionsMeta.showTitle`}
              id={`${name}.optionsMeta.showTitle`}
            />
            <HookFormCheckbox
              validation={{}}
              control={control}
              baseClassName="width-10 margin-l-3"
              errors={errors}
              label={"Show Legend"}
              name={`${name}.optionsMeta.showLegend`}
              id={`${name}.optionsMeta.showLegend`}
            />
            <HookFormCheckbox
              validation={{}}
              control={control}
              baseClassName="width-10 margin-l-3"
              errors={errors}
              label={"Show Value"}
              name={`${name}.optionsMeta.showValue`}
              id={`${name}.optionsMeta.showValue`}
            />
            <HookFormCheckbox
              validation={{}}
              control={control}
              baseClassName="width-10 margin-l-3"
              errors={errors}
              label={"Show Percent"}
              name={`${name}.optionsMeta.showPercent`}
              id={`${name}.optionsMeta.showPercent`}
            />
               <HookFormCheckbox
              validation={{}}
              control={control}
              baseClassName="width-10 margin-l-3"
              errors={errors}
              label={"Show Label"}
              name={`${name}.optionsMeta.showLabel`}
              id={`${name}.optionsMeta.showLabel`}
            />
          </div>
          <div className="flex flex-row width-100">
            <HookFormSelect
              control={control}
              errors={errors}
              validation={{}}
              options={dataSymbolOptions}
              name={`${name}.optionsMeta.lineDataSymbol`}
              label={"Line Data Symbol"}
              id={`${name}.optionsMeta.lineDataSymbol`}
              baseClassName="width-15 margin-l-3"
            />
            <HookFormInput
              control={control}
              errors={errors}
              validation={{}}
              name={`${name}.optionsMeta.lineDataSymbolSize`}
              label="Line Data Symbol Size"
              id={`${name}.optionsMeta.lineDataSymbolSize`}
              baseClassName="width-15 margin-l-3"
            />

            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              label="Line Size"
              name={`${name}.optionsMeta.lineSize`}
              id={`${name}.optionsMeta.lineSize`}
              baseClassName="width-15 margin-l-4"
            />
          </div>
        </div>
      </LabelComponent>
      {Boolean(title) && (<LabelComponent label="Title Options" baseClassName={"width-100"}>
          <HookFormSelect
              control={control}
              errors={errors}
              validation={{}}
              options={alignOptions}
              name={`${name}.optionsMeta.titleAlign`}
              label="Title Align"
              id={`${name}.optionsMeta.titleAlign`}
              baseClassName="width-15 margin-l-3"
            />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={colorOptions}
          name={`${name}.optionsMeta.titleColor`}
          label={"Title Color"}
          id={`${name}.optionsMeta.titleColor`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          label="Title Font Size"
          name={`${name}.optionsMeta.titleFontSize`}
          id={`${name}.optionsMeta.titleFontSize`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={fontFaceOptions}
          label="Title Font Face"
          name={`${name}.optionsMeta.titleFontFace`}
          id={`${name}.optionsMeta.titleFontFace`}
          baseClassName="width-15 margin-l-3"
        />
      </LabelComponent>)} 
      {Boolean(legends) && (<LabelComponent label="Legends Options" baseClassName={"width-100"}>
      <HookFormSelect
              control={control}
              errors={errors}
              validation={{}}
              options={legendPositionOptions}
              name={`${name}.optionsMeta.legendPos`}
              label="Legend Position"
              id={`${name}.optionsMeta.legendPos`}
              baseClassName="width-15 margin-l-3"
            />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={colorOptions}
          name={`${name}.optionsMeta.legendColor`}
          label={"Legend Color"}
          id={`${name}.optionsMeta.legendColor`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          label="Legend Font Size"
          name={`${name}.optionsMeta.legendFontSize`}
          id={`${name}.optionsMeta.legendFontSize`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={fontFaceOptions}
          label="Legend Font Face"
          name={`${name}.optionsMeta.legendFontFace`}
          id={`${name}.optionsMeta.legendFontFace`}
          baseClassName="width-15 margin-l-3"
        />
      </LabelComponent>)} 
    </TileComponent>
  );
}

export default MetaTypeChartForm;
