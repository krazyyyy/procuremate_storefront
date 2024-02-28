import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"
import React, { useEffect } from "react"

type OptionSelectColorProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}

const OptionSelectColor: React.FC<OptionSelectColorProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value.trim()).filter(onlyUnique)

  useEffect(() => {
    const options = option.values.map((v) => v.value.trim()).filter(onlyUnique)
    if (!current) {
      updateOption({ [option.id]: options[0] })
    }
  }, [option, current, updateOption])

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm uppercase font-bold">Available {title}</span>
      <div className="flex gap-3 my-2 items-center flex-wrap">
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption({ [option.id]: v })}
              key={v}
              className={clsx(
                "transition-all border duration-200 hover:border-black hover:border",
                { "border-black border": v === current }
              )}
            >
              <div className="h-12 min-w-fit p-4 flex items-center justify-center  mb-1">
                <span className='font-bold text-sm'>{v}</span>
              </div>

            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelectColor
