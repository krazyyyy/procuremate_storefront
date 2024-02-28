import {
  Product as MedusaProduct,
  Customer as MedusaCustomer,
  ProductVariant,
  Region as MedusaRegion,
} from "@medusajs/medusa"

export type Variant = Omit<ProductVariant, "beforeInsert">

export interface Product extends Omit<MedusaProduct, "variants"> {
  variants: Variant[]
}

export interface Customer extends Omit<MedusaCustomer, 'password_hash'> {

}

export interface Region extends Omit<MedusaRegion, "beforeInsert"> { }

export type CalculatedVariant = ProductVariant & {
  calculated_price: number
  calculated_price_type: "sale" | "default"
  original_price: number
}
