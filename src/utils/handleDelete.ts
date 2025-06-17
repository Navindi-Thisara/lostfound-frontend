// src/utils/handleDelete.ts
import axios from 'axios';
import { Item } from '../types';

/**
 * Deletes an item by its ID and updates the state.
 * @param id - The ID of the item to delete.
 * @param setItems - The state setter for the items list.
 */
export const handleDelete = async (
    id: number,
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
) => {
    try {
        await axios.delete(`/items/${id}`);
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
        alert('Failed to delete item');
        console.error('Delete error:', error);
    }
};
