import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home"; // <-- Import Home from Pages
import Video from "./Pages/Video/Video"; // <-- Import Video from Pages
import Search from "./Pages/Search/Search"; // <-- Import Search from Pages

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryid/:videoID" element={<Video />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </div>
  );
};

export default App;
