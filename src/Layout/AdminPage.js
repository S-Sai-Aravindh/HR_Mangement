import React from 'react';
import AdminComp from '../Components/AdminComp';

const AdminPage = () => {
  const loggedInEmail = 'admin@gmail.com'; 

  return <AdminComp loggedInEmail={loggedInEmail} />;
};

export default AdminPage;
