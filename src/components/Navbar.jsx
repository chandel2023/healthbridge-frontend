import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            {token ? (
                <>
                    {role === 'doctor' && (
                        <Link to="/doctor-dashboard" style={styles.link}>Doctor Dashboard</Link>
                    )}
                    {role === 'instructor' && (
                        <Link to="/yoga-dashboard" style={styles.link}>Yoga Dashboard</Link>
                    )}
                    {role === 'patient' && (
                        <>
                            <Link to="/book-appointment" style={styles.link}>Book Appointment</Link>
                            <Link to="/patient-dashboard" style={styles.link}>My Appointments</Link>
                        </>
                    )}
                    {role === 'learner' && (
                        <>
                            <Link to="/book-yoga" style={styles.link}>Book Yoga</Link>
                            <Link to="/learner-dashboard" style={styles.link}>My Classes</Link>
                        </>
                    )}
                    <button onClick={handleLogout} style={styles.logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" style={styles.link}>Login</Link>
                    <Link to="/register" style={styles.link}>Register</Link>
                </>
            )}
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: '#222',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        alignItems: 'center'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    logout: {
        padding: '5px 10px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default Navbar;
