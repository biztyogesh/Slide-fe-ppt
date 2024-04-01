import { Controller } from "react-hook-form";
import classNames from "classnames";
import "./HookForms.scss";

export function HookFormSelect(props: any) {
  const {
    label,
    labelClassName,
    baseClassName,
    name,
    validation,
    control,
    errors,
    inputClassName,
    id,
    options,
    handleChange,
  } = props;

  return (
    <div
      className={classNames(["flex flex-column custom-input", baseClassName])}
    >
      {label && (
        <div
          className={classNames([
            "text-4 text-bold",
            labelClassName,
          ])}
        >
          {label}
        </div>
      )}
      {control && (
        <Controller
          control={control}
          name={name}
          rules={validation || {}}
          render={({ field: { onChange, value, ref } }) => (
            <select
              className={inputClassName || ""}
              value={value}
              id={id}
              onChange={(e) => {
                onChange(e.target.value);
                if (typeof handleChange === "function") {
                  handleChange(e.target.value);
                }
              }}
            >
              {options?.map(({ label, value }: any, index: number) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          )}
        />
      )}
      {errors[name] && (
        <div style={{ color: "red" }}>{errors[name].message}</div>
      )}
    </div>
  );
}
