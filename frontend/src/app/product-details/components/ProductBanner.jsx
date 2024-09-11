import React from 'react'
import Image from 'next/image'


const ProductBanner = ({product}) => {
  return (
    <div >
        <Image
        src={product?.attributes?.image?.data?.attributes?.url}
        alt="product banner"
        width={500}
        height={500}
        className="rounded-md"
        />
    </div>
  )
}

export default ProductBanner