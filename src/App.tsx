import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { WorkspaceLayout } from '@/layouts/WorkspaceLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import ServicesPage from '@/pages/ServicesPage'
import Contact from '@/pages/Contact'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import RegisterOrganisation from '@/pages/RegisterOrganisation'
import NotFound from '@/pages/NotFound'
import { NotificationsPage } from '@/components/shared/NotificationsPage'
import PatientHome from '@/pages/patient/Home'
import { MyHealthLayout } from '@/pages/patient/MyHealthLayout'
import MyHealthOverview from '@/pages/patient/MyHealthOverview'
import MyHealthTimeline from '@/pages/patient/MyHealthTimeline'
import MyHealthConditions from '@/pages/patient/MyHealthConditions'
import MyHealthMedications from '@/pages/patient/MyHealthMedications'
import MyHealthAllergies from '@/pages/patient/MyHealthAllergies'
import PatientRecords from '@/pages/patient/Records'
import CareNetwork from '@/pages/patient/CareNetwork'
import Access from '@/pages/patient/Access'
import PatientRequests from '@/pages/patient/Requests'
import PatientMessages from '@/pages/patient/Messages'
import PatientProfile from '@/pages/patient/Profile'
import ProfessionalHome from '@/pages/professional/Home'
import Patients from '@/pages/professional/Patients'
import PatientView from '@/pages/professional/PatientView'
import ProfessionalRequests from '@/pages/professional/Requests'
import Referrals from '@/pages/professional/Referrals'
import Communication from '@/pages/professional/Communication'
import ProfessionalOrganisations from '@/pages/professional/Organisations'
import ProfessionalProfile from '@/pages/professional/Profile'
import OrganisationHome from '@/pages/organisation/Home'
import OrganisationProfessionals from '@/pages/organisation/Professionals'
import OrganisationCare from '@/pages/organisation/Care'
import OrganisationRecords from '@/pages/organisation/Records'
import OrganisationRequests from '@/pages/organisation/Requests'
import OrganisationProfile from '@/pages/organisation/Profile'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/services', element: <ServicesPage /> },
          { path: '/about', element: <About /> },
          { path: '/contact', element: <Contact /> },
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
          { path: '/register/organisation', element: <RegisterOrganisation /> },
        ],
      },
      {
        element: <WorkspaceLayout role="patient" />,
        children: [
          { path: '/patient', element: <PatientHome /> },
          {
            path: '/patient/my-health',
            element: <MyHealthLayout />,
            children: [
              { path: '', element: <MyHealthOverview /> },
              { path: 'timeline', element: <MyHealthTimeline /> },
              { path: 'conditions', element: <MyHealthConditions /> },
              { path: 'medications', element: <MyHealthMedications /> },
              { path: 'allergies', element: <MyHealthAllergies /> },
            ],
          },
          { path: '/patient/records', element: <PatientRecords /> },
          { path: '/patient/care-network', element: <CareNetwork /> },
          { path: '/patient/access', element: <Access /> },
          { path: '/patient/requests', element: <PatientRequests /> },
          { path: '/patient/messages', element: <PatientMessages /> },
          { path: '/patient/notifications', element: <NotificationsPage role="patient" /> },
          { path: '/patient/profile', element: <PatientProfile /> },
        ],
      },
      {
        element: <WorkspaceLayout role="professional" />,
        children: [
          { path: '/professional', element: <ProfessionalHome /> },
          { path: '/professional/patients', element: <Patients /> },
          { path: '/professional/patients/:patientId', element: <PatientView /> },
          { path: '/professional/requests', element: <ProfessionalRequests /> },
          { path: '/professional/referrals', element: <Referrals /> },
          { path: '/professional/communication', element: <Communication /> },
          { path: '/professional/organisations', element: <ProfessionalOrganisations /> },
          { path: '/professional/notifications', element: <NotificationsPage role="professional" /> },
          { path: '/professional/profile', element: <ProfessionalProfile /> },
        ],
      },
      {
        element: <WorkspaceLayout role="organisation" />,
        children: [
          { path: '/organisation', element: <OrganisationHome /> },
          { path: '/organisation/professionals', element: <OrganisationProfessionals /> },
          { path: '/organisation/care', element: <OrganisationCare /> },
          { path: '/organisation/records', element: <OrganisationRecords /> },
          { path: '/organisation/requests', element: <OrganisationRequests /> },
          { path: '/organisation/notifications', element: <NotificationsPage role="organisation" /> },
          { path: '/organisation/profile', element: <OrganisationProfile /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}