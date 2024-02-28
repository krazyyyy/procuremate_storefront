import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import GuestTemplate from "../../modules/cart/templates/guest"

const Cart: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Cart" description="View your shopping cart" />
      <GuestTemplate />
    </>
  )
}

Cart.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Cart
