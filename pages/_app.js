import 'tailwindcss/tailwind.css';
import AuthContextProvider from '../context/AuthContext';
import ProductContextProvider from '../context/productContext';
import OrderContextProvider from '../context/orderContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <OrderContextProvider>
          <Component {...pageProps} />;
        </OrderContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
