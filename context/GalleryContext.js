import { useState, createContext } from 'react';

import { NEXT_URL } from '../config';

export const GalleryContext = createContext({
  createPicture: () => {},
  deletePicture: () => {},
  uploadImage: () => {},
  success: false,
  loading: false,
  error: null,
  uploading: false,
  image: null,
});

const GalleryContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const createPicture = async (imageUrl) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({imageUrl}),
      });

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Unable to create order';
      setError(err);
    }
  };

  const deletePicture = async (id) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/gallery/${id}`, {
        method: 'DELETE',
      });

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to delete product' };
      setError(err);
    }
  };

  const uploadImage = async (base64EncodedImage) => {
    setUploading(true);

    try {
      const response = await fetch(`${NEXT_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: base64EncodedImage }),
      });
      const data = await response.json();
      setImage(data.url);
      setUploading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <GalleryContext.Provider
      value={{
        createPicture,
        deletePicture,
        uploadImage,
        loading,
        success,
        uploading,
        error,
        image,
      }}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;
