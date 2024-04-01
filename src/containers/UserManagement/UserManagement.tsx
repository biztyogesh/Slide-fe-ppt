import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { requestManageUser, requestUserList } from "store/rext/action";
import { getManageUserState, getUserListState } from "store/selectors";
import CustomButton, {
  ICON_POSITION,
} from "components/CustomButton/CustomButton";
import Loading from "components/Loading";
import { modalOperation } from "store/actions";
import { ModalsType } from "containers/ModalManager/ModalManager";
import TableComponent from "components/TableComponent";
import { SVGType } from "components/SvgIcon";
import UsePrevious from "containers/HOC/UsePrevious";

const columns = [
  { key: "_id", header: "Id" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
];

function UserManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userListData, fetching: userFetching } =
    useSelector(getUserListState);
  const { fetching: manageUserFetching, error } =
    useSelector(getManageUserState);
  const wasManageUserFetching = UsePrevious(manageUserFetching);

  const handleCreateUserModal = () => {
    dispatch(
      modalOperation.showModal(ModalsType.CreateNewUserModal, {
        onSave: (data: any) => {
          console.log(data, "user");
          dispatch(modalOperation.hideModal());
          dispatch(requestManageUser(data));
        },
        onClose: () => {
          dispatch(modalOperation.hideModal());
        },
        title: "Create New User",
      })
    );
  };

  useEffect(() => {
    dispatch(requestUserList({}));
  }, [dispatch]);

  useEffect(() => {
    if (wasManageUserFetching && !manageUserFetching && !error) {
      toast("User Added Successfully");
      dispatch(requestUserList({}));
    }
  }, [dispatch, wasManageUserFetching, manageUserFetching]);

  return (
    <div className="flex flex-column width-100 height-100">
      <div className="flex flex-justify-between padding-t-4">
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
        <CustomButton
          buttonText="Create User"
          gradientButton
          handleClick={handleCreateUserModal}
          baseclassname={"margin-r-4 padding-2 cursor-pointer"}
        />
      </div>
      <div className="height-90 overflow-auto margin-t-4">
      {userListData.length > 0 && (
        <TableComponent
          data={userListData}
          columns={columns}
          tableClassName={"margin-6"}
        />
      )}
      </div>
      {(userFetching || manageUserFetching) && <Loading isGlobal />}
    </div>
  );
}

export default UserManagement;
