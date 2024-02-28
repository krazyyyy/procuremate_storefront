import { PricedProduct, PricedVariant } from "@medusajs/medusa/dist/types/pricing"

type LineItemOptionsWithProductProps = { variant: PricedVariant, product: PricedProduct }

const LineItemOptionsWithProduct = ({ variant, product }: LineItemOptionsWithProductProps) => {
  return (
    <div>
      {variant.options?.map((option) => {
        const optionName =
          product.options?.find((opt) => {
            return opt.id === option.option_id;
          })
            ?.title || "Option"
        return (
          <div key={option.id}>
            <span>
              {optionName}: {option.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default LineItemOptionsWithProduct
