import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
//Auth Context
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      router.push('/login');
    }
  }, []);
  
  return (
    <Layout title='Blooms Hair - admin'>
      <section className='flex flex-grow w-full px-4 mx-auto md:px-10'>
        <h1 className='text-2xl'>Welcome to Blooms hair</h1>
      </section>
    </Layout>
  );
}
