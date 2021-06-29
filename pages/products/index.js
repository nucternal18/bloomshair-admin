import { useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaEdit, FaTrash } from 'react-icons/fa';

import Spinner from '../components/spinner.component';
import ErrorMessage from '../components/ErrorMessage';
import Paginate from '../components/Paginate';

import { ProductContext } from '../../context/productContext';
import { AuthContext } from '../../context/AuthContext';

const Products = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const { userInfo } = useContext(AuthContext);
  const {
    loading,
    error,
    products,
    pages,
    page,
    success,
    product,
    listProducts,
    deleteProduct,
    createProduct,
  } = useContext(ProductContext);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      router.push('/login');
    }
    if (success) {
      router.push(`/products/${product._id}`);
    } else {
      listProducts('', pageNumber);
    }
  }, [userInfo, product, success, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      // DELETE Products
      deleteProduct(id);
    }
  };
  const createProductHandler = () => {
    createProduct();
  };
  return (
    <main className='flex-grow w-full p-2 mx-auto bg-gray-200'>
      <section className='container px-2 pt-6 pb-8 mx-2 mb-4 bg-white shadow-xl md:mx-auto '>
        <div className='px-4 align-items-center'>
          <div>
            <h1>Products</h1>
          </div>
          <div className='text-right'>
            <button
              className='w-full px-4 py-2 mb-4 font-bold text-blue-400 bg-transparent border border-blue-400 md:w-1/4 hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:text-white'
              onClick={createProductHandler}>
              <i className='fas fa-plus'></i> Create Product
            </button>
          </div>
        </div>
        <div>
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorMessage variant='danger'>{error}</ErrorMessage>
          ) : (
            <div className='w-full mx-auto overscroll-auto'>
              <table className='flex flex-col flex-no-wrap my-5 overflow-hidden rounded-lg table-auto sm:bg-transparent sm:shadow'>
                <thead className='text-white'>
                  <tr className='flex flex-col w-full mb-2 bg-teal-400 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                    <th className='w-1/6 p-1 text-center'>ID</th>
                    <th className='w-1/6 p-1 text-center'>Image</th>
                    <th className='w-1/6 p-1 text-center'>NAME</th>
                    <th className='w-1/6 p-1 text-center'>PRICE</th>
                    <th className='w-1/6 p-1 text-center'>CATEGORY</th>
                    <th className='w-1/6 p-1 text-center'>BRAND</th>
                    <th className='w-1/6 p-1 text-center'>Count In Stock</th>
                    <th className='w-1/6 p-1 text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody className='fex-col md:flex-1 sm:flex-none '>
                  {products.map((item) => (
                    <tr
                      key={item._id}
                      className='flex flex-col w-full mb-2 flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                      <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                        {item._id}
                      </td>
                      <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className='rounded-sm'
                        />
                      </td>
                      <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                        {item.name}
                      </td>
                      <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                        £{item.price}
                      </td>
                      <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                        {item.category}
                      </td>
                      <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                        {item.brand}
                      </td>
                      <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                        {item.countInStock}
                      </td>
                      <td className='w-1/6 p-3 border border-grey-light hover:bg-gray-100'>
                        <Link to={`/products/${item._id}`}>
                          <button className='mr-2 text-md' variant='light'>
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                          variant='danger'
                          className='text-red-600 text-md'
                          onClick={() => deleteHandler(item._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Products;
