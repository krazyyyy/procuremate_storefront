const SkeletonColorCategory = () => {
  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4 animate-pulse">
      <div className="text-base-regular flex items-start justify-between">
        <div>
          <div className="flex flex-col gap-y-2">
            <div className="h-5 w-[300px] bg-gray-200 rounded" />
            <div className="h-5 w-[285px] bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonColorCategory
