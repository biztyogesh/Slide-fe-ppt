import {
  HookFormInput,
  HookFormSelect,
  HookFormCheckbox,
} from "components/FormInputs";
import { Align_Positions, DEFAULT_THEME_COLOR, FontFace } from "../utils";
import TileComponent from "components/TileComponent/TileComponent";
import LabelComponent from "components/LabelComponent";

interface Props {
  control: any;
  errors: any;
  name: string;
  watch: any;
}

let colorOptions = [
  { label: "Select", value: undefined },
  { label: "Color 1", value: DEFAULT_THEME_COLOR.Color1 },
  { label: "Color 2", value: DEFAULT_THEME_COLOR.Color2 },
  { label: "Color 3", value: DEFAULT_THEME_COLOR.Color3 },
  { label: "Color 4", value: DEFAULT_THEME_COLOR.Color4 },
  { label: "Color 5", value: DEFAULT_THEME_COLOR.Color5 },
  { label: "Color 6", value: DEFAULT_THEME_COLOR.Color6 },
];

let alignOptions = [
  { label: "Select", value: undefined },
  { label: "RIGHT", value: Align_Positions.RIGHT },
  { label: "LEFT", value: Align_Positions.LEFT },
  { label: "CENTER", value: Align_Positions.CENTER },
];

let fontFaceOptions = [
  { label: "Select", value: undefined },
  { label: "Century Gothic", value: FontFace.CENTURY_GOTHIC },
  { label: "Arial Rounded MT Bold", value: FontFace.ARIAL_ROUNDED },
  { label: "Arial Nova Light (Body)", value: FontFace.ARIAL_NOVA_LIGHT },
  { label: "Cascadia Code SemiBold", value: FontFace.CASCADIA_CODE },
  { label: "Arial Nova Cond", value: FontFace.ARIAL_NOVA_COND },
];

let BulletTypeOptions = [
  { label: "Select", value: "" },
  { label: "Bullet", value: "bullet" },
  { label: "Number", value: "number" },
];

let VAlignOptions = [
  { label: "Select", value: "" },
  { label: "Top", value: "top" },
  { label: "Middle", value: "middle" },
  { label: "Bottom", value: "bottom" },
];

function MetaTypeTextForm(props: Props) {
  const { errors, control, name, watch } = props;
  const disabled: boolean = watch(`${name}.chatMeta.static`);
  const bulletPoint: boolean = watch(`${name}.optionsMeta.bullet`);

  return (
    <TileComponent title="Enter details for Text">
      <LabelComponent label="Chat Meta">
        <HookFormCheckbox
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-12"
          label="Static"
          id={`${name}.chatMeta.static`}
          name={`${name}.chatMeta.static`}
          checkedValue={true}
          uncheckedValue={false}
        />

        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-15 margin-l-2"
          label="StaticValue"
          id={`${name}.chatMeta.staticValue`}
          name={`${name}.chatMeta.staticValue`}
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-15 margin-l-2"
          label="Min"
          id={`${name}.chatMeta.minimum`}
          name={`${name}.chatMeta.minimum`}
          disabled={disabled}
          required={true}
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-15 margin-l-2"
          label="Max"
          id={`${name}.chatMeta.maximum`}
          name={`${name}.chatMeta.maximum`}
          disabled={disabled}
          required={true}
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-10 margin-l-2"
          label="Id"
          id={`${name}.chatMeta.id`}
          name={`${name}.chatMeta.id`}
          disabled={disabled}
          required={true}
        />
         <HookFormCheckbox
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-10 margin-l-2"
          label="Is Number"
          id={`${name}.chatMeta.isNumber`}
          name={`${name}.chatMeta.isNumber`}
        />

        <HookFormCheckbox
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-10 margin-l-2"
          label="Is Currency"
          id={`${name}.chatMeta.isCurrency`}
          name={`${name}.chatMeta.isCurrency`}
        />
         
      </LabelComponent>
      <LabelComponent label="Options For Text">
        <div className="flex flex-column width-100">
          <div className="flex flex-row  width-100">
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-15 margin-l-2"
              label="X Position"
              id={`${name}.optionsMeta.x`}
              name={`${name}.optionsMeta.x`}
            />
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName=" width-15 margin-l-2"
              label="Y Position"
              id={`${name}.optionsMeta.y`}
              name={`${name}.optionsMeta.y`}
            />
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-15 margin-l-2"
              label="Width"
              id={`${name}.optionsMeta.w`}
              name={`${name}.optionsMeta.w`}
            />
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-15 margin-l-2"
              label="Height"
              id={`${name}.optionsMeta.h`}
              name={`${name}.optionsMeta.h`}
            />
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-15 margin-l-2"
              label="FontSize"
              id={`${name}.optionsMeta.fontSize`}
              name={`${name}.optionsMeta.fontSize`}
            />

            <HookFormCheckbox
              validation={{}}
              control={control}
              baseClassName="width-10 margin-l-2"
              errors={errors}
              label={"Bold"}
              name={`${name}.optionsMeta.bold`}
              id={`${name}.optionsMeta.bold`}
            />
          </div>
          <div className="flex flex-row width-100">
            <HookFormSelect
              validation={{}}
              control={control}
              options={fontFaceOptions}
              baseClassName="width-20 margin-l-3"
              errors={errors}
              label="FontFace"
              id={`${name}.optionsMeta.fontFace`}
              name={`${name}.optionsMeta.fontFace`}
            />

            <HookFormSelect
              validation={{}}
              control={control}
              options={colorOptions}
              baseClassName="width-20 margin-l-3"
              errors={errors}
              label={"Color"}
              name={`${name}.optionsMeta.color`}
              id={`${name}.optionsMeta.color`}
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
          <div className="flex flex-row width-100">
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-20 margin-l-3"
              label="Transparency"
              id={`${name}.optionsMeta.transparency`}
              name={`${name}.optionsMeta.transparency`}
            />
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-20 margin-l-3"
              label="Rotate"
              id={`${name}.optionsMeta.rotate`}
              name={`${name}.optionsMeta.rotate`}
            />
            <HookFormCheckbox
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-20 margin-l-3"
              label={"BreakLine"}
              id={`${name}.optionsMeta.breakline`}
              name={`${name}.optionsMeta.breakline`}
            />
            <HookFormCheckbox
              validation={{}}
              control={control}
              baseClassName="width-20 margin-l-3"
              errors={errors}
              label={"Bullet"}
              name={`${name}.optionsMeta.bullet`}
              id={`${name}.optionsMeta.bullet`}
            />
          </div>
        </div>
      </LabelComponent>
      {Boolean(bulletPoint) && (
        <LabelComponent label="Bullet Point Options">
          <HookFormSelect
            control={control}
            validation={{}}
            errors={errors}
            name={`${name}.chatMeta.bullet.type`}
            label="Bullet Type"
            id={`${name}.chatMeta.bullet.type`}
            baseClassName="width-15 margin-l-3"
            options={BulletTypeOptions}
          />
          <HookFormInput
            validation={{}}
            control={control}
            errors={errors}
            label="Character Code"
            name={`${name}.optionsMeta.bullet.characterCode`}
            id={`${name}.optionsMeta.bullet.characterCode`}
            baseClassName="width-15 margin-l-3"
          />
          <HookFormInput
            validation={{}}
            control={control}
            errors={errors}
            label="Indent"
            name={`${name}.optionsMeta.bullet.indent`}
            id={`${name}.optionsMeta.bullet.indent`}
            baseClassName="width-15 margin-l-3"
          />
          <HookFormInput
            validation={{}}
            control={control}
            errors={errors}
            label="Style"
            name={`${name}.optionsMeta.bullet.style`}
            id={`${name}.optionsMeta.bullet.style`}
            baseClassName="width-15 margin-l-3"
          />
        </LabelComponent>
      )}
    </TileComponent>
  );
}

export default MetaTypeTextForm;
