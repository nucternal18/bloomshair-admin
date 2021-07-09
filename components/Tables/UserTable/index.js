import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
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
                    className='rounded-full'
                  />
                </td>
                <td data-heading={'name'}>{row.name}</td>
                <td data-heading={'email'}>
                  <a href={`mailto:${row.email}`}>{row.email}</a>
                </td>
                <td data-heading={'admin'}>
                  <div className='flex md:justify-center'>
                    {row.isAdmin ? (
                      <FaCheck className='text-green-400' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </div>
                </td>

                <td data-heading={'action'}>
                  <button className='mr-4 text-md' variant='light'>
                    <Link href={`/user/${row.id}`}>
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
