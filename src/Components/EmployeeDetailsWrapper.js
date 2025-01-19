import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeDetails from './EmployeeDetails';

const EmployeeDetailsWrapper = () => {
  const { empId } = useParams();

  return <EmployeeDetails loggedInEmail={empId} />;
};

export default EmployeeDetailsWrapper;
