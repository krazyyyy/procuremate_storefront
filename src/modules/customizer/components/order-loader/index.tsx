import Spinner from "@modules/common/icons/spinner"

const OrderLoader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className={`fixed z-10 inset-0 flex items-center justify-center transition-all ${isLoading ? 'opacity-100' : 'opacity-0 hidden'}`}>
      <div className="absolute inset-0 bg-white opacity-50"></div>
      <div className="flex flex-col items-center justify-center gap-2 z-10">
        <Spinner size={80} />
        <span className="font-semibold uppercase">Processing...</span>
        <span className="">Your order is being processed, please do not leave the page.</span>
      </div>
    </div>
  )
}

export default OrderLoader
