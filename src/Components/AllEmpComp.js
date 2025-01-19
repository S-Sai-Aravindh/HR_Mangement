import React, { useEffect, useState } from 'react';
import '../Styles/Style.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'http://localhost:5047/api/Register';

    const fetchEmployees = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-container">
      <h2 className="employee-header">Employee List</h2>
      {loading ? (
        <p className="loading-text">Loading employees...</p>
      ) : error ? (
        <p className="error-text">Error fetching employees: {error}</p>
      ) : employees.length > 0 ? (
        <table className="employee-table">
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
        <p className="no-records-text">No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeList;
