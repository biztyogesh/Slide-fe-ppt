import React, { Fragment, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CustomButton from "components/CustomButton";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import { HookFormFieldArray, HookFormInput } from "components/FormInputs";
import { HookFormTextarea } from "components/FormInputs/HookFormTextarea";
import { SVGType } from "components/SvgIcon";
import {
  createTemplateType,
  requestTemplateTypeDetail,
  updateTemplateType,
} from "store/rext";
import { getTemplateTypeFormData } from "store/selectors";
import { hookformRequired } from "utils/FormValidations";
import "./style.scss";
import { toast } from "react-toastify";
import UsePrevious from "containers/HOC/UsePrevious";
import Loading from "components/Loading";
import { SuggestionPromptsForm } from "./SuggestionPromptsForm";

const requiredValidation = {
  ...hookformRequired("Required"),
};
interface Ilayout {
  title: string;
  layoutType: string;
}

interface IQuestions {
  question: string;
  systemMessage: string;
}

interface ITemplateType {
  name: string;
  layouts: Ilayout[];
  predefineSystemMessage: string;
  questions: IQuestions[];
}

export const DEFAULT_VALUE: ITemplateType = {
  name: "",
  layouts: [
    // {
    //   title: "",
    //   layoutType: "",
    // },
  ],
  predefineSystemMessage: "",
  questions: [
    // {
    //   question: "",
    //   systemMessage: "",
    // },
  ],
};

export default function TemplateTypeContainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: templatetypeDetail,
    fetching: templateTypeFetching,
    error,
  } = useSelector(getTemplateTypeFormData);
  // const previousTemptypefetching = UsePrevious(templateTypeFetching);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return templatetypeDetail || DEFAULT_VALUE;
    }, [templatetypeDetail]),
  });

  const handleOnSubmit = (data: any) => {
    console.log(data , "templateType");
    const transformedData = {
      name: data.name,
      layouts: data?.layouts?.map((item: any) => ({
        title: item.title,
        layoutType: item.layoutType,
      })),
      predefineSystemMessage: data.predefineSystemMessage,
      suggestionPrompts: data.suggestionPrompts,
      questions: data?.questions?.map((item: any) => ({
        question: item.question,
        systemMessage: item.systemMessage,
      })),
    };
    if (id) {
      dispatch(updateTemplateType({ id: id }, transformedData));
      // toast.success("Template Type Updated successfully!")
    } else {
      dispatch(createTemplateType(transformedData));
      // toast.success("Template Type Created successfully!")
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(requestTemplateTypeDetail({ id: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      reset(templatetypeDetail);
    } else {
      reset(DEFAULT_VALUE);
    }
  }, [reset, id, templatetypeDetail]);

  return (
    <div className="height-100">
      <CustomButton
        primaryButton
        type="button"
        handleClick={() => navigate(-1)}
        iconProps={{
          name: "arrow left",
          svgType: SVGType.SEMANTIC,
          size: "large",
          baseclassname: "text-default-color",
        }}
        iconPosition={ICON_POSITION.RIGHT}
        transparent
        noOutline
        baseclassname={"cursor-pointer"}
      />
      {templateTypeFetching && <Loading />}
      {!templateTypeFetching && (
        <div className="flex flex-row flex-justify-center height-90 flex-align-center">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className=" flex flex-column width-60  height-90 templatetype-container"
          >
            <div className="text-6 text-bold margin-4">
              {id ? "Update Template Type" : "Create Template Type"}
            </div>
            <div className="padding-l-4 padding-r-4 height-70 overflow-auto">
              <HookFormInput
                name="name"
                id="name"
                label="Template Name"
                control={control}
                errors={errors}
              />

              <HookFormTextarea
                id="predefineSystemMessage"
                name="predefineSystemMessage"
                label="Predefined System message"
                control={control}
                errors={errors}
              />
              <HookFormFieldArray
                label="Layouts"
                control={control}
                errors={errors}
                baseName="layouts"
                fieldName1="title"
                fieldName2="layoutType"
              />

              <HookFormFieldArray
                label="Questions"
                control={control}
                errors={errors}
                baseName="questions"
                fieldName1="question"
                fieldName2="systemMessage"
              />

              <SuggestionPromptsForm
                label="Suggestion Prompts"
                name="suggestionPrompts"
                control={control}
                errors={errors}
              />
            </div>
            <div className="flex flex-row flex-justify-center flex-align-center margin-t-4">
              <CustomButton
                buttonText={id ? "Update" : "Create"}
                type="submit"
                primaryButton
                round
                baseclassname={"cursor-pointer padding-2 margin-l-3"}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
