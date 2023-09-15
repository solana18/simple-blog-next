'use client';

import { useRouter, usePathname } from 'next/navigation'
import { ChangeEvent, useCallback, useState } from 'react';
import _ from 'lodash'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { Category } from '@/models/category';

interface SearchFormProps {
  categories: Category[];
  defaultSearch?: string;
  defaultCategory?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ categories, defaultSearch = '', defaultCategory = '' }) => {

  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useCreateQueryString()

  const [search, setSearch] = useState<string>(defaultSearch)
  const [category, setCategory] = useState<string>(defaultCategory)

  const debouncedSetSearchQuery = _.debounce((value) => {
    router.push(`${pathname}?${createQueryString({ search: value, page: false })}`)
  }, 100)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    debouncedSetSearchQuery(value)
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCategory(value)
    router.push(`${pathname}?${createQueryString({ category: value, page: false })}`)
  }

  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-2">
      <input
        name="search"
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded px-2 py-1"
      />
      <select
        name="category"
        value={category}
        onChange={handleCategoryChange}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="">All Categories</option>
        {
          categories.map((item => (
            <option key={item.id} value={item.slug}>{item.name}</option>
          )))
        }
      </select>
    </div>
  )
};

export default SearchForm;