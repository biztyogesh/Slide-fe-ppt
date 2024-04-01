import { Input, Modal } from "semantic-ui-react";
import { ModalHeader } from "../Common";
import { useForm } from "react-hook-form";
import { HookFormInput } from "components/FormInputs";
import { hookformRequired } from "utils/FormValidations";
import "./style.scss";

interface Props {
  hideModal: () => void;
  onClose: () => void;
  onSave: (userDetail: any) => void;
  title: string;
  message: string;
}
const requiredValidation = {
  ...hookformRequired("Required"),
};

function CloneSlideModal(props: Props) {
  const { hideModal, title } = props;
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});

  const handleOnSubmit = (data: any) => {
    props.onSave(data);
  };

  return (
    <Modal
      size="tiny"
      dimmer
      open
      onClose={hideModal}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      className="user-modal"
    >
      <ModalHeader title={title} toggle={hideModal} />
      <Modal.Content>
        <form
          className="flex flex-column"
          onSubmit={handleSubmit(handleOnSubmit)}
          id="myForm"
        >
          <HookFormInput
            validation={requiredValidation}
            control={control}
            errors={errors}
            id="cloneId"
            name="cloneId"
            label={`Id`}
            required={true}
          />
        </form>
      </Modal.Content>
      <Modal.Actions>
        <button
          type="submit"
          form="myForm"
          className="primary-button padding-3"
        >
          Submit
        </button>
      </Modal.Actions>
    </Modal>
  );
}

export default CloneSlideModal;