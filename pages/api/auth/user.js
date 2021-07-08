/* eslint-disable import/no-anonymous-default-export */
import cookie from 'cookie';
import { SERVER_URL } from '../../../config';

export default async (req, res) => {
  if (req.method === 'GET') {
      if (!req.headers.cookie) {
          res.status(403).json({ message: 'Not Authorized' });
          return
      }
      
      const { token } = cookie.parse(req.headers.cookie)

      const response = await fetch(`${SERVER_URL}/api/users/profile`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
          }
      })

      const user = await response.json()

      if (response.ok) {
          res.status(200).json({user})
      } else {
          res.status(403).json({message: 'User forbidden'})
      }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
