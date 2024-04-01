import { Modal } from "semantic-ui-react";
import CustomButton from "components/CustomButton";
import { ModalHeader } from "./Common";

interface Props {
  hideModal: () => void;
  onClose: () => void;
  onSave: () => void;
  title: string;
  message: string;
  primaryBtnTitle?: string;
  secondaryBtnTitle?: string;
}


function AlertModal(props: Props) {
  const {
    message,
    title,
    secondaryBtnTitle,
    primaryBtnTitle,
    hideModal
  } = props;
    
    return (
      <Modal
        size="mini"
        dimmer
        open
        onClose={hideModal}
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <ModalHeader title={title} toggle={hideModal}/>
        <Modal.Content>
          {message}
        </Modal.Content>
        <Modal.Actions>
          {secondaryBtnTitle && (
            <CustomButton secondaryButton buttonText={secondaryBtnTitle || "Cancel"} handleClick={props.onClose}/>
          )}
          <CustomButton primaryButton buttonText={primaryBtnTitle || "OK"} handleClick={props.onSave}/>
        </Modal.Actions>
      </Modal>
    );
  }
export default AlertModal;
