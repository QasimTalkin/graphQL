import React from 'react';

export default function header() {
  return (
    <>
        <nav className="flex flex-row justify-between items-center bg-neutral-900 p-4">
            <div className="flex flex-row items-center">
                <a href="/" className="text-2xl font-bold text-white hover:text-lime-500">Code Snippets</a>
            </div>
            <div className="flex flex-row items-center">
                <a href="/posts" className="text-lg font-bold text-white hover:text-lime-400 mx-4">Posts</a>
                <a href="/createPost" className="text-lg font-bold text-white hover:text-lime-400 mx-4">Create Post</a>
                <a href="/login" className="text-lg font-bold text-white hover:text-lime-400 mx-4">Login</a>
            </div>
            <div>
              <input type="text" name="search" id="search" className="bg-lime-400 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50  focus:bg-neutral-900  mt-2  w-full matrix" placeholder='Look up post'/>
            </div>
        </nav>
    </>
  );
}
