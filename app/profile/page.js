"use client"
import React from 'react'
import { Quicksand } from 'next/font/google'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

const Quicksandvarible = Quicksand({
  // weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const page = () => {

  const [list, setlist] = useState([])

  const user = useUser();
  const userId = user.user?.id;

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

  useEffect(() => {
    function fetchdata() {
      fetch("/api/getList", requestOptions)
        .then(async (response) => await response.json())
        .then((result) => {
          console.log(result);
          setlist(result);
        })
        .catch((error) => console.error(error));
    }
    fetchdata();

  }, [userId])

  return (
    <div>
      hey there
      <section className='w-[90%] md:w-[80%] h-screen mx-auto'>
        <h3 className={`text-center text-2xl font-extrabold text-[#474747] ${Quicksandvarible.className}`}>Your Recent URLs</h3>
        <ul>
          {list.map((item, index) => (
            <li key={item.shortUrl}>
              <div>{item.url}</div>
              <div>{item.shortUrl}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default page
