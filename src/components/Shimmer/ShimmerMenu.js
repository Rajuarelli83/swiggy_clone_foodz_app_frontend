const ShimmerMenu = () => {
  return (
    <div className="p-1 space-y-4 animate-pulse">
      {/* Top Grid Card: Restaurant Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-2xl">
        {/* Left: Text Info */}
        <div className="col-span-12 md:col-span-8 flex flex-col space-y-3 bg-gradient-to-b from-white to-gray-200 shadow-md rounded-2xl p-4">
          <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-16 w-full bg-gray-300 rounded"></div>
          <div className="h-14 w-full bg-gray-300 rounded"></div>
        </div>

        {/* Right: Image */}
        <div className="col-span-12 md:col-span-4 hidden md:block">
          <div className="w-full h-[300px] bg-gray-300 rounded-2xl shadow"></div>
        </div>
      </div>

      {/* Bottom shimmer for each category button/card */}
      <div className="space-y-3">
        {Array(6).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-12 w-full md:w-8/12 mx-auto bg-gray-200 rounded-lg shadow"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerMenu;