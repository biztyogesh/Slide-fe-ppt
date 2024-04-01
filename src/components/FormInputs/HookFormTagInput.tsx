import React, { Fragment, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames";
import CustomButton from "components/CustomButton";
import { SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";

interface HookFormTagInputProps {
  label: string;
  labelClassName?: string;
  baseClassName?: string;
  name: string;
  validation?: any;
  control: any;
  errors: any;
  inputClassName?: string;
  id?: string;
  defaultValue?: string[];
  setValue?: any;
  getValue?: (name: string) => string[];
  imageTags?: boolean;
}

export function HookFormTagInput(props: HookFormTagInputProps) {
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
    defaultValue,
    setValue,
    imageTags
  } = props;

  const [tags, setTags] = useState<string[]>(defaultValue || []);
  const tagContainerRef = useRef<any>(null);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTagIndex, setEditingTagIndex] = useState<number>(-1);

  const handleInputKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentInput.trim() !== "") {
        if (isEditing && editingTagIndex !== -1) {
          const updatedTags = [...tags];
          updatedTags[editingTagIndex] = currentInput;
          setTags(updatedTags);
          setValue(name, updatedTags);
          setCurrentInput("");
          setIsEditing(false);
          setEditingTagIndex(-1);
        } else {
          setTags((prev) => [...prev, currentInput]);
          setValue(name, [...tags, currentInput]);
          setCurrentInput("");
        }
      }
    }
  };

  const handleTagClick = (tag: string, index: number) => {
    if (!isEditing) {
      setCurrentInput(tag);
      setIsEditing(true);
      setEditingTagIndex(index);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setValue(name, updatedTags);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
    setValue(name, currentInput);
  };

  const handleEditInputBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditingTagIndex(-1);
    }
  };

  
  useEffect(() => {
      setTags(defaultValue || []);
  }, [defaultValue]);

  return (
    <Fragment>
      <div
        className={classNames(["flex flex-column custom-input", baseClassName])}
      >
        {label && (
          <div className={classNames(["text-4 text-bold", labelClassName])}>
            {label}
          </div>
        )}
        {control && (
          <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={validation || {}}
            render={({ field: { value } }) => (
              <input
                id={id}
                className={inputClassName || ""}
                onChange={handleEditInputChange}
                onBlur={handleEditInputBlur}
                onKeyDown={(e) => handleInputKeyDown(e)}
                value={currentInput}
              />
            )}
          />
        )}
        {errors[name] && (
          <div style={{ color: "red" }}>{errors[name].message}</div>
        )}
      </div>
      <div ref={tagContainerRef} className={classNames("flex flex-row flex-wrap tags-container",{"width-81 height-25": imageTags} , {"margin-l-4  width-90 height-30" : !imageTags})} >
        {tags?.map((tag, index) => (
          <div
            key={index}
            className={classNames(["flex flex-align-center background-secondary-color text-primary-color padding-4 margin-2 tags"])}
          >
            {isEditing && index === editingTagIndex ? (
              <span
                className="cursor-pointer"
                contentEditable
                suppressContentEditableWarning
                onBlur={handleEditInputBlur}
                onKeyDown={(e) => handleInputKeyDown(e)}
              >
                {currentInput}
              </span>
            ) : (
              <span
                className="cursor-pointer margin-l-2"
                onClick={() => handleTagClick(tag, index)}
              >
                {tag }
              </span>
            )}
            <CustomButton
              primaryButton
              type="button"
              handleClick={() => handleTagRemove(tag)}
              iconPosition={ICON_POSITION.RIGHT}
              iconProps={{
                name: "close",
                svgType: SVGType.SEMANTIC,
                size: "small",
                baseclassname: "text-danger-color",
              }}
              transparent
              noOutline
              baseclassname={"cursor-pointer"}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
}
