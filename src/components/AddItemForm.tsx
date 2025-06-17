import React, { useState } from 'react';
import axios from 'axios';

interface Item {
    id: number;
    name: string;
    description: string;
    dateFound: string;
}

interface AddItemFormProps {
    onAdd: (item: Item) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateFound, setDateFound] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const newItem = { name, description, dateFound };
            const res = await axios.post('/items', newItem);
            onAdd(res.data);

            // Clear form inputs after successful submission
            setName('');
            setDescription('');
            setDateFound('');

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000); // Hide success after 3 seconds
        } catch {
            setError('Failed to add item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-md bg-white max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">Item added successfully!</p>}

            <label className="block mb-3">
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="border p-2 w-full rounded mt-1"
                    disabled={loading}
                />
            </label>

            <label className="block mb-3">
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                    className="border p-2 w-full rounded mt-1"
                    disabled={loading}
                />
            </label>

            <label className="block mb-4">
                Date Found:
                <input
                    type="date"
                    value={dateFound}
                    onChange={(e) => setDateFound(e.target.value)}
                    required
                    className="border p-2 w-full rounded mt-1"
                    disabled={loading}
                />
            </label>

            <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded text-white ${
                    loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {loading ? 'Adding...' : 'Add Item'}
            </button>
        </form>
    );
};

export default AddItemForm;
