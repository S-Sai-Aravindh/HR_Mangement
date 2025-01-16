import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminComp = ({ loggedInEmail }) => {
  const [employees, setEmployees] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Fetch data from the Employee table
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5047/api/Register'); // Update URL to match your API endpoint
        setEmployees(response.data); // Assuming API returns a list of employees

        // Find the logged-in user's details
        const user = response.data.find((employee) => employee.email === loggedInEmail);
        setLoggedInUser(user);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [loggedInEmail]);

  return (
    <div>
      <h2>Employee List</h2>
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
      )}

      <h2>Logged-in User Details</h2>
      {loggedInUser ? (
        <div>
          <p>
            <strong>EmpId:</strong> {loggedInUser.empId}
          </p>
          <p>
            <strong>First Name:</strong> {loggedInUser.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {loggedInUser.lastName}
          </p>
          <p>
            <strong>Department:</strong> {loggedInUser.department}
          </p>
          <p>
            <strong>DOB:</strong> {loggedInUser.dob}
          </p>
          <p>
            <strong>Gender:</strong> {loggedInUser.gender}
          </p>
          <p>
            <strong>Email:</strong> {loggedInUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {loggedInUser.phone}
          </p>
        </div>
      ) : (
        <p>No details available for the logged-in user.</p>
      )}
    </div>
  );
};

export default AdminComp;
