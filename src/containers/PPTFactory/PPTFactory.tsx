import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  requestTemplateTypeList,
} from "store/rext/action";
import { getTempTypeListData } from "store/selectors";
import CustomButton, {
  ICON_POSITION,
} from "components/CustomButton/CustomButton";
import Loading from "components/Loading";
import TableComponent from "components/TableComponent";
import { URLRoutes } from "URLRoutes";
import { IActionButtons } from "components/TableComponent/TableComponent";
import { SVGType } from "components/SvgIcon";

let columns = [{ key: "name", header: "Name" }];

function PPTFactory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: listData, fetching: listFetching } = useSelector(getTempTypeListData);

  const handleShowTemplates = (templateTypeId: string) => {
    navigate(URLRoutes.clients.listTemplates.replace(":templateTypeId", templateTypeId));
  };

  const handleEditClick = (id: string) => {
    navigate(URLRoutes.clients.editTemplateType.replace(":id", id));
  };

  const handleCreateClick = () => {
    navigate(URLRoutes.clients.createTemplateType);
  };
  const actionButtons: IActionButtons[] = [
    {
      handleClick: (rowData: any) => handleEditClick(rowData._id),
      icon: "NewEdit",
      iconColor: "secondary",
      label: "Edit",
    },
    {
      handleClick: (rowData: any) => handleShowTemplates(rowData._id),
      icon: "Hamburger",
      iconColor: "secondary",
      label: "Show Lyouts",
    },
  ];

  useEffect(() => {
    dispatch(requestTemplateTypeList({}));
  }, [dispatch]);

  return (
    <div className="flex flex-column width-100">
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
          buttonText="ADD TEMPLATETYPE"
          gradientButton
          handleClick={handleCreateClick}
          baseclassname={"margin-r-4 padding-2 cursor-pointer"}
        />
      </div>

      <div className="text-7 text-bold text-secondary-color text-align-center">Template Types</div>
      {listFetching && <Loading />}
      {!listFetching && (
        <TableComponent
          data={listData}
          columns={columns}
          actionButtons={actionButtons}
          tableClassName={"margin-6"}
        />
      )}
    </div>
  );
}

export default PPTFactory;
