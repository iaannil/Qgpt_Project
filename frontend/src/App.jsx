import React from "react";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import ChartBox from "./components/ChartBox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import { useState } from "react";
import {assets} from './assets/assets'

const App = () => {
   
  const [isMenuOpen,setIsMenuOpen] = useState(false)

  return (
    <>
    {!isMenuOpen && <img src={assets.menu_icon} className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert" onClick={() => setIsMenuOpen(true)} />}

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
    </>
  );
};

export default App;
