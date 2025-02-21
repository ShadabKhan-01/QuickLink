"use client"

import { useState } from "react";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {

  const [url, seturl] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [geturl, setgeturl] = useState("")

  const user = useUser();
  const userId = user.user?.id;
  console.log(user.user);
  console.log(userId);

  const notify = (message) => toast(message);

  const sendUrl = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shortUrl": shortUrl,
      "userId": userId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        notify("URL Generated !!")
        setshortUrl("");
        seturl("");
        setgeturl(process.env.NEXT_PUBLIC_HOST + shortUrl);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
    <ToastContainer />
      <main className=" md:flex">
        <section className="mt-5 md:w-1/2 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg shadow-md font-semibold">
            <form onSubmit={(e) => sendUrl(e)}>
              <label className="my-2 block mx-4" htmlFor="url"><FaLink className="inline mr-2" />Enter your Long Url Here:</label>
              <input className="my-2 block border w-full h-[35px] rounded-md" type="url" name="url" id="url" value={url} onChange={(e) => { seturl(e.target.value) }} required />
              <label className="my-2 block mx-4" htmlFor="shortUrl"><FaLink className="inline mr-2" />Customize your Link:</label>
              <input className="my-2 block border w-full h-[35px] rounded-md" type="text" name="shortUrl" id="shortUrl" value={shortUrl} onChange={(e) => { setshortUrl(e.target.value) }} required />
              <button type="submit">Get Link</button>
            </form>
            {geturl && <>
              <div>Your Link</div>
              <code><Link href={geturl} target="_blank">{geturl}</Link></code>
            </>}
          </div>
        </section>
        <section className=" md:w-1/2 flex justify-center items-center">
          <div>
            <img src="/images/preview-women-character-teaching-vector-illustration.jpg" alt="" className="mix-blend-color-burn" width={400} height={400} />
          </div>
        </section>
      </main>
    </>
  );
}
