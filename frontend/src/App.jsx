import React from "react";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import ChartBox from "./components/ChartBox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import { useState } from "react";
import {assets} from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import Login from "./pages/Login";
import { useAppContext } from "./context/AppContext";

const App = () => {

  const {user} = useAppContext()
   
  const [isMenuOpen,setIsMenuOpen] = useState(false)

  const {pathname} =useLocation()

  if(pathname === '/loading') return <Loading />
  

  return (
    <>
    {!isMenuOpen && <img src={assets.menu_icon} className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert" onClick={() => setIsMenuOpen(true)} />}
    {user ? (
      
      <div className="bg-white text-black dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#232222] dark:text-white">
        <div className="flex h-screen w-screen">
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Routes>
            <Route path="/" element={<ChartBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>

    ) : (
      <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
        <Login />
      </div>
    )}
      
    </>
  );
};

export default App;
