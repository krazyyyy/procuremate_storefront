import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { IS_BROWSER } from "@lib/constants"
import { Product } from "types/medusa"
import { Favorite, useFavorites } from "@lib/context/favorite-context"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import FavoriteItem from "@modules/favorites/components/favorite-item"
import Search from "@modules/common/icons/search"
import { useAccount } from "@lib/context/account-context"


const FavoritesListPage = ({ notFound }: any) => {
  const { isFallback, replace } = useRouter()
  const { loading, } = useFavorites()

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404")
    }

    return <SkeletonProductPage />
  }

  if (isFallback || loading) {
    return <SkeletonProductPage />
  }

  return (
    <>
      <Head
        title={"Explore The Sneaker Items You Saved - Procuremate"}
        description={'Found what you like? Here is a collection of your saved boxing sports equipment and Sneaker. Get customized Footwears, Sneaker etc'}
      />
      <FavoriteProducts />
    </>
  )
}

FavoritesListPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

function FavoriteProducts() {
  const { favorites, isFavorite, removeFavorite, addFavorite } = useFavorites()
  const { customer } = useAccount();

  const toggleFavorite = async (product: Product, favorite: boolean) => {
    // if (!customer?.id) return;
    if (favorite) {
      removeFavorite(product.id, customer?.id)
    } else
      addFavorite(product.id, customer?.id)
  }

  const noFavorites = <div className="min-h-[40vh] flex flex-col items-center justify-center">
    <Search size={60} />
    <p>No Favorites Found.</p>
  </div>

  return <div className="flex-col content-container pt-10  font-montserrat flex items-center justify-center">
    <div className="flex items-center gap-3 justify-between w-full py-10">
      <h1 className="font-bold text-3xl small:text-[40px] italic">
        Check Out Your Saved Sneaker Equipment
      </h1>
    </div>

    <div className="w-full p-3 pb-10 group relative">
      {
        favorites.length === 0 ? noFavorites :
          <div className="grid grid-cols-1 sm:grid-cols-2 small:grid-cols-3 gap-14" >
            {
              favorites?.map((fav: Favorite, index) =>
                <FavoriteItem
                  onClick={() => toggleFavorite(fav.product, isFavorite(fav.product.id))}
                  key={index}
                  index={index}
                  prod={fav.product} />)
            }
          </div>
      }
    </div>
  </div>;
}
export default FavoritesListPage
