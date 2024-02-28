import { ErrorMessage } from "@hookform/error-message"
import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"
import clsx from "clsx"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { get } from "react-hook-form"
import InfoIcon from "../../icons/info"

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  message?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, errors, touched, required, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false);
    const [showinfo, setShowInfo] = useState(false);
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const hasError = get(errors, name);

    return (
      <div>
        <div className="relative font-montserrat text-xs small:text-base-regular z-0 w-full">
          {showinfo && type !== 'textarea' && (
            <span className="absolute text-gray-800 whitespace-nowrap bg-white border-gray-100 shadow rounded bg-opacity-40 w-full max-w-fit p-4 border top-0 left-[calc(100%-5px)]">
              {props.title}
            </span>
          )}
          {type == 'textarea' ? <textarea
            name={name}
            placeholder={label}
            className={clsx(
              "pt-4 pb-2 block w-full px-4 mt-0 min-h-[250px] bg-transparent border appearance-none rounded-[5px]  focus:outline-none focus:ring-0 focus:border-gray-500 border-[#757575]",
              {
                "border-rose-500 focus:border-rose-500": hasError,
              }
            )}
          /> :
            <input
              type={inputType}
              name={name}
              placeholder=" "
              className={clsx(
                "pt-4 pb-2 block w-full px-4 mt-0 bg-transparent border appearance-none rounded-[5px]  focus:outline-none focus:ring-0 focus:border-gray-500 border-[#757575]",
                {
                  "border-rose-500 focus:border-rose-500": hasError,
                  'border-gray-200 bg-gray-100': props.disabled,
                }
              )}
              {...props}
              ref={inputRef}
            />}
          {type !== 'textarea' && <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={clsx(
              "mx-3 px-1 transition-all small:text-xl absolute duration-300 top-3 -z-1 origin-0 text-[#757575]",
              {
                "!text-rose-500": hasError,
              }
            )}
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 flex gap-2 items-center px-4 focus:outline-none transition-all duration-150 outline-none focus:text-gray-700 absolute right-0 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
              {hasError && <InfoIcon
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)} />}
            </button>
          )}
          {type !== 'password' && hasError &&
            <InfoIcon
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              className="text-gray-500 cursor-pointer focus:outline-none transition-all duration-150 focus:text-gray-700 absolute right-3 top-3" />}
        </div>
        {props.disabled && (
          <div className="pt-1 pl-2 text-green-700 text-xsmall-regular">
            <span>{props.message}</span>
          </div>

        )}
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="pt-1 pl-2 text-rose-500 text-xsmall-regular">
                  <span>{message}</span>
                </div>
              )
            }}
          />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
