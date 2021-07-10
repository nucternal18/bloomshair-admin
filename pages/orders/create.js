import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

// context
import { OrderContext } from '../../context/orderContext';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import Layout from '../../components/Layout';
// import Button from '../../components/Button';



function CreateOrder() {
  const router = useRouter();
  const { loading, error, success } = useContext(OrderContext);

  useEffect(() => {
    if (success) {
      router.push('/order')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[success])
  return (
    <Layout>
      <main className='w-full h-screen p-2 mx-auto bg-gray-100'>
        <section className='container px-2 pt-6 pb-8 mx-2 mt-6 mb-4 bg-white shadow-2xl md:mx-auto '>
          <div className='flex items-center justify-between mb-6 border-b-4 border-current border-gray-200'>
            <div>
              <h1 className='p-3 text-4xl font-bold md:p-5 md:text-5xl'>
                Create Order
              </h1>
            </div>
          </div>
          <div>
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorMessage variant='danger'>{error}</ErrorMessage>
              ) : (
                  <div></div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default CreateOrder;
