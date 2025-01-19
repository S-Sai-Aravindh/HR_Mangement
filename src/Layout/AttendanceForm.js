import React, { useState } from 'react';
import axios from 'axios';

function AttendanceForm() {
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [inTime, setInTime] = useState('');
    const [outTime, setOutTime] = useState('');
    const [shortFall, setShortFall] = useState(null);

    // Convert 24-hour time to 12-hour format with AM/PM
    const formatTimeTo12Hour = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
        return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    const calculateShortFall = (inTime, outTime) => {
        const standardWorkingHours = 9 * 60; // Standard 9 hours in minutes
        const [inH, inM] = inTime.split(":").map(Number);
        const [outH, outM] = outTime.split(":").map(Number);
        
        // Calculate worked time in minutes
        const workedMinutes = (outH * 60 + outM) - (inH * 60 + inM);
        
        // Calculate the shortfall in minutes
        const shortFallMinutes = workedMinutes - standardWorkingHours;
        
        // Convert shortfall back to hours and minutes
        const shortFallHours = Math.floor(Math.abs(shortFallMinutes) / 60);
        const shortFallRemainingMinutes = Math.abs(shortFallMinutes) % 60;
        
        // Return shortfall as a string with proper sign (+ or -)
        return `${shortFallMinutes < 0 ? '-' : ''}${Math.abs(shortFallHours)}:${shortFallRemainingMinutes.toString().padStart(2, '0')}`;
    };
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (inTime && outTime) {
            const calculatedShortFall = calculateShortFall(inTime, outTime);
            console.log('Calculated ShortFall:', calculatedShortFall);
            setShortFall(calculatedShortFall);
    
            const data = {
                EmployeeId: parseInt(employeeId, 10),
                Date: date,
                InTime: inTime + ":00",
                OutTime: outTime + ":00",
                ShortFall: calculatedShortFall // Send calculated shortfall as string
            };
    
            const url = 'http://localhost:5047/Api/Attendance'; // Ensure this is the correct URL
    
            axios.post(url, data)
                .then((response) => {
                    console.log('Attendance details sent successfully:', response.data);
                })
                .catch((error) => {
                    console.error('Error sending attendance details:', error.response.data);
                });
        } else {
            console.log('Please provide both InTime and OutTime to calculate ShortFall.');
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Employee ID:
                <input
                    type="number"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                In Time (HH:MM):
                <input
                    type="time"
                    value={inTime}
                    onChange={(e) => setInTime(e.target.value)}
                    required
                />
            </label>
            <p>In Time (AM/PM): {inTime && formatTimeTo12Hour(inTime)}</p>
            <br />
            <label>
                Out Time (HH:MM):
                <input
                    type="time"
                    value={outTime}
                    onChange={(e) => setOutTime(e.target.value)}
                    required
                />
            </label>
            <p>Out Time (AM/PM): {outTime && formatTimeTo12Hour(outTime)}</p>
            <br />
            <button type="submit">Submit</button>
            {shortFall !== null && (
                <p>
                    Calculated ShortFall: {shortFall} hours
                </p>
            )}
        </form>
    );
}

export default AttendanceForm;
