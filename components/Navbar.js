"use client"

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { SignedOut, SignIn, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {

  const [isLogin, setIsLogin] = useState(false)

  return (
    <nav className='sticky top-0 w-full flex justify-between px-5 bg-[#f6f4f2] h-16 items-center shadow-md'
    >
      <h1>
        <Link href={"/"}>QuickLinks</Link>
      </h1>
      <section className='flex justify-center items-center gap-4'>
      <button className='bg-[#775941] py-1 px-3 rounded text-white font-semibold'><Link href={"/profile"}>My Profile</Link></button>
      <UserButton />
      <SignedOut>
        <SignInButton className='bg-[#775941] py-1 px-3 rounded text-white font-semibold' />
      </SignedOut>
      </section>
    </nav>
  )
}

export default Navbar
