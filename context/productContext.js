import { useState, createContext } from 'react';

import { NEXT_URL } from '../config';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);

  const createProduct = async () => {
    try {
      setLoading(false);

      await fetch(`${NEXT_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to create product' };
      setError(err);
    }
  };

  const updateProduct = async (product) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to update product' };
      setError(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/products/${id}`, {
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
    <ProductContext.Provider
      value={{
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        success,
        loading,
        error,
        image,
        uploading,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
