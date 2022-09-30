import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { GET_MY_REVIEWS } from '../../src/graph-ql/queries/GET_MY_REVIEWS/getMyReviews';
import { GetMyReviews } from '../../src/graph-ql/queries/GET_MY_REVIEWS/__generated__/GetMyReviews';
import {useAccount} from "wagmi"
import Card from '../../components/Card';

const Content = () => {

  let user = useAccount()
  const {
    loading,
    data,
    error,
  } = useQuery<GetMyReviews>(GET_MY_REVIEWS, {
    variables: {
      reviewBy:user?.address?.toLowerCase()
    },
  });

  if(user?.address===undefined){
    return <> <h1 className='h-screen flex flex-col justify-center text-black dark:text-white text-center text-4xl'>Please connect a wallet to get all your reviews ;)</h1> 
    </>
  }

  if (loading) {
    return <div className='text-center'>
      <img src="/loading.gif" alt="Loading" className='w-12 h-12 my-32 fixed top-1/3 left-1/2'/>
    </div>  
  }

  // console.log(data)

  return (
    <>

    <div className='flex flex-wrap text-white justify-center mt-14'>
      {data?.reviews.map(e=> <Card data={e} key={e.id}></Card>)}

    </div>
    
    </>
  )
}

export default Content