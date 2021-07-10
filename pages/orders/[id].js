import { useContext } from 'react';
import cookie from 'cookie';
// import { useRouter } from 'next/router';
import Link from 'next/link';

// context
import { AuthContext } from '../../context/AuthContext';
import { OrderContext } from '../../context/OrderContext';

// components
import FormContainer from '../../components/FormContainer';
import Spinner from '../../components/spinner.component';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';

const OrderScreen = (props) => {
  // const router = useRouter();
  const { userInfo } = useContext(AuthContext);
  const { loading, error, orderDelivery } = useContext(OrderContext);
  console.log(userInfo);
  function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  const deliveryHandler = () => {
    orderDelivery(props.order);
  };

  return (
    <main className='flex-grow w-full h-screen p-4 mx-auto mt-6 bg-gray-200'>
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
              Order {props.order._id}
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
                    {props.order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${props.order.user.email}`}>
                      {props.order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {props.order.shippingAddress.address},{' '}
                    {props.order.shippingAddress.city},{' '}
                    {props.order.shippingAddress.postalCode}{' '}
                    {props.order.shippingAddress.country}
                  </p>
                  {props.order.isDelivered ? (
                    <ErrorMessage variant='success'>
                      Delivered on {props.order.deliveredAt}
                    </ErrorMessage>
                  ) : (
                    <ErrorMessage variant='danger'>Not Delivered</ErrorMessage>
                  )}
                </div>
                <div>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {props.order.paymentMethod}
                  </p>
                  {props.order.isPaid ? (
                    <ErrorMessage variant='success'>
                      Paid on {props.order.paidAt}
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
                    <h2>{props.Order}Summary</h2>
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <h3>Items</h3>
                      <p>£{addDecimals(props.order.itemsPrice)}</p>
                    </div>
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <h3>Shipping</h3>
                      <p>£{addDecimals(props.order.shippingPrice)}</p>
                    </div>
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <h3>Tax</h3>
                      <p>£{addDecimals(props.order.taxPrice)}</p>
                    </div>
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <h3>Total</h3>
                      <p>£{addDecimals(props.order.totalPrice)}</p>
                    </div>
                  </div>
                  {loading && <Spinner />}
                  {error && (
                    <ErrorMessage variant='danger'>{error}</ErrorMessage>
                  )}
                  {userInfo &&
                    userInfo.isAdmin &&
                    props.order.isPaid &&
                    !props.order.isDelivered && (
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
    </main>
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
