'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import CartApi from '../utils/CartApi'
import { CartContext } from '../context/CartContext'
import Cart from '../components/Cart'

const NavBar = () => {
  const { cart, setCart } = useContext(CartContext)
  const { user, isLoaded } = useUser(); // Check if the user is loaded
  const [OpenCart, setOpenCart] = useState(false)
  const path = usePathname()
  const [Menu, setMenu] = useState(false)
  console.log(path)

  const getCartItems = () => {
    if (user && user.primaryEmailAddress) { // Ensure user and email are available
      CartApi.getCartProducts(user.primaryEmailAddress.emailAddress)
        .then(res => {
          res?.data?.data.forEach(citem => {
            setCart((oldCart) => [
              ...oldCart,
              {
                id: citem.id,
                product: citem?.attributes?.products?.data[0]
              }
            ])
          })
        })
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    if (isLoaded && user) {
      getCartItems(); // Call only after the user is loaded
    }
  }, [isLoaded, user])


  return (path!=="/sign-in" && path!=="/sign-up")  &&(
    <header className="bg-white shadow-md">
  <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
    <a className="block text-teal-600" href="#">
      <span className="sr-only">Home</span>
      <Image
      src={'/logo.svg'}
      alt='logo'
      width={40}
      height={40}
      />
    </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Services </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About Us </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact Us </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        
          {
            !user ? 
              <div className="sm:flex sm:gap-4">
            <a
            className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            href="/sign-in"
          >
            Login
          </a>

          <a
            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-teal-600/75 sm:block"
            href="/sign-up"
          >
            Register
          </a>
           
        </div>:   <div className="flex gap-4 items-center">
          <div className="flex items-center relative">
            <div className="relative  ">
            <ShoppingCart className="cursor-pointer" onClick={()=>{
              setOpenCart(!OpenCart)
            }}/>
            {
              OpenCart?<Cart cart={cart}/>:<></>
            }
            
            </div>
        
          <h2>({cart.length})</h2>

          </div>
          
          <UserButton/>
          
        </div>
          }
         

        <button
          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
          onClick={()=>{
            
          }}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button> 
      </div>
    </div>
  </div>
</header>
  )
}

export default NavBar