import { useStore } from "@lib/context/store-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import ChevronDown from "@modules/common/icons/chevron-down"
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import clsx from "clsx"
import { useCart } from "medusa-react"


const CountryMenu = ({ size = 'normal', variant = 'primary' }: { size?: 'normal' | 'small' | 'large' | 'xlarge', variant?: 'primary' | 'secondary' }) => {
  const { cart } = useCart();
  const { setRegion, countryCode } = useStore()
  const countryOptions = useCountryOptions()

  const handleSelectCountry = (regionId: string, countryCode: string) => {
    setRegion(regionId, countryCode)
  }

  const [currencies, setCurrencies] = useState<any[]>([])

  useEffect(() => {
    let options: any[] = [];
    let currencies: string[] = [];
    for (var opt of (countryOptions ?? [])) {
      if (currencies.includes(opt.currency)) continue;
      currencies.push(opt.currency);
      options.push(opt);
    }
    setCurrencies(options);
  }, [countryOptions])

  return (
    <div className="">
      <div className="text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className={clsx("flex group items-center w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75", {
              '!hover:text-white !hover:bg-black': variant === 'primary',
              '!hover:text-black hover:bg-primary': variant === 'secondary',
            })}>
              <span className="">Currency : <span className="uppercase">{cart?.region?.currency_code}</span></span>
              <ChevronDown
                className="ml-2 -mr-1 h-5 w-5  text-white group-hover:text-primary"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-50 h-60 max-h-[90vh] overflow-y-scroll sm:right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {currencies.map((option) => {
                return <div className="px-1 py-1 " key={option.country}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          handleSelectCountry(option.region, option.country)
                        }}
                        className={`${active ? 'bg-primary' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        <div className="flex uppercase items-center gap-2">
                          <div className="flex font-bold">
                            <span className="">{option.currency}</span>
                          </div>
                        </div>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              })

              }
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div >
  )
}

export default CountryMenu
