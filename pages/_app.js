import 'tailwindcss/tailwind.css';
import AuthContextProvider from '../context/AuthContext';
import ProductContextProvider from '../context/productContext';
import OrderContextProvider from '../context/orderContext';
import GalleryContextProvider from '../context/GalleryContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <GalleryContextProvider>
        <ProductContextProvider>
          <OrderContextProvider>
            <Component {...pageProps} />
          </OrderContextProvider>
        </ProductContextProvider>
      </GalleryContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
