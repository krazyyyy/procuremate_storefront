import LoginTemplate from "@modules/account/templates/login-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"

const Login: NextPageWithLayout = () => {
  return (
    <>
      <LoginTemplate />
    </>
  )
}

Login.getLayout = (page) => {
  return <Layout>
    <Head title="Procuremate Account Login" description="Access your Procuremate account to manage orders, track shipments, and update your fight gear preferences." />
    {page}</Layout>
}

export default Login
