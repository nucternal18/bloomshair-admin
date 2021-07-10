import Link from 'next/link';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    <div className='flex my-4 text-gray-700 uppercase'>
      {page > 1 && (
        <Link href={`/products?pageNumber=${page - 1}`}>
          <a className='px-4 '>Prev</a>
        </Link>
      )}
      {pages > 1 && (
        <div className='flex mb-4'>
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              href={
                !isAdmin
                  ? keyword
                    ? `/search?keyword=${keyword}?pageNumber=${x + 1}`
                    : `/products?pageNumber=${x + 1}`
                  : `/products?pageNumber=${x + 1}`
              }>
              <a
                className='px-4 list-none bg-transparent'
                active={(x + 1 === page).toString()}>
                {x + 1}
              </a>
            </Link>
          ))}
        </div>
      )}
      {page < pages && (
        <Link href={`/products?pageNumber=${page + 1}`}>
          <a className='px-4 uppercase list-none'>Next</a>
        </Link>
      )}
    </div>
  );
};

export default Paginate;
