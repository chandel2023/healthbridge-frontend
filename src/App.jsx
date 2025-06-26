import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/DoctorDashboard';
import YogaDashboard from './pages/YogaDashboard';
import BookAppointment from './pages/BookAppointment';
import BookYogaClass from './pages/BookYogaClass';
import LearnerDashboard from './pages/LearnerDashboard';
import NotFound from './pages/NotFound';
import Welcome from './pages/Welcome';


function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f2f6f9' }}>
        <Navbar />


        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/yoga-dashboard" element={<YogaDashboard />} />
          <Route path="/patient-dashboard" element={<div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Welcome Patient!</h2></div>} />
          <Route path="/learner-dashboard" element={<LearnerDashboard />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/book-yoga" element={<BookYogaClass />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
