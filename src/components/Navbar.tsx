import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.navContent}>
                <span style={styles.logo}>🎒 Lost & Found</span>
                <div style={styles.links}>
                    {token ? (
                        <>
                            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
                            <button onClick={handleLogout} style={styles.button}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" style={styles.link}>Sign In</Link>
                            <Link to="/signup" style={styles.link}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    navbar: {
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ccc',
        padding: '0.75rem 1.5rem',
    },
    navContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '960px',
        margin: '0 auto',
    },
    logo: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 500,
    },
    button: {
        background: 'transparent',
        border: 'none',
        color: '#dc3545',
        cursor: 'pointer',
        fontWeight: 500,
    },
};

export default NavBar;
