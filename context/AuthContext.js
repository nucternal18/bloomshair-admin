import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';

import { NEXT_URL } from '../config';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState('');
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Login User
  const login = async (email, password) => {
    try {
      setLoading(true);

      const res = await fetch(`${NEXT_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setUserInfo(data);
        router.push('/dashboard');
      } else {
        setRequestStatus('error');
        setMessage(
          'Unable to login. Please check your login credentials and try again'
        );
        setError(data.message);
        setError(null);
      }
    } catch (error) {
      setRequestStatus('error');
      setMessage('Unable to login. Please check your login credentials and try again');
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Login Unsuccessful. Please try again.';
      setError(err);
    }
  };

  // Register User
  const registerAdmin = async (displayName, email, password, isAdmin) => {
    try {
      setLoading(true);

      const res = await fetch(`${NEXT_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName,
          email,
          password,
          isAdmin,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setRequestStatus('success');
        setMessage('User registered successfully');
        setUserInfo(data);
        router.push('/dashboard');
      } else {
        setRequestStatus('error');
        setMessage('Unable to register user');
        setError(data.message);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      setRequestStatus('error');
      setMessage('Unable to register user');
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'User registration Unsuccessful. Please try again.';
      setError(err);
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/auth/user`);
    const data = await res.json();

    if (res.ok) {
      setUserInfo(data);
    } else {
      setUserInfo(null);
    }
  };

  // Update User details
  const updateUserProfile = async (user) => {
    try {
      setLoading(true);

      const res = await fetch(`${NEXT_URL}/api/auth/updateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setRequestStatus('success');
        setMessage('Profile updated successfully');
        setUserInfo(data);
      } else {
        setRequestStatus('error');
        setMessage('Unable to update user profile');
        setError(data.message);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      setMessage('Unable to update user profile');
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Unable to update user details. Please try again.';
      setError(err);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/auth/${id}`, {
        method: 'DELETE',
      });

      setLoading(false);
      setRequestStatus('success');
      setMessage('User deleted successfully');
    } catch (error) {
      setLoading(false);
      setMessage('Unable to delete user');
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Unable to delete user. Please try again.';
      setError(err);
    }
  };

  // Edit a User
  const editUser = async (id, displayName, email, isAdmin) => {
    try {
      setLoading(true);
      const res = await fetch(`${NEXT_URL}/api/auth/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName, email, isAdmin }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setRequestStatus('success');
        setMessage('User edited successfully');
        setUser(data);
      } else {
        setRequestStatus('error');
        setMessage('Failed to edit user');
        setError(data.message);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      setMessage('Failed to edit user');
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Unable to update user. Please try again.';
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
      setImage(data.url);
      setMessage('Image uploaded successfully');
      setUploading(false);
    } catch (error) {
      setRequestStatus('error');
      setMessage('Failed to upload image');
      console.error(error);
    }
  };

  // Logout User clear state and cookies
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/auth/logout`, {
      method: 'POST',
    });
    if (res.ok) {
      setUserInfo({});
      setLoading(false);
      setUsers([]);
      setUser({});
      setSuccess(false);
      setError(null);
      router.push('/');
    }
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
        requestStatus,
        image,
        uploading,
        message,
        uploadImage,
        login,
        registerAdmin,
        updateUserProfile,
        deleteUser,
        editUser,
        logout,
        setMessage
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
