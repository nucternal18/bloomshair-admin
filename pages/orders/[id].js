import { useContext } from 'react';
import cookie from 'cookie';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Row, Col, ListGroup, Card } from 'react-bootstrap';

// context
import { AuthContext } from '../../context/AuthContext';
import { OrderContext } from '../../context/OrderContext';

// components
import FormContainer from '../../components/FormContainer';
import Spinner from '../../components/spinner.component';
import ErrorMessage from '../../components/ErrorMessage';

const OrderScreen = (props) => {

  // const router = useRouter();
  const { userInfo } = useContext(AuthContext);
  const { loading, error,   orderDelivery } =
    useContext(OrderContext);

  
  

  function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  const deliveryHandler = () => {
    orderDelivery(props.order);
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <ErrorMessage variant='danger'>{error}</ErrorMessage>
  ) : (
    <FormContainer>
      <Link href='/orders'>
        <a className='my-3 border btn btn-light'>Go Back</a>
      </Link>
      <h1>Order {props.order._id}</h1>
      <div>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item variant='flush'>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {props.order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${props.order.user.email}`}>{props.order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {props.order.shippingAddress.address}, {props.order.shippingAddress.city},{' '}
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
            </ListGroup.Item>
            <ListGroup.Item>
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
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>props.Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>£{addDecimals(props.order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£{addDecimals(props.order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>£{addDecimals(props.order.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{addDecimals(props.order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>

              {loadingDelivery && <Spinner />}
              {userInfo &&
                userInfo.isAdmin &&
                props.order.isPaid &&
                !props.order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliveryHandler}>
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </div>
    </FormContainer>
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
