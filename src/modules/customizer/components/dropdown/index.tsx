import clsx from "clsx";
import React from "react";

interface DropdownItem {
  title: string,
  value: string | number,
}

type DropdownProps = {
  items: DropdownItem[],
  onChange?: (value: string) => void,
  value: any,
  label: string,
}

const Dropdown = ({ items, onChange, value, label, ...attributes }: DropdownProps) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(event.target.value);
  };
  return <div className={clsx("flex outline-none  flex-col gap-1 mt-2")}>
    <span className="block">{label}</span>
    <select value={value} {...attributes} onChange={handleSelectChange} className="p-3 rounded border active:outline-none focus:outline-none">
      {items?.map((i, index) => {
        return <option value={i.value} key={index}>{i.title}</option>;
      })}
    </select>
  </div>
}


export default Dropdown;