export default function UserPost({ post }) {
  console.log(post);
  return (
    <div className="w-screen max-w-screen-lg mt-6 bg-gray-600 p-4 rounded-lg shadow-xl h-64 max-h-64">
    <div className="flex flex-row items-center justify-between bg-zinc-700 p-4 rounded-lg shadow-xl">
      <h2 className="text-md matrix">{post.title.toUpperCase()} - <span className="text-sm">{post.createdAt} - {post.userName} </span> </h2>
    </div>
    <div className="flex flex-col w-full justify-center bg-zinc-400 my-2 h-[70%] p-4">
      <p className="text-sm matrix">{post.postSnippet}</p>
    </div>
  </div>
  );
}