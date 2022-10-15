import React from 'react';

export default function CreatePost() {
  return (
    <>
      <div className="w-screen max-w-screen-lg">
        <div className="flex flex-col items-center w-full justify-center bg-gray-600 p-4 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold matrix">Create Post</h1>
          <form className="flex flex-col w-full">
            <label htmlFor="title" className="text-lg matrix mt-4">Title</label>
            <input type="text" name="title" id="title" className="bg-gray-900 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 mt-2  w-full matrix" />
            <label htmlFor="description" className="text-lg matrix mt-4">Description</label>
            <textarea name="description" id="description" cols="30" rows="10" className="matrix bg-gray-900 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 mt-2"></textarea>
            <button type="submit" className="bg-gray-900 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 mt-2 w-full matrix">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
