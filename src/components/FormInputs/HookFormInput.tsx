import { Controller } from 'react-hook-form';
import classNames from "classnames";

import "./HookForms.scss";

export function HookFormInput(props: any) {
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
    placeholder,
    defaultValue,
    disabled,
    required,
    type
  } = props;

  
  return (
    <div className={classNames(['flex flex-column custom-input', baseClassName])}>
      <div className='flex flex-row'>
      {label && <div className={classNames(["text-4 text-bold", labelClassName])}>{label}</div>}
      { required && <div className={classNames(["text-4 text-bold padding-b-2 text-danger-color"])}>*</div>}
      </div>
      {control && (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          rules={validation || {}}
          render={({ field: { onChange, value, ref } }) => (
            <input
            type={type || "text"}
              value={value}
              id={id}
              placeholder={placeholder}
              className={inputClassName || ""}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              disabled={disabled as boolean} 
              required={required}
            />
          )}
        />
      )}
      {errors[name] && <div style={{color:"red"}}>{errors[name].message}</div>}
    </div>
  );
}
