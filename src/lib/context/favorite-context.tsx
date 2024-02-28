import React, { useCallback, useEffect, useState } from "react"
import Medusa from '@lib/services/api'
import { Product } from "types/medusa"
import { Customer } from "@medusajs/medusa"
import useToggleState from "../hooks/use-toggle-state"
import FavoriteModal from "../../modules/common/components/favorite-modal"
import { useAccount } from "./account-context"
export interface Favorite {
  product: Product,
  customer: Customer,
  id: string,
}

interface FavoriteContext {
  favorites: Favorite[],
  isFavorite: (product_id?: string) => boolean,
  addFavorite: (product: string, customer_id?: string) => Promise<boolean>,
  removeFavorite: (product: string, customer_id?: string) => Promise<boolean>,
  loading: boolean,
}

const fetchFavorites = async (customer_id: string) => {
  try {
    return await Medusa.favorites
      .list(customer_id)
      .then(({ data }) => data.favorites)
  } catch (error) {
    return [];
  }
}

const FavoriteContext = React.createContext<FavoriteContext | null>(null)

export const useFavorites = () => {
  const context = React.useContext(FavoriteContext)
  if (context === null) {
    throw new Error("useFavorites must be used within a FavoriteProvider")
  }
  return context
}

interface FavoriteProps {
  children: React.ReactNode
}

const IS_SERVER = typeof window === "undefined"

export const FavoriteProvider = ({ children }: FavoriteProps) => {
  const { customer } = useAccount();
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const { state: loading, open: start, close: stop } = useToggleState(false)
  const { state, close, open } = useToggleState()

  const getFavorites = useCallback(async () => {
    if (customer?.id) {
      start();
      const favs = await fetchFavorites(customer.id)
      setFavorites(favs ?? [])
      stop();
    }
  }, [customer?.id])

  useEffect(() => {
    if (!IS_SERVER) {
      getFavorites()
    }
  }, [customer?.id, getFavorites])

  const isFavorite = (product_id?: string): boolean => {
    var res = favorites.find((fav) => fav.product.id === product_id);
    if (res) return true;
    return false;
  }

  const addFavorite = async (product_id: string, customer_id?: string): Promise<boolean> => {
    if (!customer_id) {
      open();
      return false
    };
    if (state) close();
    start();
    var res = await Medusa.favorites.add(product_id, customer_id);
    await getFavorites()
    stop();
    return true;
  }

  const removeFavorite = async (product_id: string, customer_id?: string): Promise<boolean> => {
    if (!customer_id) {
      open()
      return false
    }
    if (state) close();
    var favorite = favorites.find((fav) => fav.product.id === product_id && fav.customer.id == customer_id);
    if (favorite) {
      start();
      await Medusa.favorites.remove(favorite?.id)
      setFavorites(favorites.filter((fav) => fav.product.id !== product_id))
      await fetchFavorites(customer_id)
      stop();
    }
    return false;
  }

  return (
    <FavoriteContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, loading }}>
      <FavoriteModal onCancel={close} onConfirm={close} visible={state} />
      {children}
    </FavoriteContext.Provider>
  )
}
