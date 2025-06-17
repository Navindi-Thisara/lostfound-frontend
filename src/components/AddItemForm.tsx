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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newItem = { name, description, dateFound };
            const res = await axios.post('/items', newItem);
            onAdd(res.data); // Pass the newly added item to parent component

            // Clear form inputs after successful submission
            setName('');
            setDescription('');
            setDateFound('');
        } catch (error) {
            alert('Failed to add item');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-md bg-white max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>

            <label className="block mb-3">
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="border p-2 w-full rounded mt-1"
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
                />
            </label>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
                Add Item
            </button>
        </form>
    );
};

export default AddItemForm;
