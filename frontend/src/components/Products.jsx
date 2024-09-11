'use client'
import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import ProductApi from '../utils/ProductApi'

const Products = () => {


  const [Products, setProducts] = useState([])

  const getLatestProducts_ = () => {
    ProductApi.getLatestProducts().then(res=>{
      setProducts(res.data.data)
    })
  }

  useEffect(()=>{
    getLatestProducts_();
  },[])

  return (
    
    <div className=" flex-col w-full mx-auto flex max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 pb-10 ">
        <div className="flex justify-between w-full items-center">
            <h1 className="font-bold text-2xl line-clamp-1">Brand New </h1>
            <h1 className="text-primary flex cursor-pointer">View All Collection <ArrowRight /></h1>
        </div>
        <div className="grid grid-cols-1 min-[530px]:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 lg:grid-cols-4 ">
          {
            Products.map((item,index)=>{
              return <ProductCard item={item} key={index}/>
            })  
          }
          

     
        </div>
    </div>
  )
}

export default Products