import {  useState, useContext } from 'react';
import { Link } from 'next/link';
// import { useRouter } from 'next/router';

// context

import { OrderContext } from '../../context/OrderContext';

import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/ErrorMessage';
import OrderModal from '../../components/OrderModal';

const OrderListScreen = (props) => {
  // const router = useRouter();
 
  const { loading, error,  } = useContext(OrderContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const createOrderHandler = () => {
    // dispatch(createProduct());
  };
  return (
    <main className='flex-grow w-full p-2 mx-auto bg-gray-200'>
      <section className='container px-2 pt-6 pb-8 mx-2 mb-4 bg-white shadow-xl md:mx-auto '>
        <div className='items-center px-4 '>
          <div>
            <h1>Orders</h1>
          </div>
          <div className='text-right'>
            <button
              className='w-full px-2 py-2 mb-4 font-bold text-blue-400 bg-transparent border border-blue-400 md:w-1/5 hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:text-white'
              onClick={createOrderHandler}>
              <i className='fas fa-plus'></i> Create Order
            </button>
          </div>
        </div>
        <div className='w-100'>
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorMessage variant='danger'>{error}</ErrorMessage>
          ) : (
            <table className='flex flex-col flex-no-wrap my-5 overflow-hidden rounded-lg table-auto sm:bg-transparent sm:shadow'>
              <thead className='text-white'>
                <tr className='flex flex-col w-full mb-2 bg-teal-400 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                  <th className='w-2/5 p-1 text-center'>ID</th>
                  <th className='w-1/6 p-1 text-center'>CUSTOMER NAME</th>
                  <th className='w-1/6 p-1 text-center'>DATE</th>
                  <th className='w-1/6 p-1 text-center'>ORDER ITEMS</th>
                  <th className='w-1/6 p-1 text-center'>TOTAL PRICE</th>
                  <th className='w-1/6 p-1 text-center'>PAID</th>
                  <th className='w-1/6 p-1 text-center'>DELIVERED</th>
                  <th className='w-1/6 p-1 text-center'>ACTION</th>
                </tr>
              </thead>
              <tbody className='fex-col md:flex-1 sm:flex-none '>
                {props.orders.map((item) => (
                  <tr
                    key={item._id}
                    className='flex flex-col w-full mb-2 flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                    <td className='w-2/5 p-3 border border-grey-light hover:bg-gray-100'>
                      {item._id}
                    </td>
                    <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                      {item.user && item.user.name}
                    </td>
                    <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                      {item.createdAt.substring(0, 10)}
                    </td>
                    <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                      <button onClick={handleShow}>View</button>

                      <OrderModal show={show} handleClose={handleClose} />
                    </td>
                    <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                      {item.totalPrice}
                    </td>
                    <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                      {item.isPaid ? (
                        item.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}></i>
                      )}
                    </td>

                    <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                      {item.isDelivered ? (
                        item.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                      <button className='border btn-sm' variant='light'>
                        <Link href={`/orders/${item._id}`}>
                          <a>Details</a>
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers.cookie);

  const res = await fetch(`${SERVER_URL}/api/orders/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { orders: data }, // will be passed to the page component as props
  };
}


export default OrderListScreen;
