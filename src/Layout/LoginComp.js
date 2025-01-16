import { useState ,useEffect } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom'; // To navigate to different pages

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory(); // React Router's history object

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Make the API call to authenticate the user
            const response = await axios.post('http://localhost:5047/api/Login', {
                Email: email,
                Password: password
            });

            // If successful login, navigate to the index page (or any other page)
            alert('Login successful!');
            console.log(response.data); // Log the response data if needed
            // history.push('/index'); // Navigate to the index page

        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
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
    );
};

export default Login;