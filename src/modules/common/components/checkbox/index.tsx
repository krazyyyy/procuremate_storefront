import clsx from "clsx"
import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string,
  className?: string
  reverted?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  className = 'text-base-regular',
  reverted = false,
}) => {
  return (
    <button
      className={clsx(" flex items-center gap-x-2", className)}
      role="checkbox"
      type="button"
      aria-checked={checked}
      onClick={onChange}
    >
      <div
        role="checkbox"
        aria-checked={checked}
        className={clsx(
          "border rounded  w-5 min-w-[20px] h-5 flex items-center justify-center",
          { 'border-gray-900': !reverted },
          { 'border-gray-200': reverted },
          { 'bg-black text-white': checked && !reverted },
          { 'bg-white text-black': checked && reverted }
        )}
      >
        {checked ? "✓" : null}
      </div>
      <span>{label}</span>
    </button>
  )
}

export default Checkbox
