export default function Loading() {
  return (
  
  // absolute positioning center the spinner disabeling the pointer events and hading background with 40% opacity 
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lime-900 bg-opacity-40 w-full h-full flex justify-center items-center pointer-events-none">
      <div className="z-50 animate-spin rounded-full h-64 w-64 border-t-8 border-b-8 border-zinc-900 "></div>
    </div>
  );
};