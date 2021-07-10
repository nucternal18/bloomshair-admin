import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../components/Layout';
import Button from '../components/Button';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <Layout title='Page Not Found'>
      <section className='h-screen bg-white'>
        <div className='flex flex-col items-center mt-20'>
          <Image
            src={'/bloomslogo512x512.png'}
            alt='blooms hair logo'
            width={300}
            height={300}
          />
          <h1 className='my-5 text-6xl'>Whoops!</h1>
          <h2 className='mb-5 text-4xl text-gray-500'>
            This page does not exist.
          </h2>
          <div className='flex justify-center' onClick={() => router.back()}>
            <Button color='dark'>GO BACK</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
