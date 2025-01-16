import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // Check for hardcoded admin credentials
            if (email === 'admin@gmail.com' && password === 'admin@123') {
                alert('Admin login successful!');
                navigate('/admin'); // Redirect to admin page
                return;
            }
    
            // Otherwise, check against the database for employee
            const response = await axios.post('http://localhost:5047/api/Login', {
                Email: email,
                Password: password,
            });
    
            // Log the full response to see its structure
            console.log("Response data:", response.data);
    
            // Assuming response.data contains the empId in a specific format
            const empId = response.data.employeeId || response.data.empId; // Adjust based on actual response
    
            if (empId) {
                alert('Employee login successful!');
                console.log("EmpId:", empId);
                navigate(`/employee/${empId}`); // Redirect to employee page with the empId
            } else {
                alert('Login failed. Could not retrieve employee ID.');
            }
    
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);
            alert('Login failed. Please check your credentials.');
        }
    };
    
    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <a href="/register">Register</a>
        </div>
    );
};

export default Login;
