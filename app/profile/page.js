"use client";
import React, { useEffect, useState } from "react";
import LabelFilter from "@/components/LabelFilter";
import { ToastContainer, toast } from 'react-toastify';
import { Quicksand } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import { BsGlobe } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";
import Link from "next/link";

const Quicksandvarible = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

const Page = () => {
  const [list, setList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("All"); // Default: Show all URLs
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [showLabelOptions, setShowLabelOptions] = useState(false); // State to show label options
  const [searchTerm, setSearchTerm] = useState('');

  const user = useUser();
  const userId = user.user?.id;

  const notify = (message) => toast.success(message);

  const toggleCheck = (index) => {
    if (checkedItems.includes(index)) {
      setCheckedItems(checkedItems.filter((item) => item !== index));
    } else {
      setCheckedItems([...checkedItems, index]);
    }
  };

  const filteredItems = list.filter(item =>
    item.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setIsPopupVisible(checkedItems.length > 0);
  }, [checkedItems]);

  const selectAll = () => {
    setCheckedItems(list.map((item) => item.shortUrl));
  };

  const deselectAll = () => {
    setCheckedItems([]);
  };

  const copyData = (data) => {
    navigator.clipboard.writeText(data);
    notify("URL Copied !!")
  };

  const handleLabelClick = (label) => {
    editLabel(label);  // Calls the function to edit the label
    setShowLabelOptions(false); // Hide options after selection
  };

  const editLabel = async (label) => {
    if (checkedItems.length === 0) return; // No items selected
    try {
      const response = await fetch("/api/updateLabel", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortUrl: checkedItems, label, userId }),
      });

      if (!response.ok) {
        console.error("Failed to update labels");
        return;
      }

      deselectAll();
      notify("Label Added !!")

      console.log("Labels updated successfully");
    } catch (error) {
      console.error("Error updating labels:", error);
    }

  }

  useEffect(() => {
    if (!userId) return;

    const fetchData = async (label) => {
      try {
        setIsLoading(true); // Show skeleton before fetching
        const response = await fetch("/api/getList", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, label }),
        });

        const result = await response.json();
        setList(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Hide skeleton once data is fetched
      }
    };

    fetchData(selectedLabel);
  }, [userId, selectedLabel]);

  const handleDelete = async () => {
    if (checkedItems.length === 0) return;

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

      setList((prevList) => prevList.filter((item) => !checkedItems.includes(item.shortUrl)));
      deselectAll();
      notify("Item Deleted !!")
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  return (
    <div className={Quicksandvarible.className}>
      <ToastContainer />
      {!isLoading && <LabelFilter selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel} />}
      <section className="w-[90%] md:w-[60%] mx-auto">
        <div className="mt-20 sticky top-2 pt-2 w-[70%] mx-auto rounded text-center">
          <h3 className="bg-[#f6f4f2] text-2xl font-extrabold text-[#474747]">
            {`${selectedLabel} URLs`}
          </h3>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* ✅ Show Skeleton Loader when data is loading */}
        {isLoading ? (
          <ul className="mt-10 space-y-5">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <li key={index} className="my-5 p-4 bg-gray-200 animate-pulse rounded-md">
                  <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-gray-300 rounded"></div>
                </li>
              ))}
          </ul>
        ) : (
          <ul>
            {list.length === 0 ? (
              <li className="text-center text-lg text-gray-400">No URLs found</li>
            ) : (

              (filteredItems.map((item, index) => (
                <li
                  key={item.shortUrl}
                  className="my-5 hover:bg-gray-100 transition-colors duration-300"
                  onMouseEnter={() => setHoveredIndex(item.shortUrl)}
                  onMouseLeave={() => !checkedItems.includes(item.shortUrl) && setHoveredIndex(null)}
                >
                  <div
                    className={`relative left-0 transform transition-transform duration-300 
                  ${hoveredIndex === item.shortUrl || checkedItems.includes(item.shortUrl) ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(item.shortUrl)}
                      onChange={() => toggleCheck(item.shortUrl)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </div>
                  <section className="flex items-center justify-between">
                    <div>
                      <BsGlobe className="w-6 h-6" />
                    </div>
                    <ul className="w-[65%] md:w-[70%] overflow-hidden text-ellipsis whitespace-nowrap">
                      <li>
                        <Link href={item.url} target="_blank">
                          {item.url}
                        </Link>
                      </li>
                      <li>
                        <Link href={process.env.NEXT_PUBLIC_HOST + item.shortUrl} target="_blank">
                          {item.shortUrl}
                        </Link>
                      </li>
                    </ul>
                    <div className="md:flex text-white gap-2">
                      <div className="bg-[#775941] py-1 px-3 rounded">{item.visits} Visit(s)</div>
                      <button
                        className="bg-[#775941] py-1 px-3 rounded mt-1 md:mt-0"
                        onClick={() => copyData(process.env.NEXT_PUBLIC_HOST + item.shortUrl)}
                      >
                        <IoCopy className="fill-white inline mr-1 md:mr-2" />
                        Copy
                      </button>
                    </div>
                  </section>
                  <div className="w-full h-[1px] bg-[#bebcbb]"></div>
                </li>
              ))))}
          </ul>
        )}
      </section>

      {/* Popup Actions Bar */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center transition-transform duration-500 ${isPopupVisible ? "translate-y-0" : "translate-y-full"}`}
      >
        <div>
          <p className="md:text-lg font-semibold">Selected Actions</p>
        </div>
        <div className="flex flex-wrap md:space-x-4 justify-evenly">
          <button
            className="bg-green-500 px-4 py-1 md:py-2 rounded text-white hover:bg-green-600 transition"
            onClick={selectAll}
          >
            Select All
          </button>
          <button
            className="bg-yellow-500 px-4 py-1 md:py-2 rounded text-white hover:bg-yellow-600 transition"
            onClick={deselectAll}
          >
            Deselect All
          </button>
          <button
            className="bg-red-500 px-6 mt-1 md:mt-0 py-1 md:py-2 rounded text-white hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 px-5 mt-1 md:mt-0 py-1 md:py-2 rounded text-white hover:bg-blue-600 transition"
            onClick={() => setShowLabelOptions(!showLabelOptions)}
          >
            Add Label
          </button>
          {/* Dropdown for Label Options */}
          {showLabelOptions && (
            <div className="absolute bottom-full mb-2 right-0 bg-white shadow-md rounded-md w-36 text-black">
              <button
                className="block w-full px-4 py-2 hover:bg-gray-200 transition"
                onClick={() => handleLabelClick('Favorites')}
              >
                Favorites
              </button>
              <button
                className="block w-full px-4 py-2 hover:bg-gray-200 transition"
                onClick={() => handleLabelClick('Work')}
              >
                Work
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
