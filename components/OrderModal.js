import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../../../styles/Table.module.css';
import Button from './Button';
const OrderModal = ({ item, handleClose, tableData, headingColumns, show }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={
        show
          ? 'z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center '
          : 'hidden'
      }
      onClick={handleClose}>
      <div
        section
        className='container px-2 pt-6 pb-8 mx-2 mb-4 bg-white shadow-2xl md:mx-auto '>
        <div className='flex items-center justify-between mb-6 border-b-4 border-current border-gray-200'>
          <div>
            <h1 className='p-3 text-4xl font-bold uppercase md:p-5 md:text-5xl'>
              Order Items
            </h1>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.tableContainerTable}>
            <thead>
              <tr>
                {headingColumns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => {
                return (
                  <tr key={row._id}>
                    <td data-heading={'product'}>{row.product}</td>
                    <td data-heading={'image'}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td data-heading={'price'}>£{item.price}</td>
                    <td data-heading={'qty'}>{item.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='px-4 mb-4'>
          <Button color='dark' onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderModal;
