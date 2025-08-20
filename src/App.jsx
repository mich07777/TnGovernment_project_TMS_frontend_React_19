import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import TrainingDirectorate from './pages/Dashboards/TrainingDirectorate';
import TrainingCenter from './pages/Dashboards/TrainingCenter';
import DpoSpecialUnit from './pages/Dashboards/DpoSpecialUnit';
import Igp from './pages/Dashboards/Igp';
import CreateCourse from './pages/Forms/Directorate/CreateCourse';
import PublishCourseDetails from './pages/Forms/Directorate/PublishCourseDetails';
import CourseSummary from './pages/Forms/Directorate/CourseSummary';
import MTrainingCenter from './pages/Masters/MTrainingCenter';
import UploadIFHRMSData from './pages/Forms/Directorate/UploadIFHRMSData';
import HopfLetterOutside from './pages/Forms/Directorate/HopfLetterOutside';
import HopfOutsideComUpload from './pages/Forms/Directorate/HopfOutsideComUpload';
import HopfOutsideComApproval from './pages/Forms/Directorate/HopfOutsideComApproval';
import ApprovedListInternalCom from './pages/Forms/Directorate/ApprovedListInternalCom';
import TCApprovedListInternalCom from './pages/Forms/Trainingcenter/TCApprovedListInternalCom';
import ApprovedListInternalCommunicationList from './pages/Forms/Directorate/ApprovedListInternalCommunicationList';
import CollateandSentforApproval from './pages/Forms/Directorate/CollateandSentforApproval';
import CollateandsentapprovalList from './pages/Forms/Directorate/CollateandsentapprovalList';
import DownloadTemplate from './pages/Forms/Directorate/DownloadTemplate';
import SendProfile from './pages/Forms/Directorate/SendProfile';
import DataBankCRUD from './pages/Forms/Directorate/DataBankCRUD';
import CCCertificateUpload from './pages/Forms/Directorate/CCCertificateUpload';
import CourseCertificateUpload from './pages/Forms/Trainingcenter/CourseCertificateUpload';
import Collateandsent from './pages/Forms/Trainingcenter/Collateandsent';
import TCApprovedListIntCom from './pages/Forms/Trainingcenter/TCApprovedListIntCom';
import TCCreateCourse from './pages/Forms/Trainingcenter/TCCreateCourse';
import TCPublishCourse from './pages/Forms/Trainingcenter/TCPublishCourse';
import TCCourseSummary from './pages/Forms/Trainingcenter/TCCourseSummary';
import SendProfileEndUser from './pages/Forms/Directorate/SendProfileEndUser';
import DpoDownloadtemplate from './pages/Forms/Dpo/DpoDownloadtemplate';
import DpoUploadExcel from './pages/Forms/Dpo/DpoUploadExcel';
import DpoDatabankCRUD from './pages/Forms/Dpo/DpoDatabankCRUD';
import IgpApproval from './pages/Forms/Igp/IgpApproval';
import IgpApprovalSummary from './pages/Forms/Igp/IgpApprovalSummary';
import AddProfile from './pages/Forms/Directorate/AddProfile';
import DpoAddProfile from './pages/Forms/Dpo/DpoAddProfile';
import NominationShortList from './pages/Forms/Dpo/NominationShortList';
import ViewNominationList from './pages/Forms/Dpo/ViewNominationList';
import MasterTrainingCenter from './pages/Masters/Directorate/MasterTrainingCenter';
import MasterLocations from './pages/Masters/Directorate/MasterLocations';
import MasterRank from './pages/Masters/Directorate/MasterRank';
import MasterQualifications from './pages/Masters/Directorate/MasterQualifications';
import MasterModeOfReceiving from './pages/Masters/Directorate/MasterModeOfReceiving';
import MasterDocumentType from './pages/Masters/Directorate/MasterDocumentType';
import MasterPublishTo from './pages/Masters/Directorate/MasterPublishTo';
import MasterCity from './pages/Masters/Directorate/MAsterCity';
import MasterCourseAttendedCenter from './pages/Masters/Directorate/MasterCourseAttendedCenter';
import MasterCourseType from './pages/Masters/Directorate/MasterCourseType';
import MasterDistrictList from './pages/Masters/Directorate/MasterDistrictList';
import MasterRange from './pages/Masters/Directorate/MasterRange';
import MasterSex from './pages/Masters/Directorate/MasterSex';
import MasterSplUnits from './pages/Masters/Directorate/MasterSplUnits';
import MasterStatus from './pages/Masters/Directorate/MasterStatus';
import MasterSubdivision from './pages/Masters/Directorate/MasterSubdivision';
import MasterUnits from './pages/Masters/Directorate/MasterUnits';
import MasterZones from './pages/Masters/Directorate/MasterZones';
import NomineeDetails from './pages/Forms/Directorate/NomineeDetails';
import InputDetails from './pages/Forms/input';


function App() {
  return (
    <BrowserRouter basename='/TMS/'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/TrainingDirectorate" element={<TrainingDirectorate />} />
        <Route path="/TrainingCenter" element={<TrainingCenter />} />
        <Route path="/DpoSpecialUnit" element={<DpoSpecialUnit />} />
        <Route path="/Igp" element={<Igp />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/PublishCourseDetails" element={<PublishCourseDetails />} />
        <Route path="/CourseSummary" element={<CourseSummary />} />
        <Route path="/MTrainingCenter" element={<MTrainingCenter />} />
        <Route path='/UploadIFHRMSData' element={<UploadIFHRMSData />} />
        <Route path="/HopfLetterOutside" element={<HopfLetterOutside/>} />
        <Route path="/HopfOutsideComUpload/:id" element={<HopfOutsideComUpload />} />
        <Route path="/HopfOutsideComApproval/:id" element={<HopfOutsideComApproval/>} />
        <Route path="/ApprovedListInternalCommunication" element={<ApprovedListInternalCom/>} />
        <Route path="/ApprovedListInternalCommunicationList/:id" element={<ApprovedListInternalCommunicationList/>} />
        <Route path="/CollateandSent" element={<CollateandSentforApproval/>} />
        <Route path="/CollateandSentForApproval/:id" element={<CollateandsentapprovalList/> }   />
        <Route path="/DownloadTemplate" element={<DownloadTemplate />} />
        <Route path='/SendProfile' element={<SendProfile /> } />
        <Route path="/DataBankCRUD" element={ <DataBankCRUD /> } />
        <Route path="/DirectorateCCupload" element={<CCCertificateUpload/>  } />  
        <Route path="/TCCCupload" element={<CourseCertificateUpload/>} />
        <Route path='/TCCollateandsent' element={<Collateandsent/>} />
        <Route path='/TCApprovedListInternalCom' element={<TCApprovedListInternalCom/>} />
        <Route path='/TCApprovedListInternalCom/:id' element={<TCApprovedListIntCom/> } />
        <Route path='/TCCreateCourse' element={<TCCreateCourse/>} />
        <Route path='/TCPublishCourseDetails' element={<TCPublishCourse/>} />
        <Route path='/TCCourseSummary' element={<TCCourseSummary/>} />
        <Route path='/SendProfileEndUser' element={<SendProfileEndUser />} />
        <Route path='/DpoDownloadTemplate' element={<DpoDownloadtemplate /> } />
        <Route path='/DpoUploadExcel' element={<DpoUploadExcel />} />
        <Route path='/DpoDatabankCRUD' element={<DpoDatabankCRUD /> } />
        <Route path='/IgpApproval' element={<IgpApproval /> } />
        <Route path='/IgpApprovalSummary' element={<IgpApprovalSummary />} />
        <Route path='/AddProfile' element={<AddProfile />} />
        <Route path='/DpoAddProfile' element={<DpoAddProfile />} />
        <Route path='/NominationShortList' element={<NominationShortList /> } />
        <Route path='/ViewNominationList' element={<ViewNominationList /> } /> 
        <Route path='/masterTrainingCenter' element={<MasterTrainingCenter />} />
        <Route path='/masterLocations' element={<MasterLocations />}/>
        <Route path='/masterRank' element={<MasterRank />}/>
        <Route path='/masterQualification' element={<MasterQualifications />}/>
        <Route path='/masterModeofReceiving' element={<MasterModeOfReceiving />}/>
        <Route path='/masterDocumentType' element={<MasterDocumentType />}/>
        <Route path='/masterPublishTo' element={<MasterPublishTo />}/>
        <Route path='/MasterCity' element={<MasterCity />}/>
        <Route path='/MasterCourseAttendedCenter' element={<MasterCourseAttendedCenter />}/>
        <Route path='/MasterCourseType' element={<MasterCourseType />}/>
        <Route path='/MasterDistrictList' element={<MasterDistrictList />}/>
        <Route path='/MasterRange' element={<MasterRange />}/>
        <Route path='/MasterSex' element={<MasterSex />}/>
        <Route path='/MasterSplUnits' element={<MasterSplUnits />}/>
        <Route path='/MasterStatus' element={<MasterStatus />}/>
        <Route path='/MasterSubdivision' element={<MasterSubdivision />}/>
        <Route path='/MasterUnits' element={<MasterUnits />}/>
        <Route path='/MasterZones' element={<MasterZones />}/>
        <Route path="/nominee-details/:id" element={<NomineeDetails />} />
        <Route path="/inputDetails" element={<InputDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App