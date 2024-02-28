import Image from "next/image"
import PrimaryButton from "../../common/components/primary-button"
import CartItem from "../components/cart-item"
import CloseIcon from "../../common/icons/close"
import Link from "next/link"
import CartMenu from "../components/cart-menu/menu"
import { formatAmount, useCart, useUpdateCart } from "medusa-react"
import { medusaClient } from "@lib/config"
import SkeletonCartPage from "../../skeletons/templates/skeleton-cart-page"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { useRouter } from "next/router"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import DiscountCode from "../../checkout/components/discount-code"
import { useAccount } from "@lib/context/account-context"


const CartTemplate = () => {
  const router = useRouter()
  const { cart, setCart, } = useCart()
  const { customer } = useAccount()
  const items = useEnrichedLineItems()
  const { id, discounts, region } = cart!
  const { mutate, isLoading } = useUpdateCart(id)

  const { isLoading: mutationLoading, mutate: removeDiscount } = useMutation(
    (payload: { cartId: string; code: string }) => {
      return medusaClient.carts.deleteDiscount(payload.cartId, payload.code)
    }
  )

  const applyDiscount = () => {
    mutate(
      {
        discounts: [{ code: 'REGISTER10' }],
      },
      {
        onSuccess: async ({ cart }) => {
          setCart(cart)
          medusaClient.customers.update({
            metadata: {
              ...customer?.metadata,
              discount: false,
            }
          })
        },
        onError: () => {
          console.error('unable to apply discount')
        },
      }
    )
  }

  useEffect(() => {
    if (customer?.metadata?.discount === true) {
      applyDiscount()
    }
  }, [customer])

  if (!cart || !cart?.id?.length) {
    return <SkeletonCartPage />
  }

  const handleAmountChange = (index: number, line_id: string, amount: number) => {
    var item = items![index];
    item.quantity = amount;
    items![index] = item;
    medusaClient.carts.lineItems.update(cart!.id, line_id, {
      quantity: item.quantity,
    }).then(({ cart }) => {
      setCart(cart)
    })
  }

  const clearAll = async () => {
    for (let item of items ?? []) {
      await medusaClient.carts.lineItems.delete(cart.id, item.id)
    }
    setCart({ ...cart, items: [] });
  }

  const {
    subtotal,
    discount_total,
    gift_card_total,
    total,
  } = cart

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }

  return (
    <div className="bg-gray-50 font-montserrat">
      <div className="content-container flex flex-wrap small:flex-nowrap relative">
        <div className='text-center w-full small:w-1/2 '>
          <Image
            src={items?.at(0)?.thumbnail ?? '/images/product-2.png'}
            alt="product"
            height={772}
            width={662}
            objectFit="contain"
            className="inset-0"
          />
        </div>

        <div className="flex h-full flex-col p-6 small:p-12 w-full small:w-1/2 gap-3">
          <div className="flex items-center w-full justify-between">
            <span className="uppercase font-bold">cart</span>
            {(items?.length ?? 0) > 0 && <button onClick={clearAll} className="underline hover:bg-gray-200 px-2">Clear All</button>}
          </div>
          <span>{items?.length} items</span>
          {items?.sort((a: any, b: any) => (a?.created_at - b?.created_at)).map((l, i) => {
            return <CartItem
              index={i}
              line_item={l}
              region={cart.region}
              key={i}
              onAmountChange={
                (amount, line_id) => handleAmountChange(i, line_id, amount)
              } />
          })}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <DiscountCode cart={cart} />
            </div>
          </div>
          {!!discount_total && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(discount_total)}</span>
            </div>
          )}
          {!!gift_card_total && (
            <div className="flex items-center justify-between">
              <span>Gift card</span>
              <span>- {getAmount(gift_card_total)}</span>
            </div>
          )}
          <div className="flex justify-between w-full">
            <span className="">Subtotal</span>
            <span>{getAmount(subtotal)}</span>
          </div>
          <div className="flex font-bold justify-between w-full">
            <span className="">Total</span>
            <span>{getAmount(total)}</span>
          </div>
          {
            customer === null ?
              <CartMenu>
                <PrimaryButton className="mt-3" >Checkout</PrimaryButton>
              </CartMenu> :
              <PrimaryButton onClick={() => {
                router.push('/checkout')
              }} className="mt-3">
                Checkout
              </PrimaryButton>
          }
          <div className="h-[100px] w-full" />
        </div>
        <div className="absolute hidden small:block bottom-0 flex-col text-white bg-black w-full small:max-w-[50%] h-14 right-0">
          <Link
            href="/cart/details"
            className="underline block relative -top-10 text-center text-black mx-auto w-full">
            See Details
          </Link>
          <div className="text-center flex items-center justify-center flex-col gap-2">
            <CloseIcon />
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTemplate

