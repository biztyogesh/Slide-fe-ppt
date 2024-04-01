import { Modal } from "semantic-ui-react";
import { ModalHeader } from "../Common";
import { hookformRequired } from "utils/FormValidations";
import { useForm } from "react-hook-form";
import { HookFormInput, HookFormTextarea } from "components/FormInputs";
import "./SlideDownloadModal.scss";

interface Props {
  hideModal: () => void;
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  message: string;
}

const requiredValidation = {
  ...hookformRequired("Required"),
};

function SlideDownloadModal(props: Props) {
  const { hideModal, title } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data: any) => {
  //   const { ques1, ques2, ques3, ques4, ...rest } = data;
  //   const questionsArray = [ques1, ques2, ques3, ques4];

  //   const formDataWithQuestions = {
  //     ...rest,
  //     systemMessages: questionsArray,
  //   };

  //   console.log("Form data submitted:", formDataWithQuestions);
  //   props.onSave(formDataWithQuestions);
  // };
  const onSubmit = (data: any) => {
    const { ques1, ques2, ques3, ques4, ...rest } = data;
      const questionsArray = [ques1, ques2, ques3, ques4].filter(Boolean);
    const filteredQuestionsArray = questionsArray.filter(Boolean);
    const formDataWithQuestions = {
      secret : "qwerty",
      ...rest,
      ...(filteredQuestionsArray.length > 0 ? { systemMessages: filteredQuestionsArray } : {}),
    };
      props.onSave(formDataWithQuestions);
  };

  return (
    <Modal
      size="small"
      dimmer
      open
      onClose={hideModal}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      className="slide-modal"
    >
      <ModalHeader title={title} toggle={hideModal} />
      <Modal.Content>
        <form
          className="flex flex-column"
          onSubmit={handleSubmit(onSubmit)}
          id="myForm"
        >
          <HookFormInput
            validation={requiredValidation}
            control={control}
            errors={errors}
            id="prompt"
            name="prompt"
            label={`Enter PPT Name`}
            required={true}
          />

          <HookFormInput
            validation={requiredValidation}
            control={control}
            errors={errors}
            id="topic"
            name="topic"
            label="Enter PPT Topic"
            required={true}
          />

          <HookFormTextarea
            id="ques1"
            name="ques1"
            label="Prompt Question 1"
            control={control}
            errors={errors}
          />

          <HookFormTextarea
            id="ques2"
            name="ques2"
            label="Prompt Question 2"
            control={control}
            errors={errors}
          />

          <HookFormTextarea
            id="ques3"
            name="ques3"
            label="Prompt Question 3"
            control={control}
            errors={errors}
          />

          <HookFormTextarea
            id="ques4"
            name="ques4"
            label="Prompt Question 4"
            control={control}
            errors={errors}
          />
        </form>
      </Modal.Content>
      <Modal.Actions>
        <button
          type="submit"
          form="myForm"
          className="primary-button padding-3"
        >
          Download
        </button>
      </Modal.Actions>
    </Modal>
  );
}

export default SlideDownloadModal;
