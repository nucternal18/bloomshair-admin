import { useContext } from 'react';
import cookie from 'cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';

// context
import { OrderContext } from '../../context/OrderContext';

// components
import FormContainer from '../../components/FormContainer';
import Spinner from '../../components/spinner.component';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import Notification from '../../components/notification/notification';
import Layout from '../../components/Layout';

const OrderScreen = (props) => {
  const { order } = props;
  const router = useRouter();
  const { loading, error, orderDelivery, message, requestStatus } =
    useContext(OrderContext);

  useEffect(() => {
    setIsRefreshing(false);
  }, [order]);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  const deliveryHandler = () => {
    orderDelivery(props.order);
    refreshData();
  };

  let notification;
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: message,
    };
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: error,
    };
  }

  return (
    <Layout>
      <main className='w-full h-screen p-4 mx-auto mt-6 bg-gray-200'>
        <section className='container px-2 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-2xl md:mx-auto '>
          <div className='flex items-center justify-between px-4 mb-4 border-b-4 border-current border-gray-200'>
            <div className='mt-6'>
              <Button color='dark'>
                <Link href='/orders'>
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
            <div>
              <h1 className='p-5 mt-6 text-5xl font-bold'>
                Order {order._id}
              </h1>
            </div>
          </div>

          <FormContainer>
            <div>
              <div>
                <div>
                  <div variant='flush'>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong>
                      {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingAddress.address},{' '}
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.postalCode}{' '}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <ErrorMessage variant='success'>
                        Delivered on {order.deliveredAt}
                      </ErrorMessage>
                    ) : (
                      <ErrorMessage variant='danger'>
                        Not Delivered
                      </ErrorMessage>
                    )}
                  </div>
                  <div>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <ErrorMessage variant='success'>
                        Paid on {order.paidAt}
                      </ErrorMessage>
                    ) : (
                      <ErrorMessage variant='danger'>Not Paid</ErrorMessage>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className='relative flex flex-col mb-2 bg-white rounded-b'>
                  <div>
                    <div>
                      <h2>{Order}Summary</h2>
                    </div>
                    <div>
                      <div className='flex items-center'>
                        <h3>Items</h3>
                        <p>£{addDecimals(order.itemsPrice)}</p>
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center'>
                        <h3>Shipping</h3>
                        <p>£{addDecimals(order.shippingPrice)}</p>
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center'>
                        <h3>Tax</h3>
                        <p>£{addDecimals(order.taxPrice)}</p>
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center'>
                        <h3>Total</h3>
                        <p>£{addDecimals(order.totalPrice)}</p>
                      </div>
                    </div>
                    {loading && <Spinner />}
                    {error && (
                      <ErrorMessage variant='danger'>{error}</ErrorMessage>
                    )}
                    {userInfo &&
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <div>
                          <Button
                            type='button'
                            className='btn btn-block'
                            onClick={deliveryHandler}>
                            Mark As Delivered
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </FormContainer>
        </section>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers.cookie);
  const { id } = context.params;

  const res = await fetch(`${SERVER_URL}/api/orders/${id}`);
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
    props: { order: data, orderId: id }, // will be passed to the page component as props
  };
}

export default OrderScreen;
