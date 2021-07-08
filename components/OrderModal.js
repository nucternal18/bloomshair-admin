import { motion } from 'framer-motion';
import  Image  from 'next/image';
const OrderModal = ({ item, handleClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='backdrop'
      onClick={handleClose}>
      <div
        section
        className='container px-2 pt-6 pb-8 mx-2 mb-4 bg-white shadow-xl md:mx-auto '>
        <header closeButton>
          <title>ORDERED ITEMS</title>
        </header>
        <body>
          <table className='flex flex-col flex-no-wrap my-5 overflow-hidden rounded-lg table-auto sm:bg-transparent sm:shadow'>
            <thead className='text-white'>
              <tr className='flex flex-col w-full mb-2 bg-teal-400 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                <th className='w-2/5 p-1 text-center'>ID</th>
                <th className='w-1/5 p-1 text-center'>Image</th>
                <th className='w-1/5 p-1 text-center'>NAME</th>
                <th className='w-1/5 p-1 text-center'>PRICE</th>
                <th className='w-1/5 p-1 text-center'>QTY</th>
              </tr>
            </thead>
            <tbody className='fex-col md:flex-1 sm:flex-none '>
              {item.orderItems.map((item) => (
                <tr
                  key={item._id}
                  className='flex flex-col w-full mb-2 flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                  <td className='w-2/5 p-3 border border-grey-light hover:bg-gray-100'>
                    {item.product}
                  </td>
                  <td className='w-1/5 p-3 border border-grey-light hover:bg-gray-100'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className='w-1/5 p-3 border border-grey-light hover:bg-gray-100'>
                    {item.name}
                  </td>
                  <td className='w-1/5 p-3 border border-grey-light hover:bg-gray-100'>
                    £{item.price}
                  </td>
                  <td className='w-1/5 p-3 border border-grey-light hover:bg-gray-100'>
                    {item.qty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </body>
        <footer>
          <button
            className='w-full px-2 py-2 mb-4 font-bold text-blue-400 bg-transparent border border-blue-400 hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:text-white'
            onClick={handleClose}>
            Close
          </button>
        </footer>
      </div>
    </motion.div>
  );
};

export default OrderModal;
