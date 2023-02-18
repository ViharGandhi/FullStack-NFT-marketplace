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
/*
   <button class="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full vertical-center" onClick={handleClick}>
        ConnectWallet
      </button>
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if(chainId !== '0x5')
    {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
     })
    }  
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
       
        console.log("here");
        
        
      });
         <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white-900 md:text-5xl lg:text-6xl dark:text-white">Get back to growth with <span class="text-blue-600 dark:text-blue-500">the world's #1</span> CRM.</h1>
    <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-blac-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
      <button class="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full vertical-center" onClick={handleClick}>
        ConnectWallet
      </button>
*/
