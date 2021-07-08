import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cookie from 'cookie';
import { FaPlusCircle } from 'react-icons/fa';

//components
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import FormContainer from '../../components/FormContainer';
import Button from '../../components/Button';
import Layout from '../../components/Layout';

//Context
import { ProductContext } from '../../context/productContext';

// Server Url
import { SERVER_URL } from '../../config';

const ProductEditScreen = (props) => {
  const router = useRouter();
  const { loading, error, success, uploadImage, uploading, image, updateProduct } =
    useContext(ProductContext);

  const [name, setName] = useState(props.product.name);
  const [price, setPrice] = useState(props.product.price);

  const [brand, setBrand] = useState(props.product.brand);
  const [category, setCategory] = useState(props.product.category);
  const [countInStock, setCountInStock] = useState(props.product.countInStock);
  const [description, setDescription] = useState(props.product.description);

  useEffect(() => {
    if (success) {
      router.push('/products');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();

    updateProduct({
      _id: props.productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    });
    router.push('/products');
  };

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

  return (
    <Layout>
      <main className='flex-grow w-full h-screen p-4 mx-auto mt-6 bg-gray-200'>
        <section className='container px-2 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl md:mx-auto '>
          <div className='flex items-center justify-between px-4 mb-4 border-b-4 border-current border-gray-200'>
            <div className='mt-6'>
              <Button color='dark'>
                <Link href='/user'>
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
            <div>
              <h1 className='p-5 mt-6 text-5xl font-bold'>Edit Product</h1>
            </div>
          </div>
          <FormContainer>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Spinner />}
            <form
              onSubmit={submitHandler}
              className='w-full px-12 pt-6 pb-8 mx-2 mb-4 bg-white sm:mx-auto'>
              <div className='flex flex-row items-center justify-around'>
                <div className='flex flex-col items-center mb-4'>
                  {image ? (
                    <Image src={image} alt={name} width={70} height={70} />
                  ) : (
                    <Image
                      src={props.product.image}
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
                  <div className='flex items-center mb-4'>
                    <label className='block mb-2 mr-2 text-base font-bold text-gray-700'>
                      Name
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='name'
                      placeholder='Enter your name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}></input>
                  </div>
                  <div className='flex items-center mb-4'>
                    <label className='block mb-2 mr-2 text-base font-bold text-gray-700'>
                      Price
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='number'
                      placeholder='Enter Price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}></input>
                  </div>

                  <div className='flex items-center mb-4'>
                    <label className='block mb-2 mr-2 text-base font-bold text-gray-700'>
                      Brand
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='text'
                      placeholder='Enter Brand'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}></input>
                  </div>
                  <div className='flex items-center mb-4'>
                    <label className='block mb-2 mr-2 text-base font-bold text-gray-700'>
                      Category
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='text'
                      placeholder='Enter Category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}></input>
                  </div>
                  <div className='flex items-center mb-4'>
                    <label className='block mb-2 mr-2 text-base font-bold text-gray-700'>
                      Count In Stock
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='text'
                      placeholder='Enter Count In Stock'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}></input>
                  </div>
                  <div className='flex items-center mb-4'>
                    <label className='block mb-2 mr-2 text-base font-bold text-gray-700'>
                      Description
                    </label>
                    <input
                      className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                      type='text'
                      placeholder='Enter Description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}></input>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center px-4 pt-4 mb-4 border-t-4 border-current border-gray-200'>
                <Button type='submit' color='dark'>
                  <p className='text-3xl font-semibold'>Update</p>
                </Button>
              </div>
            </form>
          </FormContainer>
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers.cookie);
  const { id } = context.params;

  const res = await fetch(`${SERVER_URL}/api/products/${id}`);
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
    props: { product: data, productId: id }, // will be passed to the page component as props
  };
}

export default ProductEditScreen;
