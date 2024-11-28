import { Notebook } from 'lucide-react'
import Link from 'next/dist/client/link'
// import Link from 'next/link'
import React from 'react'


function ResumeCardItem({resume}:any) {
  return (
    
    <a href={'/resume/createresume/' + resume.resumeid + '/edit'}>
        <div className='p-14 flex justify-center items-center h-[280px] border border-purple-600 rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-purple-700'>
        <Notebook/>
        </div>
        <h2 className='text-center my-1'>{resume.title}</h2>
    </a>
  )
}

export default ResumeCardItem