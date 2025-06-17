// src/utils/handleDelete.ts
import axios from 'axios';
import { Item } from '../types';

/**
 * Deletes an item by its ID and updates the state.
 * @param id - The ID of the item to delete.
 * @param setItems - The React state setter function for the items list.
 */
export const handleDelete = async (
    id: number,
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
): Promise<void> => {
    try {
        await axios.delete(`/items/${id}`);
        // Update state by removing the deleted item
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
        // More informative error message in console, user alert remains simple
        alert('Failed to delete item. Please try again.');
        console.error('Error deleting item:', error);
    }
};
