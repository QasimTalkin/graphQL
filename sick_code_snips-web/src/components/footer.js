import React from 'react';
const currentYear = new Date().getFullYear();
export default function Footer() { 
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {currentYear} <a href="https://flowbite.com/" className="hover:underline">Code Snippets</a>. All Rights Reserved.
    </span>
    </footer>
  );
}
