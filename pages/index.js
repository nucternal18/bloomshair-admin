import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title='Blooms Hair - admin'>

      <section className='flex flex-wrap items-center justify-center'>
        <h1 className='text-2xl'>Welcome to Blooms hair</h1>
      </section>
    </Layout>
  );
}
