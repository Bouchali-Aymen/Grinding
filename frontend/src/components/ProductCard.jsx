import React from 'react'
import Image from 'next/image'
import { List } from 'lucide-react'
import Link from 'next/link'


const ProductCard = ({item}) => {


  const imageUrl = item.attributes?.image?.data?.attributes?.url;



  return (
    <Link href={`/product-details/${item.id}`} >
    
    <div className="flex  flex-col hover:p-1 hover:border hover:border-primary transition-all rounded-md bg-slate-100 hover:shadow-md cursor-pointer">
      <div className="min-w-full basis-10/12  ">
      {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.attributes.title || 'Product image'}
              width={299}
              height={200}
              className="rounded-md min-w-full"
            />
          ) : (
            <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
              {/* Placeholder for products with no image */}
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
      </div>
      <div className="w-full flex justify-between items-center py-3 px-3">
        <div className="flex flex-col">
          <h1 className="font-bold text-sm line-clamp-1">{item.attributes.title}</h1>
          <h1 className="text-xs text-gray-500 flex items-center gap-x-2"><List /> {item.attributes.category}</h1>
        </div>
        <h1 className="text-lg font-bold">{item.attributes.price}</h1>
      </div>
    </div>
    </Link>
  )
}

export default ProductCard