import { Link } from 'react-router-dom'
import React from 'react'

const Logo = ({variant}) => {
  return (
    <h1 className='text-[26.5px]' data-logo-variant={variant}><Link to="/">Logo</Link></h1>
    // TODO: needs modification
  )
}

export default Logo