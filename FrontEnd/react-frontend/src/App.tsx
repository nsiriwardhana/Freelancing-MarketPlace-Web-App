import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import EditGig from './layouts/FreelancerWorkManagement/FreelancerDashboard/Components/EditGig';
import FreelancerDashboard from './layouts/FreelancerWorkManagement/FreelancerDashboard/FreelancerDashboard';
import FreelancerHome from './layouts/FreelancerWorkManagement/FreelancerHome/FreelancerHome';
import { CreateGigForm1 } from './layouts/FreelancerWorkManagement/GigManagement/Components/CreateGigForm1';
import CreateGigForm2 from './layouts/FreelancerWorkManagement/GigManagement/Components/CreateGigForm2';
import CreateGigForm3 from './layouts/FreelancerWorkManagement/GigManagement/Components/CreateGigForm3';
import { Footer } from './layouts/navbar&footers/Footer';
import { Navbar } from './layouts/navbar&footers/Navbar';
import { Dashboard } from './layouts/AdminTaskManagement/Dashboard/dashboard';
import { DashboardPage } from './layouts/AdminTaskManagement/Admin/DashboardPage';
import { EditNoticePage } from './layouts/AdminTaskManagement/Admin/EditNoticePage';
import { NewNoticePage } from './layouts/AdminTaskManagement/Admin/NewNoticePage';
import { RespondToTicketPage } from './layouts/AdminTaskManagement/Admin/RespondToTicketPage';
import { EditNoticeForm } from './layouts/AdminTaskManagement/Admin/components/EditNoticeForm';
import { RespondToTicekt } from './layouts/AdminTaskManagement/Admin/components/RespondtoticketComponents/RespondToTicekt';
import { HelpdeskPage } from './layouts/AdminTaskManagement/HelpDesk/HelpdeskPage';
import { NewTicket } from './layouts/AdminTaskManagement/HelpDesk/NewTicket';
import { RaisedTicketPage } from './layouts/AdminTaskManagement/HelpDesk/RaisedTicketPage';
import { SearchNoticesPage } from './layouts/AdminTaskManagement/SearchNotices/SearchNoticesPage';
import { UserSpecificTicketResponse } from './layouts/AdminTaskManagement/HelpDesk/Components/UserSpecificTicketResponse';
import { UserTicketResponsepage } from './layouts/AdminTaskManagement/HelpDesk/UserTicketResponsepage';
import { SupportNavBar } from './layouts/AdminTaskManagement/HelpDesk/Components/SupportNavBar';
import { GigOrder } from './layouts/FreelancerWorkManagement/GigOrder/GigOrder';
import { FormGenerate } from './layouts/AdminTaskManagement/HelpDesk/formGenerate/FormGenerate';
import { FreelancerLoginComponent } from './layouts/UserVerificationManagement/UserLogin/Components/FreelancerLoginComponent';
import { ClientLoginComponent } from './layouts/UserVerificationManagement/UserLogin/Components/ClientLoginComponent';

import FreelancerRegComponent from './layouts/UserVerificationManagement/UserRegistration/FreelancerRegComponent'
import ClientRegComponent from './layouts/UserVerificationManagement/UserRegistration/ClientRegComponent'
import QualificationComponent from './layouts/UserVerificationManagement/QualificationUpload/QualificationComponent'
import QualificationPage from './layouts/UserVerificationManagement/QualficationPage/QualificationPage'
import QualificationUploadPage from './layouts/UserVerificationManagement/QualificationUpload/QualificationUploadPage'
import ApplicantListPage from './layouts/UserVerificationManagement/ApplicationReviewPage/Components/ApplicantListPage'
import QualificationReview from './layouts/UserVerificationManagement/ApplicationReviewPage/Components/QualificationReview'
import InProgress from './layouts/UserVerificationManagement/UserRegistration/InProgress'
import ResubmissionUpload from './layouts/UserVerificationManagement/QualificationUpload/ResubmissionUpload'
import UserTest from './layouts/UserVerificationManagement/UserLogin/Components/UserTest';





export const App = () => {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <div className='flex-grow-1'>
          <Switch>
            <Route path="/CreateGigForm1">
              <Navbar />
              <CreateGigForm1 />
              <Footer />
            </Route>
            <Route path="/CreateGigForm2/:gigId">
              <Navbar />
              <CreateGigForm2 />
              <Footer />
            </Route>
            <Route path="/CreateGigForm3/:gigId">
              <Navbar />
              <CreateGigForm3 />
              <Footer />
            </Route>
            <Route path="/FreelancerMain" exact>
              <Navbar />
              <FreelancerHome />
              <Footer />
            </Route>
            <Route path="/gig/:id">
              <Navbar />
              <GigOrder />
              <Footer />
            </Route>
            <Route path="/FreelancerDashboard">
              <Navbar />
              <FreelancerDashboard />
              <Footer />
            </Route>
            <Route path="/edit/:id">
              <Navbar />
              <EditGig />
              <Footer />
            </Route>

            {/* dilshan gmamge(do not change) */}

            <Route path="/" exact>
              <Redirect to='/dashboard' />
            </Route>

            <Route path='/dashboard' exact>
              <Navbar />
              <Dashboard />
            </Route>

            <Route path='/dashboard/search'>
              <Navbar />
              <SearchNoticesPage />
            </Route>

            <Route path='/support' exact>
              <HelpdeskPage />
            </Route>

            <Route path='/raiseticket' exact>
              <NewTicket />
            </Route>

            <Route path='/tickets' exact>
              <RaisedTicketPage />
            </Route>

            <Route path='/tickets/:ticketId' exact>
              <SupportNavBar />
              <UserTicketResponsepage />
            </Route>


            <Route path='/admin' exact>
              <Navbar />
              <DashboardPage />
            </Route>

            <Route path='/admin/newnotice' exact>
              <Navbar />
              <NewNoticePage />
            </Route>

            <Route path='/admin/editnotice' exact>
              <Navbar />
              <EditNoticePage />
            </Route>

            <Route path='/admin/ticketrespond' exact>
              <Navbar />
              <RespondToTicketPage />
            </Route>

            <Route path='/admin/editnotice/:noticeId' exact>
              <Navbar />
              <EditNoticeForm />
            </Route>

            <Route path='/admin/ticketrespond/:ticketId' exact>
              <Navbar />
              <RespondToTicekt />
            </Route>

            {/* test file  */}
            <Route path='/report' exact>
              <FormGenerate/>
            </Route>

            {/* end of dilshan gamage files */}


            {/* Starting supeshala's files */}

            <Route path='/Freelancer/Login' exact>
            <Navbar />
              <FreelancerLoginComponent/>
              <Footer />
            </Route>
  
            <Route path='/Client/Login' exact>
              <ClientLoginComponent/>
            </Route>

            <Route path='/Freelancer/Registration' exact>
              <FreelancerRegComponent/>
            </Route>

            <Route path='/Client/Registration' exact>
              <ClientRegComponent/>
            </Route>

            {/* dummy site */}
            {/* http://localhost:3000/Freelancer/QualificationUploader */}
            <Route path='/Freelancer/QualificationUploader'  exact>
              <QualificationComponent/>
            </Route>

            <Route path='/upload-qualification'  exact>
              <QualificationUploadPage/> 
            </Route>

            <Route path='/QualificationPage'  exact>
              <QualificationPage/>
            </Route>

            <Route path='/Applicant/Page'  exact>
              <ApplicantListPage/>
            </Route>

            <Route path='/Applicant/review/:username'  exact>
              <QualificationReview/>
            </Route>

            <Route path='/InProgressPage'  exact>
              <InProgress/>
            </Route>

            <Route path='/ReSubmission/:username'  exact>
              <ResubmissionUpload />
            </Route>

            <Route path='/UserTestPage' exact>
              <UserTest/>
            </Route>

            {/* Ending supeshala's files */}


          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
