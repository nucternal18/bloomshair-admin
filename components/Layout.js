import Head from 'next/head';
import Sidebar from './Sidebar';

const Layout = ({ children, title }) => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta charSet='utf-8' />
        <meta name='description' content='Blooms Hair admin site' />
        <meta name='og:title' content={title} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Sidebar />
      <main className='relative md:ml-64'>{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: 'Welcome to Blooms Hair | Admin',
};

export default Layout;
