import React from 'react';
const currentYear = new Date().getFullYear();
export default function Footer() { 
  return (
  <div className="bg-gray-900 text-white p-4 rounded-lg shadow-xl relative w-full bottom-0">
  <span className="block text-sm sm:text-center dark:text-gray-400"> Qasim © {currentYear} <a href="https://flowbite.com/" className="hover:underline">Code Snippets</a>. All Rights Reserved.
  </span>
  </div>
  );
}
