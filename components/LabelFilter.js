import React, { useState, useEffect } from "react";

const LabelFilter = ({ selectedLabel, setSelectedLabel }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down, move it out of view
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 transition-transform duration-300 ease-in-out 
        ${isVisible ? 'translate-y-[60vh]' : 'translate-y-[100vh]'}
      `}
    >
      <div className="bg-white shadow-lg rounded-lg px-6 py-2 flex space-x-4">
      <button className={`px-4 py-2 rounded ${selectedLabel === "All" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`} onClick={() => setSelectedLabel("All")}>All</button>
      <button className={`px-4 py-2 rounded ${selectedLabel === "Favorites" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`} onClick={() => setSelectedLabel("Favorites")}>Favorites</button>
      <button className={`px-4 py-2 rounded ${selectedLabel === "Work" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`} onClick={() => setSelectedLabel("Work")}>Work</button>
      </div>
    </div>
  );
};
 
export default LabelFilter;
