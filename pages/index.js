import { useContext, useState } from 'react';
import Image from 'next/image';

import FormContainer from '../components/FormContainer';
import Spinner from '../components/Spinner';

import { AuthContext } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
const url =
  'https://res.cloudinary.com/dtkjg8f0n/image/upload/v1624052981/blooms_hair_products/lauren-fleischmann-akfxOADwNhk-unsplash_fcmoqo.jpg';

export default function Home() {
  const { loading, login, error } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch login
    login(email, password);
  };
  return (
    <main className='h-screen bg-gray-200'>
      <div className='flex flex-col w-full md:flex-row'>
        <div className='fixed hidden h-full transform -translate-y-2/4 translate-x-2/4 -left-1/2 top-1/2 md:w-8/12 md:block'>
          <Image
            src={url}
            alt='by Lauren Fleischmann'
            layout='fill'
            quality={100}
            className='object-contain w-full'
          />
        </div>
        <section className='fixed right-0 z-50 object-center py-8 md:w-4/12'>
          <FormContainer>
            {loading ? (
              <Spinner />
            ) : (
              <form
                onSubmit={submitHandler}
                className='px-2 pt-6 pb-8 mx-2 mb-4 bg-transparent rounded sm:mx-auto md:w-2/4'>
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
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                <button
                  type='submit'
                  className='w-full px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded md:w-2/5 hover:bg-blue-700 focus:outline-none focus:shadow-outline'>
                  Sign In
                </button>
              </form>
            )}
          </FormContainer>
        </section>
      </div>
    </main>
  );
}
