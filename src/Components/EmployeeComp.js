import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AttendanceForm from '../Layout/AttendanceForm';
import '../Styles/Style.css';
import EmpNavComp from '../Layout/EmpNavComp';
import { Outlet } from 'react-router-dom';
import FooterComp from "../Layout/FooterComp";

const EmployeeComp = ({ loggedInEmail }) => {
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
    <div className="employee-containe">
      <div className="nav-container2">
        <EmpNavComp />
      </div>
    <center>
    <h1>Welcome to your ESS</h1>
    </center>

      <div>
        <Outlet/>
      </div>
      
      {/* <div>
        <FooterComp/>
      </div> */}
    </div>
  );
};

export default EmployeeComp;
