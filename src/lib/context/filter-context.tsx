import React, { useEffect, useState } from "react"
import { medusaClient } from "../config";
import { useQuery } from "@tanstack/react-query";
import { Product, ProductCategory, ProductCollection } from "@medusajs/medusa";

interface FilterContext {
  products: Product[],
  types: any,
  selected: FilterCategory[],
  handleSelect: (item: FilterCategory) => void,
  clearAll: () => void,
  collections: ProductCollection[],
}

const fetchCollections = async () => {
  return medusaClient.collections.list({})
    .then(({ collections }) => collections)
}
export const fetchCategories = async () => {
  return medusaClient.productCategories.list({ expand: 'products' })
    .then(({ product_categories }) => product_categories)
}

export type FilterCategory = {
  handle: string | null;
  id: string | null;
  title: string | null;
}

const FilterContext = React.createContext<FilterContext | null>(null)

export const useProductsFilter = () => {
  const context = React.useContext(FilterContext);
  if (context === null) {
    throw new Error("useFavorites must be used within a FavoriteProvider")
  }
  return context
}

const IS_SERVER = typeof window === "undefined"

interface FilterProps {
  children: React.ReactNode
}

export const FilterProvider = ({ children }: FilterProps) => {

  const [selected, setSelected] = useState<FilterCategory[]>([]);
  const [filterProducts, setFilterProducts] = useState<any[]>([])
  const { data: collections } = useQuery(
    [`get_collections`],
    () => fetchCollections(),
    {
      keepPreviousData: true,
    }
  )
  const { data: product_categories } = useQuery(
    [`fetchCategories`],
    () => fetchCategories(),
    {
      keepPreviousData: true,
    }
  )
  const [types, setTypes] = useState<Record<string, FilterCategory[]>>({
    readyMade: [],
    customFightWear: [],
    customEquipment: [],
    gallery: [],
    clubKits: [],
  });


  const readymade = collections?.find((item) => item.handle.includes('ready-made'))?.id;
  const gallery_id = collections?.find((item) => item.handle.includes('gallery'))?.id;
  const customEquipment = collections?.find((item) => item.handle.includes('custom-equipment'))?.id;
  const customFightWear = collections?.find((item) => item.handle.includes('custom-fightwear'))?.id;
  const clubkits = collections?.find((item) => item.handle.includes('club-kit'))?.id;

  const mapToFilterCategory = (category: ProductCategory): FilterCategory => {
    return {
      id: category.id,
      handle: category.handle,
      title: category.name,
    }
  }

  useEffect(() => {
    if (product_categories) {
      let readyMadeProds: FilterCategory[] = [];
      let clubKitsProds: FilterCategory[] = [];
      let customEquipmentProds: FilterCategory[] = [];
      let customFightWearProds: FilterCategory[] = [];
      let galleryProds: FilterCategory[] = [];

      for (let cat of product_categories) {
        if (cat.products?.find((p) => p.collection_id === readymade)) {
          readyMadeProds.push(mapToFilterCategory(cat));
        } else if (cat.products?.find((p) => p.collection_id === clubkits)) {
          clubKitsProds.push(mapToFilterCategory(cat));
        }
        else if (cat.products?.find((p) => p.collection_id === customEquipment)) {
          customEquipmentProds.push(mapToFilterCategory(cat));
        }
        else if (cat.products?.find((p) => p.collection_id === customFightWear)) {
          customFightWearProds.push(mapToFilterCategory(cat));
        }
        else if (cat.products?.find((p) => p.collection_id === gallery_id)) {
          galleryProds.push(mapToFilterCategory(cat));
        }
      }
      setTypes({
        ...types,
        readyMade: Array.from(new Set(readyMadeProds)),
        clubKits: Array.from(new Set(clubKitsProds)),
        customEquipment: Array.from(new Set(customEquipmentProds)),
        customFightWear: Array.from(new Set(customFightWearProds)),
        gallery: Array.from(new Set(galleryProds)),
      });
    }
  }, [product_categories]);

  const handleSelect = (item: FilterCategory) => {
    setSelected((prevSelected) => {
      const isAlreadySelected = prevSelected.some((selectedItem) => selectedItem.id === item.id);
      if (isAlreadySelected) {
        return prevSelected.filter((selectedItem) => selectedItem.id !== item.id);
      } else {
        return [...prevSelected, item];
      }
    });
  };


  const clearAll = () => {
    setSelected([])
  }

  return <FilterContext.Provider value={{
    products: filterProducts,
    clearAll,
    collections: collections ?? [],
    handleSelect,
    selected,
    types,
  }}>
    {children}
  </FilterContext.Provider>
}
export default FilterProvider;