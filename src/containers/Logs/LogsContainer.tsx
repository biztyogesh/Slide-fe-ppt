import CustomButton from "components/CustomButton";
import CustomTable, { IColumns, ISortingCriteria } from "components/CustomTableComponent/CustomTable";
import { HookFormInput } from "components/FormInputs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { requestListLogs } from "store/rext";
import { getLogsListState } from "store/selectors";

let columns : IColumns[] = [
  { key: "type", header: "Type" , sort:true , sortKey:"type"},
  { key: "event", header: "Event" , sort:true , sortKey:"event" },
  { key: "message", header: "Message", sort:false },
  { key: "createdAt", header: "Time Stamp" , sort:true , sortKey:"createdAt" },
];

interface IFilterValues {
  startDate: string;
    endDate: string;
}

function LogsContainer() {
  const dispatch = useDispatch();
  const { data, fetching } = useSelector(getLogsListState);
  const {records , paginationInfo} = data;
  const [currentPage, setCurrentPage] = useState<number>(paginationInfo?.currentPage || 0 );
  const [filterValues, setFilterValues] = useState<IFilterValues>();
  const { handleSubmit, formState: { errors }, control } = useForm({});

  const [sortingCriteria, setSortingCriteria] = useState<ISortingCriteria>({
    sortBy: "type",
    sortOrder: "ASC",
  });

  const handleOnSubmit = (data: any) => {
    setFilterValues({startDate: `${data.startDate}T00:00:00-08:00` , endDate : `${data.endDate}T23:59:59-08:00`});
    const transformedData = {
      page: currentPage,
      pageSize: 500,
      startDate: `${data.startDate}T00:00:00-08:00`,
      endDate: `${data.endDate}T23:59:59-08:00`,
      sort: sortingCriteria.sortBy,
      sortOrder: sortingCriteria.sortOrder,
    };
    dispatch(requestListLogs(transformedData));
  };

  const handleSortChange = (criteria: ISortingCriteria) => {
    setSortingCriteria(criteria);
    dispatch(requestListLogs({
      ...filterValues,
      page: currentPage,
      pageSize: 500,
      sort: criteria.sortBy,
      sortOrder: criteria.sortOrder,
    }));
  };

  const handlePaginationChange = (e: any, { activePage }: any) => {
    setCurrentPage(activePage);
    dispatch(requestListLogs({
      ...filterValues,
      page: currentPage,
      pageSize: 500,
      sort: sortingCriteria.sortBy,
      sortOrder: sortingCriteria.sortOrder,
    }));
  };

  console.log(data)

  return (
    // <div className="height-100 padding-2">
      <CustomTable
        tableData={data.records}
        hasPagination
        paginationData={data.paginationInfo}
        currentPage={currentPage}
        columns={columns}
        fetching={fetching || false}
        handlePaginationChange={handlePaginationChange}
        sortTable={true}
        sortByKey="userId"
        onSortChange={handleSortChange}
        sortingCriteria={sortingCriteria}
      >
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
    
        <div className="padding-5">
          <CustomButton buttonText="Search" type="submit" primaryButton round/>
        </div>
      </form>
      </CustomTable>
      // </div>
  );
}

export default LogsContainer;
