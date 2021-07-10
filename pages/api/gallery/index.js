/* eslint-disable import/no-anonymous-default-export */
import cookie from 'cookie';
import { SERVER_URL } from '../../../config';

export default async (req, res) => {
  if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }
    const { imageUrl } = req.body;
    const { token } = cookie.parse(req.headers.cookie);

    const response = await fetch(`${SERVER_URL}/api/gallery/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({imageUrl}),
    });

    const uploadedImage = await response.json();

    if (response.ok) {
      res.status(200).json({ uploadedImage });
    } else {
      res.status(403).json({ message: 'Unable to upload picture' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
