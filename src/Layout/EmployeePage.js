import React from 'react';
import { useParams } from 'react-router-dom'; // To extract URL parameters
import EmployeeComp from '../Components/EmployeeComp';

const EmployeePage = () => {
  // Extract EmpId from URL parameters
  const { empId } = useParams();

  return <EmployeeComp loggedInEmail={empId} />;
};

export default EmployeePage;
