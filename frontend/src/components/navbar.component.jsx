import React from 'react';

const Navbar = () => {
  return (
    <nav className="border-b border-zinc-200 px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <a
          href="/"
          className="flex min-w-0 items-center gap-2 text-xl font-bold sm:text-2xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 text-white">
            <i className="fi fi-br-script text-xl leading-none"></i>
          </span>
          <span className="truncate">BlogNest</span>
        </a>

        <label className="hidden min-w-40 max-w-xs flex-1 items-center gap-3 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-500 md:flex lg:max-w-sm">
          <i className="fi fi-br-search text-sm leading-none text-zinc-400"></i>
          <input
            className="w-full bg-transparent text-zinc-800 outline-none placeholder:text-zinc-400"
            type="search"
            placeholder="Search blogs"
          />
        </label>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <a
            href="/write"
            className="flex h-10 items-center gap-2 rounded-md px-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 sm:px-3"
          >
            <i className="fi fi-rr-file-edit text-base leading-none"></i>
            <span className="hidden sm:inline">Write</span>
          </a>
          <button className="h-10 rounded-full bg-zinc-950 px-3 text-sm font-semibold text-white hover:bg-zinc-800 sm:px-4">
            Sign up
          </button>
          <button className="h-10 rounded-full px-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 sm:px-4">
            Sign in
          </button>
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
  );
};

export default Navbar;
