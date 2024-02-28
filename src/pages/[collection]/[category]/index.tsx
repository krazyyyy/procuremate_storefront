import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router"
import { medusaClient } from "@lib/config";
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page";
import CategoryTemplate from "@modules/categories/templates";
import getCategoryData from "@lib/util/map-category-data";

import React from "react";
import { fetchCollectionByHandle } from "..";

const fetchCategory = async (handle: string): Promise<any> => {
  return medusaClient.productCategories.list({ handle: handle })
    .then(({ product_categories }) => product_categories.find(((cat: any) => cat.handle === handle)))
}

function capitalizeWords(input : string) {
  return input
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const CategoryView = ({ notFound }: any) => {
  const { query, replace, } = useRouter();
  const { category } = query ?? { handle: '' };
  const { data, isLoading, isError, isSuccess } = useQuery(["fetch_category", category], () => fetchCategory(category as string));
  const { data: collection, isLoading: loading, isError: error, } = useQuery([query.collection, 'fetch_collection'], () => fetchCollectionByHandle(query.collection as string));
  const collection_name = query?.collection
  const { heading, heading_small, meta_title, meta_description, page_text } = getCategoryData(data?.name ?? "", collection_name ?? "")
  if (isLoading || loading) {
    return <SkeletonCartPage />
  }

  if (!data || isError || notFound || error) {
    replace('/404')
    return null;
  }

  if (isSuccess) {
    return (
      <>
        <CategoryTemplate collection={collection!} category={data!} category_title={heading !== "" ? heading : data?.name} />
        <TextBox heading={heading_small} category_text={page_text} />
      </>
    )
  }

}
interface TextBoxProps {
  category_text: string;
  heading?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ category_text, heading }) => {
  const paragraphs = category_text.split('</br>');

  return (
    <div className="content-container py-6">
      <div className="grid">
        <h2 className="mb-2 text-xl-semi">{heading}</h2>
        {paragraphs.map((paragraph, index) => (
          <p className="mb-2" key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};


const CategoryLayout = ({ page }: any) => {
  const { query } = useRouter();
  const collection_name = query?.collection;
  const category = String(query?.category).replaceAll("-", " ");

  const { heading, heading_small, meta_title, meta_description, page_text } = getCategoryData(String(category) ?? "", collection_name ?? "");

  return (
    <Layout>
      <Head title={meta_title !== "" ? meta_title : capitalizeWords(String(category))} description={meta_description} canonical={collection_name === 'ready-made' && query.category === 'boxing-shorts' ? 'https://www.fiercefightgear.com/custom-fightwear/boxing-shorts' : undefined} />
      {page}
    </Layout>
  );
};


CategoryView.getLayout = (page: any) => {
  return <CategoryLayout page={page} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const handle = query.category;
  const collection = query.collection;
  const queryClient = new QueryClient()
  if (!handle) {
    return {
      notFound: true,
    }
  }

  await queryClient.prefetchQuery([`fetch_category`, handle], () => fetchCategory(handle as string))
  await queryClient.prefetchQuery([collection, 'fetch_collection'], () => fetchCollectionByHandle(collection as string));

  const queryData = await queryClient.getQueryData([`fetch_category`, handle])
  if (!queryData) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      notFound: false,
    }
  }

}

export default CategoryView