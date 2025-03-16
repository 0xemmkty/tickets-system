import { ordersApi } from './api';

interface Order {
  id: number;
  ticketId: number;
  userId: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  amount: number;
  seats: string[];
  refundReason?: string;
  orderNumber: string;
  createdAt: string;
}

export const ordersService = {
  create: (orderData: { ticketId: number; seats: string[]; amount: number }) =>
    ordersApi.post<Order>('/orders', orderData),

  getMyOrders: async () => {
    try {
      console.log('Fetching orders...');
      const response = await ordersApi.get<Order[]>('/orders/my-orders');
      console.log('Orders response:', response);
      return response;
    } catch (error: any) {
      console.error('Orders service error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  getOrder: (id: number) =>
    ordersApi.get<Order>(`/orders/${id}`),

  getAllOrders: () =>
    ordersApi.get<Order[]>('/admin/orders'),

  processRefund: (orderId: number, reason: string) =>
    ordersApi.post<Order>(`/orders/${orderId}/refund`, { reason }),

  cancelOrder: (orderId: number, reason: string) =>
    ordersApi.post<Order>(`/orders/${orderId}/cancel`, { reason }),

  createPaymentIntent: (orderId: number) =>
    ordersApi.post('/payments/create-payment-intent', { orderId }),

  getOrderStatus: (orderId: number) =>
    ordersApi.get<{ status: string }>(`/orders/${orderId}/status`),

  pollOrderStatus: async (orderId: number, callback: (status: string) => void) => {
    const interval = setInterval(async () => {
      try {
        const { data } = await ordersService.getOrderStatus(orderId);
        callback(data.status);
        if (['paid', 'cancelled', 'refunded', 'payment_failed'].includes(data.status)) {
          clearInterval(interval);
        }
      } catch (err) {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }
}; 