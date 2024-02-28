import clsx from "clsx";
import { ChangeEventHandler } from "react";

type InputProps = {
  label: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  placeholder?: string | undefined,
  id?: string,
  classname?: string,
}


const TextInput: React.FC<InputProps> = ({ label, value, onChange, placeholder, id = '#input', classname, ...attributes }: InputProps) => {
  return <div className={clsx("flex flex-col gap-1", classname)}>
    <label htmlFor={id} className="">{label}</label>
    <input {...attributes} className="p-1 border rounded bg-c-black" id={id} type="text" placeholder={placeholder} value={value} onChange={onChange} />
  </div>
}



export default TextInput;