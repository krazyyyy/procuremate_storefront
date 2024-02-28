import { ProductCategory } from "@medusajs/medusa"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { fetchCollectionCategories } from "../../pages/_app"
import { useQuery } from "@tanstack/react-query"

export type Categories = {
  readyMade: ProductCategory[]
  customEquipment: ProductCategory[]
  customFightwear: ProductCategory[]
}

interface NavbarContext {
  categories: Categories
  loading: boolean
}

const NavbarContext = createContext<NavbarContext | null>(null)

interface NavbarProviderProps {
  children?: React.ReactNode
}

export const NavbarProvider = ({ children }: NavbarProviderProps) => {
  const { data: readyMade, isLoading } = useQuery(['ready-made'], () => fetchCollectionCategories('ready-made'))
  const { data: customEquipment, isLoading: loadingCustomEquip } = useQuery(['custom-equipment'], () => fetchCollectionCategories('custom-equipment'))
  const { data: customFightwear, isLoading: loadingCustomFightwear } = useQuery(['custom-fightwear'], () => fetchCollectionCategories('custom-fightwear'))


  const [categories, setCategories] = useState<Categories>({
    readyMade: [],
    customEquipment: [],
    customFightwear: [],
  })

  useEffect(() => {
    if (readyMade && customEquipment && customFightwear) {
      setCategories({ readyMade, customEquipment, customFightwear })
    }
  }, [readyMade, customEquipment, customFightwear])

  const loading = useMemo(() => {
    return isLoading || loadingCustomEquip || loadingCustomFightwear
  }, [isLoading, loadingCustomEquip, loadingCustomFightwear])


  return (
    <NavbarContext.Provider
      value={{ categories, loading }}>
      {children}
    </NavbarContext.Provider>
  )
}

export const useNavbar = () => {
  const context = useContext(NavbarContext)
  if (context === null) {
    throw new Error("useNavbar must be used within a NavbarProvider")
  }
  return context
}
