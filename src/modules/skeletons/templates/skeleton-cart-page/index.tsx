import SkeletonCodeForm from "@modules/skeletons/components/skeleton-code-form"
import SkeletonOrderSummary from "@modules/skeletons/components/skeleton-order-summary"
import SekeletonCartProduct from "../../components/skeleton-cart-product"

const SkeletonCartPage = () => {
  return (
    <div className="content-container">
      <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-8 py-12">
        <div>
          <SekeletonCartProduct />
        </div>
        <div className="flex flex-col gap-y-8">
          <SkeletonOrderSummary />
          <SkeletonCodeForm />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCartPage
