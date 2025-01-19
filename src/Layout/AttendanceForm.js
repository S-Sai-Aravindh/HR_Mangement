import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Style.css'; // Import the CSS file

function AttendanceForm() {
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [inTime, setInTime] = useState('');
    const [outTime, setOutTime] = useState('');
    const [shortFall, setShortFall] = useState(null);

    const formatTimeTo12Hour = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    const calculateShortFall = (inTime, outTime) => {
        const standardWorkingHours = 9 * 60;
        const [inH, inM] = inTime.split(":").map(Number);
        const [outH, outM] = outTime.split(":").map(Number);
        const workedMinutes = (outH * 60 + outM) - (inH * 60 + inM);
        const shortFallMinutes = workedMinutes - standardWorkingHours;
        const shortFallHours = Math.floor(Math.abs(shortFallMinutes) / 60);
        const shortFallRemainingMinutes = Math.abs(shortFallMinutes) % 60;
        return `${shortFallMinutes < 0 ? '-' : ''}${Math.abs(shortFallHours)}:${shortFallRemainingMinutes.toString().padStart(2, '0')}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inTime && outTime) {
            const calculatedShortFall = calculateShortFall(inTime, outTime);
            setShortFall(calculatedShortFall);
            const data = {
                EmployeeId: parseInt(employeeId, 10),
                Date: date,
                InTime: inTime + ":00",
                OutTime: outTime + ":00",
                ShortFall: calculatedShortFall
            };
            const url = 'http://localhost:5047/Api/Attendance';
            axios.post(url, data)
                .then((response) => console.log('Attendance details sent successfully:', response.data))
                .catch((error) => console.error('Error sending attendance details:', error.response.data));
        }
    };

    return (
        <form className="attendance-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Employee ID:</label>
                <input
                    type="number"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>In Time (HH:MM):</label>
                <input
                    type="time"
                    value={inTime}
                    onChange={(e) => setInTime(e.target.value)}
                    required
                />
                <p>In Time (AM/PM): {inTime && formatTimeTo12Hour(inTime)}</p>
            </div>
            <div className="form-group">
                <label>Out Time (HH:MM):</label>
                <input
                    type="time"
                    value={outTime}
                    onChange={(e) => setOutTime(e.target.value)}
                    required
                />
                <p>Out Time (AM/PM): {outTime && formatTimeTo12Hour(outTime)}</p>
            </div>
            <button className="submit-button" type="submit">Submit</button>
            {shortFall !== null && (
                <p className="shortfall-result">
                    Calculated ShortFall: {shortFall} hours
                </p>
            )}
        </form>
    );
}

export default AttendanceForm;
