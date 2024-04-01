import { Modal } from "semantic-ui-react";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import CustomButton from "components/CustomButton";
import { ICON_POSITION } from "components/CustomButton/CustomButton";


export const ModalHeader = ({ title, toggle }: any) => {
  return (
    <Modal.Header>
      <div className="flex flex-row width-100 height-100 flex-justify-between flex-align-center">
        <div className="text-secondary-color text-normal text-lg text-bold">{title}</div>
        {toggle ? <CustomButton handleClick={toggle}
          secondaryButton
          transparent
          iconPosition={ICON_POSITION.LEFT} iconProps={{
          svgType: SVGType.CUSTOM,
          name: CUSTOM_SVG_ICON.Cross,
          size: "small"
        }}
        noOutline
        />
        :
        <div/>
        }
      </div>
    </Modal.Header>
  );
};

