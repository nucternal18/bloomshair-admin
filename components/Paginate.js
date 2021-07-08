import Link from 'next/link';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    <div className='flex mb-4'>
      {page > 1 && (
        <Link href={`/products?pageNumber=${page - 1}`}>
          <a className='btn-secondary'>Prev</a>
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
                  className='px-4 mr-1 list-none bg-white'
                  active={(x + 1 === page).toString()}>
                  {x + 1}
                </a>
              </Link>

          ))}
        </div>
      )}
      {page < pages && (
        <Link href={`/products?pageNumber=${page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}
    </div>
  );
};

export default Paginate;
