import React, { Fragment, useState } from "react";
import "./style.scss";
import classNames from "classnames";

interface Props {
  colorPallets: Array<Array<string>>;
  onPaletteSelect: any;
}
function CustomColorPallete({ colorPallets, onPaletteSelect }: Props) {
  const [selectedPalette, setSelectedPalette] = useState<Array<string>>([]);

  const handlePaletteClick = (palette: Array<string>) => {
    setSelectedPalette(palette);
    onPaletteSelect(palette);
  };
  return (
    <div className={classNames(["flex flex-row flex-justify-center  width-100"] ,{"height-0":selectedPalette})}>
          <h4 className="width-20 flex flex-justify-center flex-align-center text-primary-color text-bold">Choose Color Palette</h4>
          <div className="width-60 flex flex-row flex-wrap cursor-pointer">
          {colorPallets.map((colors, index) => (
            <div className="color-palette" key={index} onClick={() => handlePaletteClick(colors)}>
              {colors.map((color, idx) => (
                <div className="color-box" key={idx} style={{ backgroundColor: `${color}` }}></div>
              ))}
            </div>
          ))}
          </div>
    </div>
  );
}

export default CustomColorPallete;
