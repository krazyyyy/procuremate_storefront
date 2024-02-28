import { useProductActions } from "@lib/context/product-context"
import React from "react"
import OptionSelectColor from "../option-select-color"
import PrimaryButton from "@modules/common/components/primary-button"
import SizeTable from "../size-table"
import Input from "@modules/common/components/input"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

type ProductActionsProps = {
  product: PricedProduct
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  return (
    <div className="flex flex-col gap-y-2">
      {product.variants.length > 1 && (
        <div className="my-8 flex flex-col gap-y-6">
          {product.options?.map((option) => {
            if (option.title.toLowerCase() == 'color') {
              return <div key={option.id}>
                <OptionSelectColor
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            } else {
              return <SizeTable
                updateOption={updateOptions}
                current={options[option.id]}
                option={option}
                title={option.title}
                key={option.id}
                product={product} className="my-10" />
            }
          })
          }
        </div>
      )}

      <Input name="height" label='Enter Your Height (cm)' />
      <Input name="width" label='Enter Your Weight (kg)' />

      <div className="h-5"></div>
      <PrimaryButton variant={inStock ? 'primary' : "secondary"} onClick={() => addToCart()}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </PrimaryButton>
    </div>
  )
}

export default ProductActions
