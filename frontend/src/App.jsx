import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.component.jsx';
import Home from './components/home.component.jsx';
import SignIn from './pages/signin.page.jsx';
import SignUp from './pages/signup.page.jsx';

const App = () => {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="write" element={<h1>Write page</h1>} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
