import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestTemplatesList } from "store/rext/action";
import { getTemplateListData } from "store/selectors";
import CustomButton, {
  ICON_POSITION,
} from "components/CustomButton/CustomButton";
import Loading from "components/Loading";
import TableComponent from "components/TableComponent";
import { URLRoutes } from "URLRoutes";
import { IActionButtons } from "components/TableComponent/TableComponent";
import { SVGType } from "components/SvgIcon";

let columns = [
  { key: "_id", header: "Id" },
  { key: "name", header: "TemplateName" },
  { key: "templateTypeId", header: "Template Type" },
];

function TemplateContainer() {
  const { templateTypeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: templateListData, fetching: templateFetching } =
    useSelector(getTemplateListData);

  const handleClick = (templateTypeId: any) => {
    navigate(
      URLRoutes.clients.createTemplate.replace(
        ":templateTypeId",
        templateTypeId
      )
    );
  };

  const handleShowLayouts = (templateTypeId: string, templateId: string) => {
    navigate(`/pptFactory/template/${templateTypeId}/${templateId}`);
    console.log(`$/pptFactory/template/${templateTypeId}/${templateId}`);
  };

  const handleEdit = (templateId: string) => {
    navigate(URLRoutes.clients.editTemplate.replace(":templateId", templateId));
  };

  const handleBackClick = () => {
    // navigate(-1)
    navigate(URLRoutes.clients.pptFactory);
  };

  const actionButtons: IActionButtons[] = [
    {
      handleClick: (rowData: any) => handleEdit(rowData._id),
      icon: "Edit",
      iconColor: "primary",
      label: "Edit",
    },
    // {
    //   handleClick: () => { } ,
    //   icon: "Cross",
    //   iconColor: "danger",
    //   label: "Delete",
    // },
    {
      handleClick: (rowData: any) =>
        handleShowLayouts(rowData.templateTypeId, rowData._id),
      icon: "Hamburger",
      iconColor: "secondary",
      label: "Show Templates",
    },
  ];

  useEffect(() => {
    dispatch(requestTemplatesList({ templateTypeId }));
  }, [dispatch]);

  return (
    <div className="flex flex-column width-100">
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
          buttonText="ADD TEMPLATE"
          gradientButton
          handleClick={() => {
            handleClick(templateTypeId);
          }}
          baseclassname={"margin-r-4 padding-2 cursor-pointer"}
        />
      </div>
      <div className="text-7 text-bold text-secondary-color text-align-center">
        Templates{" "}
      </div>
      {templateFetching && <Loading />}
      {!templateFetching && (
        <TableComponent
          data={templateListData}
          columns={columns}
          actionButtons={actionButtons}
          tableClassName={"margin-6"}
        />
      )}
    </div>
  );
}

export default TemplateContainer;
