import React from 'react'
import Spinner from '../../../common/icons/spinner'

export default function FavoriteIcon({ favorite, onClick, loading = false }: { favorite: boolean, onClick: React.MouseEventHandler, loading?: boolean }) {
  if (loading) return <div>
    <Spinner />
  </div>
  return favorite ?
    <svg onClick={onClick} width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.9999 8.74776C14 -1.20959 2 2.7927 2 12.9504C2 23.1082 22.0001 37 22.0001 37C22.0001 37 41 22.5506 41 12.9504C41 3.35018 30 -1.20957 23 8.74776L22.0001 9.54309L20.9999 8.74776Z" fill="#FFCC4F" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg> :
    <svg onClick={onClick} width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.9999 8.74776C14 -1.20959 2 2.7927 2 12.9504C2 23.1082 22.0001 37 22.0001 37C22.0001 37 41 22.5506 41 12.9504C41 3.35018 30.0001 -1.20957 23 8.74776L22.0001 9.54308L20.9999 8.74776Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}