import { useContext } from 'react';
import Image from 'next/image';
import cookie from 'cookie';
import { useRouter } from 'next/router';
import { FaPlusCircle } from 'react-icons/fa';

// Components
import Table from '../../components/Tables/GalleryTable';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

// Context
import { GalleryContext } from '../../context/GalleryContext';

// Server Url
import { SERVER_URL } from '../../config';

const GalleryListScreen = (props) => {
  const router = useRouter();
  const {
    deletePicture,
    uploadImage,
    createPicture,
    loading,
    error,
    uploading,
    image,
  } = useContext(GalleryContext);

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
    router.reload();
  };
  const deleteHandler = (id) => {
    deletePicture(id);
    router.reload();
  };
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
              {loading ? (
                <Spinner />
              ) : error ? (
                <ErrorMessage variant='danger'>{error}</ErrorMessage>
              ) : (
                <div className='w-full mx-auto overscroll-auto'>
                  <Table
                    tableData={props.pictures}
                    headingColumns={['ID', 'IMAGE', 'CREATED AT', 'ACTIONS']}
                    deleteHandler={deleteHandler}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
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
