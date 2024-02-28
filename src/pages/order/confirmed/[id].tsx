import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { NextPageWithLayout } from "types/global"
import { useCart } from "medusa-react"
import Medusa from '@lib/services/api';
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { clearDesign, loadDesign } from "@lib/util/customizer"
import { CustomizerProvider, useCustomizer } from "@lib/context/customizer-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import PromoRegisterPopup from "@modules/customizer/components/confirm-popup/promo-register"
import { useAccount } from "@lib/context/account-context"
import OrderLoader from "../../../modules/customizer/components/order-loader"

type JobCardPostReqPayload = {
  type: string,
  fight_date?: Date,
  comment?: string,
  product_id: string,
  order_id: string,
  design_data: {},
  custom_design_id?: string,
}

export const fetchOrder = async (id: string) => {
  return await medusaClient.orders.retrieve(id).then(({ order }) => order)
}

export const createJobCard = async (payload: JobCardPostReqPayload): Promise<boolean> => {
  const { data: response } = await Medusa.jobCards.create(payload);
  const { status } = response;
  if (status === 'success') return true;
  return false;
}

export const sendEmail = async (data: any) => {
  const payload = {
    email: data?.email,
    description: `Your Order Has been Placed!`,
    title: "Order Placed"
  }
  await Medusa.orderStatus.orderStatus(payload);
}


const Confirmed: NextPageWithLayout = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const { customer, } = useAccount()
  const { state, open, close } = useToggleState(false)
  const id = typeof router.query?.id === "string" ? router.query.id : ""
  const { q } = router.query;
  const { cart } = useCart()
  const { saveOrUpdate } = useCustomizer()
  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_order_confirmed", id],
    () => fetchOrder(id),
    {
      enabled: id.length > 0,
      staleTime: Infinity,
    }
  )

  useEffect(() => {
    if (isSuccess && customer) {
      setTimeout(() => {
        router.push('/account/orders')
      }, 3000)
    }
    if (isSuccess && !customer) {
      setTimeout(() => {
        open()
      }, 3000)
    }
  }, [isSuccess, data, customer])

  const enrichedItems = useEnrichedLineItems(data?.items, cart?.id)

  const saveCustomDesign = async (product_id: string, customer_id: string): Promise<string | undefined> => {
    var designData = await loadDesign(product_id, false);

    if (designData != null) {
      var { design_id } = await saveOrUpdate(product_id, customer_id, undefined, designData)
      return design_id
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      // Cancel the event to prevent the user from navigating away
      if (loading) {
        event.preventDefault();
        event.returnValue = 'Please wait your order is being processed.';
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [loading]);

  useEffect(() => {
    const createJobCards = async () => {
      var comment = ''
      try {
        comment = window.atob(q as string)
      } catch (error) {

      }
      setLoading(true);
      if (enrichedItems && enrichedItems.length > 0 && data) {
        Medusa.jobCards.createAll({ items: enrichedItems, order_id: data.id, customer_id: data.customer_id })
      }
      setLoading(false);
    }
    createJobCards();
    sendEmail(data)
  }, [data, customer, enrichedItems])

  if (isLoading) {
    return <SkeletonOrderConfirmed />
  }

  if (isError) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonOrderConfirmed />
  }

  if (isSuccess) {
    return (
      <>
        <Head
          title="Order Confirmed"
          description="You purchase was successful"
        />
        <OrderLoader isLoading={loading} />
        <PromoRegisterPopup
          visible={state && !loading}
          onCancel={close}
          onConfirm={() => {
            router.push({
              pathname: '/account/login',
              hash: 'register',
              query: { q: window.btoa(JSON.stringify({ 'coupon': 'true' })) }
            });
            close();
          }}
        />
        <OrderCompletedTemplate order={data} />
      </>
    )
  }

  return <></>
}

Confirmed.getLayout = (page: ReactElement) => {
  return <Layout>
    <CustomizerProvider>
      {page}
    </CustomizerProvider>
  </Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(["get_order_confirmed", id], () =>
    fetchOrder(id)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Confirmed
