import Head from 'next/head';

const Layout = ({ children, title, color }) => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Blooms Hair admin site' />
        <meta name='og:title' content={title} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>

      <main className='w-screen'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
