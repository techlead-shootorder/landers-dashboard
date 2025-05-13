// PageContentSkeleton.jsx
const PageContentSkeleton = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse"></div>
        {/* Search bar removed as requested */}
      </div>
      <div className="h-6 w-64 bg-gray-200 rounded-md animate-pulse mb-6"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Generate 6 skeleton cards */}
        {Array(6).fill().map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
            
            {/* Top left button skeleton */}
            <div className="absolute top-2 left-2 w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            
            {/* Top right button skeleton */}
            <div className="absolute top-2 right-2 w-14 h-6 bg-gray-300 rounded animate-pulse"></div>
            
            {/* Content skeleton */}
            <div className="p-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageContentSkeleton;