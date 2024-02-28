import React, { useMemo } from "react"
import { useProductActions } from "@lib/context/product-context"
import OptionSelectColor from "../option-select-color"
import PrimaryButton from "@modules/common/components/primary-button"
import SizeTable from "../size-table"
import Input from "@modules/common/components/input"
import { useStore } from "@lib/context/store-context"
import { useForm } from "react-hook-form"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

type ProductActionsProps = {
  product: PricedProduct
}
type FormValues = {
  height: string
  weight: string
}

const ReadyMadeProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock } = useProductActions()
  const { loading } = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormValues>()

  const submit = handleSubmit(async (data: FormValues) => {
    addToCart({
      ...data,
    })
  })
  const height = watch('height')
  const weight = watch('weight')

  return (
    <div className="flex flex-col gap-y-2">
      {product.variants.length > 1 && (
        <div className="my-8 flex flex-col gap-y-6">
          {product.options?.map((option) => {
            if (option.title.toLowerCase() === 'color') {
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
                height={Number(height)}
                weight={Number(weight)}
                product={product}
                className="my-10" />
            }
          })
          }
        </div>
      )}

      <Input
        type="number"
        {...register("height", {
          required: "Height is required",
        })}
        required
        errors={errors}
        autoComplete="height"
        name="height"
        label='Enter Your Height (cm)' />
      <Input
        {...register("weight", {
          required: "Weight is required",
        })}
        required
        errors={errors}
        type="number"
        name="weight"
        autoComplete="weight"
        label='Enter Your Weight (kg)' />
      <div className="h-5"></div>
      <PrimaryButton isLoading={loading} variant={inStock ? 'primary' : "secondary"} onClick={submit}>
        {loading ? 'Loading' : !inStock ? "Out of stock" : "Add to cart"}
      </PrimaryButton>
    </div>
  )
}

export default ReadyMadeProductActions
