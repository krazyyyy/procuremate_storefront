import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import MobileMenu from "@modules/mobile-menu/templates"
import clsx from "clsx"
import Link from "next/link"
import ArrowIcon from "@modules/common/icons/arrow"
import Image from "next/image"
import { useProduct } from "medusa-react"
import { useRouter } from "next/router"
import { ProductProvider, useProductActions } from "@lib/context/product-context"
import CountryMenu from "@modules/mobile-menu/components/country-menu"
import { handleDeleteImage, useCustomizer } from "@lib/context/customizer-context"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import useProductPrice from "@lib/hooks/use-product-price"
import { useCallback, useMemo } from "react"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { toast } from "react-toastify"
import useToggleState from "@lib/hooks/use-toggle-state"
import Spinner from "../../../common/icons/spinner"
import { useState } from "react"
import InfoIcon from "@modules/common/icons/info"
import Button from "../../../common/components/button"
import { useAccount } from "@lib/context/account-context"


const CustomizerNav = () => {
  const { query } = useRouter()
  const { toggle } = useMobileMenu()
  const { product } = useProduct(query?.id as string)
  const { current, layerChanges, layers } = useCustomizer();
  const [showTooltip, setShowTooltip] = useState(false);
  const unfinished = useMemo(() => {
    var required = layers.filter(l => !(l.customizer_area_id?.optional))
    var un = required.filter((l) => !l.selected_value && l.name !== 'hidden');
    return un.length > 0
  }, [layers])

  const additionalPrice = useMemo(() => {
    if (layerChanges.length > 0) {
      const price = layerChanges?.reduce((acc, product) => acc + Number(product.price), 0);
      return Number(price ?? 1);
    }
    return 0;
  }, [layerChanges])

  return (
    <div
      className={clsx("sticky small:h-[150px] top-0 inset-x-0 z-50 font-montserrat shadow-md group")}>
      <header
        className={clsx(
          "relative py-4 px-8 mx-auto transition-colors border-b border-transparent duration-200 bg-primary group-hover:border-gray-200 h-full",
        )}
      >
        <nav
          className={clsx(
            "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200"
          )}
        >
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
  
          </div>

          <div className="flex flex-row small:flex-col gap-3">
            <div className="small:flex ml-5 gap-2 items-center justify-end hidden">
              <CountryMenu variant="secondary" />
              {/* <Share size={28} /> */}
              <div className="mt-2.5">
                <CartDropdown />

              </div>
              <div className="pl-2 cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}>
                <InfoIcon size={24} />
              </div>
            </div>

            <div className="flex gap-2 items-center select-none h-full ">
              {showTooltip && (
                <span className="tooltip absolute text-[18px] text-xs mt-1 bg-white p-2 rounded">
                  Please ensure to apply all changes and save before adding to cart
                </span>
              )}
              <div className="mt-2.5 flex items-center small:hidden">
                <CartDropdown />
                <CountryMenu variant="primary" />
              </div>
              {product && <ProductProvider product={product}>
                <AddToCartButton finished={!unfinished} additionalPrice={additionalPrice} product={product} />
              </ProductProvider>}
            </div>
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div >
  );
}

export default CustomizerNav

export const ProductPrice = ({ product, additional_price }: { product: any, additional_price?: number, }) => {
  const { variant } = useProductActions()
  const price = useProductPrice({ id: product.id, variantId: variant?.id })
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])


  return <span className='font-bold italic'>
    <span className='uppercase'>
      {getCurrency(selectedPrice?.calculated_price)}
      {(getNumber(selectedPrice?.calculated_price!) + (additional_price ?? 0)).toFixed(2)}
    </span>
  </span>;
}

const AddToCartButton: React.FC<{
  additionalPrice: number,
  product: PricedProduct,
  finished: boolean
}> = ({ additionalPrice, product, finished }) => {
  const {
    saveOrUpdate,
    canvasData,
    current,
  } = useCustomizer();
  const { query } = useRouter()
  const { customer } = useAccount()
  const { state: loading, open: start, close: stop } = useToggleState(false);
  const { addToCart } = useProductActions()

  const handleSave = useCallback(async () => {
    console.info('handling save...')
    start();
    if (!finished) {
      console.warn('not finished')
      toast.error("Select all required items before adding to cart.")
      stop()
      return;
    }
    if (current.url) handleDeleteImage(current.url);
    if (customer) {
      var { url, design_id } = await saveOrUpdate(product.id!, customer.id);
      addToCart({
        updateLineItem: true,
        extraPrice: Math.round(additionalPrice),
        type: current.production?.title ?? 'standard',
        comment: current.production?.instructions,
        fight_date: current.fightDate,
        custom_design_id: design_id,
        url,
      })
      stop();
      return;
    }
    let customer_id: string | undefined = query.customer_id as any;
    var { url, design_id } = await saveOrUpdate(product.id!, customer_id);
    if (!canvasData) { stop(); return; }
    addToCart({
      updateLineItem: true,
      extraPrice: Math.round(additionalPrice),
      type: current.production?.title ?? 'standard',
      comment: current.production?.instructions,
      fight_date: current.fightDate,
      custom_design_id: design_id ?? 'fetch',
      url,
    })
    stop();
  }, [current, customer, product])

  return <>
    <Button onClick={handleSave} className="rounded-full small:hidden w-full whitespace-nowrap">Add To Cart</Button>

    <button
      onClick={handleSave}
      className="border hidden small:block small:w-80 w-full border-black rounded-lg h-14" >
      <span className="small:w-80 w-full flex items-center  text-xs small:text-[25px] leading-[30px] font-bold uppercase justify-center h-14 mt-1 ml-1 text-white bg-black rounded-lg ">
        Add to cart
        {loading ? <Spinner /> : <ArrowIcon color="white" size={40} className="pb-4 ml-3" />}
      </span>
    </button >
  </>;
}

const getNumber = (text: string): number => {
  text = text?.replaceAll(',', '')
  var result = text?.match(/\d+(\.\d{1,8})?/g);
  return Number(result?.at(0) ?? 0)
}
const getCurrency = (text?: string) => {
  text = text?.replaceAll(',', '')
  var result = text?.match(/\d+(\.\d{1,8})?/g);
  return text?.replace(result?.at(0) ?? '', '');
}