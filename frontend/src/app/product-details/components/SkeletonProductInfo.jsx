import React from 'react'

const SkeletonProductInfo = () => {
  return (
    <div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 min-[1098px]:gap-0  gap-5">
        <div >

            <div className="w-[500px] h-[280.94px] bg-slate-200 animate-pulse rounded-md">

            </div>
    </div>


    <div>
        <div className="w-[200px] h-[30px] bg-slate-200 animate-pulse rounded-md mb-5"></div>
        <div className="w-[80px] h-[30px] bg-slate-200 animate-pulse rounded-md mb-5"></div>
        <div className="w-full h-[30px] bg-slate-200 animate-pulse rounded-md mb-5"></div>
        <div className="w-[200px] h-[30px] bg-slate-200 animate-pulse rounded-md mb-5"></div>
        <div className="w-[60px] h-[30px] bg-slate-200 animate-pulse rounded-md mb-5"></div>
        <div className="w-[120px] h-[30px] bg-slate-200 animate-pulse rounded-md mb-5"></div>

    </div>

    
      </div>
    </div>
  )
}

export default SkeletonProductInfo