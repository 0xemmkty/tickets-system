import { ticketsApi } from './api';
interface Ticket {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  venue: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
  status: string;
  imageUrl?: string;
}

export const ticketsService = {
  getAll: () =>
    ticketsApi.get<Ticket[]>('/tickets'),

  getOne: (id: number) =>
    ticketsApi.get<Ticket>(`/tickets/${id}`),

  create: (ticketData: Omit<Ticket, 'id' | 'availableSeats'>) =>
    ticketsApi.post<Ticket>('/tickets', ticketData),

  update: (id: number, ticketData: Partial<Omit<Ticket, 'id' | 'availableSeats'>>) =>
    ticketsApi.put<Ticket>(`/tickets/${id}`, ticketData),

  delete: (id: number) =>
    ticketsApi.delete(`/tickets/${id}`),

  updateStatus: (id: number, status: string) =>
    ticketsApi.patch<Ticket>(`/tickets/${id}/status`, { status })
}; 