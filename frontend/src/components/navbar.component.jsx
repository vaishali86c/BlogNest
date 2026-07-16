import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [userNavPanel, setUserNavPanel] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUserAuth({ token: null });
    setUserNavPanel(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      <nav className="border-b border-zinc-200 px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 text-lg font-bold sm:text-2xl"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white sm:h-9 sm:w-9">
              <i className="fi fi-br-script text-lg leading-none sm:text-xl"></i>
            </span>
            <span className="truncate">BlogNest</span>
          </Link>

          <label className="hidden min-w-40 max-w-xs flex-1 items-center gap-3 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-500 md:flex lg:max-w-sm">
            <i className="fi fi-br-search text-sm leading-none text-zinc-400"></i>
            <input
              className="w-full bg-transparent text-zinc-800 outline-none placeholder:text-zinc-400"
              type="search"
              placeholder="Search blogs"
            />
          </label>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              to="/write"
              className="hidden h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 sm:flex"
            >
              <i className="fi fi-rr-file-edit text-base leading-none"></i>
              <span className="hidden sm:inline">Write</span>
            </Link>

            {userAuth?.token ? (
              <div className="relative">
                <button 
                  className="w-10 h-10 rounded-full overflow-hidden mt-1 cursor-pointer"
                  onClick={() => setUserNavPanel(!userNavPanel)}
                >
                  <img src={userAuth.profile_img || "https://api.dicebear.com/6.x/fun-emoji/svg?seed=fallback"} alt="profile" className="w-full h-full object-cover" />
                </button>

                {userNavPanel && (
                  <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">@{userAuth.username}</p>
                    </div>
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex h-9 items-center rounded-full bg-zinc-950 px-3 text-xs font-semibold text-white hover:bg-zinc-800 sm:h-10 sm:px-4 sm:text-sm transition-colors"
                >
                  Sign up
                </Link>
                <Link
                  to="/signin"
                  className="flex h-9 items-center rounded-full px-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 sm:h-10 sm:px-4 sm:text-sm transition-colors"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>

        <label className="mt-3 flex items-center gap-3 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-500 md:hidden">
          <i className="fi fi-br-search text-sm leading-none text-zinc-400"></i>
          <input
            className="w-full bg-transparent text-zinc-800 outline-none placeholder:text-zinc-400"
            type="search"
            placeholder="Search blogs"
          />
        </label>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
