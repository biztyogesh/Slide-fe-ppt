import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Pagination } from "semantic-ui-react";
import Loading from "components/Loading";
import SvgIcon, { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import CustomButton from "components/CustomButton";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import "./style.scss";

export interface IColumns {
  key: string;
  header: string;
  customValue?: any;
  sort?: boolean;
  sortKey?: string;
}

export interface ISortingCriteria {
  sortBy: string;
  sortOrder: string;
}

export interface IActionButtons {
  label: string;
  icon?: keyof typeof CUSTOM_SVG_ICON;
  iconColor?: string;
  handleClick: (rowData: any) => void;
}

interface ICustomTable {
  columns: IColumns[];
  sortByKey?: string;
  tableData: any[];
  paginationData?: any;
  hasPagination?: boolean;
  fetching: boolean;
  actionButtons?: Array<IActionButtons>;
  handlePaginationChange?: any;
  currentPage?: any;
  sortTable?: boolean; 
  sortingCriteria?: ISortingCriteria;  
  onSortChange?: (criteria: ISortingCriteria) => void;  
  showActionButtonsConditionally?:boolean;
  children?:any;
}

function CustomTable(props: ICustomTable) {
  const {
    columns,
    sortByKey,
    tableData,
    paginationData,
    hasPagination,
    fetching,
    actionButtons,
    handlePaginationChange,
    currentPage,
    sortTable,
    showActionButtonsConditionally,
    children
  } = props;

  const [sortingCriteria, setSortingCriteria] = useState<ISortingCriteria>({
    sortBy: sortByKey || "", 
    sortOrder: "ASC",
  });

  const handleSortColumn = (sortKey: string) => {
    if (sortTable) {
      const newSortingCriteria = {
        sortBy: sortKey,
        sortOrder: sortingCriteria.sortOrder === "ASC" ? "DESC" : "ASC",
      };

      setSortingCriteria(newSortingCriteria);
      props.onSortChange && props.onSortChange(newSortingCriteria); 
    }
  };

   const sortData = (data: any[] , sortingCriteria:any) => {
    const { sortBy, sortOrder } = sortingCriteria;
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA < valueB) {
        return sortOrder === "ASC" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "ASC" ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  };


  const handleAction = (action: IActionButtons, rowData: any) => {
    if (typeof action.handleClick === 'function') {
      action.handleClick(rowData);
    } else {
      console.error('action.onClick is not a function');
    }
  };

  const transformBoolean = (value: any): string => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    return value;
  };

  const renderColumnHeader = (column: IColumns) => {
    const isSortable = sortTable && column.sort;
    const isSorted = sortingCriteria.sortBy === column.sortKey;
    const arrowIcon = isSortable ? (
      isSorted ? (
        sortingCriteria.sortOrder === "ASC" ? (
          <SvgIcon svgType={SVGType.SEMANTIC} name={"arrow up"} size={"small"} />
        ) : (
          <SvgIcon svgType={SVGType.SEMANTIC} name={"arrow down"} size={"small"} />
        )
      ) : (
        <SvgIcon svgType={SVGType.SEMANTIC} name={"arrow up"} size={"small"} />
      )
    ) : (
      ""
    );

    return (
      <th
        key={column.key}
        onClick={() => isSortable && handleSortColumn(column.sortKey || "")}
        className={isSortable ? "cursor-pointer" : ""}
      >
        {column.header} {arrowIcon}
      </th>
    );
  };

  const renderData = (rowData: any, index: number) => {
    return (
      <tr key={index}>
        {columns.map((column) => (
          <td key={column.key}> {transformBoolean(rowData[column.key])}</td>
        ))}
        { showActionButtonsConditionally && actionButtons && (
          <td>
            {actionButtons.map((action, actionIndex) => (
              <CustomButton
                key={actionIndex}
                primaryButton
                type="button"
                buttonText={action.label}
                handleClick={() => handleAction(action, rowData)}
                // iconPosition={ICON_POSITION.RIGHT}
                // iconProps={{
                //   name: CUSTOM_SVG_ICON[action.icon] as string,
                //   svgType: SVGType.CUSTOM,
                //   size: "small",
                //   baseclassname: `text-${action.iconColor}-color`,
                // }}
                gradientButton
                noOutline
                baseclassname={"cursor-pointer"}
              />
            ))}
          </td>
        )}
      </tr>
    );
  };

  const sortedRecords = sortData(tableData || [], sortingCriteria);

  return (
    // <div className="height-100">
    <>
    <div className="custom-table width-100 padding-2">
        {children && <div className="custom-filter-container">{children}</div>}
            <div className="custom-table-container width-100">
        {fetching && <Loading />}
        {!fetching && (
          <table>
            <thead>
              <tr>
                {columns.map(renderColumnHeader)}
                {showActionButtonsConditionally  && actionButtons && <th>Action</th>}
              </tr>
            </thead>
            <tbody>{sortedRecords.map(renderData)}</tbody>
          </table>
        )}
      </div>
      </div>
      {hasPagination && (
        <div className="custom-pagination-container width-100 ppt-padding-t-1">
          <div className="flex flex-row">
            <Pagination
              activePage={currentPage}
              onPageChange={handlePaginationChange}
              totalPages={paginationData?.totalPages || 1}
            />
          </div>
        </div>
      )}
     </>
  );
}

export default CustomTable;
