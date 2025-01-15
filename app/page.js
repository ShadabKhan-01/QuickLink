"use client"

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";

export default function Home() {

  const [url, seturl] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [geturl, setgeturl] = useState("")

  const sendUrl = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shortUrl": shortUrl
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
        alert(result.message);
        setshortUrl("");
        seturl("");
        setgeturl(process.env.NEXT_PUBLIC_HOST + shortUrl);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div className="main fixed top-0 -z-10 w-screen h-svh bg-gradient-to-bl from-[#f6f4f2] from-50% to-[#c7ab97] to-50%"></div>
      <Navbar />
      <main className=" md:flex">
        <section className="w-1/2 flex justify-center items-center">
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
        <section className="w-1/2">
          <div>
            <img src="/images/preview-women-character-teaching-vector-illustration.jpg" alt="" className="mix-blend-color-burn" width={400} height={400} />
          </div>
        </section>
      </main>
    </>
  );
}
