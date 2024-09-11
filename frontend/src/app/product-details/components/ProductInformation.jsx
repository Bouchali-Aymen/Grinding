'use client'
import { useUser } from '@clerk/nextjs'
import { BadgeCheck, BadgeMinus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import CartApi from '../../../utils/CartApi'
import { CartContext } from '../../../context/CartContext'

const ProductInformation = ({product}) => {

  const {user} = useUser();

  const router = useRouter()

  const { cart, setCart } = useContext(CartContext)

  const onAddToCart = () => {
    if(!user){
      router.push('/sign-in')
    }
    // add to cart 
    else{

   
    const data = {
      data:{
        username:user.fullName,
        email:user.primaryEmailAddress.emailAddress,
        products:[product?.id]
      }
    }
    CartApi.addToCart(data).then(res=>{
      console.log(res)
      setCart(
        oldCart => [
          ...oldCart,
          {
            id:res?.data?.data?.id,
            product
          }
        ]
      )
    })
    
  }
  }

  return (
    <div>
        <h1 className="text-[20px] font-bold">{product.attributes.title}</h1>
        <h1 className="text-[15px] font-bold text-gray-400">{product.attributes.category}</h1>
        <p className="text-[15-px] mt-5">{product.attributes.description[0].children[0].text}</p>
        <p className="flex mt-2 text-gray-500 text-[13px] items-center gap-x-2">{
        product.attributes.instanceDelivery?<BadgeCheck color="#65f551" />:
        <BadgeMinus color="#f20202" />
        } 
        Eligible For Instant Delivery</p>
        <h1 className="text-[30px] font-bold text-primary mt-3">$ {product.attributes.price}</h1>
        <button className="flex gap-x-2 p-2  rounded-lg text-white text-[20px] bg-primary font-light hover:bg-teal-500" onClick={()=>{onAddToCart()}}><ShoppingCart color="#ffffff" /> Add To Cart</button>

    </div>
  )
  
}

export default ProductInformation
