import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GetIpfsUrlFromPinata, abi, contractAddress } from '../constants/constants';
import { generateFromString } from 'generate-avatar'
import { ethers } from 'ethers';
import { OneDialog, Toaster, ToasterError } from '../Alerts/Alerts';
import userContext from '../Context/context';


const OneNFT = (props) => {


    
    const loaction = useLocation();
    
    const queryParams = new URLSearchParams(loaction.search);
    const [confirm,setConfirm] = useState(false);
    const globalContext = useContext(userContext);


    async function buyNFT(id){
        setConfirm(false);
        globalContext.setShowLoader(true);
        globalContext.setLoaderMsg("Your NFT are Being Transferred to you");
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
        
                //Pull the deployed contract instance
                let contract = new ethers.Contract(contractAddress, abi, signer);
                const aa = loaction.state.data.data.sp;
                const salePrice = ethers.utils.parseUnits(aa, 'ether')
                //run the executeSale function
                console.log('price is' + salePrice);
                let transaction = await contract.executeSale(1, {value:salePrice});
                await transaction.wait();
        
                
            

            Toaster("You Have Brought this NFT");
            globalContext.setShowLoader(false);
            globalContext.setLoaderMsg("Please Wait");

        }
        catch(e){
            console.log(e);
            ToasterError("Something went wrong");
            globalContext.setShowLoader(false);
            globalContext.setLoaderMsg("Please Wait");
        }
    }
  return (
    <div className='flex flex-col bg-bgColor scroll-auto p-0 place-items-center font-bi_bold selection:bg-mainColor selection:text-bgColor'>
<div className='mt-10 mx-3 mb-3'>

<p  class="flex flex-col  bg-black  rounded-lg shadow lg:flex-row md:max-w-5xl ">
    <img class="object-cover w-full rounded-t-lg h-96 md:w-[600px] md:h-fit md:rounded-none md:rounded-s-lg" src={queryParams.get('image')} alt=""/>
    <div class="flex flex-col  p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-textColor">{queryParams.get('name')}</h5>
        <p class="mb-3 font-normal text-mainColor selection:bg-textColor selection:text-mainColor">{loaction.state.data.data.sp} ETH
           </p>
           {/* <div className='w-[100%] bg-lightText h-[0.01rem] my-2'/> */}

        <p class="mb-3 font-normal text-lightText">{queryParams.get('description')}
           </p>
           <div className='w-[100%] bg-lightText h-[0.01rem] my-2'/>
           <p class="mb-3 text-1xl font-normal text-lightText">owned by
           </p>
          
           <div className='container flex flex-row items-center flex-wrap max-w-fit'>
           <img className='w-8 h-8 rounded-full shrink-0' src={`data:image/svg+xml;utf8,${generateFromString(queryParams.get('seller'))}`}/>

    <p class="text-1xl ms-2 font-mo font-normal text-lightText truncate max-w-xs">
        {queryParams.get('seller')}
    </p>
</div>


           <div className='w-[100%] bg-lightText h-[0.01rem] my-2'/>
            {queryParams.get('seller') == globalContext.uid ? 
            <button class="text-mainColor bg-bgLight hover:bg-mainColor h-18  hover:text-black rounded-lg text-sm px-5 mt-4 py-2.5"
           onClick={() => Toaster("You Own this NFT")}>YOUR NFT</button>
           :<button class="text-bgColor bg-mainColor hover:bg-bgColor h-18  hover:text-mainColor rounded-lg text-sm px-5 mt-4 py-2.5"
           onClick={() => setConfirm(true)}>BUY NOW</button>}
            {confirm&&<OneDialog title="Ready" desc="Ready to Buy this NFT" done={() => buyNFT(queryParams.get('tokenId'))} notdone={() => {setConfirm(false)}}/>}


    </div>
</p>

</div>
</div>
  )
}

export default OneNFT
