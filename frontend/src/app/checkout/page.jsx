'use client'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './components/CheckoutForm'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLISHER}`);

const Checkout = () => {
  const searchParams = useSearchParams()
  let amount = searchParams.get('amount')*100

    const options = {
        mode:"payment",
        currency:"usd",
        amount:amount,
      };
  return (
    <Suspense fallback={<>Loading...</>}>
    <Elements stripe={stripePromise} options={options}>
    <CheckoutForm amount={amount}/>
  </Elements>
  </Suspense>
    )
}

export default Checkout