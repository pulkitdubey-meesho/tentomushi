import React from 'react'
import { Link } from 'react-router-dom';
import { GetIpfsUrlFromPinata } from '../constants/constants';
import Loaders from '../Usefull/Loaders'
import OneLoaders from '../Usefull/OneLoaders'




const NFTGrid = (props) => {
    const a = [1,2,3,4,5,6,7,8,9,10];
    const i = 0;
  return (
    <div className='m-auto grid grid-cols-2 lg:grid-cols-3 gap-4 z-0'>
      
{props.all?
  props.allNFT.map(i => <NFTcard data={i}/>)
:props.allNFT.map(i => <NFTcard data={i}/>)
}
  </div>
  )
}


const NFTcard = (props) => {
  console.log("pinata is" + props);
  const imageurl = GetIpfsUrlFromPinata(props.data.image);
    return(
        

<div className="w-full max-w-sm bg-black rounded-lg shadow">
      <Link to={`/OneNFT?name=${props.data.name}&image=${imageurl}&description=${props.data.description}&price=${props.data.price}&tokeId=${props.data.tokenId}
      &owner=${props.data.owner}&seller=${props.data.seller}`} state={{ data: props }}>
        <img
          className="rounded-t-lg h-64 w-full object-cover"
          src={imageurl}
          alt={props.data.tokenId}
        />
      </Link>
      <div className="px-5 pt-2 selection:bg-mainColor selection:text-bgColor">
          <h5 className="text-xl font-semibold tracking-tight text-textColor">
            {props.data.name}
          </h5>
        <div className="flex items-center justify-between mt-1 mb-2 md:flex-row sm:flex-col">
          <span className="text-xl font-bold text-mainColor">{props.data.price} ETH</span>
          <a
            
            className="text-bgColor bg-mainColor hover:bg-bgColor hover:text-mainColor rounded-lg text-sm px-5 py-2.5"
          >
            View More
          </a>
        </div>
      </div>
    </div>


    );
}

export default NFTGrid
