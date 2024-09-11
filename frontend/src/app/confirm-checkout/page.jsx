import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const ConfirmCheckout = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-5">
    <Image
    src={'/verified.gif'}
    alt='azdaz'
    width={200}
    height={200}
    />
    <h1 className="font-bold text-3xl">Payment Successfull !</h1>
    <p className="font-medium text-lg text-gray-500 mt-4">We sent an email with your order confirmation along with Digital Content</p>
    <Link className="bg-primary text-white py-2 px-2 rounded-md mt-5 font-normal" href={'/'}>Go to Home</Link>
    </div>
  )
}

export default ConfirmCheckout