import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type CartMenuProps = {
  state: boolean;
  close: () => void;
  children: React.ReactNode;
};

const CartMenu = ({ children, state, close }: CartMenuProps) => {
  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 flex z-50 max-w-lg" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="absolute inset-0 bg-gray-700 bg-opacity-75 transition-opacity backdrop-blur-sm" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-500 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-500 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0  right-0">
              <div className="relative w-screen pointer-events-auto bg-white text-gray-900 flex flex-col overflow-y-auto">
                {children}
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CartMenu;
