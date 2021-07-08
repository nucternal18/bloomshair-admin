/* eslint-disable import/no-anonymous-default-export */

import { SERVER_URL } from '../../../config';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { displayName, email, password, isAdmin } = req.body;

    const response = await fetch(`${SERVER_URL}/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ displayName, email, password, isAdmin }),
    });

    const data = await response.json();

    if (response.ok) {

      res.status(200).json({ data });
    } else {
      res.status(data.statusCode).json({ message: data });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
