import React from "react";
import { ethers } from "ethers";
import { Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import ListNFT from "./pages/ListNFT";
import Mycollection from "./pages/Mycollection";
function App() {
  
  return (
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/list-nft" element={<ListNFT/>}/>
    <Route path="/my-collection" element={<Mycollection/>}/>
   </Routes>
  );
}

export default App;

