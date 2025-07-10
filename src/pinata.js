// // const fs = require('fs');
// const pinataSDK = require('@pinata/sdk');
// const pinata = new pinataSDK({pinataJWTKey:jwt});

import { jwt } from "./constants/constants";

async function UploadFile(file,name,desc,price){
  try{
    const formData = new FormData();
    formData.append("file",file);
    const pinataMetadata = JSON.stringify({
      name: "File name",
    });

    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
      body: formData,
    });    
    const resData = await res.json();
    console.log("Batman");
    console.log(resData.IpfsHash);
    const  a = await UploadJson(resData.IpfsHash,name,desc,price);
    return a;
  }
  catch(e){
    console.log("Superman");
    console.log(e);
    return "error";
  }
  
}

async function UploadJson(hash,name,desc,price){
    try{
        const data = JSON.stringify({
            pinataContent: {
                name: name,
                description: desc,
                image: "ipfs://" + hash,
                price:price,
                external_url: "https://pinata.cloud"
              },
              pinataMetadata: {
                name: "metadata.json"
              }
        })
        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: data,
          });
          const resData = await res.json();
          console.log(resData);
          return resData.IpfsHash;
    }
    catch(e){
        console.log("Superman");
        console.log(e);
        return "error";
    }
}

export {UploadFile};