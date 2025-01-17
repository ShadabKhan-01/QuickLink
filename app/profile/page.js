import React from 'react'
import { Quicksand } from 'next/font/google'

const Quicksandvarible = Quicksand({
    // weight: '400',
    subsets: ['latin'],
    display: 'swap',
  })

const page = () => {
  return (
    <div>
      hey there
      <section className='w-[90%] md:w-[80%] h-screen mx-auto'>
        <h3 className={`text-center text-2xl font-extrabold text-[#474747] ${Quicksandvarible.className}`}>Your Recent URLs</h3>
        <ul>
        </ul>
      </section>
    </div>
  )
}

export default page
