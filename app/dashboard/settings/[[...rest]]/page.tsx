import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <div className='flex items-center justify-center  '>
        <div className='my-12 '>
        <UserProfile/>
        </div>
    </div>
  )
}

export default page