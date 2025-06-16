import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div style={styles.container}>
            <h2>Welcome to the Dashboard</h2>
            <p>This is a protected page only visible to authenticated users.</p>
        </div>
    );
};

const styles: { container: React.CSSProperties } = {
    container: {
        padding: '2rem',
        textAlign: 'center',
    },
};

export default Dashboard;
