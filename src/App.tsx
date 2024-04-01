import { Fragment, useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import SecureRoute from "containers/HOC/SecureRoute";
import Dashboard from "containers/Dashboard";
import { URLRoutes } from "URLRoutes";
import UserLoginForm from "containers/AuthContainer/UserLoginForm";
import UserManagement from "containers/UserManagement";
import ImageFactory from "containers/ImageFactoryContainer/SearchImages";
import PPTFactory from "containers/PPTFactory";
import ImageTraining from "containers/ImageTraining";
import ImageForm from "containers/ImageFactoryContainer/ManageImage";
import FileUploader from "containers/ImageFactoryContainer/BulkUploader";
import SlidesContainer from "containers/SlidesContainer";
import TemplateForm from "containers/TemplateContainer/TemplateForm/TemplateForm";
import LayoutContainer from "containers/LayoutsContainer/LayoutContainer";
import LayoutForm from "containers/LayoutsContainer/LayoutForm/LayoutForm";
import TemplateContainer from "containers/TemplateContainer";
import TemplateTypeForm from "containers/PPTFactory/TemplateTypeForm";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "store/selectors";
import { requestUserDetail } from "store/actions";
import PngSvgReports from "containers/PngSvgReports";
import TrainingQueue from "containers/TrainingQueue";
import LogsContainer from "containers/Logs/LogsContainer";

function App() {
  const [checkToken, setCheckToken] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { token, fetchingUser } = useSelector(getAuthState);

  useEffect(() => {
    if (token) {
      dispatch(requestUserDetail());
    }
    setCheckToken(true);
  }, []);

  if (fetchingUser) {
    return <div>Loading For User</div>;
  }

  return (
    <Fragment>
      {checkToken && (
        <Routes>
          <Route path={URLRoutes.clients.login} element={<UserLoginForm />} />
          <Route path="/" element={<SecureRoute />}>
            <Route index element={<Dashboard />} />
            {/* Image Factory  */}
            <Route
              path={URLRoutes.clients.imageFactoryManage}
              element={<ImageForm />}
            />
            <Route
              path={URLRoutes.clients.imageFactoryBulk}
              element={<FileUploader />}
            />
            <Route
              path={URLRoutes.clients.imageFactorySearch}
              element={<ImageFactory />}
            />
            {/* --------------- */}
            <Route
              path={URLRoutes.clients.userMangement}
              element={<UserManagement />}
            />
            <Route
              path={URLRoutes.clients.pptFactory}
              element={<PPTFactory />}
            />
            <Route
              path={URLRoutes.clients.imageTraining}
              element={<ImageTraining />}
            />
            <Route
              path={URLRoutes.clients.createTemplateType}
              element={<TemplateTypeForm />}
            />
            <Route
              path={URLRoutes.clients.editTemplateType}
              element={<TemplateTypeForm />}
            />
            <Route
              path={URLRoutes.clients.listTemplates}
              element={<TemplateContainer />}
            />
            <Route
              path={URLRoutes.clients.createTemplate}
              element={<TemplateForm />}
            />
            <Route
              path={URLRoutes.clients.editTemplate}
              element={<TemplateForm />}
            />
            <Route
              path={URLRoutes.clients.listLayouts}
              element={<LayoutContainer />}
            />
            {/* Doubt in this */}
            <Route
              path={URLRoutes.clients.createLayout}
              element={<LayoutForm />}
            />
            <Route
              path={URLRoutes.clients.editLayout}
              element={<LayoutForm />}
            />
            {/* Doubt in below */}
            <Route
              path={URLRoutes.clients.listSlides}
              element={<SlidesContainer />}
            />
            <Route
              path={URLRoutes.clients.createSlide}
              element={<SlidesContainer />}
            />
            <Route
              path={URLRoutes.clients.editSlide}
              element={<SlidesContainer />}
            />
            <Route 
            path={URLRoutes.clients.pngSvg}
            element={<PngSvgReports/>}
            />
            <Route 
            path={URLRoutes.clients.trainingQueue}
            element={<TrainingQueue/>}
            />
              <Route 
            path={URLRoutes.clients.logs}
            element={<LogsContainer/>}
            />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      )}
    </Fragment>
  );
}

export default App;

         {/* Template Type */}
            {/* <Route path="ppt/templateType/list" element={<div>We are in template type list</div>}/>
          <Route path="ppt/templateType/manage" element={<div>We are in template type manage</div>}/>
          <Route path="ppt/templateType/layouts" element={<div>We are in template type layouts</div>}/>

          <Route path="ppt/template" >
              <Route path="list" element={<div>We are in template list</div>}/>
              <Route path="manage" element={<div>We are in template manage</div>}/>
              <Route path="layouts" element={<div>We are in template layouts</div>}/>
              <Route path="slides" element={<div>We are in template slides</div>}/>
          </Route>

          <Route path="imageupload" >
              <Route path="bulk" element={<div>We are in template list</div>}/>
              <Route path="list" element={<div>We are in template manage</div>}/>
              <Route path="single" element={<div>We are in template layouts</div>}/>
          </Route>

          <Route path="searchimage" element={<div>Image Search screen</div>}/>

          <Route path="user-manage" >
              <Route path="list" element={<div>We are in user list</div>}/>
              <Route path="manage" element={<div>We are in user manage</div>}/>
          </Route> */}