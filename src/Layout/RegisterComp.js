// src/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Department: '',
        DOB: '',
        Gender: '',
        Email: '',
        Phone: '',
        Password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5047/api/Register', formData);
            console.log('Registration successful:', response.data);
            // Optionally reset the form or redirect the user
        } catch (error) {
            console.error('There was an error registering!', error);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label>First Name:</label>
                <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange} required />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="LastName" value={formData.LastName} onChange={handleChange} required />
            </div>
            <div>
                <label>Department:</label>
                <input type="text" name="Department" value={formData.Department} onChange={handleChange} required />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
            </div>
            <div>
                <label>Gender:</label>
                <select name="Gender" value={formData.Gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
            </div>
            <div>
                <label>Phone:</label>
                <input type="tel" name="Phone" value={formData.Phone} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="Password" value={formData.Password} onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
        <a href='/login'>Login</a>
        </div>
    );
};

export default RegisterForm;