import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import bat from '../assets/bat.jpg'
import spid from '../assets/spid.jpg'
import star from '../assets/star.jpg'
import userContext from '../Context/context'

const Start = () => {
  const userId = useContext(userContext);

  return (
    <div className='flex flex-col bg-bgColor scroll-auto p-0 pb-9 md:px-20 font-bi_bold'>
      

      <div className='h-[100px]'/>
      
      <div className='flex lg:flex-row place-items-center place-content-between flex-col gap-2'>
      
      <div className='flex flex-col lg:place-items-start place-items-center'>
      <p className='font-bi_bold text-mainColor selection:text-textColor selection:bg-mainColor lg:text-6xl text-4xl'>TENTOMUSHI</p>
      

      <p className='text-textColor selection:text-bgLight text-center lg:text-start
      leading-tight selection:bg-mainColor text-1xl lg:text-2xl pt-3 font-mo mb-4'>A NFT Market Place for<br/> your personal Art</p>

{userId.uid == null?<button className='ease-in-out rounded-full font-bi_bold  text-[17px] text-bgLight bg-mainColor p-2 px-10 flex flex-row items-center'
onClick={userId.handleConnect}>
{userId.uid != null?'WALLET CONNECTED':'CONNECT WALLET'}</button> :
 <Link to="/BrowseNFT"> <button className='ease-in-out  rounded-full font-bi_bold  text-[17px]  p-2 px-10 bg-mainColor text-bgLight flex flex-row items-center gap-1'
onClick={() =>
 userId.handleConnect
//  {Toaster("hello")}
 }>
{userId.uid != null?'VIEW MARKETPLACE':'CONNECT WALLET'}</button> </Link>
}

     
      </div>

      <div className='flex flex-row overflow-clip h-[25rem] px-3'>
  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden bg-cover bg-no-repeat rounded-md mr-3">
    <img
      src={bat}
      className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
      alt="Louvre"
    />
  </div>
  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden bg-cover bg-no-repeat rounded-md r-3">
    <img
      src={spid}
      className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
      alt="Louvre"
    />
  </div>
  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden bg-cover bg-no-repeat rounded-md r-3">
    <img
      src={star}
      className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
      alt="Louvre"
    />
  </div>
</div>


      </div>

      {/* <div className='w-full mt-10 rounded-full bg-bgLight p-10'>

      <div className='flex flex-col place-content-center place-items-center w-full'>
      <p className='font-bi_bold text-textColor selection:text-bgColor selection:bg-mainColor lg:text-5xl text-center text-4xl'>VIEW MARKETPLACE</p>

      </div>
      

      </div> */}
     

      
      
    </div>
  )
}

export default Start
