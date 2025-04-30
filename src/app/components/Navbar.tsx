const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/90 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Augie Schnell
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;