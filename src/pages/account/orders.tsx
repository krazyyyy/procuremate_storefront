import AccountLayout from "@modules/account/templates/account-layout"
import OrdersTemplate from "@modules/account/templates/orders-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"

const Orders: NextPageWithLayout = () => {
  return (
    <>
      <OrdersTemplate />
    </>
  )
}

Orders.getLayout = (page) => {
  return (
    <Layout>
       <Head title="Procuremate Order Tracking and Management" description="Easily track and manage your customized boxing items and orders at Procuremate. Stay updated on the status of your fight gear shipments." canonical='https://www.fiercefightgear.com/account/order' />
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Orders
