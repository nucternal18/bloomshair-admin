import Link from 'next/link'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className='flex mb-4'>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            href={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }>
            <a
              className='px-4 mr-1 list-none bg-white'
              active={x + 1 === page}>
              {x + 1}
            </a>
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;