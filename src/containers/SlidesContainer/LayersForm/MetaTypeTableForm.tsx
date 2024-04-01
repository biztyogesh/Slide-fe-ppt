import {
  HookFormCheckbox,
  HookFormInput,
  HookFormSelect,
} from "components/FormInputs";
import LabelComponent from "components/LabelComponent";
import TileComponent from "components/TileComponent";
import {
  MetaTypeOptions,
  TableStyles,
  TableTypes,
  VAlignOptions,
  alignOptions,
  borderTypeOptions,
  colorOptions,
  fontFaceOptions,
} from "../utils";
import CustomButton from "components/CustomButton";
import { useFieldArray } from "react-hook-form";
import MetaTypeTextForm from "./MetaTypeTextForm";
import MetaTypeShapeForm from "./MetaTypeShapeForm";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import LayerForm from "../LayerForm";
import { useState } from "react";
import RowHeightForm from "./RowHeightForm";
import ColWidthForm from "./ColWidthForm";

let TableTypeOptions = [
  { label: "Select", value: "" },
  { label: "DEFAULT", value: TableTypes.DEFAULT },
  { label: "PIVOT", value: TableTypes.PIVOT },
];

let TableStyleOptions = [
  { label: "Select", value: "" },
  { label: "DEFAULT", value: TableStyles.DEFAULT },
  { label: "CUSTOM", value: TableStyles.CUSTOM },
];

let defaultOptions = [
  { label: "Select", value: "" },
  { label: "SHAPE", value: MetaTypeOptions.SHAPE },
  { label: "TEXT", value: MetaTypeOptions.TEXT },
  { label: "IMAGE", value: MetaTypeOptions.IMAGE },
];

interface Props {
  control: any;
  errors: any;
  name: string;
  watch?: any;
  setValue?: any;
}

function MetaTypeTableForm(props: Props) {
  const [expand, setExpand] = useState<boolean[]>([]);
  const { errors, control, name, watch, setValue } = props;
  const { fields, append, remove } = useFieldArray({
    name: `${name}.optionsMeta.layers`,
    control,
  });

  const style = watch(`${name}.chatMeta.tableStyle`);

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

  const getExpandIcon = (expanded: any) => {
    return expanded ? CUSTOM_SVG_ICON.CaretUp : CUSTOM_SVG_ICON.CaretDown;
  };

  return (
    <TileComponent title="Enter Details for Table">
      <LabelComponent label="ChatMeta">
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.chatMeta.rows`}
          label="Rows"
          id={`${name}.chatMeta.rows`}
          baseClassName="width-15 margin-l-3"
        />

        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.chatMeta.columns`}
          label="Columns"
          id={`${name}.chatMeta.columns`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          name={`${name}.chatMeta.id`}
          label="Id"
          id={`${name}.chatMeta.id`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormSelect
          control={control}
          validation={{}}
          errors={errors}
          name={`${name}.chatMeta.tableType`}
          label="Table Type"
          id={`${name}.chatMeta.tableType`}
          baseClassName="width-15 margin-l-3"
          options={TableTypeOptions}
        />
        <HookFormSelect
          control={control}
          validation={{}}
          errors={errors}
          name={`${name}.chatMeta.tableStyle`}
          label="Table Style"
          id={`${name}.chatMeta.tableStyle`}
          baseClassName="width-15 margin-l-3"
          options={TableStyleOptions}
        />
      </LabelComponent>
      <LabelComponent label="Header Options">
        <HookFormSelect
          validation={{}}
          control={control}
          options={colorOptions}
          baseClassName="width-10 margin-l-3"
          errors={errors}
          label={"Text Color"}
          name={`${name}.chatMeta.headerOptions.color`}
          id={`${name}.chatMeta.headerOptions.color`}
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={colorOptions}
          name={`${name}.chatMeta.headerOptions.fill.color`}
          label={"Fill Color"}
          id={`${name}.chatMeta.headerOptions.fill.color`}
          baseClassName="width-10 margin-l-3"
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-10 margin-l-3"
          label="FontSize"
          id={`${name}.chatMeta.headerOptions.fontSize`}
          name={`${name}.chatMeta.headerOptions.fontSize`}
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-10 margin-l-3"
          label="Transparency"
          id={`${name}.chatMeta.headerOptions.fill.transparency`}
          name={`${name}.chatMeta.headerOptions.fill.transparency`}
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={borderTypeOptions}
          name={`${name}.chatMeta.headerOptions.border.type`}
          label={"Border Type"}
          id={`${name}.chatMeta.headerOptions.border.type`}
          baseClassName="width-10 margin-l-3"
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={colorOptions}
          name={`${name}.chatMeta.headerOptions.border.color`}
          label={"Border Color"}
          id={`${name}.chatMeta.headerOptions.border.color`}
          baseClassName="width-10 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          label="Border Width"
          name={`${name}.chatMeta.headerOptions.border.pt`}
          id={`${name}.chatMeta.headerOptions.border.pt`}
          baseClassName="width-10 margin-l-3"
        />
        <HookFormCheckbox
          validation={{}}
          control={control}
          baseClassName="width-10 margin-l-3"
          errors={errors}
          label={"Bold"}
          name={`${name}.chatMeta.headerOptions.bold`}
          id={`${name}.chatMeta.headerOptions.bold`}
        />
      </LabelComponent>
      <LabelComponent label="Row Even Options">
        <HookFormSelect
          validation={{}}
          control={control}
          options={colorOptions}
          baseClassName="width-15 margin-l-3"
          errors={errors}
          label={"Text Color"}
          name={`${name}.chatMeta.rowsEvenProps.color`}
          id={`${name}.chatMeta.rowsEvenProps.color`}
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={colorOptions}
          name={`${name}.chatMeta.rowsEvenProps.fill.color`}
          label={"Fill Color"}
          id={`${name}.chatMeta.rowsEvenProps.fill.color`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-10 margin-l-3"
          label="FontSize"
          id={`${name}.chatMeta.rowsEvenProps.fontSize`}
          name={`${name}.chatMeta.rowsEvenProps.fontSize`}
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-15 margin-l-3"
          label="Transparency"
          id={`${name}.chatMeta.rowsEvenProps.fill.transparency`}
          name={`${name}.chatMeta.rowsEvenProps.fill.transparency`}
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={borderTypeOptions}
          name={`${name}.chatMeta.rowsEvenProps.border.type`}
          label={"Border Type"}
          id={`${name}.chatMeta.rowsEvenProps.border.type`}
          baseClassName="width-10 margin-l-3"
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={colorOptions}
          name={`${name}.chatMeta.rowsEvenProps.border.color`}
          label={"Border Color"}
          id={`${name}.chatMeta.rowsEvenProps.border.color`}
          baseClassName="width-10 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          label="Border Width"
          name={`${name}.chatMeta.rowsEvenProps.border.pt`}
          id={`${name}.chatMeta.rowsEvenProps.border.pt`}
          baseClassName="width-10 margin-l-3"
        />
      </LabelComponent>
      <LabelComponent label="Row Odd Options">
        <HookFormSelect
          validation={{}}
          control={control}
          options={colorOptions}
          baseClassName="width-15 margin-l-3"
          errors={errors}
          label={"Text Color"}
          name={`${name}.chatMeta.rowsOddProps.color`}
          id={`${name}.chatMeta.rowsOddProps.color`}
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={colorOptions}
          name={`${name}.chatMeta.rowsOddProps.fill.color`}
          label={"Fill Color"}
          id={`${name}.chatMeta.rowsOddProps.fill.color`}
          baseClassName="width-15 margin-l-3"
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-15 margin-l-3"
          label="FontSize"
          id={`${name}.chatMeta.rowsOddProps.fontSize`}
          name={`${name}.chatMeta.rowsOddProps.fontSize`}
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-15 margin-l-3"
          label="Transparency"
          id={`${name}.chatMeta.rowsOddProps.fill.transparency`}
          name={`${name}.chatMeta.rowsOddProps.fill.transparency`}
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={borderTypeOptions}
          name={`${name}.chatMeta.rowsOddProps.border.type`}
          label={"Border Type"}
          id={`${name}.chatMeta.rowsOddProps.border.type`}
          baseClassName="width-10 margin-l-3"
        />
        <HookFormSelect
          control={control}
          errors={errors}
          validation={{}}
          options={colorOptions}
          name={`${name}.chatMeta.rowsOddProps.border.color`}
          label={"Border Color"}
          id={`${name}.chatMeta.rowsOddProps.border.color`}
          baseClassName="width-10 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          validation={{}}
          label="Border Width"
          name={`${name}.chatMeta.rowsOddProps.border.pt`}
          id={`${name}.chatMeta.rowsOddProps.border.pt`}
          baseClassName="width-10 margin-l-3"
        />
      </LabelComponent>

      {style === "custom" && (
        <LabelComponent label="Options for Table">
          <div className="width-95 tableLayer-container">
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
              buttonText="Add Table Layers"
            />
            {fields.map((field, tableIndex) => {
              return (
                <div key={field.id} className="flex flex-column margin-2">
                  <div
                    className="flex flex-row flex-justify-between padding-2 nested-layer margin-b-2"
                    onClick={() => toggleExpansion(tableIndex)}
                  >
                    <span className="flex flex-justify-center flex-align-center text-6 text-bold text-primary-color cursor-pointer">
                      Layer {tableIndex + 1}
                      <CustomButton
                        iconProps={{
                          svgType: SVGType.CUSTOM,
                          name: getExpandIcon(expand[tableIndex]),
                          size: "small",
                          baseclassname: "text-primary-color text-align-center",
                        }}
                        iconPosition={ICON_POSITION.RIGHT}
                        handleClick={() => toggleExpansion(tableIndex)}
                        baseclassname={`toggle-icon ${
                          expand ? "expanded" : "collapsed"
                        } margin-l-3`}
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
                      handleClick={() => handleRemoveLayer(tableIndex)}
                      baseclassname={"cursor-pointer"}
                    />
                  </div>

                  {expand[tableIndex] && (
                    <LayerForm
                      validation={{}}
                      control={control}
                      errors={errors}
                      name={`${name}.optionsMeta.layers.${tableIndex}.layers`}
                      watch={watch}
                      setValue={setValue}
                      defaultOptions={defaultOptions}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </LabelComponent>
      )}

      {style === "default" && (
        <LabelComponent label="Options for Table">
          <div className="flex flex-column width-95 ">
            <div className="flex flex-row">
              <HookFormInput
                validation={{}}
                control={control}
                errors={errors}
                baseClassName="width-10 margin-l-2"
                label="X Position"
                id={`${name}.optionsMeta.x`}
                name={`${name}.optionsMeta.x`}
              />
              <HookFormInput
                validation={{}}
                control={control}
                errors={errors}
                baseClassName="width-10 margin-l-2"
                label="Y Position"
                id={`${name}.optionsMeta.y`}
                name={`${name}.optionsMeta.y`}
              />
              <HookFormInput
                validation={{}}
                control={control}
                errors={errors}
                baseClassName="width-10 margin-l-2"
                label="Width"
                id={`${name}.optionsMeta.w`}
                name={`${name}.optionsMeta.w`}
              />
              <HookFormInput
                validation={{}}
                control={control}
                errors={errors}
                baseClassName="width-10 margin-l-2"
                label="Height"
                id={`${name}.optionsMeta.h`}
                name={`${name}.optionsMeta.h`}
              />
              <HookFormSelect
                validation={{}}
                control={control}
                options={alignOptions}
                baseClassName="width-20 margin-l-3"
                errors={errors}
                label={"Alignment"}
                name={`${name}.optionsMeta.align`}
                id={`${name}.optionsMeta.align`}
              />
              <HookFormSelect
                validation={{}}
                control={control}
                options={VAlignOptions}
                baseClassName="width-20 margin-l-3"
                errors={errors}
                label="V Align"
                id={`${name}.optionsMeta.valign`}
                name={`${name}.optionsMeta.valign`}
                defaultValue={"top"}
              />
            </div>
            <div className="flex flex-row">
              <HookFormSelect
                validation={{}}
                control={control}
                options={colorOptions}
                baseClassName="width-15 margin-l-3"
                errors={errors}
                label={"Text Color"}
                name={`${name}.optionsMeta.color`}
                id={`${name}.optionsMeta.color`}
              />

              <HookFormSelect
                control={control}
                errors={errors}
                validation={{}}
                options={colorOptions}
                name={`${name}.optionsMeta.fill.color`}
                label={"Fill Color"}
                id={`${name}.optionsMeta.fill.color`}
                baseClassName="width-15 margin-l-3"
              />
              <HookFormInput
                control={control}
                errors={errors}
                validation={{}}
                name={`${name}.optionsMeta.fill.transparency`}
                label="Transparency"
                id={`${name}.optionsMeta.fill.transparency`}
                baseClassName="width-15 margin-l-3"
              />
              <HookFormSelect
                validation={{}}
                control={control}
                options={fontFaceOptions}
                baseClassName="width-15 margin-l-3"
                errors={errors}
                label="FontFace"
                id={`${name}.optionsMeta.fontFace`}
                name={`${name}.optionsMeta.fontFace`}
              />
            </div>
            <div className="flex flex-row">
              <HookFormSelect
                control={control}
                errors={errors}
                validation={{}}
                options={borderTypeOptions}
                name={`${name}.optionsMeta.border.type`}
                label={"Border Type"}
                id={`${name}.optionsMeta.border.type`}
                baseClassName="width-15 margin-l-3"
              />
              <HookFormSelect
                control={control}
                errors={errors}
                validation={{}}
                options={colorOptions}
                name={`${name}.optionsMeta.border.color`}
                label={"Border Color"}
                id={`${name}.optionsMeta.border.color`}
                baseClassName="width-15 margin-l-3"
              />
              <HookFormInput
                control={control}
                errors={errors}
                validation={{}}
                label="Border Width"
                name={`${name}.optionsMeta.border.pt`}
                id={`${name}.optionsMeta.border.pt`}
                baseClassName="width-15 margin-l-3"
              />
            </div>
            <RowHeightForm
              label="Row Height Form"
              name={name}
              control={control}
              errors={errors}
            />
            <ColWidthForm
              label="Column Width Form"
              name={name}
              control={control}
              errors={errors}
            />
          </div>
        </LabelComponent>
      )}
    </TileComponent>
  );
}

export default MetaTypeTableForm;
