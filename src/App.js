import logo from './logo.svg';
import './App.css';
import Register from './Layout/RegisterComp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Layout/LoginComp';
// import EmployeeComp from './Components/EmployeeComp';
import AdminPage from './Layout/AdminPage';
// import AdminComp from './Components/AdminComp';
import EmployeePage from './Layout/EmployeePage';


function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="//employee/:empId" element={<EmployeePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
