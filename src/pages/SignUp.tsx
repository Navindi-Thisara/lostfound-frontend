import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios'; // axios instance

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side validation
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await API.post('/auth/register', {
                name,
                email,
                password
            });

            setSuccess('Account created successfully!');
            setError('');

            // Redirect to sign-in page after a short delay
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                />
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}
                <button type="submit" style={styles.button}>Sign Up</button>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '450px',
        margin: '80px auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '0.9rem',
    },
    success: {
        color: 'green',
        fontSize: '0.9rem',
    },
};

export default SignUp;
