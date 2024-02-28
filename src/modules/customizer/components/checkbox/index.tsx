import { ChangeEventHandler } from "react";

type CheckboxProps = {
  label: string,
  checked: boolean,
  onChange: ChangeEventHandler,
}

function CheckBox({ label, checked, onChange }: CheckboxProps) {
  return <div className="flex  cursor-pointer items-center justify-start gap-2">
    <input className="scale-125 transition-all accent-c-black text-white" type="checkbox" checked={checked} onChange={onChange} />
    <span className="">{label}</span>
  </div>
}

export default CheckBox;