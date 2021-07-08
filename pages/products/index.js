import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import cookie from 'cookie';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import Paginate from '../../components/Paginate';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Table from '../../components/Tables/ProductTable';

import { ProductContext } from '../../context/productContext';

import { SERVER_URL } from '../../config';

const Products = (props) => {
  const { loading, error, deleteProduct, createProduct } =
    useContext(ProductContext);

  const data = props.products.map((row) => {
    return {
      id: row['_id'],
      image: row['image'],
      name: row['name'],
      price: row['price'],
      category: row['category'],
      brand: row['brand'],
      countInStock: row['countInStock'],
      action: row['action'],
    };
  });

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
    <Layout>
      <main className='w-full h-screen p-2 mx-auto overflow-auto bg-gray-200'>
        <section className='container px-2 pt-6 pb-8 mb-4 bg-white shadow-xl md:mx-auto '>
          <div className='flex items-center justify-between mb-6 border-b-4 border-current border-gray-200'>
            <div>
              <h1 className='p-3 text-4xl font-bold md:p-5 md:text-5xl'>
                Products
              </h1>
            </div>
            <div className='text-sm '>
              <Button color='dark' onClick={createProductHandler}>
                <FaPlus className='mr-1' /> Create Product
              </Button>
            </div>
          </div>
          <div>
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorMessage variant='danger'>{error}</ErrorMessage>
            ) : (
              <div className='w-full mx-auto overscroll-auto'>
                <Table
                  tableData={data}
                  headingColumns={[
                    'ID',
                    'IMAGE',
                    'NAME',
                    'PRICE',
                    'CATEGORY',
                    'BRAND',
                    'COUNT IN STOCK',
                    'ACTION',
                  ]}
                  deleteHandler={deleteHandler}
                />

                <Paginate
                  pages={props.pages}
                  page={props.page}
                  isAdmin={true}
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps({
  req,
  query: { pageNumber = 1, keyword = '' },
}) {
  const { token } = cookie.parse(req.headers.cookie);

  const res = await fetch(
    `${SERVER_URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
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
    props: { products: data.products, page: data.page, pages: data.pages }, // will be passed to the page component as props
  };
}
export default Products;
