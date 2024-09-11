import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import { useUser } from '@clerk/nextjs';
import OrderApi from '../../../utils/OrderApi'
import CartApi from '../../../utils/CartApi';

const CheckoutForm = ({amount}) => {
  const {cart,setCart} = useContext(CartContext)
  const {user} = useUser()
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter()


    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      const handleError = (error) => {
        setLoading(false)
        setErrorMessage(error.message)
      }
      // Create New Order
      createOrder();
      // Send an Email
      sendEmail()
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }
      const res = await fetch('api/create-intent', {
        method: 'POST',
        body: JSON.stringify({
          amount: amount
        })
      })
      const clientSecret = await res.json()
  
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        clientSecret,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/confirm-checkout",
        },
      });
  
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
    const createOrder = () => {
      let productIds = [];
      cart.forEach(el => {
        productIds.push(el?.product?.id)
      })
      const data = {
        data: {
          email: user.primaryEmailAddress.emailAddress,
          username: user.fullName,
          amount,
          products: productIds
        }
      }
      OrderApi.createOrder(data).then((res) => {
        if (res) {
          cart.forEach(el => {
            CartApi.removeFromCart(el?.id).then(result => {
  
            })
          })
        }
      })
    }
    const sendEmail = async () => {
      const res = await fetch('api/send-email', {
        method: 'POST',
        body: JSON.stringify({
          amount: amount,
          email: user.primaryEmailAddress.emailAddress,
          fullName: user.fullName
        })
      })
    }
  return (
    <div className="w-full flex items-center justify-center py-9">
    <form onSubmit={handleSubmit} className="w-[700px] flex flex-col gap-y-4 px-4">
      <PaymentElement />
      <button disabled={!stripe} className="w-full bg-primary py-2 text-white rounded-lg">Submit</button>
    </form>
    </div>
  )
};

export default CheckoutForm;