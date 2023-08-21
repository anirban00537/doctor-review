const NoItemFound = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-12">
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <p className="text-gray-600 text-lg">{message || "No items found."}</p>
    </div>
  );
};

export default NoItemFound;
