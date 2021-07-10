import { useState, createContext } from 'react';

import { NEXT_URL } from '../config';

export const OrderContext = createContext({
  createOrder: () => {},
  orderDelivery: () => {},
  success: false,
  loading: false,
  error: null,
});

const OrderContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createOrder = async (order) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Unable to create order';
      setError(err);
    }
  };

  // const getOrderDetails = async (id) => {
  //   try {
  //     setLoading(true);

  //     const userInfo = parseCookies(null, 'userInfo');

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };

  //     const { data } = await axios.get(`${NEXT_URL}/api/orders/${id}`);

  //     setLoading(false);
  //     setOrder(data);
  //   } catch (error) {
  //     setLoading(false);
  //     const err =
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : { message: 'Unable to fetch order details' };
  //     setError(err);
  //   }
  // };

  // const payOrder = async (orderId, paymentResult) => {
  //   try {
  //     setLoading(true);

  //     const userInfo = parseCookies(null, 'userInfo');

  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };

  //     await axios.put(
  //       `${API_URL}/api/orders/${orderId}/pay`,
  //       paymentResult,
  //       config
  //     );

  //     setLoading(false);
  //     setSuccess(true);
  //   } catch (error) {
  //     setLoading(false);
  //     const err =
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : { message: 'Unable to complete payment' };
  //     setError(err);
  //   }
  // };

  const orderDelivery = async (order) => {
    try {
      setLoading(true);

      await fetch(
        `${API_URL}/api/orders/${order._id}/deliver`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          :  'Unable to fetch products' ;
      setError(err);
    }
  };
  return (
    <OrderContext.Provider
      value={{
        createOrder,
        orderDelivery,
        success,
        loading,
        error,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
