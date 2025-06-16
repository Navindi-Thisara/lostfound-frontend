import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import API from '../api/axios';  // Make sure this path matches your axios instance location

interface Item {
    id: number;
    name: string;
    status: 'LOST' | 'FOUND';
    description: string;
}

const Dashboard: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'LOST' | 'FOUND'>('LOST');
    const [description, setDescription] = useState('');
    const [formError, setFormError] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const response = await API.get('/items'); // Update with your actual API endpoint if different
                setItems(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load items.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Function to add a new item
    const addItem = async (e: FormEvent) => {
        e.preventDefault();
        setFormError(null);

        // Basic validation
        if (!name.trim() || !description.trim()) {
            setFormError('Please fill in all fields.');
            return;
        }

        const newItem = {
            name: name.trim(),
            status,
            description: description.trim(),
        };

        try {
            setAdding(true);
            const response = await API.post('/items', newItem);
            setItems(prevItems => [...prevItems, response.data]);
            // Reset form
            setName('');
            setStatus('LOST');
            setDescription('');
        } catch (err) {
            setFormError('Failed to add item.');
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading items...</p>;
    }

    if (error) {
        return <p style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</p>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
            <h2>Lost & Found Items</h2>

            {/* Add Item Form */}
            <form onSubmit={addItem} style={{ marginBottom: '2rem' }}>
                <h3>Add New Item</h3>
                {formError && <p style={{ color: 'red' }}>{formError}</p>}
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Name:{' '}
                        <input
                            type="text"
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            disabled={adding}
                            required
                        />
                    </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Status:{' '}
                        <select
                            value={status}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as 'LOST' | 'FOUND')}
                            disabled={adding}
                        >
                            <option value="LOST">LOST</option>
                            <option value="FOUND">FOUND</option>
                        </select>
                    </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Description:{' '}
                        <textarea
                            value={description}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                            disabled={adding}
                            required
                            rows={3}
                            style={{ width: '100%' }}
                        />
                    </label>
                </div>

                <button type="submit" disabled={adding}>
                    {adding ? 'Adding...' : 'Add Item'}
                </button>
            </form>

            {/* Items Table */}
            {items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.status}</td>
                            <td style={tdStyle}>{item.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const thStyle: React.CSSProperties = {
    borderBottom: '2px solid #333',
    padding: '0.5rem',
    textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
    padding: '0.5rem',
};

export default Dashboard;
