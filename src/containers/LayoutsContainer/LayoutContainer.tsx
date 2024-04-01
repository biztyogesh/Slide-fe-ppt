import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestLayoutsList } from "store/rext/action";
import { getLayoutListData } from "store/selectors";
import CustomButton, {
  ICON_POSITION,
} from "components/CustomButton/CustomButton";
import Loading from "components/Loading";
import TableComponent, {
  IActionButtons,
} from "components/TableComponent/TableComponent";
import { URLRoutes } from "URLRoutes";
import { SVGType } from "components/SvgIcon";

let columns = [
  { key: "_id", header: "Id" },
  { key: "name", header: "Name" },
  { key: "templateTypeId", header: "TemplateType Id" },
];

function LayoutContainer() {
  const { templateTypeId, templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: layoutListData, fetching: layoutFetching } = useSelector(getLayoutListData);

    const handleCreateLayoutClick = () => {
    navigate(URLRoutes.clients.createLayout.replace(":templateTypeId" , templateTypeId as string));
  };

  const handleSlidesListClick = (layoutID: string) => {
    //replace by templateId
    navigate(`/pptFactory/layout/${templateTypeId}/${templateId}/${layoutID}`)
  };

  const handleEditClick = (id: string) => {
    navigate(URLRoutes.clients.editLayout.replace(":slideLayoutId" , id));
  };

  const handleBackClick = () => {
    navigate(URLRoutes.clients.listTemplates.replace(":templateTypeId", templateTypeId as string));
    // navigate(-1);
  };

  const actionButtons: IActionButtons[] = [
    {
      handleClick: (rowData: any) => handleEditClick(rowData._id),
      icon: "Edit",
      iconColor: "secondary",
      label: "Edit",
    },
    // {
    //   handleClick: () => { } ,
    //   icon: "Cross",
    //   iconColor: "danger",
    //   label: "Delete",
    // },
    {
      handleClick: (rowData: any) => handleSlidesListClick(rowData._id),
      icon: "Hamburger",
      iconColor: "secondary",
      label: "Show Slides",
    },
  ];

  useEffect(() => {
    dispatch(requestLayoutsList({ templateTypeId }));
  }, [dispatch]);

  return (
    <div className="flex flex-column">
      <div className="flex flex-justify-between padding-t-4">
        <CustomButton
          primaryButton
          type="button"
          handleClick={handleBackClick}
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
          buttonText="ADD LAYOUTS"
          gradientButton
          handleClick={handleCreateLayoutClick}
          baseclassname={"margin-r-4 padding-2 cursor-pointer"}
        />
      </div>

      <div className="text-7 text-bold text-secondary-color text-align-center">Layouts </div>
      {layoutFetching && <Loading />}
      {!layoutFetching && (
        <TableComponent
          data={layoutListData}
          columns={columns}
          actionButtons={actionButtons}
          tableClassName={"margin-6"}
        />
      )}
    </div>
  );
}

export default LayoutContainer;
