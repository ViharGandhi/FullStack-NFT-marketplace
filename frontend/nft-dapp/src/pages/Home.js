import { useEffect, useState } from "react";
import React  from "react";
import { ethers } from "ethers";
import NavBar from "./Components/NavBar";
import { Account } from "./Components/NavBar";
import abi from '../Helperartifacts/artifacts/contracts/NFTmarketplace.sol/NFTmarketplace.json'
import axios from "axios";
import './home.css'
function Home() {
  const[url,setimageUrl] = useState([])
  const [data,setData] = useState([])
  useEffect(()=>{
    const displayimage = async()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const contractaddress = '0x89374602682204395d34e3c524b641847aF00DC5'
      const contract = new ethers.Contract(contractaddress,abi.abi,signer);
      const allitems = await contract.getAllnft();
      const items = await Promise.all(allitems.map(async i =>{
          const tokenuri = await contract.tokenURI(i.tokeid)
          const tokenidinnumber = i.tokeid
          const  structprice = i.price
          const owneraddress = i.seller
          try{
            const response = await axios.get(tokenuri);
            let imgurl = response.data.imageurl
            let name = response.data.name;
            let description = response.data.description
            let price = response.data.price

            displayitems(imgurl,name,description,price,tokenidinnumber,structprice,owneraddress)
          }catch(error){
            console.log(error)
          }
        
     }))
      
    }
    displayimage()
  
  },[])
  const displayitems = async (imgurl,name,description,price,tokenidnum,structprice,seller)=>{
    setData((prevUrls) => [...prevUrls,{title:name,image:imgurl,description:description,price:price,tokenid:tokenidnum,nftprice:structprice,owneraddress:seller}])
    
  }
  const handleClick = async(token,price,seller)=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const contractaddress = '0x89374602682204395d34e3c524b641847aF00DC5'
      const contract = new ethers.Contract(contractaddress,abi.abi,signer);
      const newprice = price.toString()
      console.log(address)
     try{
        if(seller===address){
          alert("You cant buy this NFT BCZZ YOU ARE THE OWNER")
        }else{
          const transaction = await contract.executesale(token,{value:newprice})
          transaction.wait();
          alert("WOHOOO You just bought this NFT")
        }
       
      
    
     }catch(error){
      alert("Please Change Wallet address or try again later")
      console.log(error)
     }

    

  }
  return (
    <div>
      <NavBar/>
      <div className="nft-container">
  {data.map((url, index) => (
    <div className="nft" key={index}>
      <h2>{url.title}</h2>
      <div className="nft1">
        <img src={url.image} alt={`Image ${index}`} height="100px" width="100px" />
      </div>
      <p>{url.description}</p>
      
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center" onClick={(e)=>{
        e.preventDefault();
        handleClick(url.tokenid,url.nftprice,url.owneraddress)
      }}>
  <span>{url.price}</span>
  <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024" alt="" height='30px' width='30px'/>
</button>

    </div>
  ))}
</div>

    </div>
  );
}

export default Home;
/*
  {data.map((url, index) => (
        <div className="nft">
        <div className="nft-container">
        <h2 key={index}>{url.title}</h2>
        <div className="nft1">
        <img key={index} src={url.image} alt={`Image ${index}`}height='100px' width='100px'/>
        </div>
        <p key={index}>{url.description}</p>
        <p key={index}><strong>{url.price + " " +"eth"}</strong></p>
        </div>
        </div>
      ))}
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{url.price}<img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024" alt="" height='10px' width='10px'/></button>
*/