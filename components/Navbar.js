import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdNotificationsNone } from 'react-icons/md';

// import SideNavbar from "./SideNavbar";

const navLink = [
  {
    id: 1,
    link: '/',
    title: 'HOME',
  },
  {
    id: 2,
    link: '/about-us',
    title: 'ABOUT US',
  },
  {
    id: 3,
    link: '/service-menu',
    title: 'SERVICE MENU',
  },
  {
    id: 4,
    link: '/gallery',
    title: 'GALLERY',
  },
  {
    id: 5,
    link: '/shop/home',
    title: 'PRODUCTS',
  },
  {
    id: 6,
    link: '/contact-us',
    title: 'CONTACT US',
  },
  {
    id: 7,
    link: '/book-online',
    title: 'BOOK ONLINE',
  },
];

const NavPane = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar>
      <Navbar.Container>
        <Navbar.Toggler toggle={toggle} isOpen={isOpen} />
        <Navbar.Nav right>
          {navLink.map((link) => (
            <Navbar.Item key={link.id}>
              <Navbar.Link href={link.link}>{link.title}</Navbar.Link>
            </Navbar.Item>
          ))}
        </Navbar.Nav>
      </Navbar.Container>
      <Navbar.Sidenav isOpen={isOpen} toggle={toggle}>
        {navLink.map((link) => (
          <Navbar.Item key={link.id}>
            <Navbar.Link href={link.link}>{link.title}</Navbar.Link>
          </Navbar.Item>
        ))}
      </Navbar.Sidenav>
    </Navbar>
  );
};

/* Navbar logic */
const Navbar = ({  children }) => (
  <nav
    className={` absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4`}>
    {children}
  </nav>
);

Navbar.Container = ({ children }) => {
  return (
    <div
      className={`container mx-auto font-light text-gray-400 text-3xl md:relative md:flex md:items-center  py-1 px-4 sm:px-1 md:px-0 md:flex-row md:justify-between`}>
      {children}
    </div>
  );
};
/* You can wrap the a tag with Link and pass href to Link if you are using either Create-React-App, Next.js or Gatsby */
Navbar.Brand = ({ children, href }) => (
  <Link
    href={href}
    className='inline-block w-48 p-0 m-0 py-1.5 mr-4 cursor-pointer text-2xl font-bold whitespace-nowrap hover:text-gray-600'>
    <strong>{children}</strong>
  </Link>
);
Navbar.Toggler = ({ toggle, isOpen }) => (
  <button
    type='button'
    aria-expanded='false'
    aria-disabled={isOpen}
    disabled={isOpen}
    aria-label='Toggle navigation'
    className='items-center block float-right py-5 text-4xl lg:hidden focus:outline-none focus:shadow-none'
    onClick={toggle}>
    &#8801;
  </button>
);
Navbar.Sidenav = ({ isOpen, toggle, children }) => {
  const ref = useRef();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!isOpen) return;
        toggle(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, ref]);
  return (
    <aside
      className={
        isOpen
          ? `${className.default} ${className.enabled}`
          : `${className.default} ${className.disabled}`
      }
      ref={ref}>
      <button
        aria-label='Close'
        className='absolute text-3xl text-white cursor-pointer top-1 focus:outline-none right-3'
        onClick={toggle}>
        &times;
      </button>
      <div className='mt-12'>{children}</div>
    </aside>
  );
};
Navbar.Nav = ({ children, left, right, center }) => {
  const className = left
    ? 'hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0'
    : right
    ? 'hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0'
    : center
    ? 'hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0 md:mx-auto '
    : 'hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0';
  return <ul className={className}>{children}</ul>;
};
Navbar.Item = ({ children }) => (
  <li className='px-1 m-0 text-base list-none sm:text-xs md:text-sm text-md'>
    {children}
  </li>
);
/* You can wrap the a tag with Link and pass href to Link if you are using either Create-React-App, Next.js or Gatsby */
Navbar.Link = ({ children, href }) => (
  <Link
    href={href}
    className='flex md:block ml-4 mb-4 lg:ml-0 lg:mb-0 cursor-pointer py-1.5 lg:py-1 px-2 lg:px-1 hover:text-gray-400 font-medium list-none'>
    {children}
  </Link>
);

const className = {
  default: `lg:hidden flex h-screen fixed z-20 top-0 right-0 transition-all ease duration-200`,
  enabled: `w-7/12 md:w-60 bg-gray-800 text-white overflow-x-hidden opacity-75`,
  disabled: `w-0  bg-gray-800 text-white overflow-x-hidden`,
};

export default NavPane;
