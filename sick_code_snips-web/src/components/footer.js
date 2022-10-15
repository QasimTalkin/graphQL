import React from 'react';
const currentYear = new Date().getFullYear();
export default function Footer() { 
  return (
  <div className="w-screen max-w-screen-lg bg-gray-900 text-white p-4 rounded-lg shadow-xl">
  <span className="block text-sm sm:text-center dark:text-gray-400"> Qasim © {currentYear} <a href="https://flowbite.com/" className="hover:underline">Code Snippets</a>. All Rights Reserved.
  </span>
  </div>
  );
}
