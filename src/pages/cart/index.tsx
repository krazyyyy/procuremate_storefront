import CartTemplate from "@modules/cart/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Cart: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Cart" description="View your shopping cart" />
      <CartTemplate />
    </>
  )
}

Cart.getLayout = (page: ReactElement) => {
  return <Layout footer={false}>{page}</Layout>
}

export default Cart
