const dev = process.env.NODE_ENV !== 'production';

export const SERVER_URL = dev ? 'http://localhost:3001' : 'https://bloomshair.co.uk';

export const NEXT_URL = dev ? 'http://localhost:3000' : 'https://bloomshair.co.uk';

export const POSTS_PER_PAGE = 6;

