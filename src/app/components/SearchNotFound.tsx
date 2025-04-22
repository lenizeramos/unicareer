const SearchNotFound = ({ text }: { text: string }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 font-shafarik">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mb-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12h.01M12 12h.01M9 12h.01M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg>
        <p className="text-2xl font-medium">{text}</p>
        <p className="text-sm text-gray-400 mt-1">
          Try adjusting your filters.
        </p>
      </div>
    </>
  );
};

export default SearchNotFound;
