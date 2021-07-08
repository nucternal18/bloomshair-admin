import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cookie from 'cookie';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

// context
import { AuthContext } from '../../context/AuthContext';

// Server Url
import { SERVER_URL } from '../../config';

const UserEditScreen = (props) => {
  const router = useRouter();
  const { loading, error, success, editUser } = useContext(AuthContext);

  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [isAdmin, setIsAdmin] = useState(props.user.isAdmin);

  useEffect(() => {
    if (success) {
      router.push('/user');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    editUser(  props.userId,  name, email, isAdmin );
  };
  return (
    <Layout>
      <main className='w-full h-screen p-2 mx-auto bg-gray-200'>
        <section className='container px-2 pt-6 pb-8 mx-2 mt-6 mb-4 bg-white rounded shadow-xl md:mx-auto '>
          <div className='mt-6'>
            <div className='flex items-center justify-between px-2 border-b-4 border-current border-gray-200'>
              <div>
                <h1 className='p-5 mt-1 text-5xl font-bold'>Edit User</h1>
              </div>
              <Button color='dark'>
                <Link href='/user'>
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
            {loading && <Spinner />}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <form
              onSubmit={submitHandler}
              className='px-12 pt-6 pb-8 mx-2 mb-4 bg-white rounded sm:mx-auto md:w-2/4'>
              <div className='mb-4'>
                <label className='block mb-2 text-base font-bold text-gray-700'>
                  Name
                </label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                  type='name'
                  placeholder='Enter your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2 text-base font-bold text-gray-700'>
                  Email Address
                </label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <input
                  type='checkbox'
                  label='isAdmin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </div>

              <button
                type='submit'
                className='w-full px-2 py-2 mb-4 font-bold text-blue-400 bg-transparent border border-blue-400 md:w-1/5 hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:text-white'>
                Update
              </button>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers.cookie);
  const { id } = context.params;

  const res = await fetch(`${SERVER_URL}/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
    props: { user: data, userId: id }, // will be passed to the page component as props
  };
}

export default UserEditScreen;
