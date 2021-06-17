import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';


export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [pages, setPages] = useState();
  const [page, setPage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const listProducts = async (keyword = '', pageNumber = '') => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      setLoading(false);
      setProducts(data.products);
      setPages(data.pages);
      setPage(data.page);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to fetch products' };
      setError(err);
    }
  };
  const listProductDetails = async (id) => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/products/${id}`);
      setLoading(false);
      setProduct(data);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to fetch product details' };
      setError(err);
    }
  };

  const createProduct = async () => {
    try {
      setLoading(false);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/products', {}, config);
      setLoading(false);
      setSuccess(true);
      setProduct(data);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to create product' };
      setError(err);
    }
  };

  const createProductReview = async (productId, review) => {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to create product review' };
      setError(err);
    }
  };

  const updateProduct = async (product) => {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );

      setLoading(false);
      setSuccess(true);
      setProduct(data);
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
      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);
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

  const listTopProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/products/top`);
      setLoading(false);
      setProducts(data);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to fetch top products' };
      setError(err);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        listProducts,
        listProductDetails,
        createProduct,
        createProductReview,
        updateProduct,
        deleteProduct,
        listTopProducts,
        products,
        product,
        pages,
        page,
        success,
        loading,
        error
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
