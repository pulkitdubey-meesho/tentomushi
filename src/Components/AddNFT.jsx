import React, { useContext, useState } from 'react'
import userContext from '../Context/context';
import { abi, contractAddress, jwt } from '../constants/constants';
import { UploadFile } from '../pinata';
import { Toaster, ToasterError } from '../Alerts/Alerts';
import { ethers } from 'ethers';

const AddNFT = () => {

    const [nftName, setnftName] = useState("");
    const [nftDesc, setnftDesc] = useState("");
    const [nftPrice, setnftPrice] = useState(0);
    const [nftFile, setnftFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const globalContext = useContext(userContext);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
  
        // Create a preview URL for the selected file
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <div className='flex flex-col bg-bgColor scroll-auto p-0 place-items-center font-bi_bold'>
<div className='mt-10 mx-3'>
<a class="block max-w-lg w-screen p-6 bg-black rounded-lg shadow ">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-mainColor font-bi_bold">Create your NFT</h5>

<form onSubmit={(e)=>{
        console.log(nftName + " " + nftDesc + " " + nftPrice + " " + nftFile);
        handleSubmit();
        e.preventDefault();
    }} >

    <div class="mb-6">
        <label for="NFT Name" class="block mb-2 text-sm font-medium text-textColor">NFT Name</label>
        <input type="text" id="NFT Name" class="bg-transparent border text-2xl border-gray-300 text-textColor rounded-lg focus:ring-mainColor focus:border-mainColor block w-full p-2.5" 
        placeholder="Enter your NFT Name" required onChange={(e) => {setnftName(e.target.value)}}/>
    </div> 

    <div class="mb-6">
        <label for="NFT Description" class="block mb-2 text-sm font-medium text-textColor">NFT Description</label>
        <textarea type="text" id="NFT Description" class="bg-transparent border text-sm border-gray-300 text-textColor  rounded-lg focus:ring-mainColor focus:border-mainColor block w-full p-2.5" 
        placeholder="Enter your NFT Description" required onChange={(e) => {setnftDesc(e.target.value)}}/>
    </div> 

    <div class="mb-6">
        <label for="Price" class="block mb-2 text-sm font-medium text-textColor">NFT Price</label>

        <input type="number" id="Price" class="bg-transparent border text-sm border-gray-300 text-textColor  rounded-lg focus:ring-mainColor focus:border-mainColor block w-full p-2.5" 
        min="0.1"
        step="0.01"
        placeholder="Must be Greater than 0.1" required onChange={(e) => {setnftPrice(e.target.value)}}/>
    </div> 


<div class="mb-6">   
<label class="block mb-2 text-sm font-medium text-textColor" for="file_input">Upload file</label>
        <input
          type="file"
          id="file_input"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-transparent focus:outline-none"
          onChange={handleFileChange}
        />
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help" onChange={handleFileChange}>SVG, PNG or JPG.</p>

        {preview && (
          <div className="text-center">
            <img src={preview} alt="File preview" className="max-w-xs max-h-64 object-contain" />
          </div>
        )}
        </div>

    <button type="submit" 
    onClick={() => {
      // UploadFile(selectedFile)
      // handleSubmit();
      
    }}
    // onClick = {() => {
    //      console.log(nftName + " " + nftDesc + " " + nftPrice + " " + nftFile);
    //     console.log("Hello");}} 
        class="text-bgColor bg-mainColor hover:bg-bgLight hover:text-mainColor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Create NFT</button>
</form>

</a>


</div>
</div>

  );

  async function handleSubmit () {
    globalContext.setShowLoader(true);
    const a = await UploadFile(selectedFile,nftName,nftDesc,nftPrice);
    console.log('the hash is ' + a);
    // globalContext.setShowLoader(false);
    if(a == "error"){
      ToasterError("Something went wrong");
    }
    else{
      listNFT("ipfs://" + a);
    }
  }

  async function listNFT(hash){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(contractAddress,abi,signer);
      const price = ethers.utils.parseUnits(nftPrice,'ether');
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      let transition = await contract.createToken(hash,price,{value:listingPrice})
      await transition.wait();

      Toaster("NFT Listed Successfully");
      globalContext.setShowLoader(false);
    }
    catch(e){
      console.log("Contract error");
      console.log(e);
    }
  }


// return <FileInputWithPreview/>
 
}

export default AddNFT




  


