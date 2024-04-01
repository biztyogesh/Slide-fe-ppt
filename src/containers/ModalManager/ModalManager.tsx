import { Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalOperation } from "../../store/actions";
import { getModalState } from "../../store/selectors";
import AlertModalView from "./AlertModal";
import ConfimationDeleteModalView from "./ConfimationDeleteModal";
import SlideDownloadModalView from "./SlideDownloadModal"
import RegeneratePPTModalView from "./RegeneratePPTModal";
import CreateNewUserModalView from "./CreateNewUserModel";
import CloneSlideModalView from "./CloneSlideModal";
import "./modal.scss";


export enum ModalsType {
  AlertModal = "AlertModalView",
  ConfimationDeleteModal = "ConfimationDeleteModalView",
  SlideDownloadModal = "SlideDownloadModalView",
  RegeneratePPTModal = "RegeneratePPTModalView",
  CreateNewUserModal = "CreateNewUserModalView",
  CloneSlideModal = "CloneSlideModalView"
}
const modalComponentLookupTable: any = {
  AlertModalView,
  ConfimationDeleteModalView,
  SlideDownloadModalView,
  RegeneratePPTModalView,
  CreateNewUserModalView,
  CloneSlideModalView
};


function ModalManager(props: any) {
  const dispatch = useDispatch();
  const modalState = useSelector(getModalState);
  const hideModal = () => {
    dispatch(modalOperation.hideModal());
  }

  const modal = useMemo(() => {
    const { name, modalProps = {} } = modalState || {};
    if (name) {
      const ModalComponent = modalComponentLookupTable[name];
      return (
        <ModalComponent {...modalProps} hideModal={hideModal} />
      );
    } else {
      return <Fragment />
    }

  }, [modalState]);

  return <Fragment>{modal}</Fragment>;
}

export default ModalManager;
