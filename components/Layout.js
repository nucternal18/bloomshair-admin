import Head from 'next/head';
import Sidebar from './Sidebar';
import NavPane from './Navbar';

const Layout = ({ children, title, color }) => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Blooms Hair admin site' />
        <meta name='og:title' content={title} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Sidebar />
      <main className='relative bg-gray-200 md:ml-64'>
        <NavPane />
        <div>{children}</div>
      </main>
    </div>
  );
};

Layout.defaultProps = {
  title: 'Welcome to Blooms Hair | Admin',
};

export default Layout;
