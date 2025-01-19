import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import '../Styles/Style.css';

const EmpNavComp = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="nav-container">
      <h1 className="nav-header">Main Dashboard</h1>
      <Link to="EmployeeDetails" className="nav-btn">My Details</Link>{" "}
      <Link to="AttendanceForm" className="nav-btn">Attendance Form</Link>{" "}
      <button onClick={handleLogout} className="nav-btn2">Logout</button>
    </div>
  );
};

export default EmpNavComp;
