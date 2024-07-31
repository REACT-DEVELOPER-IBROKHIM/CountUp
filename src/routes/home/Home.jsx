import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Link className='text-blue-500' to={"/dashboard"}>Dashboard</Link>
    </div>
  )
}

export default Home