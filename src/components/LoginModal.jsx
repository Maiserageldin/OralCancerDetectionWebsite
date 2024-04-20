import React from "react";

const LoginModal = ({ handleClose, show }) => {
  const showHideClass = show
    ? "modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    : "modal hidden";

  return (
    <div className={showHideClass}>
      <div className="modal-overlay fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-white rounded-lg p-8 w-full max-w-xl">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
