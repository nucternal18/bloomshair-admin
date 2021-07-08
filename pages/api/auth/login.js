/* eslint-disable import/no-anonymous-default-export */
import cookie from 'cookie';
import { SERVER_URL } from '../../../config';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    const response = await fetch(`${SERVER_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    console.log(data)
    if (response.ok) {
      // TODO:@Todo set cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', String(data.token), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'production' ? false : true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      );
      res.status(200).json({data})
    } else {
      res.status(data.statusCode).json({ message: data })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: `Method ${req.method} not allowed`})
  }
}
