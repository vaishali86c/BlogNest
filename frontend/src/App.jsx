import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.component.jsx';
import Home from './components/home.component.jsx';
import SignIn from './pages/signin.page.jsx';
import SignUp from './pages/signup.page.jsx';

import WriteBlog from './components/write.component.jsx';
import { UserContextProvider } from './contexts/UserContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserContextProvider>
        <main className="min-h-screen bg-white text-zinc-950">
          <Toaster />
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="write" element={<WriteBlog />} >
              {/* <Route path="publish" element={<h1>Publish page</h1>} />
              <Route path="save-draft" element={<h1>save draft</h1>} /> */}
            </Route>
          </Routes>
        </main>
      </UserContextProvider>
    </GoogleOAuthProvider>

  );
};

export default App;
