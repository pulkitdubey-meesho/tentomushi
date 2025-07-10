import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProviderContext from './Context/ProviderContext'
import userContext from './Context/context'
import { Link, Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import navBars from './Components/NavBar'
import Start from './Components/Start'
import Navbar from './Components/NavBar'
import { Button } from 'flowbite-react'
import AddNFT from './Components/AddNFT'
import Loaders from './Usefull/Loaders'
import { OneDialog, Toaster, ToasterError } from './Alerts/Alerts'
import AllNFT from './Components/AllNFT'
import OneNFT from './Components/OneNFT'
import { ethers } from 'ethers'
import { ToastContainer } from 'react-toastify'
import { generateFromString } from 'generate-avatar'
import { GrAddCircle } from 'react-icons/gr'





function App() {
  const [count, setCount] = useState(0)
  const [provider,setProvider] = useState(null);
  const [showLoader,setShowLoader] = useState(false);
  const [loadermsg,setLoaderMsg] = useState("Please Wait");
  const [uid,setUid] = useState(null);
  const [avatarId,setAvatarId] = useState(null);

  // const navigate = useNavigate();

  const router = createBrowserRouter([
    // {
    //   path:"",
    //   element:<Start/>
    // },

    {
      path:"/",
      element: <Mains/>,
      children:[
        {
          path:"/",
          element:<Start/>
        },
        {
          path:"/BrowseNFT",
          element:<AllNFT/>
        },
        {
          path:"/AddNFT",
          element:<AddNFT/>
        },
        {
          path:"/OneNFT",
          element:<OneNFT/>
        },
      ]
    },
    
   
    // {
    //   path:"/AllNFT",
    //   element:<AllNFT/>
    // }
  ]);

  async function connectWallet(){
    console.log("Hello Batman");
    try{
      if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      await provider.send("wallet_switchEthereumChain",
        [{chainId: "0xa869"}]
      );
      await provider.send("eth_requestAccounts",[]);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      console.log("Metamask Connected :" + address);
      setUid(address);
      let aa = generateFromString(address);
      setAvatarId(aa);
      console.log(avatarId);

      }
      else{
        console.log("Downlaod Metamask");
        ToasterError("Please Download Metamask");
      }


    }
    catch(err){
      console.log(err);
    }  
  }

  function handleConnect(){
    if(uid == null){
      connectWallet();
    }
    else{
      console.log("You are Connected");
    }
  }


  return (
    <ProviderContext.Provider value={{provider,setProvider}}>
    <userContext.Provider value={{showLoader,setShowLoader,loadermsg,setLoaderMsg,uid,setUid,handleConnect,avatarId}}>
    {showLoader && <Loaders msg={loadermsg}/>}   
<div className='bg-bgColor h-screen z-100'>
<div className='pt-20 z-0'>
    <RouterProvider router={router}/>
    </div>
    </div>
    <ToastContainer/>
    </userContext.Provider>
    </ProviderContext.Provider>
  )
}

function Mains(){
  return(
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  );
}



export default App
