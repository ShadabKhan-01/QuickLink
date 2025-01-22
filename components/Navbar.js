"use client"

import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { SignedOut, SignIn, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {

  const [isLogin, setIsLogin] = useState(false)

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 70) {
      setIsVisible(false); // Hide navbar when scrolling down
    } else {
      setIsVisible(true); // Show navbar when scrolling up
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`fixed left-0 top-0 w-full flex justify-between px-5 bg-[#f6f4f2] h-16 items-center shadow-md transition-transform duration-300 z-50 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
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
