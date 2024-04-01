import { Controller } from 'react-hook-form';
import classNames from "classnames";
import "./HookForms.scss";

export function HookFormTextarea(props: any) {
  const {
    label,
    caption,
    labelClassName,
    captionClassName,
    baseClassName,
    name,
    validation,
    control,
    errors,
    id,
    rows
  } = props;

  return (
    <div className={classNames(['flex flex-column custom-input', baseClassName])}>
      {label && <div className={classNames(["text-4 text-bold padding-b-1", labelClassName])}>{label}</div>}
      {caption && <div className={classNames(["text-3", captionClassName])}>{caption}</div>}
      {control && (
        <Controller
          control={control}
          name={name}
          rules={validation || {}}
          render={({ field: { onChange, value, ref } }) => (
            <textarea
              value={value || ""}
              rows={rows || 2}
              id={id}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          )}
        />
      )}
      {errors[name] && <div style={{color:"red"}}>{errors[name].message}</div>}
    </div>
  );
}
