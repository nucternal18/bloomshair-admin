import PropTypes from 'prop-types';
import Link from 'next/link';
import { FaEdit,  FaTimes } from 'react-icons/fa';
import styles from '../../../styles/Table.module.css';
import OrderModal from '../../OrderModal'

const Table = ({ tableData, headingColumns,  handleShow, handleClose, show }) => {
  return (
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
                <td data-heading={'_id'}>{row._id}</td>
                <td data-heading={'name'}>{row.user && row.user.name}</td>
                <td data-heading={'price'}>{row.createdAt.substring(0, 10)}</td>
                <td data-heading={'category'}>
                  <button onClick={handleShow}>View</button>
                  <OrderModal show={show} handleClose={handleClose} tableData={row.orderItems} headingColumns={['ID', 'IMAGE', 'NAME', 'PRICE', 'QTY']}/>
                </td>
                <td data-heading={'brand'}>{row.totalPrice}</td>
                <td data-heading={'countInStock'}>
                  {row.isPaid ? (
                    row.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes className='text-red-500' />
                  )}
                </td>
                <td data-heading={'countInStock'}>
                  {row.isDelivered ? (
                    row.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td data-heading={'action'}>
                  <button className='mr-4 text-md'>
                    <Link href={`/products/${row._id}`}>
                      <a>
                        <FaEdit />
                      </a>
                    </Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  breakOn: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Table;
