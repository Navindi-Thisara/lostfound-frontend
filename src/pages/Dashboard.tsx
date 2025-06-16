import React, { useState, useEffect } from 'react';
import API from '../api/axios';

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

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const response = await API.get('/items');
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

    if (loading) {
        return <p className="text-center mt-10 text-lg text-gray-500">Loading items...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Lost & Found Items</h2>

            {items.length === 0 ? (
                <p className="text-center text-gray-500">No items found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-700 border-b">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700 border-b">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700 border-b">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{item.name}</td>
                                <td className="py-2 px-4 border-b">
                    <span
                        className={`px-2 py-1 rounded text-sm font-semibold ${
                            item.status === 'LOST'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                        }`}
                    >
                      {item.status}
                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">{item.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
