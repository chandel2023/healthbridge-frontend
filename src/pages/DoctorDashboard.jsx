import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/appointments/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments(); // refresh list after status update
    } catch (err) {
      console.error('Error updating status:', err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Doctor Dashboard</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table border="1" style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Actions</th> {/* 👈 Important */}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.patientName}</td>
                <td>{appt.patientEmail}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.mode}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(appt._id, 'approved')} style={{ marginRight: '5px' }}>
                        Approve
                      </button>
                      <button onClick={() => updateStatus(appt._id, 'cancelled')}>
                        Cancel
                      </button>
                    </>
                  )}
                  {appt.status !== 'pending' && <span>-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorDashboard;
