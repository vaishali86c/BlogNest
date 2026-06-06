import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <section className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <h1 className="mb-16 text-center font-serif text-2xl font-semibold text-zinc-900 sm:text-2xl">
          Welcome back to BlogNest
        </h1>

        <form className="space-y-4">
          <label className="flex h-12 items-center gap-4 bg-zinc-100 px-5 text-zinc-500">
            <i className="fi fi-rr-envelope text-lg leading-none text-zinc-800"></i>
            <input
              className="w-full bg-transparent text-base font-medium text-zinc-900 outline-none placeholder:text-zinc-500"
              type="email"
              placeholder="Email"
            />
          </label>

          <label className="flex h-12 items-center gap-4 bg-zinc-100 px-5 text-zinc-500">
            <i className="fi fi-rr-key text-lg leading-none text-zinc-800"></i>
            <input
              className="w-full bg-transparent text-base font-medium text-zinc-900 outline-none placeholder:text-zinc-500"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
            />
             {/* show password button */}
            <button
              className="flex text-zinc-800"
              type="button"
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              <i
                className={`fi ${
                  passwordVisible ? 'fi-rr-eye' : 'fi-rr-eye-crossed'
                } text-lg leading-none`}
              ></i>
            </button>
          </label>

          <div className="flex justify-center pt-4">
            <button
              className="h-12 rounded-full bg-zinc-950 px-8 text-base font-semibold text-white hover:bg-zinc-800"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="my-10 flex items-center gap-2 text-sm font-medium uppercase text-zinc-200">
          <hr className="h-px flex-1 bg-zinc-300"></hr>
        </div>

        <button
          className="flex h-14 w-full items-center justify-center gap-4 rounded-full bg-zinc-950 text-base font-semibold text-white hover:bg-zinc-800"
          type="button"
        >
          <span className="text-xl font-bold text-white">
            <span className="text-blue-500">G</span>
          </span>
          <span>Continue With Google</span>
        </button>

        <p className="mt-8 text-center text-base font-medium text-zinc-500">
          Don&apos;t have an account ?{' '}
          <Link className="font-semibold text-zinc-700 underline" to="/signup">
            Join us today.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
