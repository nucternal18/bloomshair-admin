import PropTypes from 'prop-types';
import Image from 'next/image';
import {  FaTrash} from 'react-icons/fa';
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
                <td data-heading={'_id'}>{row._id}</td>
                <td data-heading={'image'}>
                  <Image
                    src={row.image}
                    alt={''}
                    width={70}
                    height={70}
                    className='rounded-lg'
                  />
                </td>
                <td data-heading={'name'}>{row.createdAt.substring(0, 10)}</td>
                <td data-heading={'action'}>
                  <button
                    variant='danger'
                    className='text-red-600 text-md'
                    onClick={() => deleteHandler(row._id)}>
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
