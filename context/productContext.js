import { useState, createContext, useEffect } from 'react';

import { NEXT_URL } from '../config';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [requestStatus, setRequestStatus] = useState('');

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);


  const createProduct = async () => {
    try {
      setLoading(false);

      const response = await fetch(`${NEXT_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setLoading(false);
        setRequestStatus('success');
        setMessage('Product created successfully');
        setSuccess(true);
      } else {
        setLoading(false);
        setRequestStatus('error');
        setMessage('Unable to create product');
      }
    } catch (error) {
      setLoading(false);
      setRequestStatus('error');
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Unable to create product';
      setError(err);
    }
  };

  const updateProduct = async ({
    _id,
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  }) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/products/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
        }),
      });

      setLoading(false);
      setSuccess(true);
      setRequestStatus('success');
      setMessage('Product updated successfully');
    } catch (error) {
      setLoading(false);
      setRequestStatus('error');
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Unable to update product';
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
      setRequestStatus('success');
      setMessage('Product deleted successfully');
    } catch (error) {
      setLoading(false);
      setRequestStatus('error');
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Unable to delete product';
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
      setRequestStatus('success');
      setMessage('Image uploaded successfully');
      setImage(data.url);
      setUploading(false);
    } catch (error) {
      setRequestStatus('error');
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
        requestStatus,
        message,
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
