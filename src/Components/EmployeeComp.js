import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AttendanceForm from '../Layout/AttendanceForm';

const EmployeeComp = ({ loggedInEmail }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch the details of the logged-in employee
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5047/api/Register/${loggedInEmail}`); // Update endpoint to match your API
        setEmployee(response.data); // Assuming API returns the employee's data
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [loggedInEmail]);

  return (
    <div>
      <h2>Employee Details</h2>
      {employee ? (
        <div>
          <p>
            <strong>EmpId:</strong> {employee.empId}
          </p>
          <p>
            <strong>First Name:</strong> {employee.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {employee.lastName}
          </p>
          <p>
            <strong>Department:</strong> {employee.department}
          </p>
          <p>
            <strong>DOB:</strong> {employee.dob}
          </p>
          <p>
            <strong>Gender:</strong> {employee.gender}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Phone:</strong> {employee.phone}
          </p>
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}

      <AttendanceForm/>


      
    </div>
  );
};

export default EmployeeComp;