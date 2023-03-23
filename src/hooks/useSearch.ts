import Fuse from 'fuse.js'
import { useMemo } from 'react'

export default function useSearch<T>(
  query: string,
  fusejs: { data: T[]; index: string },
) {
  const fuse = useMemo(() => {
    return new Fuse<T>(fusejs.data, undefined, Fuse.parseIndex(JSON.parse(fusejs.index)))
  }, [fusejs])

  return fuse.search(query)
}
