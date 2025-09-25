import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from 'react-markdown';



axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {

  const [input , setInput] = useState('');
   const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
  
    const { getToken } = useAuth();
        
          const onSubmithandler = async (e) => {
            e.preventDefault();
            try {
              setLoading(true);

                const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post(
        "/api/ai/resume-review",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      } 
            } catch (error) {
              toast.error(error.message);
            }
            setLoading(false)
          }
        
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4'>
      {/* Left side */}
      <form onSubmit={onSubmithandler} className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#84e3e6]'/>
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Resume</p>

        <input onChange={(e)=> setInput(e.target.files[0])} type='file' accept='application/pdf' className='w-full mt-2 p-2 px-3 border
         border-gray-300 text-gray-600 rounded-md outline-none text-sm' required/>

         <p className='text-sm text-gray-500 font-light mt-1'> Only Supports PDF </p>
       
        <button disabled={loading} className='mt-6 w-full bg-gradient-to-r from-[#84e3e6] to-[#009BB3] text-white px-4 py-2 
        rounded-lg cursor-pointer flex items-center justify-center text-sm' type='submit'>
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
          <FileText className='w-5'/>
          )}
           Review Resume
        </button>
      </form>
      {/* Right side */}
      <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#84e3e6]'/>
          <h1 className='text-xl font-semibold'>Analysis Result</h1>

        </div>
        {
          !content ? (
            <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col gap-3 items-center text-gray-400'>
           <FileText className='w-9 h-9 '/>
            <p>Upload a Resume and click "Review Resume" to get started</p>
          </div>

        </div>
          ) : (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
              <div className='reset-tw'>
                <Markdown>
                  {content}
                </Markdown>
              </div>

            </div>
          )
        }
        

      </div>
    </div>
  )
}

export default ReviewResume