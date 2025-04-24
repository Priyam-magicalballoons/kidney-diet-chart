import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react'

interface LoaderProps {
    isLoading : boolean;
    children : React.ReactNode
    
}

const Loader = ({children,isLoading}:
    LoaderProps
) => {

    useEffect(()=>{
        document.addEventListener('keydown',(e)=>{
                if(e.keyCode == 9 && isLoading===true){
                    e.preventDefault()
                }
        })
    },[isLoading])
  return (
    <div>
        {
            isLoading ? (
                <>
                <div className='w-full h-screen flex items-center justify-center relative'>
                    <div className='opacity-50 touch-none pointer-events-none focus-within:touch-none ' onDoubleClick={(e)=>e.preventDefault()}>
                    {children}
                    </div>
                    <div className='flex flex-col absolute items-center justify-center'>
                    <Loader2 size={"60"} 
                    className='animate-spin absolute' />
                    <p className='relative w-full top-12  font-semibold animate-bounce'>Creating diet plan</p>
                    </div>
                </div>
                    </>
            )
            : <>
                {children}
            </>
            
        }
    </div>
  )
}

export default Loader