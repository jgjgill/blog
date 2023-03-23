import Fuse from 'fuse.js'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo, useState } from 'react'

const SearchTemp = () => {
  const search = useStaticQuery(graphql`
    {
      fusejs {
        index
        data
      }
    }
  `)
  const [query, setQuery] = useState('')

  const fuse: Fuse<unknown> = useMemo(() => {
    return new Fuse(
      search.fusejs.data,
      {},
      Fuse.parseIndex(JSON.parse(search.fusejs.index)),
    )
  }, [search])

  console.log(search.fusejs.index)
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <ul>
        {fuse.search(query).map((post) => (
          <li key={post.refIndex}>
            <div>{post.item.title}</div>
            <div>{post.item.slug}</div>
            <div>{post.item.date}</div>
          </li>
          // <Post key={po/st.refIndex} node={post.item} />
        ))}
      </ul>
    </div>
  )
}

export default SearchTemp
