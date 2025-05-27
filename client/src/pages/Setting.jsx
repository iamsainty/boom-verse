import React from 'react'
import Navigation from '../components/Navigation'
const Setting = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 md:h-screen flex items-center">
        <Navigation tabActive="/settings" />
      </div>
      <div className="w-full md:w-3/4 h-screen flex flex-col justify-center font-bold text-lg text-center items-center px-2">
        Settings page is yet to be implemented, please check back later.
      </div>
    </div>
  )
}

export default Setting
