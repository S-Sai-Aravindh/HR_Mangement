import { createBrowserRouter } from 'react-router-dom';
import LoginComp from '../Layout/LoginComp';
import PageNotFoundComp from '../Layout/PageNotFound';
import RegisterForm from '../Layout/RegisterComp';
import AdminComp from '../Layout/AdminPage';
import AllEmpComp from '../Components/AllEmpComp';
import LoggedInUserDetails from '../Components/LoggedInUserDetails';
import AttendanceRecords from '../Components/AttendanceRecord';
import EmployeePage from '../Layout/EmployeePage';
import AttendanceForm from '../Layout/AttendanceForm';
import EmployeeDetails from '../Components/EmployeeDetails';
import EmployeeDetailsWrapper from '../Components/EmployeeDetailsWrapper';

const routing = createBrowserRouter([
    
  { path: '', element: <LoginComp /> },
  { path: '/Register', element: <RegisterForm /> },
  {
    path: 'admin',
    element: <AdminComp />,
    children: [
      { path: '', element: <LoggedInUserDetails loggedInUser={2}/> },  
      { path: 'allemployees', element: <AllEmpComp /> },
      { path: 'AttendanceRecord', element: <AttendanceRecords /> },
    ],
  },

  {
    path: 'employee/:empId', element : <EmployeePage /> , children :[
      {path: 'AttendanceForm', element: <AttendanceForm/>},
      {path: 'EmployeeDetails', element: <EmployeeDetailsWrapper/>}
    ],
  },
  { path: '*', element: <PageNotFoundComp /> },
]);

export default routing;
