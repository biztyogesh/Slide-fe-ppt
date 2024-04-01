import {
  HookFormCheckbox,
  HookFormInput,
  HookFormSelect,
} from "components/FormInputs";
import TileComponent from "components/TileComponent/TileComponent";
import LabelComponent from "components/LabelComponent";
import StaticImageForm from "./StaticImageForm";

interface Props {
  control: any;
  errors: any;
  name: string;
  watch?: any;
}

let ImageTypeOptions = [
  { label: "Select", value: undefined },
  { label: "STATIC", value: "STATIC" },
  { label: "DYNAMIC", value: "DYNAMIC" },
];

function MetaTypeImageForm(props: Props) {
  const { errors, control, name, watch } = props;
  const imageType = watch(`${name}.chatMeta.imageType`);

  return (
    <TileComponent title="Enter details for Image">
      <LabelComponent label="For ChatMeta" baseClassName={"width-100"}>
        <div className="flex flex-column width-100">
          <div className="flex flex-row width-100">
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-22 margin-r-4"
              label="Width"
              id={`${name}.chatMeta.width`}
              name={`${name}.chatMeta.width`}
            />
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-22 margin-r-4"
              label="Height"
              id={`${name}.chatMeta.height`}
              name={`${name}.chatMeta.height`}
            />
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-22 margin-r-4"
              label="SkewX"
              id={`${name}.chatMeta.skewX1`}
              name={`${name}.chatMeta.skewX1`}
            />
            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-22 margin-r-3"
              label="SkewX2"
              id={`${name}.chatMeta.skewX2`}
              name={`${name}.chatMeta.skewX2`}
            />
          </div>
          <div className="flex flex-row width-100">
            <HookFormInput
              validation={{}}
              control={control}
              baseClassName="width-33 margin-l-2"
              errors={errors}
              label="Image Sequence"
              id={`${name}.chatMeta.imageSequence`}
              name={`${name}.chatMeta.imageSequence`}
            />
            <HookFormSelect
              validation={{}}
              control={control}
              options={ImageTypeOptions}
              baseClassName="width-33 margin-l-3"
              errors={errors}
              label="Image Type"
              id={`${name}.chatMeta.imageType`}
              name={`${name}.chatMeta.imageType`}
            />

            <HookFormInput
              validation={{}}
              control={control}
              errors={errors}
              baseClassName="width-30 margin-l-3"
              label="Id"
              id={`${name}.chatMeta.id`}
              name={`${name}.chatMeta.id`}
            />
          </div>
        </div>
      </LabelComponent>
      <LabelComponent label="For Image" baseClassName={"width-100"}>
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-30 margin-r-4"
          label="X Position."
          id={`${name}.optionsMeta.x`}
          name={`${name}.optionsMeta.x`}
        />
        <HookFormInput
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-30 margin-r-4"
          label="Y Position."
          id={`${name}.optionsMeta.y`}
          name={`${name}.optionsMeta.y`}
        />
        <HookFormCheckbox
          validation={{}}
          control={control}
          errors={errors}
          baseClassName="width-20"
          label={"Rounding"}
          id={`${name}.optionsMeta.rounding`}
          name={`${name}.optionsMeta.rounding`}
        />
      </LabelComponent>
      {imageType === "STATIC" && (
        <StaticImageForm control={control} name={name} errors={errors} />
      )}
    </TileComponent>
  );
}

export default MetaTypeImageForm;
