import { useProductActions } from "@lib/context/product-context"
import React, { useEffect, useMemo } from "react"
import PrimaryButton from "../../../common/components/primary-button"
import SizeTable from "../size-table"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

type ProductActionsProps = {
  product: PricedProduct
}

const ClubKitProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } = useProductActions()

  useEffect(() => {
    if (product && !variant && product.options?.at(0) && product.variants.length > 0) {
      updateOptions({ [product.options.at(0)?.id ?? 'id']: product.variants?.at(0)?.options?.at(0)?.value ?? '' })
    }
  }, [product, variant])

  return (
    <div className="flex flex-col gap-y-2">
      {variant && (
        <div className="my-8 flex flex-col gap-y-6">
          {product.options?.map((option) => {
            if (option.title === 'Size') {
              return <SizeTable amount updateOption={updateOptions} current={options[option.id]} option={option} title={option.title} key={option.id} product={product} className="my-10" />
            } else {
              return <div key={option.id}></div>
            }
          })
          }
        </div>
      )}

      <PrimaryButton variant={inStock ? 'primary' : "secondary"} onClick={() => addToCart()}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </PrimaryButton>
    </div>
  )
}

export default ClubKitProductActions
