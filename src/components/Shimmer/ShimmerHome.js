const ShimmerHome = () => {
  return (
    <div className="flex flex-col bg-[#F9FAF9] min-h-screen px-4 py-6">
      {/* Top Section Shimmer: Search & Rating */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-[1200px] mx-auto mb-6">
        <div className="animate-pulse bg-gray-200 rounded-lg h-[50px] w-full md:w-[60%]"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg h-[50px] w-full md:w-[200px]"></div>
      </div>

      {/* Filter Row: Diet Dropdown, Top Rated */}
      <div className="flex flex-wrap justify-center items-center gap-4 w-full max-w-[1200px] mx-auto mb-6">
        <div className="flex items-center gap-2">
          <div className="animate-pulse bg-gray-300 h-[45px] w-[90px] rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 h-[45px] w-[120px] rounded-lg"></div>
        </div>
        <div className="animate-pulse bg-gray-300 h-[45px] w-[120px] rounded-lg"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-4">
        {Array(15)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="animate-pulse w-full rounded-2xl shadow-md p-3 border border-gray-200"
            >
              <div className="w-full h-[150px] bg-gray-300 rounded-xl mb-3"></div>
              <div className="w-[80%] h-5 bg-gray-300 rounded mb-2"></div>
              <div className="w-[60%] h-4 bg-gray-200 rounded mb-1"></div>
              <div className="w-[50%] h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShimmerHome;