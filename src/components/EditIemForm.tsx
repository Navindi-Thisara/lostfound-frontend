import React, { useState } from 'react';
import axios from 'axios';

interface Item {
    id: number;
    name: string;
    description: string;
    dateFound: string;
}

interface EditItemFormProps {
    item: Item;
    onCancel: () => void;
    onUpdate: (item: Item) => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, onCancel, onUpdate }) => {
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [dateFound, setDateFound] = useState(item.dateFound);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedItem = { name, description, dateFound };
            const res = await axios.put(`/items/${item.id}`, updatedItem);
            onUpdate(res.data); // Notify parent with updated item
        } catch (error) {
            alert('Failed to update item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>

            <label className="block mb-4">
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="border rounded w-full p-2 mt-1"
                    disabled={loading}
                />
            </label>

            <label className="block mb-4">
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    className="border rounded w-full p-2 mt-1"
                    disabled={loading}
                />
            </label>

            <label className="block mb-6">
                Date Found:
                <input
                    type="date"
                    value={dateFound}
                    onChange={e => setDateFound(e.target.value)}
                    required
                    className="border rounded w-full p-2 mt-1"
                    disabled={loading}
                />
            </label>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
};

export default EditItemForm;
