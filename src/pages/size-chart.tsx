import Head from "@modules/common/components/head"
import SizeChart from "@modules/home/components/size-chart"
import Layout from "@modules/layout/templates"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import Medusa from '@lib/services/api'
import { ProductCategory } from "@medusajs/medusa"
import SkeletonSizeChart from "../modules/skeletons/components/skeleton-size-chart"


export type SizeGuideValue = {
  id: string
  type: string
  column_one: string
  column_two: string
  column_three: string
  column_four: string
}

export type SizeGuide = {
  id: string
  type: string
  category_id: ProductCategory
  column_one: string
  column_two: string
  column_three: string
  column_four: string
  values?: SizeGuideValue[]
}


export type SectionState = {
  section: string
  tabTitle: string
}

export type Tab = {
  title: string,
  items: SizeGuide[]
}

export type FindType = {
  tab?: Tab,
  index?: number
}



const fetchSizeColumn = async (key: string): Promise<SizeGuideValue[]> => {
  const { data: response } = await Medusa.sizeGuide.retrieveSizeGuide(key)
  const { size_value: data } = response;
  const { size_value } = data;
  if (size_value) return size_value
  return [];
}

export const fetchAllSizes = async (): Promise<SizeGuide[]> => {
  const { data: response } = await Medusa.sizeGuide.list()
  const { size_guide: data } = response;
  var size_guides: SizeGuide[] = data.size_guide;
  let promises = [];
  for (var guide of size_guides) {
    promises.push(fetchSizeColumn(guide.id))
  }

  var responses = await Promise.all(promises);

  for (var index in responses) {
    var res = responses[index];
    var guide = size_guides[index];
    size_guides[index].values = res;
    size_guides[index].category_id
  }

  if (size_guides) return size_guides;
  return [];
}


const Home: NextPageWithLayout = () => {
  const { data: sizes, isLoading: loading, isError, failureReason } = useQuery([`get_size_guide`],
    () => fetchAllSizes(),
    {
      keepPreviousData: false,
    }
  )
  if (loading) {
    return <div className="p-10">
      <SkeletonSizeChart />
    </div>
  }
  if (isError) {
    return <div>
      Error
    </div>
  }


  return (
    <>
      <SizeChart sizes={(sizes ?? []) as SizeGuide[]} />
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>
    <Head
      title="Procuremate Size Chart | Find Your Perfect Fit"
      description="Ensure the perfect fit for your fight gear with Procuremate's comprehensive size chart. Improve your performance with gear that fits you perfectly."
      canonical={"https://www.fiercefightgear.com/size-chart"}
    />
    {page}
  </Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery([`get_size_guide`], () => fetchAllSizes())
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      notFound: false,
    }
  }
}


export default Home



