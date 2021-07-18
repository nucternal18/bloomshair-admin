import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cookie from 'cookie';
import { FaPlusCircle } from 'react-icons/fa';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

// context
import { AuthContext } from '../../context/AuthContext';

// Server Url
import { SERVER_URL } from '../../config';

const UserEditScreen = (props) => {
  const router = useRouter();
  const { loading, error, success, editUser, image, uploadImage, uploading } =
    useContext(AuthContext);

  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [isAdmin, setIsAdmin] = useState(props.user.isAdmin);

  useEffect(() => {
    if (success) {
      router.push('/user');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('something went wrong!');
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    editUser(props.userId, image, name, email, isAdmin);
  };
  return (
    <Layout>
      <main className='w-full h-screen p-2 mx-auto overflow-auto bg-gray-200'>
        <section className='container px-2 pt-6 pb-8 mx-2 mt-6 mb-4 bg-white rounded shadow-xl md:mx-auto '>
          <div className='mt-6'>
            <div className='flex items-center justify-between px-2 border-b-4 border-current border-gray-200'>
              <div>
                <h1 className='p-5 mt-1 text-5xl font-bold'>Edit User</h1>
              </div>
              <Button color='dark'>
                <Link href='/user'>
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
            {loading && <Spinner />}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            <form
              onSubmit={submitHandler}
              className='px-12 pt-6 pb-8 mx-2 mb-4 bg-white rounded sm:mx-auto '>
              <div className='flex flex-row items-center justify-around'>
                <div className='flex flex-col items-center mb-4'>
                  {image ? (
                    <Image src={image} alt={name} width={70} height={70} />
                  ) : (
                    <Image
                      src={props.user.image}
                      alt={name}
                      width={400}
                      height={400}
                    />
                  )}
                  <label className='block mb-2 mr-2 text-base font-bold text-gray-700'>
                    <FaPlusCircle className='text-4xl' />
                    <input
                      type='file'
                      onChange={uploadFileHandler}
                      className='hidden'
                    />
                    {uploading && <Spinner />}
                    {error && <div className='justify-center'>{error}</div>}
                  </label>
                </div>
                <div>
                  <div className='mb-4'>
                    <label className='block mb-2 text-base font-bold text-gray-700'>
                      Name
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='name'
                      placeholder='Enter your name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2 text-base font-bold text-gray-700'>
                      Email Address
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='checkbox'
                      label='isAdmin'
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center px-4 pt-4 mb-4 border-t-4 border-current border-gray-200'>
                <Button type='submit' color='dark'>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers.cookie);
  const { id } = context.params;
  console.log(id);
  const res = await fetch(`${SERVER_URL}/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { user: data, userId: id }, // will be passed to the page component as props
  };
}

export default UserEditScreen;
