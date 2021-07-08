import { useState, createContext } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

import { API_URL } from '../config';

export const OrderContext = createContext({
  createOrder: () => {},
  getOrderDetails: () => {},
  payOrder: () => {},
  listOrders: () => {},
  orderDelivery: () => {},
  success: false,
  loading: false,
  error: null,
  orders: [],
  order: {},
});

const OrderContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState({});
  const [orders, setOrders] = useState([]);

  const createOrder = async (order) => {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`${API_URL}/api/orders`, order, config);

      setLoading(false);
      setSuccess(true);
      setOrder(data);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to create order' };
      setError(err);
    }
  };

  const getOrderDetails = async (id) => {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${API_URL}/api/orders/${id}`, config);

      setLoading(false);
      setOrder(data);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to fetch order details' };
      setError(err);
    }
  };

  const payOrder = async (orderId, paymentResult) => {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `${API_URL}/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to complete payment' };
      setError(err);
    }
  };

  const listOrders = async () => {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${API_URL}/api/orders`, config);

      setLoading(false);
      setOrders(data);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to fetch products' };
      setError(err);
    }
  };

  const orderDelivery = async (order) => {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`${API_URL}/api/orders/${order._id}/deliver`, {}, config);

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to fetch products' };
      setError(err);
    }
  };
  return (
    <OrderContext.Provider
      value={{
        createOrder,
        getOrderDetails,
        payOrder,
        listOrders,
        orderDelivery,
        success,
        loading,
        error,
        orders,
        order
      }}>
      {children}
    </OrderContext.Provider>
  );
};


export default OrderContextProvider;