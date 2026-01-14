import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Frontend Website Pages
import HomePage from './pages/website/HomePage.jsx';
import AboutPage from './pages/website/AboutPage.jsx';
import ServicesPage from './pages/website/ServicesPage.jsx';
import ContactPage from './pages/website/ContactPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';

// Admin Dashboard Pages
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import CasesPage from './pages/admin/CasesPage.jsx';
import CreateCasePage from './pages/admin/CreateCasePage.jsx';
import EditCasePage from './pages/admin/EditCasePage.jsx';
import ViewCasePage from './pages/admin/ViewCasePage.jsx';
import ConsultationsPage from './pages/admin/ConsultationsPage.jsx';
import CreateConsultationPage from './pages/admin/CreateConsultationPage.jsx';
import EditConsultationPage from './pages/admin/EditConsultationPage.jsx';
import ViewConsultationPage from './pages/admin/ViewConsultationPage.jsx';
import AppointmentsPage from './pages/admin/AppointmentsPage.jsx';
import CreateAppointmentPage from './pages/admin/CreateAppointmentPage.jsx';
import EditAppointmentPage from './pages/admin/EditAppointmentPage.jsx';
import ViewAppointmentPage from './pages/admin/ViewAppointmentPage.jsx';
import TasksPage from './pages/admin/TasksPage.jsx';
import CreateTaskPage from './pages/admin/CreateTaskPage.jsx';
import EditTaskPage from './pages/admin/EditTaskPage.jsx';
import ViewTaskPage from './pages/admin/ViewTaskPage.jsx';
import DocumentsPage from './pages/admin/DocumentsPage.jsx';
import CreateDocumentPage from './pages/admin/CreateDocumentPage.jsx';
import ViewDocumentPage from './pages/admin/ViewDocumentPage.jsx';
import UsersPage from './pages/admin/UsersPage.jsx';
import AccountingPage from './pages/admin/AccountingPage.jsx';
import HRPage from './pages/admin/HRPage.jsx';
import ViewLeaveRequestPage from './pages/admin/ViewLeaveRequestPage.jsx';
import EditLeaveRequestPage from './pages/admin/EditLeaveRequestPage.jsx';
import ViewPayrollRecordPage from './pages/admin/ViewPayrollRecordPage.jsx';
import EditPayrollRecordPage from './pages/admin/EditPayrollRecordPage.jsx';
import TrainingPage from './pages/admin/TrainingPage.jsx';
import ViewProgramPage from './pages/admin/ViewProgramPage.jsx';
import EditProgramPage from './pages/admin/EditProgramPage.jsx';
import ViewAssignmentPage from './pages/admin/ViewAssignmentPage.jsx';
import EditAssignmentPage from './pages/admin/EditAssignmentPage.jsx';
import ViewEvaluationPage from './pages/admin/ViewEvaluationPage.jsx';
import EditEvaluationPage from './pages/admin/EditEvaluationPage.jsx';
import CompanyFormationPage from './pages/admin/CompanyFormationPage.jsx';
import CreateCompanyFormationPage from './pages/admin/CreateCompanyFormationPage.jsx';
import EditCompanyFormationPage from './pages/admin/EditCompanyFormationPage.jsx';
import ViewCompanyFormationPage from './pages/admin/ViewCompanyFormationPage.jsx';
import ArchivingPage from './pages/admin/ArchivingPage.jsx';
import CreateArchivePage from './pages/admin/CreateArchivePage.jsx';
import EditArchivePage from './pages/admin/EditArchivePage.jsx';
import ViewArchivePage from './pages/admin/ViewArchivePage.jsx';
import CreateArchiveCategoryPage from './pages/admin/CreateArchiveCategoryPage.jsx';
import EditArchiveCategoryPage from './pages/admin/EditArchiveCategoryPage.jsx';
import ViewArchiveCategoryPage from './pages/admin/ViewArchiveCategoryPage.jsx';
import MessagingPage from './pages/admin/MessagingPage.jsx';
import TranslationsPage from './pages/admin/TranslationsPage.jsx';
import ProfilePage from './pages/admin/ProfilePage.jsx';
import SettingsPage from './pages/admin/SettingsPage.jsx';

// Website Layout
import WebsiteLayout from './layouts/WebsiteLayout.jsx';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
        <Routes>
          {/* Frontend Website Routes */}
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LAWYER']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="cases/new" element={<CreateCasePage />} />
            <Route path="cases/:id" element={<ViewCasePage />} />
            <Route path="cases/:id/edit" element={<EditCasePage />} />
            <Route path="consultations" element={<ConsultationsPage />} />
            <Route path="consultations/new" element={<CreateConsultationPage />} />
            <Route path="consultations/:id" element={<ViewConsultationPage />} />
            <Route path="consultations/:id/edit" element={<EditConsultationPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="appointments/new" element={<CreateAppointmentPage />} />
            <Route path="appointments/:id" element={<ViewAppointmentPage />} />
            <Route path="appointments/:id/edit" element={<EditAppointmentPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="tasks/new" element={<CreateTaskPage />} />
            <Route path="tasks/:id" element={<ViewTaskPage />} />
            <Route path="tasks/:id/edit" element={<EditTaskPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="documents/new" element={<CreateDocumentPage />} />
            <Route path="documents/:id" element={<ViewDocumentPage />} />
            <Route path="company-formation" element={<CompanyFormationPage />} />
            <Route path="company-formation/new" element={<CreateCompanyFormationPage />} />
            <Route path="company-formation/:id" element={<ViewCompanyFormationPage />} />
            <Route path="company-formation/:id/edit" element={<EditCompanyFormationPage />} />
            <Route
              path="users"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="accounting"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <AccountingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="hr"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LAWYER']}>
                  <HRPage />
                </ProtectedRoute>
              }
            />
            {/* HR Leave Requests */}
            <Route
              path="hr/leave/:id"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LAWYER']}>
                  <ViewLeaveRequestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="hr/leave/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <EditLeaveRequestPage />
                </ProtectedRoute>
              }
            />
            {/* HR Payroll Records */}
            <Route
              path="hr/payroll/:id"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <ViewPayrollRecordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="hr/payroll/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <EditPayrollRecordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="training"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LAWYER']}>
                  <TrainingPage />
                </ProtectedRoute>
              }
            />
            {/* Training Programs */}
            <Route
              path="training/programs/:id"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LAWYER']}>
                  <ViewProgramPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="training/programs/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <EditProgramPage />
                </ProtectedRoute>
              }
            />
            {/* Training Assignments */}
            <Route
              path="training/assignments/:id"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LAWYER']}>
                  <ViewAssignmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="training/assignments/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LAWYER']}>
                  <EditAssignmentPage />
                </ProtectedRoute>
              }
            />
            {/* Training Evaluations */}
            <Route
              path="training/evaluations/:id"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LAWYER']}>
                  <ViewEvaluationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="training/evaluations/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'LAWYER']}>
                  <EditEvaluationPage />
                </ProtectedRoute>
              }
            />
            <Route path="archiving" element={<ArchivingPage />} />
            <Route path="archiving/new" element={<CreateArchivePage />} />
            <Route path="archiving/:id" element={<ViewArchivePage />} />
            <Route path="archiving/:id/edit" element={<EditArchivePage />} />
            <Route path="archiving/categories/new" element={<CreateArchiveCategoryPage />} />
            <Route path="archiving/categories/:id" element={<ViewArchiveCategoryPage />} />
            <Route path="archiving/categories/:id/edit" element={<EditArchiveCategoryPage />} />
            <Route path="messaging" element={<MessagingPage />} />
            <Route
              path="translations"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <TranslationsPage />
                </ProtectedRoute>
              }
            />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
