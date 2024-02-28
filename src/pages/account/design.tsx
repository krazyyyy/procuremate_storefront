import AccountLayout from "@modules/account/templates/account-layout"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"
import DesignTemplate from "@modules/account/templates/designs-template"

const Designs: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Your Designs" description="Your custom designs" />
      <DesignTemplate />
    </>
  )
}

Designs.getLayout = (page) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Designs
