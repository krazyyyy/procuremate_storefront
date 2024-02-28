import CheckoutTemplate from "@modules/checkout/templates"
import Head from "@modules/common/components/head"
import Layout from "../modules/layout/templates"

const Checkout = () => {
  return (
    <>
      <Head title="Checkout" />
      <CheckoutTemplate />
    </>
  )
}

Checkout.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default Checkout
