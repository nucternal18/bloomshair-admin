/* eslint-disable import/no-anonymous-default-export */
import cookie from 'cookie';
// Server Url
import { SERVER_URL } from '../../config';

export default async (req, res) => {
  if (req.method == 'POST') {
    try {
      const { data } = req.body;

       const { token } = cookie.parse(req.headers.cookie);
      const response = await fetch(`${SERVER_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
      });

      const urlData = await response.json();
      if (response.ok) {
        res.status(201).json({ urlData });
      } else {
        res.status(403).json({ message: 'Image not uploaded' });
      }


    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Something went wrong uploading image' });
    }
  } else {
    return res.status(500).json({
      success: false,
      error: 'Server Error. Invalid Request',
    });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
