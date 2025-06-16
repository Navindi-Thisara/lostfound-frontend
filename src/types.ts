export interface Item {
    id: number;
    name: string;
    status: 'LOST' | 'FOUND';
    description: string;
}
