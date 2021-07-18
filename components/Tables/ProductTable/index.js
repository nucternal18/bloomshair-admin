import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../../../styles/Table.module.css';

const Table = ({ tableData, headingColumns, deleteHandler }) => {
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
          {tableData.map((row, index) => {
            return (
              <tr key={index}>
                <td data-heading={'_id'}>{row.id}</td>
                <td data-heading={'image'}>
                  <Image
                    src={row.image}
                    alt={row.name}
                    width={50}
                    height={50}
                    className='rounded-sm'
                    objectFit='cover'
                  />
                </td>
                <td data-heading={'name'}>{row.name}</td>
                <td data-heading={'price'}>£{row.price.toFixed(2)}</td>
                <td data-heading={'category'}>{row.category}</td>
                <td data-heading={'brand'}>{row.brand}</td>
                <td data-heading={'countInStock'}>{row.countInStock}</td>
                <td data-heading={'action'}>
                  <button className='mr-4 text-md' variant='light'>
                    <Link href={`/products/${row.id}`}>
                      <a>
                        <FaEdit />
                      </a>
                    </Link>
                  </button>
                  <button
                    variant='danger'
                    className='text-red-600 text-md'
                    onClick={() => deleteHandler(row.id)}>
                    <FaTrash />
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
