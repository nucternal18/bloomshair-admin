import { useState, useEffect } from 'react';
import  Link  from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import Spinner from '../components/spinner.component';
import ErrorMessage from '../components/ErrorMessage';

//Context 
import { ProductContext } from '../../context/productContext';
import { AuthContext } from '../../context/AuthContext';

// constants
import FormContainer from '../components/FormContainer';


const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
const router = useRouter();
 const { userInfo } = useContext(AuthContext);
 const {
   loading,
   error,
   success,
   product,
   listProductDetails,

 } = useContext(ProductContext);


  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  // const [setUploading] = useState(false);
  // const [setProgress] = useState(0);
  // const [blobFile, setBlobFile] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
     
      router.push('/products');
    } else {
      if (!product.name || product._id !== productId) {
        listProductDetails(productId);
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, productId, success]);

  const submitHandler = (e) => {
    e.preventDefault();

      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
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

  const uploadImage = async (base64EncodedImage) => {
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/upload',
        JSON.stringify({ data: base64EncodedImage }),
        config
      );
      setImage(data.url);
      setUploading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='flex-grow w-full p-2 mx-auto bg-gray-200'>
      <section className='container px-2 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl md:mx-auto '>
        <Link href='/products'>
          <a className='w-full px-4 py-2 mb-4 font-bold text-blue-400 bg-transparent border border-blue-400 md:w-1/4 hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:text-white'>
            Go Back
          </a>
        </Link>
        <FormContainer>
          <h1>Edit Product</h1>
          {loadingUpdate && <Spinner />}
          {errorUpdate && (
            <ErrorMessage variant='danger'>{errorUpdate}</ErrorMessage>
          )}
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {loading && <Spinner />}
          <form
            onSubmit={submitHandler}
            className='px-12 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl sm:mx-auto md:w-2/4'>
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
                <i className='text-4xl fas fa-plus-circle'></i>
                <input
                  type='file'
                  onChange={uploadFileHandler}
                  className='hidden'
                />
                {uploading && <Spinner />}
                {error && <div className='justify-center'>{error}</div>}
              </label>
              {image && <p>{image}</p>}
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

            <button
              type='submit'
              className='w-full px-4 py-2 mb-4 font-bold text-blue-400 bg-transparent border border-blue-400 md:w-1/4 hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:text-white'>
              Update
            </button>
          </form>
        </FormContainer>
      </section>
    </main>
  );
};

export default ProductEditScreen;
