import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import EditConnection from './components/EditConnection';
import UserForm from './components/UserForm';
import MonthlyConnectionRequestsChart from './components/MonthlyConnectionRequestsChart';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/addUser" element={<UserForm />} />
      <Route path="/reports" element={<MonthlyConnectionRequestsChart />} />
      <Route path="/edit/:applicationID" element={<EditConnection />} /> {/* Edit route */}
    </Routes>
  </Router>,
  document.getElementById('root')
);
