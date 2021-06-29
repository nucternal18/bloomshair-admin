import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaBars, FaTimes, FaNewspaper, FaUserCircle, FaImages, FaShoppingBasket, FaShippingFast } from 'react-icons/fa';

const Sidebar = () => {
  const [collapseShow, setCollapseShow] = useState('hidden');


  return (
    <>
      <nav className='relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden md:w-64'>
        <div className='flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap'>
          {/* Toggler */}
          <button
            className='px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden'
            type='button'
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}>
            <FaBars />
          </button>
          {/* Brand */}
          <Link href='/'>
            <a
              href='#pablo'
              className='inline-block p-2 px-0 mr-0 text-sm font-bold text-left text-gray-700 uppercase whitespace-no-wrap md:block md:pb-2'>
              <Image
                src={'/logo.svg'}
                alt='blooms hair logo'
                width={200}
                height={100}
              />
            </a>
          </Link>
          {/* User */}
          <ul className='flex flex-wrap items-center list-none md:hidden'>
            {/* <li className='relative inline-block'>
                <NotificationDropdown />
              </li>
              <li className='relative inline-block'>
                <UserDropdown />
              </li> */}
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }>
            {/* Collapse header */}
            <div className='block pb-4 mb-4 border-b border-gray-300 border-solid md:min-w-full md:hidden'>
              <div className='flex flex-wrap'>
                <div className='w-6/12'>
                  <Link href='/'>
                    <a
                      href='#pablo'
                      className='inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-gray-700 uppercase whitespace-no-wrap md:block md:pb-2'>
                      <Image
                        src={'/logo.svg'}
                        alt='blooms hair logo'
                        width={200}
                        height={100}
                      />
                    </a>
                  </Link>
                </div>
                <div className='flex justify-end w-6/12'>
                  <button
                    type='button'
                    className='px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden'
                    onClick={() => setCollapseShow('hidden')}>
                    <FaTimes className='text-black' />
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className='mt-6 mb-4 md:hidden'>
              <div className='pt-0 mb-3'>
                <input
                  type='text'
                  placeholder='Search'
                  className='w-full h-12 px-3 py-2 text-base font-normal leading-snug text-gray-700 placeholder-gray-400 bg-white border border-gray-600 border-solid rounded shadow-none outline-none focus:outline-none'
                />
              </div>
            </form>

            {/* Divider */}
            <hr className='my-4 md:min-w-full' />
            {/* Navigation */}

            <ul className='flex flex-col list-none md:flex-col md:min-w-full md:mb-4'>
              <li className='items-center'>
                <Link href='/dashboard'>
                  <a
                    href='#pablo'
                    className='block py-3 text-xs font-bold text-gray-800 uppercase hover:text-gray-600'>
                    <FaNewspaper />
                    Admin Home
                  </a>
                </Link>
              </li>

              <li className='items-center'>
                <Link href='/user'>
                  <a className='block py-3 text-xs font-bold text-gray-800 uppercase hover:text-gray-600'>
                    <FaUserCircle />
                    Manage Users
                  </a>
                </Link>
              </li>
              <li className='items-center'>
                <Link href='/products'>
                  <a className='block py-3 text-xs font-bold text-gray-800 uppercase hover:text-gray-600'>
                    <FaShoppingBasket />
                    Manage Products
                  </a>
                </Link>
              </li>
              <li className='items-center'>
                <Link href='/gallery'>
                  <a className='block py-3 text-xs font-bold text-gray-800 uppercase hover:text-gray-600'>
                    <FaImages />
                    Manage Gallery
                  </a>
                </Link>
              </li>
              <li className='items-center'>
                <Link href='/orders'>
                  <a className='block py-3 text-xs font-bold text-gray-800 uppercase hover:text-gray-600'>
                    <FaShippingFast />{' '}
                    Manage Orders
                  </a>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className='my-4 md:min-w-full' />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
