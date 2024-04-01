import React from "react";
import CustomButton, { ICON_POSITION } from "components/CustomButton/CustomButton";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import classNames from "classnames";
import "./style.scss";

export interface IActionButtons {
  label: string;
  icon?: keyof typeof CUSTOM_SVG_ICON;
  iconColor?: string;
  handleClick: (rowData: any) => void;
}

interface ITable {
  data: Array<any>;
  columns: Array<{ key: string; header: string }>;
  actionButtons?: Array<IActionButtons>;
  tableClassName?: any;
  baseClassName?:any;
}

export default function TableComponent({ data, columns, actionButtons , tableClassName , baseClassName }: ITable) {
  const handleAction = (action: IActionButtons, rowData: any) => {
    if (typeof action.handleClick === 'function') {
      action.handleClick(rowData);
    } else {
      console.error('action.onClick is not a function');
    }
  };
  
  const renderData = (rowData: any, index: number) => {
    return (
      <tr key={index}>
        {columns.map((column) => (
          <td key={column.key}>  {rowData[column.key]}</td>
        ))}
            {actionButtons && (
          <td>
            {actionButtons.map((action, actionIndex) => (
              <CustomButton
                key={actionIndex}
                primaryButton
                type="button"
                handleClick={() => handleAction(action, rowData)}
                iconPosition={ICON_POSITION.RIGHT}
                iconProps={{
                  name: CUSTOM_SVG_ICON[action?.icon || "Cross"] as string,
                  svgType: SVGType.CUSTOM,
                  size: "small",
                  baseclassname: `text-${action.iconColor}-color`,
                }}
                transparent
                noOutline
                baseclassname={"cursor-pointer"}
              />
            ))}
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className={classNames(["flex flex-justify-center table-container", baseClassName || ""])}>
      <table className={classNames([tableClassName || ""])}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
            {actionButtons && <th>Action</th>}
          </tr>
        </thead>
        <tbody>{data?.map(renderData)}</tbody>
      </table>
    </div>
  );
}
