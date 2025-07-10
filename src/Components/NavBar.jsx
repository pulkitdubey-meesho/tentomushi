import React, { useContext } from 'react'
import { useState } from 'react'
import userContext from '../Context/context';
import { generateFromString } from 'generate-avatar'
import { GrAddCircle } from 'react-icons/gr'
import { Link } from 'react-router-dom';


const Navbar = () => {

   const userId = useContext(userContext);

  return (
<nav class="bg-bgColor fixed w-full z-100 top-0 start-0 ">
  <div class=" flex flex-wrap items-center justify-between  p-4 lg:mx-10 my-2">
  <div className='rounded-full bg-bgLight w-14 h-14 grid place-content-center'>
            <a href="" className='font-bi_bold text-[30px]  text-textColor hover:text-mainColor'>T;</a>
            </div> 
<div className='flex flex-row items-center ease-in-out'>




{userId.uid == null?<button className='ease-in-out border-mainColor border-2 rounded-full font-bi_bold  text-[17px] text-mainColor p-3 hover:bg-mainColor hover:text-bgLight flex flex-row items-center'
onClick={userId.handleConnect}>
{userId.uid != null?'CONNECTED':'CONNECT WALLET'}</button> :
<div className='flex flex-row place-items-center'>
  <Link to='/AddNFT'>
<div className='rounded-full bg-bgLight w-10 h-10 grid place-content-center mr-5 hover:bg-mainColor hover:text-bgColor text-mainColor'>
  <GrAddCircle className='' size='1.3rem'/>
            </div> 
            </Link>
  <button className='ease-in-out hover:border-mainColor hover:border-2 border-transparent rounded-full font-bi_bold  text-[17px] hover:bg-transparent hover:text-mainColor p-3 bg-mainColor text-bgLight flex flex-row items-center gap-1'
onClick={() =>
 userId.handleConnect
//  {Toaster("hello")}
 }>
  <img className='w-7 h-7 rounded-full shrink-0' src={`data:image/svg+xml;utf8,${userId.avatarId}`}/>
{userId.uid != null?'CONNECTED':'CONNECT WALLET'}</button> 
</div>
}
</div>
  </div>
</nav>   
  );
}



export default Navbar
