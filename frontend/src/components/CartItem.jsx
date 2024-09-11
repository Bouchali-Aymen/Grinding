import React, { useContext } from 'react'
import Image from 'next/image'
import { CartContext } from '../context/CartContext'
import CartApi from '../utils/CartApi'
import { useUser } from '@clerk/nextjs'

const CartItem = ({item}) => {


  const { cart, setCart } = useContext(CartContext)
  const {user} = useUser()

  const removeItemFromCart = (id) => CartApi.removeFromCart(id).then(res=>{
    console.log(res.data)
    if (res) setCart((oldCart)=>oldCart.filter(
      item=>item.id!=res.data?.data?.id
    )
  )
  
   
  })

  return (
    <li className="flex items-center gap-4">
    <img
      src={item?.product?.attributes?.image?.data?.attributes?.url}
      alt=""
      className="size-16 rounded object-cover"
    />

    <div>
      <h3 className="text-sm text-gray-900">{item?.product?.attributes?.title}</h3>

      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
        <div>
          <dt className="inline">Category:</dt>
          <dd className="inline">{item?.product?.attributes?.category}</dd>
        </div>
      </dl>
    </div>

    <div className="flex flex-1 items-center justify-end gap-2">
      <h1>{item?.product?.attributes?.price}</h1>

      <button className="text-gray-600 transition hover:text-red-600">
        <span className="sr-only">Remove item</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
          onClick={()=>removeItemFromCart(item?.id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  </li>
  )
}

export default CartItem