const CartShimmer = () => (
  <div className="w-full md:w-10/12 lg:w-8/12 p-4 sm:p-6 space-y-4">
    {Array(3).fill(0).map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-white border border-gray-200 rounded-2xl p-4 shadow"
      >
        <div className="flex justify-between mb-4">
          <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-5 w-16 bg-gray-300 rounded"></div>
        </div>
        <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-2/3 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);
export default CartShimmer;