import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavComp from '../Layout/NavComp';
import { Outlet } from 'react-router-dom';
import FooterComp from '../Layout/FooterComp';

const AdminComp = ({ loggedInEmail }) => {
  const [employees, setEmployees] = useState([]);
  // const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Fetch data from the Employee table
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5047/api/Register');
        setEmployees(response.data); // Assuming API returns a list of employees

        // Find the logged-in user's details
        const user = response.data.find((employee) => employee.email === loggedInEmail);
        setLoggedInUser(user);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    // Fetch attendance records
    // const fetchAttendanceRecords = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:5047/Api/AttendanceRecord');
    //     setAttendanceRecords(response.data);
    //     console.log("Attendance:", response.data);
    //   } catch (error) {
    //     console.error('Error fetching attendance records:', error);
    //   }
    // };

    fetchEmployees();
    // fetchAttendanceRecords();
  }, [loggedInEmail]);

  return (
    <div>
      <NavComp />

      {/* <h2>Employee List</h2>
      {employees.length > 0 ? (
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>EmpId</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empId}>
                <td>{employee.empId}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.department}</td>
                <td>{employee.dob}</td>
                <td>{employee.gender}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )} */}

      <div>
        <Outlet />
      </div>

      <div>
        <FooterComp/>
      </div>
    </div>
  );
};

export default AdminComp;
