/* eslint-disable import/no-anonymous-default-export */
import cookie from 'cookie';
import { SERVER_URL } from '../../../config';

export default async (req, res) => {
  if (req.method === 'PUT') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }
    const { id } = req.query;
    
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    } = req.body;

    const { token } = cookie.parse(req.headers.cookie);

    const response = await fetch(`${SERVER_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

    const editedUser = await response.json();

    if (response.ok) {
      res.status(200).json({ editedUser });
    } else {
      res.status(403).json({ message: 'User not updated' });
    }
  } else if (req.method === 'DELETE') {
    // Delete user
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }
    const { id }= req.query;

    const { token } = cookie.parse(req.headers.cookie);

    await fetch(`${SERVER_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json({ message: 'Success'})
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
