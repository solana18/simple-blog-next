'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

interface PaginationProps {
  page: string;
  totalPageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ page = '1', totalPageCount }) => {

  const createQueryString = useCreateQueryString()

  const hasFirstPage = +page > 1
  const hasPrevPage = +page > 1
  const hasNextPage = +page < +totalPageCount
  const hasLastPage = +page < +totalPageCount

  return (
    <div className="flex flex-row justify-center gap-2">
      <Link
        href={`?${createQueryString({ page: 1 })}`}
        className={clsx(
          'text-white px-4 py-1 rounded',
          {
            'bg-blue-500': hasFirstPage,
            'pointer-events-none bg-gray-300': !hasFirstPage,
          }
        )}
      >
        First
      </Link>
      <Link
        href={`?${createQueryString({ page: Number(page) - 1 })}`}
        className={clsx(
          'text-white px-4 py-1 rounded',
          {
            'bg-blue-500': hasPrevPage,
            'pointer-events-none bg-gray-300': !hasPrevPage,
          }
        )}
      >
        Prev
      </Link>
      <div className="px-2 py-1">
        {page}
      </div>
      <Link
        href={`?${createQueryString({ page: Number(page) + 1 })}`}
        className={clsx(
          'text-white px-4 py-1 rounded',
          {
            'bg-blue-500': hasNextPage,
            'pointer-events-none bg-gray-300': !hasNextPage,
          }
        )}
      >
        Next
      </Link>
      <Link
        href={`?${createQueryString({ page: totalPageCount })}`}
        className={clsx(
          'text-white px-4 py-1 rounded',
          {
            'bg-blue-500': hasLastPage,
            'pointer-events-none bg-gray-300': !hasLastPage,
          }
        )}
      >
        Last
      </Link>
    </div>
  )
}

export default Pagination