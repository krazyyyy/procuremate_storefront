import { Popover, Transition } from "@headlessui/react"
import clsx from "clsx"
import React from "react"

const HomePageDropdown = ({ title, children, open }: { title: string, children: any, open: boolean }) => {
  return (
    <div
      className="h-full"
    >
      <div className="flex items-center h-full">
        <Popover className="h-full w-full flex">
          <>
            <Popover.Button
              className={clsx(
                " h-full flex items-center transition-all ease-out duration-200"
              )}
            >
              <span className="uppercase font-bold">  {title}</span>
            </Popover.Button>

            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                static
                className="top-full w-full inset-x-0  text-sm text-gray-700 z-30 border-y border-gray-200"
              >
                {children}

              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
    </div>
  )
}

export default HomePageDropdown
