import React, { useEffect, useState } from 'react';
import '../Styles/Style.css';

const LoggedInUserDetails = ({ loggedInUser }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:5047/api/Register/${loggedInUser}`;

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, [loggedInUser]);

  return (
    <div className="user-details-container">
      <h2 className="user-details-header">Logged-in User Details</h2>
      {error ? (
        <p className="error-message">Error fetching user details: {error}</p>
      ) : userDetails ? (
        <div>
          <p className="user-detail">
            <strong>EmpId:</strong> {userDetails.empId}
          </p>
          <p className="user-detail">
            <strong>First Name:</strong> {userDetails.firstName}
          </p>
          <p className="user-detail">
            <strong>Last Name:</strong> {userDetails.lastName}
          </p>
          <p className="user-detail">
            <strong>Department:</strong> {userDetails.department}
          </p>
          <p className="user-detail">
            <strong>DOB:</strong> {userDetails.dob}
          </p>
          <p className="user-detail">
            <strong>Gender:</strong> {userDetails.gender}
          </p>
          <p className="user-detail">
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p className="user-detail">
            <strong>Phone:</strong> {userDetails.phone}
          </p>
        </div>
      ) : (
        <p className="loading-message">Loading user details...</p>
      )}
    </div>
  );
};

export default LoggedInUserDetails;
