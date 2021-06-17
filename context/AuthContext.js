import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      setLoading(false);
      setUserInfo(data);
      setCookie('userInfo', JSON.stringify(data));
    } catch (error) {
      setLoading(false);
     const err = error.response && error.response.data.message
            ? error.response.data.message
       : {message: 'Login Unsuccessful. Please try again.'}
      setError(err)
    }
  };

  const registerAdmin =
    async (displayName, email, password, role) => {
      try {
        setLoading(true);
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const { data } = await axios.post(
          '/api/users',
          {
            displayName,
            email,
            password,
            role: role === 'admin' ? role : 'user',
          },
          config
        );

        setLoading(false);
        setSuccess(true)
        setUserInfo(data);
        setCookie('userInfo', JSON.stringify(data));
      } catch (error) {
        setLoading(false);
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : { message: 'User registration Unsuccessful. Please try again.' };
        setError(err);
      }
    };

  const getUserDetails = async (id) =>  {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/${id}`, config);

      setLoading(false);
      setUser(data)
    } catch (error) {
      setLoading(false);
     const err =
       error.response && error.response.data.message
         ? error.response.data.message
         : { message: 'Unable to get user details. Please try again.' };
     setError(err);
    }
  };

  const updateUserProfile = async (user) => {
    try {
     setLoading(true);

     const userInfo = parseCookies(null, 'userInfo');


      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/profile`, user, config);

     setLoading(false);
     setSuccess(true);
     setUserInfo(data);
     setCookie('userInfo', JSON.stringify(data));
    } catch (error) {
      setLoading(false);
     const err =
       error.response && error.response.data.message
         ? error.response.data.message
         : { message: 'Unable to update user details. Please try again.' };
     setError(err);
    }
  };

  const listUsers = async () =>  {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users`, config);

      setLoading(false);
      setUsers(data);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : { message: 'Unable to fetch. Please try refreshing the page.' };
      setError(err);
    }
  };

  const deleteUser = async (id) =>  {
    try {
     setLoading(true);

     const userInfo = parseCookies(null, 'userInfo');


      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/users/${id}`, config);

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
     const err =
       error.response && error.response.data.message
         ? error.response.data.message
         : { message: 'Login Unsuccessful. Please try again.' };
     setError(err);
    }
  };

  const editUser = async (user) => {
    try {
      setLoading(true);

      const userInfo = parseCookies(null, 'userInfo');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      setLoading(false);
      setSuccess(true);
      setUser(data)
    } catch (error) {
      setLoading(false);
     const err =
       error.response && error.response.data.message
         ? error.response.data.message
         : { message: 'Login Unsuccessful. Please try again.' };
     setError(err);
    }
  };

  const logout = () => {
    destroyCookie('userInfo');
    destroyCookie('shippingAddress');
    destroyCookie('paymentMethod');
    setUserInfo({})
    setUsers([]);
    setUser({})
    setSuccess(false)
    setError(null)
  };
  return (
    <AuthContext.Provider
      value={{
        userInfo,
        users,
        user,
        loading,
        success,
        error,
        login,
        registerAdmin,
        getUserDetails,
        updateUserProfile,
        listUsers,
        deleteUser,
        editUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
