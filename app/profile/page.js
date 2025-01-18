"use client"
import React from 'react'
import { Quicksand } from 'next/font/google'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { BsGlobe } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";
import Link from 'next/link'

const Quicksandvarible = Quicksand({
  subsets: ['latin'],
  display: 'swap',
})

const page = () => {

  const [list, setlist] = useState([])

  const user = useUser();
  const userId = user.user?.id;

  const copyData = (data) => {
    navigator.clipboard.writeText(data)
  }

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "userId": userId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    function fetchdata() {
      fetch("/api/getList", requestOptions)
        .then(async (response) => await response.json())
        .then((result) => {
          console.log(result);
          setlist(result);
        })
        .catch((error) => console.error(error));
    }

    console.log("run");
    if (userId) {
      fetchdata();
    }
  }, [userId]);

  return (
    <div className={Quicksandvarible.className}>
      hey there
      <section className='w-[90%] md:w-[60%] mx-auto overflow-y-auto'>
        <h3 className={`text-center text-2xl font-extrabold text-[#474747]`}>Your Recent URLs</h3>
        <ul className='mt-10'>
          {list.map((item, index) => (
            <li key={item.shortUrl} className='my-5'>
              <section className='flex items-center justify-between'>
                <div><BsGlobe className='w-6 h-6' /></div>
                <ul className='w-[70%] overflow-x-clip'>
                  <li><Link href={item.url} target="_blank">{item.url}</Link></li>
                  <li><Link href={process.env.NEXT_PUBLIC_HOST + item.shortUrl} target="_blank">{item.shortUrl}</Link></li>
                </ul>
                <div className='flex text-white gap-2'>
                  <div className='bg-[#775941] py-1 px-3 rounded'>{item.visits} Visits </div>
                  <button className='bg-[#775941] py-1 px-3 rounded' onClick={() => copyData(process.env.NEXT_PUBLIC_HOST + item.shortUrl)}><IoCopy className='fill-white inline mr-2' />Copy</button>
                </div>
              </section>
              <div className='w-full h-[1px] bg-[#bebcbb]'></div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default page
