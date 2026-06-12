import React from 'react';
import { Link } from 'react-router-dom';

const WriteBlog = () => {
  return (
    <section className="min-h-screen bg-white text-zinc-950">
      <nav className="border-b border-zinc-200 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 text-xl font-bold sm:text-2xl"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 text-white">
              <i className="fi fi-br-script text-xl leading-none"></i>
            </span>
            <span className="truncate">BlogNest</span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <button className="h-10 rounded-full px-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 sm:px-4">
              Save Draft
            </button>
            <button className="h-10 rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800 sm:px-5">
              Publish
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <form className="space-y-8">
          <label className="flex aspect-[16/9] w-full cursor-pointer items-center justify-center border border-zinc-200 bg-zinc-50 text-3xl font-medium text-zinc-300 transition hover:bg-zinc-100 sm:text-5xl">
            <span>Blog Banner</span>
            <input className="hidden" type="file" accept="image/*" />
          </label>

          <input
            className="w-full border-none text-4xl font-medium leading-tight outline-none placeholder:text-zinc-300 sm:text-5xl"
            type="text"
            placeholder="Blog Title"
          />

          <input
            className="w-full border-none text-sm font-sm leading-tight outline-none placeholder:text-zinc-300 sm:text-2xl"
            type="text"
            placeholder="Let&apos;s write an awesome story!"
          />
        </form>
      </main>
    </section>
  );
};

export default WriteBlog;
