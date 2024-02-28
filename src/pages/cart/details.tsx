import { ReactElement, useState } from "react"
import Layout from "@modules/layout/templates"
import Head from "@modules/common/components/head"
import PrimaryButton from "@modules/common/components/primary-button"
import CartItem from "@modules/cart/components/cart-item"
import { NextPageWithLayout } from "types/global"
import ArrowIcon from "@modules/common/icons/arrow"
import { linearIntroAnimation } from "@lib/util/animation-util"
import { motion } from 'framer-motion';
import SuggestedForYou from "../../modules/products/components/suggested-for-you"
// import CartMenu from "../../modules/cart/components/cart-menu/menu"
import { formatAmount, useCart, useUpdateCart } from "medusa-react"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import SkeletonCartPage from "../../modules/skeletons/templates/skeleton-cart-page"
import { medusaClient } from "@lib/config"
import { useRouter } from "next/router"
// import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import Input from "../../modules/common/components/input"
import { useForm } from "react-hook-form"
import Medusa from '@lib/services/api'
// import { LineItem } from "@medusajs/medusa"
import Link from "next/link"
import { emailRegex } from "../../lib/util/regex"
import { useAccount } from "../../lib/context/account-context"

type FormValues = {
  email: string,
}

const CartDetailsPage: NextPageWithLayout = () => {
  const { cart, setCart, updateCart } = useCart()
  const mutation = useUpdateCart(cart!.id);
  const { customer } = useAccount()
  const { push, back } = useRouter()
  const items = useEnrichedLineItems()
  const { id } = cart!
  const { mutate } = useUpdateCart(id)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({});
  const [loading, setLoading] = useState(false);

  const email = watch('email');

  const createAccountAndSaveDesign = async (mail: string): Promise<boolean> => {
    try {
      const { data: credentials } = await Medusa.customers.createWithoutPass({ email: mail })
      await medusaClient.auth.authenticate({ email: mail, password: credentials.password })
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  }

  const applyDiscount = () => {
    mutate(
      {
        discounts: [{ code: 'REGISTER10' }],
      },
      {
        onSuccess: async ({ cart }) => {
          setCart(cart)
          await medusaClient.customers.update({
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
  const getCustomerDiscount = async () => {
    const data = (await medusaClient.customers.retrieve())
    return data?.customer?.metadata?.discount
  }


  const getCustomerOrGuest = async () => {
    try {
      const data = (await medusaClient.customers.retrieve())
      return data?.customer?.has_account
    }
    catch {
      return false
    }
  }

  useEffect(() => {
    const fetchCustomerDiscount = async () => {
      const customerDiscount = await getCustomerDiscount();

      if (customerDiscount === true) {
        applyDiscount();
      }
    };

    fetchCustomerDiscount();
  }, [customer]);

  if (!cart || !cart?.id?.length) {
    return <SkeletonCartPage />
  }

  const handleAmountChange = (index: number, line_id: string, amount: number) => {
    var item = items![index];
    item.quantity = amount;
    items![index] = item;
    medusaClient.carts.lineItems.update(cart!.id, line_id, {
      quantity: item.quantity
    }).then(({ cart }) => {
      setCart(cart)
    })
  }

  const handleClear = (line_item_id: string, cart_item_id: string) => {
    setLoading(true);
    medusaClient.carts.lineItems.delete(cart_item_id, line_item_id).then(({ cart }) => {
      setCart(cart)
    })
    // if (cart)
    //   setCart({ ...cart, items: cart?.items?.filter((c) => c.id !== line_item_id) })
    setLoading(false);
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

  const submit = handleSubmit(async (data: any) => {
    setLoading(true);

    // if (!customer) {
    if (!await getCustomerOrGuest()) {
      mutation.mutate({ email: data.email })
      setCart({ ...cart, email: data.email })
    }
    // var res = await createAccountAndSaveDesign(data.email);
    setLoading(false);
    push('/checkout', undefined, { scroll: true });
  })

  const clearAll = async () => {
    for (let item of items ?? []) {
      await medusaClient.carts.lineItems.delete(cart.id, item.id)
    }
    setCart({ ...cart, items: [] });
  }

  const form = <form onSubmit={submit} >
    <Input
      label="Email"
      {...register("email", {
        required: "Email is required",
        validate: (value) => emailRegex.test(value)
      })}
      required
      errors={errors}
      autoComplete="email"
    />
    <span className="text-small-regular py-2 block">Enter your email to proceed</span>
  </form>

  return (
    <>
      <Head title="Cart Details" description="View your shopping bag" />
      <div className="bg-gray-50 font-montserrat min-h-[90vh]">
        <div className="content-container py-12">
          <div className="flex justify-between">
            <motion.h1 {...linearIntroAnimation('left', 0.04)} className="text-3xl font-bold italic small:text-[60px] block my-5 small:my-10">Cart</motion.h1>
            <ArrowIcon onClick={back} {...linearIntroAnimation('right', 0.4)} size={64} className="pb-10" />
          </div>

          <div className="flex text-sm small:text-base gap-10 flex-wrap justify-between small:flex-nowrap w-full">
            <div className="flex max-w-3xl flex-col w-full small:w-2/3 gap-10">
              <div className="flex items-center w-full justify-between">
                <span>{items?.length} items</span>
                {(items?.length ?? 0) > 0 && <button onClick={clearAll} className="underline hover:bg-gray-200 px-2">Clear All</button>}
              </div>
              {items && items.length > 0 ?
                items?.map((c, i) => {
                  return <CartItem
                    customer={customer}
                    index={i}
                    showSave
                    line_item={c}
                    key={i}
                    handleClear={() => handleClear(c.id, c.cart_id)}
                    onAmountChange={(amount, line_id) => handleAmountChange(i, line_id, amount)} />
                }) : <div className="text-black font-normal flex items-center justify-center flex-col gap-5 ">
                  <p className="text-3xl">Your cart is empty </p>
                  <Link href="/products" className="max-w-sm w-full">
                    <PrimaryButton >Shop Now</PrimaryButton>
                  </Link>
                </div>
              }
            </div>

            <motion.div  {...linearIntroAnimation('right', 0.3)} className="flex flex-col w-full small:w-1/2 small:max-w-lg gap-4">
              {!customer && form}
              <div className="flex justify-between w-full">
                <span>Subtotal</span>
                <span>{getAmount(subtotal)}</span>
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
              <div className="flex font-bold justify-between w-full">
                <span className="">Total</span>
                <span>{getAmount(total)}</span>
              </div>
              <PrimaryButton
                disabled={!customer && !email}
                isLoading={loading}
                onClick={!customer ? () => submit() : () => push('/checkout')}
                className="mt-3">
                Checkout
              </PrimaryButton>
            </motion.div>
          </div>
        </div>
        <SuggestedForYou />
      </div>
    </>

  )

}

CartDetailsPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default CartDetailsPage



