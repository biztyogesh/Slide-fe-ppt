import classNames from 'classnames';
import { Controller } from 'react-hook-form';

export function HookFormCheckbox({ input,onChange, ...props }: any) {
  const {
    label,
    labelClassName,
    baseClassName,
    labelWrapper,
    name,
    validation,
    control,
    errors,
    inputClassName,
    id,
    triggerOnChange,
    checkedValue ,
    uncheckedValue 
  } = props;
  
  return (
    <div className={classNames(["flex flex-row flex-align-center flex-justify-center", baseClassName])}>
          {label && <div className={classNames(["text-4 text-bold padding-r-2", labelClassName])}>{label}</div>}
      {control && (
        <Controller
          control={control}
          name={name}
          rules={validation || {}}
          render={({ field: { onChange, value, ref } }) => (
            <input
              type='checkbox'
              className={inputClassName || ''}
              id={id}
              onChange={async ({ target: { checked } }: any) => {
                onChange(checked ? 1 : 0);
                if(typeof triggerOnChange === "function") {
                  triggerOnChange(
                    checked ? checkedValue : uncheckedValue,
                  );
                } 
              }}
             checked={value || false}
            />
            )}
        />
        )}
        
      {errors[name] && <div>{errors[name].message}</div>}
    </div>
  );
}
