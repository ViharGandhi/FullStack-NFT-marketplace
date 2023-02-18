import axios from 'axios';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import abi from '../Helperartifacts/artifacts/contracts/NFTmarketplace.sol/NFTmarketplace.json'
function Mycollection() {
    const[imageurl,setimageUrl] = useState([])
    const[title,setTitle] = useState([])
    const[descrpt,setDescrpt] = useState([])
    const[price,setPrice] = useState([])
    const [data,setData] = useState([])
    useEffect(()=>{
        const connect = async()=>{
            if(window.ethereum){
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    console.log(accounts)
                } catch (error) {
                    console.log(error)
                }
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                const polygon_mumbai_chainID = '0x13881'

                    try{
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: polygon_mumbai_chainID}],
                          });
                       
                    }catch(error){
                        alert("Please add this network")
                    }
            
            }else{
                alert("Please install methamask")
            }
        }
        connect()
       const loadimage = async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contractaddress = '0x89374602682204395d34e3c524b641847aF00DC5'
        const contract = new ethers.Contract(contractaddress,abi.abi,signer);
        let transaction = await contract.getMynft();
        const items = await Promise.all(transaction.map(async i =>{
            let tokenURI = await contract.tokenURI(i.tokeid)
            try{
                const response = await axios.get(tokenURI);
                let imgurl = response.data.imageurl
                let name = response.data.name;
                let description = response.data.description
                let price = response.data.price
                

                Storeimg(imgurl,name,description,price)
            }catch(error){
                console.log(error)
            }
         }))
       
        
       }
       loadimage()
       
       
    },[])
    const Storeimg = (imgurl,name,description,price)=>{
         setData((prevUrls) => [...prevUrls,{title:name,image:imgurl,description:description,price:price}])
        // setTitle((prevtitle=>[...prevtitle,name]))
        // setDescrpt((prevdes=>[...prevdes,description]))
        // setPrice((prevprice=>[...prevprice,price]))
        

    }
  return (
    <div>
        <h1>YOUR NFT COLLECTION:</h1>
        <div className="nft-container">
  {data.map((url, index) => (
    <div className="nft" key={index}>
      <h2>{url.title}</h2>
      <div className="nft1">
        <img src={url.image} alt={`Image ${index}`} height="100px" width="100px" />
      </div>
      <p>{url.description}</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
  <span>{url.price}</span>
  <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024" alt="" height='30px' width='30px'/>
</button>
    </div>
  ))}
</div>
    
    </div>
  )
}

export default Mycollection
/*  {data.map((url, index) => (
            <div>
            <h2 key={index}>{url.title}</h2>
            <div className='nft'>
            <img key={index} src={url.image} alt={`Image ${index}`}height='100px' width='100px'/>
            </div>
            <p key={index}>{url.description}</p>
            <p key={index}><strong>{url.price}</strong></p>
            </div>
      ))}*/