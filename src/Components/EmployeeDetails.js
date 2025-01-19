import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Style.css';

const EmployeeDetails = ({ loggedInEmail }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5047/api/Register/${loggedInEmail}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [loggedInEmail]);

  return (
    <div>
      <h2 className="employee-header">Employee Details</h2>
      {employee ? (
        <div className="employee-details">
          <p className="employee-detail">
            <strong>EmpId:</strong> {employee.empId}
          </p>
          <p className="employee-detail">
            <strong>First Name:</strong> {employee.firstName}
          </p>
          <p className="employee-detail">
            <strong>Last Name:</strong> {employee.lastName}
          </p>
          <p className="employee-detail">
            <strong>Department:</strong> {employee.department}
          </p>
          <p className="employee-detail">
            <strong>DOB:</strong> {employee.dob}
          </p>
          <p className="employee-detail">
            <strong>Gender:</strong> {employee.gender}
          </p>
          <p className="employee-detail">
            <strong>Email:</strong> {employee.email}
          </p>
          <p className="employee-detail">
            <strong>Phone:</strong> {employee.phone}
          </p>
        </div>
      ) : (
        <p className="loading-text">Loading employee details...</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
