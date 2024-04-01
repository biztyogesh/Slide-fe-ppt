import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react';
import { ModalHeader } from '../Common';
import CustomButton from 'components/CustomButton';
import CustomColorPallete from 'components/CustomColorPallete';

let colorPallets: Array<Array<string>> = [
    ["#EED6D3", "#E3B4B8", "#A49393", "#FFFFFF", "#000000"],
    ["#008170", "#005B41", "#232D3F", "#FFFFFF", "#000000"],
    ["#57375D", "#FF9B82", "#FFC8C8", "#FFFFFF", "#000000"],
    ["#bc6c25", "#dda15e", "#606c38", "#FFFFFF", "#000000"],
    ["#1d3557", "#457b9d", "#a8dadc", "#FFFFFF", "#000000"],
    ["#333F50", "#F99B2C", "#F2F2F2", "#FFFFFF", "#000000"],
  ];

interface Props {
    hideModal: () => void;
    onClose: () => void;
    onSave: (colorPallete : any) => void;
    title: string;
  }

function RegeneratePPTModal(props: Props) {
    const { hideModal , title  } = props;
    const [selectedPallete , setSelectedPallete] = useState<Array<string>>();

    const handlePaletteSelection = (palette: Array<string>) => {
      setSelectedPallete(palette)
      };

    const onDownloadClick = () => {
        props.onSave(selectedPallete)
      }

  return (
    <Modal
    size="tiny"
    dimmer
    open
    onClose={hideModal}
    closeOnEscape={false}
    closeOnDimmerClick={false}
    className="slide-modal"
  >
    <ModalHeader title={title} toggle={hideModal} />
    <Modal.Content>
      <div className="flex flex-column">
       <CustomColorPallete colorPallets={colorPallets} onPaletteSelect={handlePaletteSelection}/>
      </div>
    </Modal.Content>
    <Modal.Actions>
      <CustomButton
        primaryButton
        buttonText={"Save"}
        handleClick={onDownloadClick}
        round
      />
    </Modal.Actions>
  </Modal>
);
}

export default RegeneratePPTModal