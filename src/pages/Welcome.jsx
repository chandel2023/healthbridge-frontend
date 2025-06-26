import React from 'react';

const Welcome = () => {
  const role = localStorage.getItem('role');

  return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <h2>👋 Welcome to HealthBridge</h2>
      <p style={{ marginTop: '20px', fontSize: '18px' }}>
        {role === 'doctor' && 'Access your Doctor Dashboard from the top menu.'}
        {role === 'patient' && 'Book your appointment using the navigation above.'}
        {role === 'instructor' && 'Manage learners via Yoga Dashboard.'}
        {role === 'learner' && 'Book your Yoga class from the navigation above.'}
        {!role && 'Please login to continue.'}
      </p>
    </div>
  );
};

export default Welcome;
