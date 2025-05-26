import React from 'react'
import Navigation from '../components/Navigation'
const Feed = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-1/5 h-screen flex items-center'>
        <Navigation tabActive="/feed" />
      </div>
      <div className='w-full md:w-4/5'>
        <h1 >Feed</h1>
      </div>
    </div>
  )
}

export default Feed
