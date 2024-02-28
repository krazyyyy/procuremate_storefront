import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { StoreProvider } from "@lib/context/store-context"
import { Hydrate, useQuery } from "@tanstack/react-query"
import { CartProvider, MedusaProvider } from "medusa-react"
import { AppPropsWithLayout } from "types/global"
import { FavoriteProvider } from "../lib/context/favorite-context"
import "styles/globals.css"
import FilterProvider from "../lib/context/filter-context"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import TagManager from 'react-gtm-module'
import { useEffect, useState } from "react"
import Head from "next/head"
import NextNProgress from "nextjs-progressbar";
import Medusa from '@lib/services/api'
import { NextWebVitalsMetric } from "next/app"
import { Categories, NavbarProvider } from "../lib/context/navbar-context"
import { ProductCategory } from "@medusajs/medusa"

export async function fetchCollectionCategories(collectionHandle: string): Promise<ProductCategory[]> {
  const { data: response } = await Medusa.collections.listCategories(collectionHandle);
  const { collection_categories } = response
  return collection_categories as ProductCategory[];
}

function App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ dehydratedState?: unknown, }>) {
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    TagManager.initialize({
      gtmId: 'GTM-MPPBMGF'
    })
  }, [])

  return (
    <>
      <MedusaProvider
        baseUrl={MEDUSA_BACKEND_URL}
        queryClientProviderProps={{
          client: queryClient,
        }}>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showOnShallow={true}
        />
        <Hydrate state={pageProps?.dehydratedState}>
          <NavbarProvider>
            <CartDropdownProvider>
              <MobileMenuProvider>
                <CartProvider>
                  <StoreProvider>
                    {/* <CustomizerProvider> */}
                    <AccountProvider>
                      <FavoriteProvider>
                        <FilterProvider>
                          <ToastContainer
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                          />
                          {/* <main className={clsx(inter.variable, roboto_mono.variable, montserrat.variable, 'font-sans')}> */}
                          {getLayout(<Component {...pageProps} />)}
                          {/* </main> */}
                        </FilterProvider>
                      </FavoriteProvider>
                    </AccountProvider>
                    {/* </CustomizerProvider> */}
                  </StoreProvider>
                </CartProvider>
              </MobileMenuProvider>
            </CartDropdownProvider>
          </NavbarProvider>
        </Hydrate>
      </MedusaProvider >
    </>

  )
}

export default App


// App.getInitialProps = async () => {
//   const readyMade = await fetchCollectionCategories('ready-made')
//   const customEquipment = await fetchCollectionCategories('custom-equipment')
//   const customFightwear = await fetchCollectionCategories('custom-fightwear')
//   const categories: Categories = {
//     readyMade,
//     customEquipment,
//     customFightwear,
//   }
//   return { categories }
// }

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (metric.label === 'web-vital' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      event_category: 'web-vital',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // values must be integers
      event_label: metric.id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    })
  }
}
