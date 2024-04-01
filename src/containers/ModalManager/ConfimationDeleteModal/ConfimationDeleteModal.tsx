import { Modal } from "semantic-ui-react";
import CustomButton from "components/CustomButton";
import { ModalHeader } from "../Common";
// import { ReactComponent as DeleteSVG } from "assets/delete.svg";

import "./ConfimationDeleteModal.scss";

interface Props {
  hideModal: () => void;
  onClose: () => void;
  onSave: () => void;
  title: string;
  message: string;
  primaryBtnTitle?: string;
}


function ConfimationDeleteModal(props: Props) {
  const {
    message,
    title,
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
      className="delete-modal"
    >
      <ModalHeader title={title} toggle={hideModal} />
      <Modal.Content>
        <div className="confimation-message margin-b-8">{message}</div>
        {/* <DeleteSVG /> */}
      </Modal.Content>
      <Modal.Actions>
        <CustomButton primaryButton buttonText={primaryBtnTitle || "OK"} handleClick={props.onSave} round />
      </Modal.Actions>
    </Modal>
  );
}
export default ConfimationDeleteModal;
