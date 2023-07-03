export interface ITicketItem {
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface IData {
    logoLink: string;
    totalAmount: number;
    ticketItems: ITicketItem[];
    address: string; 
    date: string;
}