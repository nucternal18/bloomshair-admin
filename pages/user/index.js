import { useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { AuthContext } from '../../context/AuthContext';

const UserListScreen = (props) => {
    const router = useRouter()
    const { loading, userInfo, error, users, success, deleteUser } = useContext(AuthContext);
 


  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
     router.push('/login');
    }
  }, [ userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteUser(id);
    }
  };
  return (
    <main className='flex-grow w-full p-2 mx-auto bg-gray-200'>
      <section className='container px-2 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl md:mx-auto '>
        <h2>Users</h2>
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage variant='danger'>{errorUsers}</ErrorMessage>
        ) : (
          <table className='flex flex-col flex-no-wrap my-5 overflow-hidden rounded-lg table-auto sm:bg-transparent sm:shadow'>
            <thead className='text-white'>
              <tr className='flex flex-col w-full mb-2 bg-teal-400 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                <th className='w-2/5 p-1 text-center'>ID</th>
                <th className='w-1/5 p-1 text-center'>NAME</th>
                <th className='w-1/5 p-1 text-center'>EMAIL</th>
                <th className='w-1/5 p-1 text-center'>ADMIN</th>
                <th className='w-1/5 p-1 text-center'>DELETE</th>
              </tr>
            </thead>
            <tbody className='fex-col md:flex-1 sm:flex-none '>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className='flex flex-col w-full mb-2 flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                  <td className='w-2/5 p-3 border border-grey-light hover:bg-gray-100'>
                    {user._id}
                  </td>
                  <td className='w-1/5 p-3 border border-grey-light hover:bg-gray-100'>
                    {user.name}
                  </td>
                  <td className='w-1/5 p-3 border border-grey-light hover:bg-gray-100'>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='w-1/5 p-3 border border-grey-light hover:bg-gray-100'>
                    <Link href={`/user/${user._id}`}>
                      <button className='border btn-sm' variant='light'>
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      variant='danger'
                      className='text-red-500 btn-sm'
                      onClick={() => deleteHandler(user._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default UserListScreen;
