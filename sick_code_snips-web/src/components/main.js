import React from 'react';
import CreatePost from './pageComps/createPost';
import UserPosts from './pageComps/userPosts';

export default function Main() {
  return (
    <div className="container flex flex-col content-center items-center m-auto justify-center">
      <CreatePost />
      <UserPosts />
    </div>
  );
}
