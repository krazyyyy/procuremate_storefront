import Spinner from "@modules/common/icons/spinner"

const CustomizerLoader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className={`fixed font-roboto z-50 inset-0 flex items-center justify-center transition-opacity ${isLoading ? 'opacity-100 visible' : 'opacity-0 hidden'}`}>
      <div className="absolute inset-0 bg-white opacity-50"></div>
      <div className="flex flex-col items-center justify-center gap-4 z-10">
        <Spinner size={80} />
        <span className="font-semibold uppercase">Loading Design...</span>
      </div>
    </div>
  )
}

export default CustomizerLoader
