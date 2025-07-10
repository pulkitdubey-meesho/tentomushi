import React, { useEffect, useState } from 'react'
import NFTGrid from './NFTGrid'
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../constants/constants';
import axios from 'axios';
import OneLoaders from '../Usefull/OneLoaders';
import { ImWarning } from 'react-icons/im';
import { MdNotificationsPaused } from 'react-icons/md';


const AllNFT = () => {

  
    const [all,setAll] = useState(true);

    const [allNFT,setAllNFT] = useState(null);
    const [myNFT,setMyNFT] = useState(null); 
    const [mynot,setmynot] = useState(false);
    const [allnot,setallnot] = useState(false);
    useEffect(() => {
      getAllNFTs();
    },[]);

    async function getAllNFTs() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(contractAddress,abi,signer);

      let transaction = await contract.getAllNFTs();
      console.log(transaction);

      const items = await Promise.all(transaction.map(async i => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("Token URI",tokenURI);
        var a = tokenURI.split("/");
        const hash = 'https://ipfs.io/ipfs/' + a[a.length-1];
        let meta = await axios.get(hash);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(),'ether');
        
        let item = {
          price,
          sp:meta.price,
          tokenId: i.tokenId.toNumber(),
          seller:i.seller,
          owner:i.owner,
          image:meta.image,
          name:meta.name,
          description: meta.description,
        }
        return item;
      }));
      if(items.length == 0 || items == null){
        setallnot(true);
        console.log("NOT FOUND");
      }else{
      let l = items;
      setAllNFT(l);
      }
    }

    async function getMyNFTs() {
      if(myNFT == null){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(contractAddress,abi,signer);

      let transaction = await contract.getMyNFTs();

      const items = await Promise.all(transaction.map(async i => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        
        var a = tokenURI.split("/");
        const hash = 'https://ipfs.io/ipfs/' + a[a.length-1];
        let meta = await axios.get(hash);
        meta = meta.data;
        // console.log(meta);

        let price = ethers.utils.formatUnits(i.price.toString(),'ether');
        
        let item = {
          price:price,
          sp:meta.price,
          tokenId: i.tokenId.toNumber(),
          seller:i.seller,
          owner:i.owner,
          image:meta.image,
          name:meta.name,
          description: meta.description,
        }
        console.log(item);
        return item;
      }));
      
      // let l = items;
      // setMyNFT(l);
      console.log("my nfts are " + items);
      if(items.length == 0){
        setmynot(true);
      }
      else{
      setMyNFT(items);
      }
    }
    }
    


    return (
        <div className='flex flex-col bg-bgColor scroll-auto p-0 place-items-stretch md:px-20 font-bi_bold'>
            <div className='mt-10 mx-3 mb-5'>
                

{/* <div class="inline-flex rounded-md shadow-sm mb-4" role="group">
<Link></Link>
  <button type="button"  class="px-4 py-2 text-sm font-medium text-mainColor bg-black border border-mainColor rounded-s-lg hover:bg-bgLight hover:text-mainColor focus:ring-2 focus:ring-mainColor font-mo focus:bg-mainColor focus:text-bgColor"
  onClick={()=>setAll(true)}>
    All NFTS
  </button>

  <button type="button" class="px-4 py-2 text-sm font-medium text-mainColor bg-black border border-mainColor rounded-e-lg hover:bg-bgLight hover:text-mainColor focus:ring-2 focus:ring-mainColor font-mo focus:bg-mainColor focus:text-bgColor"
  onClick={()=>setAll(false)}
  >
    My NFTS
  </button>
</div> */}

<div class="inline-flex rounded-md shadow-sm mb-4" role="group">
  <button className={all?'bg-mainColor text-bgColor rounded-l-lg p-2':'bg-bgLight text-mainColor border-2 border-mainColor rounded-l-lg p-2'} onClick={()=>{setAll(true)}}>All NFT</button>
  <button className={!all?'bg-mainColor text-bgColor rounded-r-lg p-2':'bg-bgLight text-mainColor border-2 border-mainColor rounded-r-lg p-2'} 
  onClick={()=>{
    setAll(false);
    getMyNFTs();
    }}>My NFT</button>
  </div>



               {all?allNFT != null
               ?<NFTGrid all={true} allNFT={allNFT}/>:
               allnot?<NotFound msg="There are no NFT Listed"/>:
               <OneLoaders msg="NFTs are loading"/>
               :(myNFT != null)?<NFTGrid all={false} allNFT={myNFT}/>:
               mynot?<NotFound msg="You dont have NFT's"/>
               :<OneLoaders msg="NFTs are loading"/>
               }
            </div> 
        </div>
        // <div className='flex flex-col bg-bgColor scroll-auto p-0 place-items-center font-bi_bold'>
        //     <div className='mt-10 mx-3'>
        //         <NFTGrid/>
        //     </div>
        // </div>
    )
}

function NotFound(props){
  return (
    <div class="fixed z-11 ">
      <div class="flex flex-col p-4 mr-10">
       
        <div class="rounded-lg bg-transparent text-left shadow-xl mt-20">
        <div class="flex md:flex-row sm:flex-col  p-3 items-center gap-2">
        <ImWarning className='text-mainColor' size='3rem'/>       
        <p className='text-textColor text-5xl font-bi_bold'>{props.msg}</p>
        
              </div> 
        
        </div>
      
      </div>
    
  </div>
  );
}

export default AllNFT
