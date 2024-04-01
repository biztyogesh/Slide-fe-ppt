import React, { Fragment, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames";
import CustomButton, {ICON_POSITION} from "components/CustomButton/CustomButton";
import { SVGType } from "components/SvgIcon";

import "./style.scss";

interface ISelectionProps {
  x: number;
  y: number;
  radius: number;
  isDragging: boolean;
  isResizing: boolean;
}

function ImageUploader(props: any) {
  const { control, errors, validation, name, setValue, baseClassname , reset } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [selection, setSelection] = useState<ISelectionProps | null>(null);
  const [magnifiedImage, setMagnifiedImage] = useState<string | null>(null);
  const [crossClicked, setCrossClicked] = useState(false);

  const canvas: HTMLCanvasElement | any = canvasRef.current;

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0] as File;
    //Original Image File
    setValue(name, file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          setImage(img);
          setSelection(null);
          setMagnifiedImage(null);
          setCrossClicked(false);

          if (canvasRef.current) {
            canvasRef.current.width = img.width;
            canvasRef.current.height = img.height;
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = () => {
    inputRef.current?.click();
    reset()
   
  };

  const drawCanvas = () => {
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    if (selection) {
      const { x, y, radius } = selection;
      ctx.strokeStyle = "#ff0000";
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(x - radius, y - radius, radius * 2, radius * 2);
      ctx.strokeStyle = "#000000";

      ctx.setLineDash([]);

      // Draw the circular selection
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // Draw four rectangles at the cardinal directions
      const rectSize = 10;
      const halfRectSize = rectSize / 2;
      ctx.fillStyle = "blue";
      ctx.fillRect(
        x - radius - halfRectSize,
        y - radius - halfRectSize,
        rectSize,
        rectSize
      );
      ctx.fillRect(
        x + radius - halfRectSize,
        y - radius - halfRectSize,
        rectSize,
        rectSize
      );
      ctx.fillRect(
        x - radius - halfRectSize,
        y + radius - halfRectSize,
        rectSize,
        rectSize
      );
      ctx.fillRect(
        x + radius - halfRectSize,
        y + radius - halfRectSize,
        rectSize,
        rectSize
      );

      // Create a magnified image of the selected portion
      const magnifiedCanvas = document.createElement("canvas");
      magnifiedCanvas.width = radius * 2;
      magnifiedCanvas.height = radius * 2;
      const magnifiedCtx = magnifiedCanvas.getContext("2d");
      if (magnifiedCtx) {
        magnifiedCtx.drawImage(
          image,
          x - radius,
          y - radius,
          radius * 2,
          radius * 2,
          0,
          0,
          radius * 2,
          radius * 2
        );
        setMagnifiedImage(magnifiedCanvas.toDataURL());
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rectSize = 10;

    if (selection) {
      const { x: centerX, y: centerY, radius } = selection;
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const isResizingNW = (x >= centerX - radius - rectSize / 2 && x <= centerX - radius + rectSize / 2 && y >= centerY - radius - rectSize / 2 && y <= centerY - radius + rectSize / 2)
      const isResizingNE = (x >= centerX + radius - rectSize / 2 && x <= centerX + radius + rectSize / 2 && y >= centerY - radius - rectSize / 2 && y <= centerY - radius + rectSize / 2)
      const isResizingSW = (x >= centerX - radius - rectSize / 2 && x <= centerX - radius + rectSize / 2 && y >= centerY + radius - rectSize / 2 && y <= centerY + radius + rectSize / 2)
      const isResizingSE = (x >= centerX + radius - rectSize / 2 && x <= centerX + radius + rectSize / 2 && y >= centerY + radius - rectSize / 2 &&  y <= centerY + radius + rectSize / 2)

      if (distance <= radius) {
        setSelection({ ...selection, isDragging: true });
        canvas.style.cursor = "grab";
      } else if (isResizingNW) {
        setSelection({
          ...selection,
          isDragging: false,
          isResizing: true,
        });
        canvas.style.cursor = "nw-resize";
      } else if (isResizingNE) {
        setSelection({
          ...selection,
          isDragging: false,
          isResizing: true,
        });
        canvas.style.cursor = "ne-resize";
      } else if (isResizingSW) {
        setSelection({
          ...selection,
          isDragging: false,
          isResizing: true,
        });
        canvas.style.cursor = "sw-resize";
      } else if (isResizingSE) {
        setSelection({
          ...selection,
          isDragging: false,
          isResizing: true,
        });
        canvas.style.cursor = "se-resize";
      } else {
        setSelection({ x, y, radius, isDragging: false, isResizing: false });
        canvas.style.cursor = "grab";
      }
    } else {
      setSelection({ x, y, radius: 70, isDragging: false, isResizing: false });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selection) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rectSize = 10;

      const { x: centerX, y: centerY, radius } = selection;
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const isResizingNW = (x >= centerX - radius - rectSize / 2 && x <= centerX - radius + rectSize / 2 && y >= centerY - radius - rectSize / 2 && y <= centerY - radius + rectSize / 2)
      const isResizingNE = (x >= centerX + radius - rectSize / 2 && x <= centerX + radius + rectSize / 2 && y >= centerY - radius - rectSize / 2 && y <= centerY - radius + rectSize / 2)
      const isResizingSW = (x >= centerX - radius - rectSize / 2 && x <= centerX - radius + rectSize / 2 && y >= centerY + radius - rectSize / 2 && y <= centerY + radius + rectSize / 2)
      const isResizingSE = (x >= centerX + radius - rectSize / 2 && x <= centerX + radius + rectSize / 2 && y >= centerY + radius - rectSize / 2 &&  y <= centerY + radius + rectSize / 2)

      if (distance <= radius) {
        canvas.style.cursor = "grab";
      } else {
        canvas.style.cursor = "default";
      }

      if (selection.isDragging) {
        setSelection({ ...selection, x: x, y: y });
        setMagnifiedImage(null);
      } else if (selection.isResizing) {
        const dx = x - centerX;
        const dy = y - centerY;
        const newRadius = Math.sqrt(dx * dx + dy * dy);
        setSelection({ ...selection, radius: newRadius });
        setMagnifiedImage(null);
      }

      //const { x: rectX, y: rectY } = selection;
      if (distance <= radius) {
        canvas.style.cursor = "drag";
      } else if (isResizingNW) {
        //top-left corner
        canvas.style.cursor = "nw-resize";
      } else if (isResizingNE) {
        //top-right corner
        canvas.style.cursor = "ne-resize";
      } else if (isResizingSW) {
        //bottom-left corner
        canvas.style.cursor = "sw-resize";
      } else if (isResizingSE) {
        //bottom-right corner
        canvas.style.cursor = "se-resize";
      }
    }
  };

  const handleMouseUp = (e: any) => {
    if (selection) {
      setSelection({ ...selection, isDragging: false, isResizing: false });
      if (!e.buttons) {
        e.preventDefault(); 
      }
    }
  };


  useEffect(drawCanvas, [image, selection, canvas, crossClicked]);

  useEffect(() => {
    if (selection) {
      setValue("x", parseFloat(selection?.x.toFixed(2)));
      setValue("y", parseFloat(selection?.y.toFixed(2)));
      setValue("radius", parseFloat(selection?.radius.toFixed(2)));
    }
  }, [selection, setValue]);

  return (
    <div
      className={classNames(
        ["flex flex-column  flex-align-center"],
        baseClassname
      )}
    >
      <div className="overflow-auto width-90 height-90 imageuploader-container">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
      {/* {magnifiedImage && <img src={magnifiedImage} alt="Magnified" />} */}
      {errors[name] && <div className="text-danger-color">{errors[name].message}</div>}

      <Controller
        control={control}
        name={name}
        rules={validation || {}}
        render={({ field: { onChange } }) => (
          <Fragment>
            <div className="margin-t-2">
              <CustomButton
                type="button"
                buttonText="Upload Image"
                iconProps={{
                  name: "upload",
                  svgType: SVGType.SEMANTIC,
                  size: "small",
                }}
                iconPosition={ICON_POSITION.LEFT}
                handleClick={handleFileUpload}
                secondaryButton
                round
              />
            </div>
            <input
              ref={inputRef}
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="display-none"
            />
          </Fragment>
        )}
      />
    </div>
  );
}

export default ImageUploader;