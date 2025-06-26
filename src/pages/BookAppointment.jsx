import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    doctorId: '',
    date: '',
    time: '',
    mode: 'online',
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/appointments', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error booking appointment');
    }
  };

  const [doctors, setDoctors] = useState([]);

  // Doctor list fetch on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(res.data);
      } catch (err) {
        console.error('Error fetching doctors:', err.message);
      }
    };
    fetchDoctors();
  }, []);


  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', textAlign: 'center' }}>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="patientName" placeholder="Your Name" value={formData.patientName} onChange={handleChange} required /><br /><br />
        <input type="email" name="patientEmail" placeholder="Your Email" value={formData.patientEmail} onChange={handleChange} required /><br /><br />
        <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.email})
            </option>
          ))}
        </select><br /><br />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required /><br /><br />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required /><br /><br />
        <select name="mode" value={formData.mode} onChange={handleChange}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select><br /><br />
        <button type="submit">Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookAppointment;
