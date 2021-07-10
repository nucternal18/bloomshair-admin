import { useContext, useState } from 'react';
import cookie from 'cookie';
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa';


// context
import { OrderContext } from '../../context/orderContext';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
// import Paginate from '../../components/Paginate';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Table from '../../components/Tables/ProductTable';

import { SERVER_URL } from '../../config';

const OrderListScreen = (props) => {
  // const router = useRouter();

  const { loading, error } = useContext(OrderContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Layout>
      <main className='w-full h-screen p-2 mx-auto bg-gray-100'>
        <section className='container px-2 pt-6 pb-8 mx-2 mt-6 mb-4 bg-white shadow-2xl md:mx-auto '>
          <div className='flex items-center justify-between mb-6 border-b-4 border-current border-gray-200'>
            <div>
              <h1 className='p-3 text-4xl font-bold md:p-5 md:text-5xl'>
                Orders
              </h1>
            </div>
            <div className='flex items-center'>
              <Button color='dark'>
                <Link href='/orders/create'>
                  <a className='flex items-center text-xl uppercase'>
                    <FaPlus className='mr-1' /> Create Order
                  </a>
                </Link>
              </Button>
            </div>
          </div>
          <div className='w-100'>
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorMessage variant='danger'>{error}</ErrorMessage>
            ) : (
              <Table
                tableData={props.orders}
                headingColumns={[
                  'ID',
                  'CUSTOMER NAME',
                  'DATE',
                  'ORDER ITEMS',
                  'TOTAL PRICE',
                  'PAID',
                  'DELIVERED',
                  'ACTION',
                ]}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
              />
            )}
          </div>
        </section>
      </main>
    </Layout>
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
