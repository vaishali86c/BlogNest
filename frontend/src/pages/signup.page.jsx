import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../contexts/UserContext.jsx';

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { userAuth, setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUserAuth = (serverRes) => {
    sessionStorage.setItem("user", JSON.stringify(serverRes.data.user));
    sessionStorage.setItem("token", serverRes.data.token);
    setUserAuth({ ...serverRes.data.user, token: serverRes.data.token });
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !password) {
      return toast.error("Please fill in all fields");
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        handleUserAuth(data);
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (err) {
      toast.error("Failed to connect to server");
    }
  };

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/users/google-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message);
        handleUserAuth(data);
      } else {
        toast.error(data.message || "Google auth failed");
      }
    } catch (err) {
      toast.error("Failed to authenticate with Google");
    }
  };

  if (userAuth?.token) {
    return <Navigate to="/" />
  }

  return (
    <section className="flex min-h-[calc(100vh-118px)] items-start justify-center px-4 py-8 sm:min-h-[calc(100vh-88px)] sm:items-center sm:py-10">
      <div className="w-full max-w-sm sm:max-w-md">
        <h1 className="mb-10 text-center font-serif text-3xl font-semibold leading-tight text-zinc-900 sm:mb-16 sm:text-3xl">
          Join Us Today
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="flex h-12 items-center gap-3 bg-zinc-100 px-4 text-zinc-500 sm:gap-4 sm:px-5">
            <i className="fi fi-rr-user text-base leading-none text-zinc-800 sm:text-lg"></i>
            <input
              className="min-w-0 w-full bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-500 sm:text-base"
              type="text"
              placeholder="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </label>

          <label className="flex h-12 items-center gap-3 bg-zinc-100 px-4 text-zinc-500 sm:gap-4 sm:px-5">
            <i className="fi fi-rr-envelope text-base leading-none text-zinc-800 sm:text-lg"></i>
            <input
              className="min-w-0 w-full bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-500 sm:text-base"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="flex h-12 items-center gap-3 bg-zinc-100 px-4 text-zinc-500 sm:gap-4 sm:px-5">
            <i className="fi fi-rr-key text-base leading-none text-zinc-800 sm:text-lg"></i>
            <input
              className="min-w-0 w-full bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-500 sm:text-base"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="flex h-8 w-8 shrink-0 items-center justify-center text-zinc-800"
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

          <div className="flex justify-center pt-4 sm:pt-5">
            <button
              className="h-11 rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white hover:bg-zinc-800 sm:h-12 sm:px-8 sm:text-base transition-colors"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="my-8 flex items-center gap-2 text-sm font-medium uppercase text-zinc-200 sm:my-10">
          <hr className="h-px flex-1 bg-zinc-300"></hr>
        </div>

        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleAuth}
            onError={() => {
              toast.error("Google authentication failed");
            }}
          />
        </div>

        <p className="mt-6 text-center text-sm font-medium text-zinc-500 sm:mt-8 sm:text-base">
          Already a member ?{' '}
          <Link className="font-semibold text-zinc-700 hover:text-zinc-900 underline transition-colors" to="/signin">
            Sign in here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
