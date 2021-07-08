// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import Layout from '../components/Layout';
//Auth Context
// import { AuthContext } from '../context/AuthContext';

export default function Home() {
  // const router = useRouter();

  return (
    <Layout title='Blooms Hair - admin'>
      <section className='flex items-center justify-center flex-grow w-full h-screen px-4 mx-auto md:px-10'>
        <h1 className='text-2xl'>Welcome to Blooms hair</h1>
      </section>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers.cookie);
  // const { id } = context.params;

  // const res = await fetch(`${SERVER_URL}/api/products/${id}`);
  // const data = await res.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
