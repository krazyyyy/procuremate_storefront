import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Image from "next/image"
import { useRouter } from "next/router"
import { ReactElement, useRef, useState } from "react"
import { NextPageWithLayout } from "types/global"
import PrimaryButton from "@modules/common/components/primary-button"
import { AnimationProps, motion, useInView } from 'framer-motion'
import Hero from "../modules/home/components/hero"
import { useProductsFilter } from "../lib/context/filter-context"
import dynamic from "next/dynamic"
import Spinner from "../modules/common/icons/spinner"
import { ProductCollection } from "@medusajs/medusa"
import { GetServerSideProps } from "next"
import { fetchAllCollections } from "@modules/products/components/our-products"

const TheGallery = dynamic(() => import("@modules/products/components/the-gallery"), { loading: () => <Spinner /> })
const OurProductsRow = dynamic(() => import("@modules/products/components/our-products"), { loading: () => <Spinner /> })
const ShopCategorySection = dynamic(() => import("@modules/products/components/shop-products"), { loading: () => <Spinner /> })
const ChooseDesign = dynamic(() => import("@modules/products/components/choose-design"), { loading: () => <Spinner /> })

const LiveChatWidget = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.__lc = window.__lc || {};
        window.__lc.license = 10186117;
        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
      `,
    }}
  ></script>
);


const HomePage: NextPageWithLayout & any = ({ collections }: { collections: ProductCollection[] }) => {
  const customRef = useRef(null);
  const [col, setCol] = useState<ProductCollection | undefined>();

  return (
    <>
      <Head
        title={"Sneaker Shop for Sneaker, Footwear & More - Procuremate"}
        description={"Welcome to Procuremate – Your ultimate Sneaker Shop offering Sneaker, Shoea, and  and more."}
      />
      {/* <div className="py-12"></div> */}
      <Hero />
      <CustomizableSection ref={customRef} />
      <OurProductsRow collection={col} collections={collections} setCollection={setCol} />
      <ShopCategorySection collection={col} />
      <ChooseDesign />
      <div id="gallery" className="my-10"></div>
      <TheGallery />
    </>
  )
}

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async () => {
  const collections = await fetchAllCollections()
  return {
    props: {
      collections: collections.reverse(),
    }
  }
}


function CustomizableSection() {
  const ref = useRef<any>();
  const { collections } = useProductsFilter()
  const inview = useInView(ref)
  const router = useRouter()

  const fromRight = (): AnimationProps => {
    return {
      initial: { opacity: 0, x: 120 },
      animate: { opacity: inview ? 1 : 0, x: inview ? 0 : 120 },
      transition: {
        type: "spring",
        stiffness: 150,
        delay: 0.1,
      },

    }
  }
  const fromLeft = (): AnimationProps => {
    return {
      initial: { opacity: 0, x: -120 },
      animate: { opacity: inview ? 1 : 0, x: inview ? 0 : -120 },
      transition: {
        type: "spring",
        delay: 0.1,
        stiffness: 150,
      }
    }
  }
  const buttonAnimate = {
    initial: { scale: 0, rotate: 320 },
    animate: { rotate: inview ? 360 : 320, scale: inview ? 1 : 0 },
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }


  return <div id="custom-products" ref={ref} className="flex-col content-container py-20  font-montserrat flex items-center justify-center">
    <p className="text-4xl small:text-[130px] text-center tracking-[-0.05em] slashed-zero small:leading-[106.47px]">
      <motion.span  {...fromRight()} viewport={{ once: true }} className="font-semibold block ">GET YOUR ITEMS  </motion.span>
      <motion.span {...fromLeft()} viewport={{ once: true }} className="font-black block tracking-normal italic">ONE STOP SHOP!</motion.span>
    </p>
    <motion.span {...fromRight()} className="small:text-3xl font-bold my-5">
      with our PROCUREMATE.
    </motion.span>

    <div className="w-full h-80 small:h-full small:aspect-[16/7.6] group rounded-2xl relative">
      <Image objectFit="contain" src="/images/image-1.png" alt="customizer" layout="fill" className="" />
      <div className="absolute bg-black group-hover:bg-opacity-40 rounded-2xl bg-opacity-60 w-full h-full" />
      <div className="sm:max-w-xl max-w-xs mx-auto my-auto h-full flex items-center justify-center mt-5 min-w-[320px]">
      </div>
    </div>
  </div>;
}
