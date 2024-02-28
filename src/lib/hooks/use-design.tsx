import { useQuery } from "@tanstack/react-query"
import { fetchCustomDesign } from "../services/customizer"

type useDesignProps = {
  id?: string
}


const useDesign = ({ id }: useDesignProps) => {
  const { data, isLoading, isError, refetch } = useQuery(
    [id],
    () => fetchCustomDesign(id),
    { enabled: !!id, keepPreviousData: true }
  )

  return {
    design: data,
    isLoading,
    isError,
  }
}

export default useDesign
