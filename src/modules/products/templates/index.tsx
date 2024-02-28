import { ProductProvider } from "@lib/context/product-context"
import React, { useEffect, useRef, useState } from "react"
import ProductPreviewCustom from "../components/product-preview-custom"
import { motion } from 'framer-motion'
import ReadyMadeProduct from "../components/ready-made-product"
import ClubKit from "../components/club-kit"
import CustomEquipment from "../components/custom-equipment"
import { linearIntroAnimation } from "@lib/util/animation-util"
import ArrowIcon from "@modules/common/icons/arrow"
import { ProductPrice } from "@pages/products/[handle]"
import SimilarProducts from "../components/similar-products"
import YouMayAlsoLike from "../components/you-may-also-like"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import BreadCrumb from "@modules/common/breadcrumb"


type ProductTemplateProps = {
  product: PricedProduct
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const [step, setStep] = useState(2);

  const steps = () => {
    return [
      <ReadyMadeProduct product={product} key="ready made" />,
      <ClubKit key='club kit' product={product} />,
      <CustomEquipment product={product} key='custom equipment' />,
    ]
  }

  useEffect(() => {
    if (product) {
      if (product.collection?.handle.includes('ready-made')) {
        setStep(0)
      } else if (product.collection?.handle.includes('club-kit')) {
        setStep(1);
      } else {
        setStep(2)
      }
    }
  }, [product])

  return (
    <ProductProvider product={product}>
      <div className="content-container pt-4"><BreadCrumb /></div>
      <div className='flex px-4 content-container flex-wrap-reverse md:flex-nowrap font-montserrat min-h-screen '>
        <ProductPreviewCustom product={product} />
        {<div className='w-full p-4 small:w-1/2 mx-auto max-w-xl'>
          <motion.div
            {...linearIntroAnimation('right',)}
            className='flex justify-end text-right'>
            <ArrowIcon size={40} />
          </motion.div>
          <div className='flex flex-col'>
            <motion.span
              {...linearIntroAnimation('right', 0.25)}
              className='small:text-[40px] font-bold'
            >
              <h1>
                {product?.metadata?.page_title ? (
                  product.metadata.page_title as string
                ) : (
                  product.title as string
                )}
              </h1>
            </motion.span>
            <ProductPrice product={product} />
          </div>
          {steps()[step]}
        </div>}
      </div>
      <SimilarProducts product={product} />
      <YouMayAlsoLike product={product} />
    </ProductProvider>
  )
}

export default ProductTemplate