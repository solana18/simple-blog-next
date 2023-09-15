import {useCallback} from 'react';
import {useSearchParams} from 'next/navigation';

export function useCreateQueryString(){
  const searchParams = useSearchParams()
  return useCallback(
    (queries: any) => {
      const params = new URLSearchParams(searchParams)
      Object.keys(queries).forEach((name: string) => {
        const value = queries[name]
        params.set(name, value)
        if (value === false || value === '') params.delete(name)
      })
      return params.toString()
    },
    [searchParams]
  )
}