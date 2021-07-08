import { useContext, useState } from 'react';
import Image from 'next/image';
// import cookie from 'cookie';

import FormContainer from '../components/FormContainer';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

import { AuthContext } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import Notification from '../components/notification/notification';

const url =
  'https://res.cloudinary.com/dtkjg8f0n/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,w_1000/v1625089267/blooms_hair_products/shari-sirotnak-oM5YoMhTf8E-unsplash_rcpxsj.webp';

export default function Home() {
  const { loading, login, error, requestStatus } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch login
    login(email, password);
  };

  let notification;

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: error,
    };
  }
  return (
    <main className='h-screen bg-gray-200'>
      <div className='flex flex-col w-full md:flex-row'>
        <div className='hidden transform md:h-screen md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:w-8/12'>
          <div style={{ width: '100%', height: '100vh' }}>
            <Image
              src={url}
              alt='by Lauren Fleischmann'
              layout='fill'
              quality={75}
            />
          </div>
        </div>
        <section className='right-0 z-50 py-8 md:fixed md:w-4/12'>
          <div className='flex items-center justify-center'>
            <FormContainer>
              {loading ? (
                <Spinner />
              ) : (
                <form
                  onSubmit={submitHandler}
                  className='px-2 pt-6 pb-8 mx-2 mb-4 bg-transparent md:w-2/4'>
                  <div className='mb-4'>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-base font-bold text-gray-700'>
                      Email Address
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}></input>
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-base font-bold text-gray-700'>
                      Password
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='password'
                      placeholder='Enter password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}></input>
                  </div>
                  {error && (
                    <ErrorMessage variant='danger'>{error}</ErrorMessage>
                  )}
                  <Button type='submit' color='dark'>
                    Sign In
                  </Button>
                </form>
              )}
              
            </FormContainer>
          </div>
          {notification && (
            <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />
          )}
        </section>
      </div>
    </main>
  );
}

// export async function getServerSideProps(context) {
//   const { token } = cookie.parse(context.req.headers.cookie);
//    if (!token) {
//      return {
//        redirect: {
//          destination: '/',
//          permanent: false,
//        },
//      };
//    } 

//   if (token) {
//     return {
//       redirect: {
//         destination: '/dashboard',
//         permanent: false,
//       },
//     };
//   } 
 
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
