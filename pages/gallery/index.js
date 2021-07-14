import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import cookie from 'cookie';
import { useRouter } from 'next/router';
import { FaPlusCircle } from 'react-icons/fa';

// Components
import Table from '../../components/Tables/GalleryTable';
import Notification from '../../components/notification/notification';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

// Context
import { GalleryContext } from '../../context/GalleryContext';

// Server Url
import { SERVER_URL } from '../../config';

const GalleryListScreen = (props) => {
  const { pictures } = props;
  const router = useRouter();
  const {
    deletePicture,
    uploadImage,
    createPicture,
    error,
    uploading,
    image,
    message,
    requestStatus
  } = useContext(GalleryContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsRefreshing(false);
  }, [pictures]);

  // reload page page without add history to the browser history stack
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
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
  const submitHandler = (e) => {
    e.preventDefault();
    createPicture(image.url);
    refreshData();
  };
  const deleteHandler = (id) => {
    deletePicture(id);
    refreshData();
  };

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
  return (
    <Layout>
      <main className='w-full h-screen p-2 mx-auto bg-gray-200'>
        <section className='flex flex-col '>
          <div className='container px-2 pt-6 pb-8 mt-6 mb-4 bg-white shadow-2xl md:mx-auto'>
            <div className='my-6 '>
              <h1 className='p-5 mt-6 mb-4 text-5xl font-bold text-center'>
                Pictures
              </h1>
              <p className='mb-2 text-center'>Load your latest Pictures</p>
            </div>
            <div>
              <form
                onSubmit={submitHandler}
                className='flex flex-col justify-center px-2 py-2 mx-2 my-2 bg-transparent'>
                <div className='mb-4'>
                  <label className='flex justify-center mb-2 mr-2 text-base font-bold text-gray-700'>
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
                <div className='flex justify-center'>
                  {image && (
                    <>
                      <Image src={image.url} alt='' width={100} height={100} />
                    </>
                  )}
                </div>
                <div className='flex items-center justify-center px-4 pt-4 mb-4 border-t-4 border-current border-gray-200'>
                  <Button type='submit' color='dark'>
                    Add Picture
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className='container px-2 pt-6 pb-8 mt-6 mb-4 bg-white shadow-2xl md:mx-auto'>
            <div className='flex items-center justify-between px-4 mb-4 border-b-4 border-current border-gray-200'>
              <div>
                <h1 className='p-5 mt-6 text-5xl font-bold'>Pictures</h1>
              </div>
            </div>
            <div>
              {isRefreshing ? (
                <Spinner />
              ) : error ? (
                <ErrorMessage variant='danger'>{error}</ErrorMessage>
              ) : (
                <div className='w-full mx-auto overscroll-auto'>
                  <Table
                    tableData={pictures}
                    headingColumns={['ID', 'IMAGE', 'CREATED AT', 'ACTIONS']}
                    deleteHandler={deleteHandler}
                  />
                </div>
              )}
            </div>
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

  const res = await fetch(`${SERVER_URL}/api/gallery`);
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
    props: { pictures: data }, // will be passed to the page component as props
  };
}

export default GalleryListScreen;
