import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddItemForm from '../components/AddItemForm';
// @ts-ignore
import EditItemForm from '../components/EditItemForm';

export interface Item {
    id: number;
    name: string;
    description: string;
    dateFound: string;
}

const Dashboard: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    // Fetch items on component load
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get('/items');
                setItems(res.data);
            } catch {
                setError('Failed to fetch items');
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    // Add new item to state
    const handleAddItem = (newItem: Item) => {
        setItems(prev => [...prev, newItem]);
    };

    // Set current item to be edited
    const startEdit = (item: Item) => {
        setEditingItem(item);
    };

    // Update item in state
    const handleUpdateItem = (updatedItem: Item) => {
        setItems(prev =>
            prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
        );
        setEditingItem(null);
    };

    // Delete item from backend and state
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/items/${id}`);
            setItems(prev => prev.filter(item => item.id !== id));
        } catch {
            alert('Failed to delete item');
        }
    };

    if (loading) return <p className="text-center mt-8">Loading items...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Lost and Found Dashboard
            </h1>

            {/* Add Item Form */}
            <div className="mb-8">
                <AddItemForm onAdd={handleAddItem} />
            </div>

            {/* Item List */}
            <ul>
                {items.map(item => (
                    <li
                        key={item.id}
                        className="border rounded p-4 mb-4 flex justify-between items-center bg-white shadow"
                    >
                        <div>
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>Description:</strong> {item.description}</p>
                            <p><strong>Date Found:</strong> {item.dateFound}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => startEdit(item)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Edit Item Modal */}
            {editingItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <EditItemForm
                        item={editingItem}
                        onCancel={() => setEditingItem(null)}
                        onUpdate={handleUpdateItem}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
