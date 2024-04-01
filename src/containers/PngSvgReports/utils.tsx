import { Fragment, useMemo } from "react";

export function convertDateToPST(createdAt: string) {
const date = new Date(createdAt);
  // Format the time part as "10:46AM"
  const timeString = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/Los_Angeles' });
  // Format the date part as "Feb 13 2024"
  const dateString = date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' });
  // Concatenate the time and date strings
  const formattedDate = `${timeString} ${dateString}`;

  return formattedDate;
}

export const sortData = (data: any[] , sortingCriteria:any) => {
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

export const transformOptions = (optionsDownloaded:any, isDownloaded:any) => {
    if (isDownloaded === true) {
      const formatOptions = Object.entries(optionsDownloaded)
        .filter(([key, value]) => value)
        .map(([key]) => key.toUpperCase())
        .join(" | ");
  
      return formatOptions ? `Yes (${formatOptions})` : "No";
    }
  
    return "No";
  };


  export const transformCustomIconsCreated = (customValue: any) => {
    if (typeof customValue === 'object') {
      return (
        <Fragment>
          <div><strong>Prompt:</strong> {customValue.title || ""}</div>
          <div><strong>Category:</strong> {customValue.styleCategory || ""}</div>
          <div><strong>Sub_Category:</strong> {customValue.styleSubCategory || ""}</div>
          <div><strong>Colors:</strong> { Array.isArray(customValue.colors) ? customValue.colors.join(", ") : ""}</div>
        </Fragment>
      );
    }
    return String(customValue);
  };

//   const renderData = (rowData: any, index: number) => {
//     const transformValue = (value: any, key: string): string => {
     
//        if (Array.isArray(value)) {
//         return value.join(", ");
//       } else if (key === "createdAt") {
//         return convertDateToPST(value);
//       } else if (key === "isDownloaded") {
//         return value;
//       }
//        else {
//         return String(value);
//       }
//     };
  
//     return (
//       <tr key={index}>
//         {columns.map((column) => (
//           <td key={column.key}>{transformValue(rowData[column.key], column.key)}</td>
//         ))}
//       </tr>
//     );
//   };

  // const renderData = (rowData: any, index: number) => {
  //   const transformBoolean = (value: any): string => {
  //     if (typeof value === "boolean") {
  //       return value ? "Yes" : "No";
  //     }
  //     return value;
  //   };

  //   return (
  //     <tr key={index}>
  //       {columns.map((column) => (
  //         <td key={column.key}>{transformBoolean(rowData[column.key])}</td>
  //       ))}
  //     </tr>
  //   );
  // };