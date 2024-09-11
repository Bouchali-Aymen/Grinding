'use client'
import BreadCrumb from '../../../components/BreadCrumb';
import ProductApi from '../../../utils/ProductApi';
import React, { useEffect, useState } from 'react';
import ProductBanner from '../components/ProductBanner';
import ProductInformation from '../components/ProductInformation';
import ProductCard from '../../../components/ProductCard';
import SkeletonProductInfo from '../components/SkeletonProductInfo';
import Footer from '../../../components/Footer';

const ProductDetails = ({ params }) => {
  const [productDetails, setproductDetails] = useState(null); // Initially null to handle loading
  const [similarProducts, setsimilarProducts] = useState([])


  const getProductDetails = () => {
     ProductApi.getProductById(params.id).then(res => {
      console.log(res.data.data);
      setproductDetails(res.data.data);
      getSimilarProducts(res.data.data);
    });
  };

  const getSimilarProducts = (product) => {
     ProductApi.getSimilarProducts(product?.attributes.category).then(res=>{
      setsimilarProducts(res.data.data);
    })
  }
 
  useEffect(() => {
    getProductDetails();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // Use useEffect to log the state after it updates
  useEffect(() => {
    if (productDetails) {
      console.log("Updated Product Details:", productDetails.attributes?.image?.data?.attributes?.url); // Log only after the state updates
    }
  }, [productDetails]);

  // Conditional rendering to prevent accessing undefined data
  if (!productDetails) {
    return <div className="flex-col w-full mx-auto flex h-16 max-w-screen-xl gap-8 px-4 sm:px-6 lg:px-8 py-10">
    <BreadCrumb />

  <SkeletonProductInfo></SkeletonProductInfo>; 
  </div>// Loading state while the data is being fetched
  }

  return (
    <div>
    <div className="flex-col w-full mx-auto flex h-fit max-w-screen-xl gap-8 px-4 sm:px-6 lg:px-8 py-10">
      <BreadCrumb />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 min-[1098px]:gap-0  gap-5">

        <ProductBanner product={productDetails}/>
        <ProductInformation  product={productDetails}/>

      </div>

      <div className="flex justify-between w-full items-center mt-20">
            <h1 className="font-bold text-2xl line-clamp-1">Similar Products </h1>
        </div>
        <div className="grid grid-cols-1 min-[530px]:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 lg:grid-cols-4 py-7">
          {
            
            similarProducts.map((item,index)=>{
              return <ProductCard item={item} key={index}/>
            })  
              
          }
          

     
        </div>
        
    </div>
    </div>
  );
};

export default ProductDetails;