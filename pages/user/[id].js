import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Spinner from '../components/spinner.component';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';

const UserEditScreen = ({ match }) => {
  const router = useRouter();
  const { loading, error, user, success, getUserDetails, editUser } =
    useContext(AuthContext);
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (success) {
      router.push('/user');
    } else {
      if (!user.name || user._id !== userId) {
        getUserDetails(userId);
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    editUser({ _id: userId, name, email, isAdmin });
  };
  return (
    <main className='flex-grow w-full p-2 mx-auto bg-gray-200'>
      <section className='container px-2 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl md:mx-auto '>
        <Link href='/user'>
          <a className='w-full px-2 py-2 mb-4 font-bold text-blue-400 bg-transparent border border-blue-400 md:w-1/5 hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:text-white'>
            Go Back
          </a>
        </Link>
        <FormContainer>
          <h1>Edit User</h1>
          {loading && <Spinner />}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {loading && <Spinner />}
          <form
            onSubmit={submitHandler}
            className='px-12 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl sm:mx-auto md:w-2/4'>
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
        </FormContainer>
      </section>
    </main>
  );
};

export default UserEditScreen;
