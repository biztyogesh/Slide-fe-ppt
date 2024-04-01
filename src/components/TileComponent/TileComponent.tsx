import React, { useState } from 'react';
import SvgIcon, { CUSTOM_SVG_ICON, SVGType } from 'components/SvgIcon';
import CustomButton from 'components/CustomButton';
import { ICON_POSITION } from 'components/CustomButton/CustomButton';
import classNames from 'classnames';
import './style.scss';

interface Props {
  children?: any;
  title: string;
  baseClassname?: any;

}

export default function TileComponent({ children, title, baseClassname }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={classNames([`flex flex-column ${isExpanded ?"" : 'collapsed'} tile-container`,])}>
      <div className="flex flex-row flex-justify-between padding-2 text-primary-color heading"  onClick={toggleExpansion} >
        <h4 className='margin-0'>{title}</h4>
        <CustomButton 
        iconProps={{
          svgType: SVGType.CUSTOM,
          name: CUSTOM_SVG_ICON.ArrowDown,
          size: "small",
          baseclassname:"text-primary-color text-align-center"
        }}
        iconPosition={ICON_POSITION.RIGHT}
        baseclassname={`toggle-icon ${isExpanded ? 'expanded' : 'collapsed'}`}
        transparent
        noOutline
        primaryButton
        />
        
      </div>
      {isExpanded && <div className="padding-4 content">{children}</div>}
    </div>
  );
}
