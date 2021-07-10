import { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import cookie from 'cookie';

import Layout from '../../components/Layout';
import Button from '../../components/Button';

import Notification from '../../components/notification/notification';
import Table from '../../components/Tables/UserTable';

// context
import { AuthContext } from '../../context/AuthContext';

import { SERVER_URL } from '../../config';
import Link from 'next/link';

const UserListScreen = (props) => {
  const { error, deleteUser, requestStatus } =
    useContext(AuthContext);

  const data = props.users.map((row) => {
    return {
      id: row['_id'],
      image: row['image'],
      name: row['name'],
      email: row['email'],
      isAdmin: row['isAdmin'],
      actions: row['actions'],
    };
  });

  const [message, setMessage] = useState(null);


  let notification;
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: message,
    };
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: error,
    };
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteUser(id);
      setMessage('User deleted successfully')
    }
  };
  return (
    <Layout>
      <main className='w-full h-screen p-2 mx-auto overflow-auto bg-gray-100'>
        <section className='container px-2 pt-6 pb-8 mt-6 mb-4 bg-white rounded shadow-2xl md:mx-auto '>
          <div className='flex items-center justify-between mb-4 border-b-4 border-current border-gray-200'>
            <div>
              <h1 className='p-5 mt-6 text-5xl font-bold'>Users</h1>
            </div>
            <div className=''>
              <Button color='dark'>
                <Link href={'/user/createUser'}>
                  <a className='flex items-center'>
                    <FaPlus className='mr-1' /> Create User
                  </a>
                </Link>
              </Button>
            </div>
          </div>
          <div className='overflow-hidden'>
            <Table
              tableData={data}
              headingColumns={[
                'ID',
                'IMAGE',
                'NAME',
                'EMAIL',
                'ADMIN',
                'ACTION',
              ]}
              deleteHandler={deleteHandler}
            />
          </div>
        </section>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers.cookie);

  const res = await fetch(`${SERVER_URL}/api/users/`, {
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
    props: { users: data }, // will be passed to the page component as props
  };
}

export default UserListScreen;
