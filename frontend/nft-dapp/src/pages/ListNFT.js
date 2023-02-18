import React, { useEffect, useState } from "react";
import "./list.css";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";
import abi from '../Helperartifacts/artifacts/contracts/NFTmarketplace.sol/NFTmarketplace.json'
function ListNFT() {
    useEffect(()=>{
        const connect = async()=>{
            if(window.ethereum){
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
              
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
                }
            else{
                alert("Please install methamask")
            }
        }
        connect()
    },[])
    const[formdata,setFormdata] = useState({name:'',description:'',price:''});
    const[files,setFile] = useState([])
    const[filemap,setFilemap] = useState({default:"none"}); 
    const[Filename,setFilename] = useState('')
    const[token,setToken] = useState('YOUR WEB3 API')
    const StoreOnBlockChain = async(metadataurl)=>{
        console.log(metadataurl)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contractaddress = '0x89374602682204395d34e3c524b641847aF00DC5'
        const contract = new ethers.Contract(contractaddress,abi.abi,signer);
        const price_con = ethers.utils.parseUnits(formdata.price,'ether')
        const transaction = await contract.Createtoken(metadataurl,price_con)
        await transaction.wait();
        alert("NFT UPLOADED")

    }
    const handleClick = async(e) =>{
        e.preventDefault()
        const {name,description,price} = formdata
        const client = new Web3Storage({token})
        const getcid = await client.put(files,{})
        
       const imgurl = `https://${getcid}.ipfs.dweb.link/${Filename}`
      const  nft = {
        name,
        description,
        price,
        imageurl : imgurl
      }
      const jsonString = JSON.stringify(nft);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const createnewfilename = Filename.replaceAll(' ', '')
      console.log(createnewfilename)
      const metadatafiles = [
        new File([blob],`Metadata.json`)
    ]
    const cid  = await client.put(metadatafiles,{})
    const metadataurl= `https://${cid}.ipfs.dweb.link/Metadata.json`
        StoreOnBlockChain(metadataurl)
    }
   
  return (
    <div>
      <div className='flex flex-col place-items-center mt-10" id="nftForm"'>
        <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <h3 className="text-center font-bold text-black-500 mb-8">
            List Your NFT
          </h3>
          <div className="mb-4">
            <label
              className="block text-black-500 text-sm font-bold mb-2"
              htmlFor="name"
            >
              NFT NAME
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Alien #0000"
              value={formdata.name}
              onChange={e =>{
                    setFormdata({...formdata,name:e.target.value})
              }}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-black-500 text-sm font-bold mb-2"
              htmlFor="description"
            >
              NFT Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              cols="40"
              rows="5"
              id="description"
              type="text"
              placeholder="Alien Infinity Collection"
              value={formdata.description}
              onChange={e => {setFormdata({...formdata,description:e.target.value})
              
            }}
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              className="block text-black-500 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price (in ETH)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Min 0.01 ETH"
              step="0.01"
              value={formdata.price}
              onChange={e =>{
                setFormdata({...formdata,price:e.target.value})
                
              }}
            />
          </div>
          <div>
            <label
              className="block text-black-500 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input type={"file"} name='fileList' onChange={e =>{
                setFile(e.target.files)
                setFilename(e.target.files[0].name)
            }}></input>
          </div>
          <br></br>
          <button className="font-bold mt-10 w-full bg-blue-500 text-white rounded p-2 shadow-lg" onClick={handleClick}>
            List NFT
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListNFT;
/*
     <form className='flex h-screen flex-col justify-center items-center modify'>
            <label for='nft'>NAME YOUR NFT</label>
            <span>
                
            </span>
          
            <span>NAME YOUR NFT</span>
            <input type='trext' placeholder='About Your NFT'/>
            <span>NAME YOUR NFT</span>
            <input type='number' placeholder='price in ETH'/>
            <input type='file' />

        </form>
*/
