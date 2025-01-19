import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Style.css';

const AttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5047/Api/AttendanceRecord');
        setAttendanceRecords(response.data);
        console.log("Attendance:", response.data);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  return (
    <div className="attendance-container">
      <h2 className="attendance-header">Attendance Records</h2>
      {attendanceRecords.length > 0 ? (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Short Fall</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.employeeId}</td>
                <td>{record.name}</td>
                <td>{record.date}</td>
                <td>{record.inTime.toString()}</td>
                <td>{record.outTime.toString()}</td>
                <td>{record.shortFall.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-records">No attendance records found.</p>
      )}
    </div>
  );
};

export default AttendanceRecords;
