import { Fragment, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "semantic-ui-react";
import CustomButton from "components/CustomButton";
import { HookFormInput } from "components/FormInputs";
import { requestPngSvgAnalytics } from "store/rext";
import { getPngSvgReportState } from "store/selectors";
import Loading from "components/Loading";
import SvgIcon, { SVGType } from "components/SvgIcon";
import { convertDateToPST, sortData, transformCustomIconsCreated } from "./utils";
import DownloadLink from "components/Download/DownLoadLink";
import "./style.scss";

interface IColumns {
  key: string;
  header: string;
  customValue?: any;
  sort: boolean;
  sortKey:string;
}

interface IFilterValues {
  startDate: string;
    endDate: string;
    userId: string;
}

interface ISortingCriteria {
  sortBy: string;
  sortOrder: string;
}

const columns = [
  {
    key: "userId",
    header: "Customer Id",
    sort: true,
    sortKey: "userId"
  },
  {
    key: "title",
    header: "Icons Created",
    customValue: (data: any) => transformCustomIconsCreated(data),
    sort: true,
    sortKey: "title"
  },
  {
    key: "isDownloaded",
    header: "Icons Downloaded",
    customValue: (data: any) => {
      if (data.isDownloaded) {
        return `Yes (${Object.keys(data.optionsDownloaded || {}).join("|")})`;
      } else {
        return "";
      }
    },
    sort: true,
    sortKey: "isDownloaded",
  },
  {
    key: "hasError",
    header: "hasError",
    customValue: (data: any) => (data.hasError ? "YES" : ""),
    sort: false,
    sortKey: "hasError",
  },
  {
    key: "createdAt",
    header: "Time Stamp",
    customValue: (data: any) => convertDateToPST(data.createdAt),
    sort: true,
    sortKey: "createdAt"
  },
];

function PngSvgReports() {
  const dispatch = useDispatch();
  const { data: reportsData, fetching: reportsFetching } = useSelector(getPngSvgReportState);
  const { paginationInfo, records } = reportsData;
  const [currentPage, setCurrentPage] = useState<number>( paginationInfo?.currentPage || 0);
  const [filterValues, setFilterValues] = useState<IFilterValues>();
  const [sortingCriteria, setSortingCriteria] = useState<ISortingCriteria>({
    sortBy: "userId", 
    sortOrder: "ASC", 
  });
  const { handleSubmit, formState: { errors }, control } = useForm({});

  const handleOnSubmit = (data: any) => {
    setFilterValues({startDate: `${data.startDate}T00:00:00-08:00` , endDate : `${data.endDate}T23:59:59-08:00` , userId: data.userId});
    const transformedData = {
      page: currentPage,
      pageSize: 500,
      startDate: `${data.startDate}T00:00:00-08:00`,
      endDate: `${data.endDate}T23:59:59-08:00`,
      userId: data.userId,
      sort: sortingCriteria.sortBy,
      sortOrder: sortingCriteria.sortOrder,
    };
    dispatch(requestPngSvgAnalytics(transformedData));
  };

  const handlePaginationChange = (e: any, { activePage }: any) => {
    setCurrentPage(activePage);
    const updatedBody = {
      ...filterValues,
      sort: sortingCriteria.sortBy,
      sortOrder: sortingCriteria.sortOrder,
      pageSize: 500,
      page: activePage - 1,
    };
    dispatch(requestPngSvgAnalytics(updatedBody));
  };

    
  const handleColumnHeaderClick = (sortKey: string) => {
    const column = columns.find((col) => col.sortKey === sortKey);
    if (column && column.sort && records && records.length > 0) {
    if (column && column.sort) {
      setSortingCriteria((prevCriteria) => ({
        sortBy: sortKey,
        sortOrder: prevCriteria.sortOrder === "ASC" ? "DESC" : "ASC",
      }));
  
      const updatedBody = {
        ...filterValues,
        sort: sortKey,
        sortOrder:
          sortingCriteria.sortOrder === "ASC" ? "DESC" : "ASC",
        pageSize: 500,
        page: 0,
      };
      dispatch(requestPngSvgAnalytics(updatedBody));
    }
  }
  };

  const renderColumnHeader = (column: IColumns) => {
    const isSortable = column.sort;
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
        onClick={() => isSortable && handleColumnHeaderClick(column.sortKey)}
        className={isSortable ? "cursor-pointer" : ""}
      >
        {column.header} {arrowIcon}
      </th>
    );
  };

  const MemoizedRow = ({ rowData, index }:any) => {
    return useMemo(() => (
      <tr key={index}>
        {columns.map((column) => (
          <td key={column.key}>
            {column.customValue
              ? column.customValue(rowData)
              : rowData[column.key]}     
          </td>
        ))}
      </tr>
    ), [rowData, columns]);
  };

  const renderData = (rowData: any, index: number) => {
    return <MemoizedRow rowData={rowData} index={index} />;
  };

  const sortedRecords = sortData(records || [] , sortingCriteria);
  return (
    <div className="padding-2 height-100">
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-row flex-align-center flex-justify-between"
      >
        <HookFormInput
          control={control}
          errors={errors}
          type="date"
          name="startDate"
          id="startDate"
          label="Start Date"
          baseClassName="width-25 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          type="date"
          name="endDate"
          id="endDate"
          label="End Date"
          baseClassName="width-25 margin-l-3"
        />
        <HookFormInput
          control={control}
          errors={errors}
          baseClassName="width-25 margin-l-3"
          label="User Id"
          id="userId"
          name="userId"
        />
        <div className="padding-5">
          <CustomButton buttonText="Search" type="submit" primaryButton round/>
        </div>
      </form>
      <div className="filter-table-container width-100">
        {reportsFetching && <Loading />}
        {!reportsFetching && (
          <table>
            <thead>
              <tr>
              {columns.map(renderColumnHeader)}
              </tr>
            </thead>
            <tbody>{sortedRecords.map(renderData)}</tbody>
          </table>

        )}
      </div>
      <div className="filter-pagination-container width-100 ppt-padding-t-1">
      <div className="flex flex-row flex-justify-between padding-l-2 padding-r-2">
            <div>Page Size: 500</div>
            <div>Total: {paginationInfo?.totalItems || 0}</div>
          </div>
          <div className="flex flex-row">
        <Pagination
          activePage={currentPage}
          onPageChange={handlePaginationChange}
          totalPages={paginationInfo?.totalPages || 1}

        />
        <DownloadLink url="/png-svg/v1/analytics/download" fileName="sampleData" body={{startDate: filterValues?.startDate , endDate:filterValues?.endDate , userId:filterValues?.userId , sort:sortingCriteria.sortBy , sortOrder:sortingCriteria.sortOrder}}/>
        </div>
      </div>
    </div>
  );
}

export default PngSvgReports;