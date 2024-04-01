import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "components/CustomButton";
import { HookFormCheckbox } from "components/FormInputs";
import { requestStartTraining, requestTrainingList } from "store/rext";
import { getTrainingListDataState , getTrainedIdDataState } from "store/selectors";
import CustomTable , {IActionButtons} from "components/CustomTableComponent/CustomTable";
import "./style.scss";

let columns = [
  { key: "_id", header: "Training Id" },
  { key: "filename", header: "Filename" },
  { key: "userName", header: "User Name" },
  { key: "isCompleted", header: "Completed" },
];

function TrainingQueue() {
  const dispatch = useDispatch();
  const { data: trainingListData, fetching: trainingListFetching } =
    useSelector(getTrainingListDataState);
    const { data: trainedData, fetching: trainedFetching } =
    useSelector(getTrainedIdDataState);
  const { paginationInfo, records } = trainingListData || [];
  const [currentPage, setCurrentPage] = useState<number>(
    paginationInfo?.currentPage || 0
  );

  const [filterValues, setFilterValues] = useState<{
    isCompleted: boolean;
    isLocked: boolean;
  }>({ isCompleted: false, isLocked: false });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});

  const handleOnSubmit = (data: any) => {
    console.log(data, "onSubmit");
    setFilterValues({
      isCompleted: Boolean(data.isCompleted),
      isLocked: Boolean(data.isLocked),
    });
    const transformedData = {
      page: currentPage,
      pageSize: 500,
      isCompleted: Boolean(data.isCompleted) || false,
      isLocked: Boolean(data.isLocked) || false,
    };
    dispatch(requestTrainingList(transformedData));
  };

  const handlePaginationChange = (e: any, { activePage }: any) => {
    setCurrentPage(activePage);
    const updatedBody = {
      ...filterValues,
      pageSize: 500,
      page: activePage - 1,
    };
    dispatch(requestTrainingList(updatedBody));
  };

  const handleStartTrainingClick = (trainingId: any) => {
    dispatch(requestStartTraining({}, { trainingId: trainingId }));
  };

  const actionButtons: IActionButtons[] = [
    {
      handleClick: (rowData: any) => handleStartTrainingClick(rowData.trainingId),
      label: "Trained",
    },
  ];


  return (
      <CustomTable
        tableData={records || []}
        hasPagination
        paginationData={paginationInfo}
        currentPage={currentPage}
        columns={columns}
        fetching={trainingListFetching || false}
        handlePaginationChange={handlePaginationChange}
        actionButtons={actionButtons}
        showActionButtonsConditionally={!filterValues.isCompleted}
      >
          <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-row flex-align-center flex-justify-between"
      >
        <HookFormCheckbox
          control={control}
          errors={errors}
          name="isCompleted"
          id="isCompleted"
          label="Completed"
          baseClassName="width-25 margin-l-3"
        />
        <HookFormCheckbox
          control={control}
          errors={errors}
          name="isLocked"
          id="isLocked"
          label="Locked"
          baseClassName="width-25 margin-l-3"
        />
        <div className="padding-5">
          <CustomButton buttonText="Search" type="submit" primaryButton round />
        </div>
      </form>
      </CustomTable>
  );
}

export default TrainingQueue;


// function TrainingQueue() {
//   const dispatch = useDispatch();
//   const { data: trainingListData, fetching: trainingListFetching } =
//     useSelector(getTrainingListDataState);
//     const { data: trainedData, fetching: trainedFetching } =
//     useSelector(getTrainedIdDataState);
//   const { paginationInfo, records } = trainingListData || [];
//   const [currentPage, setCurrentPage] = useState<number>(
//     paginationInfo?.currentPage || 0
//   );

//   const [filterValues, setFilterValues] = useState<{
//     isCompleted: boolean;
//     isLocked: boolean;
//   }>({ isCompleted: false, isLocked: false });

//   const {
//     handleSubmit,
//     formState: { errors },
//     control,
//   } = useForm({});

//   const handleOnSubmit = (data: any) => {
//     console.log(data, "onSubmit");
//     setFilterValues({
//       isCompleted: Boolean(data.isCompleted),
//       isLocked: Boolean(data.isLocked),
//     });
//     const transformedData = {
//       page: currentPage,
//       pageSize: 500,
//       isCompleted: Boolean(data.isCompleted) || false,
//       isLocked: Boolean(data.isLocked) || false,
//     };
//     dispatch(requestTrainingList(transformedData));
//   };

//   const handlePaginationChange = (e: any, { activePage }: any) => {
//     setCurrentPage(activePage);
//     const updatedBody = {
//       ...filterValues,
//       pageSize: 500,
//       page: activePage - 1,
//     };
//     dispatch(requestTrainingList(updatedBody));
//   };

//   const handleStartTrainingClick = (trainingId: any) => {
//     dispatch(requestStartTraining({}, { trainingId: trainingId }));
//   };

//   const renderData = (
//     { _id, filename, isCompleted, userName }: any,
//     index: number
//   ) => {
//     const transformBoolean = (value: any): string => {
//       if (typeof value === "boolean") {
//         return value ? "Yes" : "No";
//       }
//       return value;
//     };

//     return (
//       <tr key={index}>
//         <td>{_id}</td>
//         <td>{filename}</td>
//         <td>{userName}</td>
//         <td>{transformBoolean(isCompleted)}</td>
//         {isCompleted === false && (
//           <td>
//             <CustomButton
//               buttonText="Trained"
//               transparent
//               primaryButton
//               noOutline
//               noPadding
//               handleClick={() => handleStartTrainingClick(_id)}
//             />
//           </td>
//         )}
//       </tr>
//     );
//   };
//   return (
//     <div className="padding-2 height-100">
//       <form
//         onSubmit={handleSubmit(handleOnSubmit)}
//         className="flex flex-row flex-align-center flex-justify-between"
//       >
//         <HookFormCheckbox
//           control={control}
//           errors={errors}
//           name="isCompleted"
//           id="isCompleted"
//           label="Completed"
//           baseClassName="width-25 margin-l-3"
//         />
//         <HookFormCheckbox
//           control={control}
//           errors={errors}
//           name="isLocked"
//           id="isLocked"
//           label="Locked"
//           baseClassName="width-25 margin-l-3"
//         />
//         <div className="padding-5">
//           <CustomButton buttonText="Search" type="submit" primaryButton round />
//         </div>
//       </form>
//       <div className="training-table-container width-100">
//         {trainingListFetching && <Loading />}
//         {!trainingListFetching && (
//           <table>
//             <thead>
//               <tr>
//                 {/* {columns.map((column) => (
//                     <th key={column.key}>{column.header}</th>
//                   ))} */}
//                 {columns.map((column) =>
//                   column.key === "actions" &&
//                   records?.some((record: any) => !record["isCompleted"]) ? (
//                     <th key={column.key}>{column.header}</th>
//                   ) : (
//                     column.key !== "actions" && (
//                       <th key={column.key}>{column.header}</th>
//                     )
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody>{records?.map(renderData)}</tbody>
//           </table>
//         )}
//       </div>
//       <div className="training-pagination-container width-100">
//         <Pagination
//           activePage={currentPage}
//           onPageChange={handlePaginationChange}
//           totalPages={paginationInfo?.totalPages || 1}
//         />
//       </div>
//     </div>
//   );
// }

// export default TrainingQueue;
