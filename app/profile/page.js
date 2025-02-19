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
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const toggleCheck = (index) => {
    if (checkedItems.includes(index)) {
      setCheckedItems(checkedItems.filter((item) => item !== index));
    } else {
      setCheckedItems([...checkedItems, index]);
    }
  };

  const handleAddLabel = () => {
    // Perform add label action for checked items
    console.log('Add label to:', checkedItems);
  };

  useEffect(() => {
    setIsPopupVisible(checkedItems.length > 0);
    console.log(checkedItems)
  }, [checkedItems]);

  const selectAll = () => {
    setCheckedItems(list.map((item, index) => item.shortUrl)); // Select all indices
  };

  const deselectAll = () => {
    setCheckedItems([]); // Deselect all items
  };

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

  const handleDelete = async () => {
    if (checkedItems.length === 0) return; // No items to delete
  
    try {
      const response = await fetch("/api/getList", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortUrl: checkedItems, userId }),
      });
  
      if (!response.ok) {
        console.error("Failed to delete items");
        return;
      }
  
      // Remove deleted items from state immediately
      setlist((prevList) => prevList.filter(item => !checkedItems.includes(item.shortUrl)));
  
      // Clear selection
      deselectAll();
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };
  

  return (
    <div className={Quicksandvarible.className}>
      <section className='w-[90%] md:w-[60%] mx-auto'>
        <h3 className={`mt-20 sticky top-2 bg-[#f6f4f2] pt-2 w-[70%] mx-auto rounded text-center text-2xl font-extrabold text-[#474747]`}>Your Recent URLs</h3>
        <ul className='mt-10'>
          {list.map((item, index) => (
            <li key={item.shortUrl} className='my-5 hover:bg-gray-100 transition-colors duration-300'
              onMouseEnter={() => setHoveredIndex(item.shortUrl)} onMouseLeave={() => !checkedItems.includes(item.shortUrl) && setHoveredIndex(null)}>
              <div className={`relative left-0 transform transition-transform duration-300 
              ${hoveredIndex === item.shortUrl || checkedItems.includes(item.shortUrl) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <input type="checkbox" checked={checkedItems.includes(item.shortUrl)} onChange={() => toggleCheck(item.shortUrl)} className="form-checkbox h-5 w-5 text-blue-600" />
              </div>
              <section className='flex items-center justify-between'>
                <div><BsGlobe className='w-6 h-6' /></div>
                <ul className='w-[65%] md:w-[70%] overflow-hidden text-ellipsis whitespace-nowrap'>
                  <li><Link href={item.url} target="_blank">{item.url}</Link></li>
                  <li><Link href={process.env.NEXT_PUBLIC_HOST + item.shortUrl} target="_blank">{item.shortUrl}</Link></li>
                </ul>
                <div className='md:flex text-white gap-2'>
                  <div className='bg-[#775941] py-1 px-3 rounded'>{item.visits} Visit(s)</div>
                  <button className='bg-[#775941] py-1 px-3 rounded' onClick={() => copyData(process.env.NEXT_PUBLIC_HOST + item.shortUrl)}><IoCopy className='fill-white hidden md:inline mr-1 md:mr-2' />Copy</button>
                </div>
              </section>
              <div className='w-full h-[1px] bg-[#bebcbb]'></div>
            </li>
          ))}
        </ul>
      </section>
      <div
        className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center transition-transform duration-500 ${isPopupVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <div>
          <p className="text-lg font-semibold">Selected Actions</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition"
            onClick={selectAll}
          >
            Select All
          </button>
          <button
            className="bg-yellow-500 px-4 py-2 rounded text-white hover:bg-yellow-600 transition"
            onClick={deselectAll}
          >
            Deselect All
          </button>
          <button
            className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition"
            onClick={handleAddLabel}
          >
            Add Label
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
