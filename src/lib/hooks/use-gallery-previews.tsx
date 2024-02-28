import { useMemo } from "react"
import { Gallery, InfiniteGalleryPage, InfiniteProductPage, ProductPreviewType } from "types/global"

type UsePreviewProps<T> = {
  pages?: T[]
}

const useGalleryPreviews = <T extends InfiniteGalleryPage>({
  pages,
}: UsePreviewProps<T>) => {
  const previews: Gallery[] = useMemo(() => {
    if (!pages) {
      return []
    }

    const gallery: Gallery[] = []

    for (const page of pages) {
      gallery.push(...page.response.gallery)
    }

    return gallery
  }, [pages])

  return previews
}

export default useGalleryPreviews
