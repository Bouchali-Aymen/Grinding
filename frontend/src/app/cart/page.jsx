'use client'
import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import CartItem from '../../components/CartItem'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {
  const router = useRouter()
    const { cart, setCart } = useContext(CartContext)
    const calculateTotalPrice = () => {
      let total_price = 0
      cart.forEach(item => {
        total_price = total_price + Number(item?.product?.attributes?.price)
      });
      return total_price
    }

return (
<section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <header className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
      </header>

      <div className="mt-8">
        <ul className="space-y-4">
            {
                cart.map((item,index)=>{
                    return <CartItem key={index} item={item}/>
                })
            }
        </ul>

        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
          <div className="w-screen max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
              <div className="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>£{calculateTotalPrice()}</dd>
              </div>
            </dl>

            <div className="flex justify-end">
              <span
                className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>

              </span>
            </div>

            <div className="flex justify-end">
              <Link
                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                href={{
                  pathname:'/checkout',
                  query:{
                    amount:`${calculateTotalPrice()}`
                  }
                }}
              >
                Checkout
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      <div className="bg-gray-10 px-4 py-3 text-gray-500 mt-11">
  <p className="text-center text-sm font-medium">
    Note: All items will be sent via email
  </p>
</div>
    </div>
  </div>
</section>

  )
}

export default Page