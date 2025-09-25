import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets';
import { Gem, SparklesIcon } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItems from '../components/CreationItems';
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";



axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {

    const [creations, setCreations] = useState([]);
    const [loading , setLoading] = useState(true)

    const {getToken} = useAuth()

      const getDashboardData = async () => {
        try {
          const {data} = await axios.get('/api/user/get-user-creations', {
        headers: {Authorization : `Bearer ${await getToken()}`}
      })
      if(data.success){
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
        } catch (error) {
           toast.error(error.message)
        }
        setLoading(false)
      }

      useEffect(() => {
        getDashboardData();
      }, [])

  return (
    <div className='h-full overflow-y-scroll p-6 '>
      <div className='flex justify-start gap-4 flex-wrap'>
        {/* Total creation */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'> 
            <div className='text-slate-700'>
              <p className='text-sm'>Total Creations</p>
              <h2 className='text-lg font-semibold'>{creations.length}</h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#37cda0] text-white flex justify-center items-center  '>
              <SparklesIcon className='w-5 text-white'/>
            </div>
        </div>
        {/* Active Plan */}  
                <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'> 
            <div className='text-slate-700'>
              <p className='text-sm'>Active plan</p>
              <h2 className='text-lg font-semibold'>
                <Protect plan='premium' fallback="Free"> Premium </Protect>
                 Plan
              </h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#dcc128] to-[#FFD700] text-white flex justify-center items-center  '>
              <Gem className='w-5 text-white'/>
            </div>
        </div>

      </div>

          {
            loading ? (
                <div className='flex justify-center items-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin '></span>
    </div>
            ) : (
              <div className='space-y-4 '>
        <p className='mt-6 mb-4'>Recent Creations</p>
        {
          creations.map((item, )=> <CreationItems key={item.id} item={item}/>)
        }
      </div>
            )
          }
      
    </div>
  )
}

export default Dashboard