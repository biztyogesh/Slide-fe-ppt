import { Button } from "semantic-ui-react";
import classnames from "classnames";
import { IconSizeProp } from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import SvgIcon, { SVGType } from "components/SvgIcon";
import "./CustomButton.scss";

export enum ICON_POSITION {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

interface Props {
  type?: any;
  iconProps?: {
    svgType: SVGType;
    circular?: boolean;
    name: any;
    size?: IconSizeProp;
    baseclassname?: any;
    inverted?: boolean;
  };
  iconPosition?: ICON_POSITION;
  handleClick?: any;
  buttonText?: string;
  buttonTextClass?: any;
  baseclassname?: any;
  transparent?: boolean;
  primaryButton?: boolean;
  secondaryButton?: boolean;
  gradientButton ?: boolean;
  greyButton?: boolean;
  outline?: boolean;
  noOutline?: boolean;
  noPadding?: boolean;
  circular?: boolean;
  round?: boolean;
  disabled?: boolean;
  id?: string;
  loading?: boolean;
}

const CustomButton = (props: Props) => {
  const {
    baseclassname,
    iconPosition,
    iconProps,
    handleClick,
    buttonText,
    buttonTextClass,
    transparent,
    primaryButton,
    secondaryButton,
    gradientButton,
    greyButton,
    type,
    outline,
    noOutline,
    noPadding,
    circular,
    round,
    disabled,
    id,
    loading
  } = props;


  const handleButtonClick = (event: any) => {
    if (typeof handleClick == 'function') {
      handleClick(event);
    }
  }

  return (
      <Button
        id={id}
        loading={!!loading}
        className={classnames([
          "customButton",
          {
            "primary-button": primaryButton,
            "secondary-button": secondaryButton,
            "grey-button": greyButton,
            "no-button-background": transparent,
            "gradient-button" : gradientButton ,
            "outline": outline,
            "icon-only": !buttonText,
            "no-outline": noOutline,
            "no-padding": noPadding,
            "circular": circular,
            "round": round,
            "disabled": disabled
          },
          baseclassname,
        ])}
        onClick={handleButtonClick}
        type={type || "button"}
        disabled={disabled}
      >
        <div className="flex flex-row flex-justify-center flex-align-center height-100">
        {iconProps && iconPosition === ICON_POSITION.LEFT && (
          <SvgIcon baseclassname={classnames([{'margin-r-2': !!buttonText}])} {...iconProps}/>
        )}
        {buttonText && (
          <span
            className={classnames([
              // "text-lg",
              buttonTextClass
            ])}
          >
            {buttonText}
          </span>
        )}
        {iconProps && iconPosition === ICON_POSITION.RIGHT && (
          <SvgIcon baseclassname={classnames([{'margin-r-2': !!buttonText}])} {...iconProps}/>
        )}
        </div>
      </Button>
  );
};

export default CustomButton;
