import { useMobileMenu } from "@lib/context/mobile-menu-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import Search from "@modules/common/icons/search"
import X from "@modules/common/icons/x"
// import { useMeCustomer } from "medusa-react"
import Link from "next/link"
import CountryMenuMobile from "../country-menu-mobile"
import Image from "next/image"
import useToggleState from "lib/hooks/use-toggle-state"
import { ProductCategory } from "@medusajs/medusa"
import clsx from "clsx"
import { useNavbar } from "lib/context/navbar-context"
import { useAccount } from "@lib/context/account-context"

const MainMenu = () => {
  const { customer } = useAccount()
  const { categories } = useNavbar()
  const { readyMade, customEquipment, customFightwear } = categories;


  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu()

  const setScreenSearch = () => setScreen("search")

  const items = [
    { title: 'Home', href: '/', },
    { title: 'Customize Online', children: [{ title: 'Custom Fightwear', prefix: 'custom-fightwear', items: customFightwear }, { title: 'Custom Equipment', prefix: 'custom-equipment', items: customEquipment }] },
    { title: 'Ready Made', children: [{ title: 'Ready Made', prefix: 'ready-made', items: readyMade }] },
    { title: 'Gallery', href: '/gallery', },
    { title: 'Size Chart', href: '/size-chart', },
    { title: 'Blog', href: '/blog', },
  ];

  return (
    <div className="flex flex-col flex-1 font-montserrat">
      <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
        <div>
          <Link href='/'>
            <Image src="/logo-dark.svg" height={64} width={64} alt="logo-dark" />
          </Link>
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        {process.env.FEATURE_SEARCH_ENABLED && (
          <button
            className="bg-gray-50 flex items-center px-4 py-2 gap-x-2 text-gray-500"
            onClick={setScreenSearch}
          >
            <Search size={24} />
            <span placeholder="Search products" className="text-base-regular">
              Search products
            </span>
          </button>
        )}

        <div className="flex flex-col flex-1 text-large-regular text-gray-900">
          <ul className="flex flex-col gap-y-2">
            {items?.map((item, i) => {
              if (!item.href) {
                return <CustomDropdownMenu
                  onClick={close}
                  key={i}
                  items={item.children}
                  title={item.title} />
              }
              if (item.href.includes('https')) {
                return (
                  <li key={i} className="bg-gray-50 p-4">
                    <a href={item.href}>
                      <button
                        className="flex items-center justify-between w-full"
                        onClick={close}>
                        <span>{item.title}</span>
                      </button>
                    </a>
                  </li>
                );
              }
              return (
                <li key={i} className="bg-gray-50 p-4">
                  <a href={item.href}>
                    <button
                      className="flex items-center justify-between w-full"
                      onClick={close}>
                      <span>{item.title}</span>
                    </button>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-y-8 text-small-regular">
            {!customer ? (
              <div className="flex flex-col gap-y-4">
                <span className="text-gray-700 uppercase">Account</span>
                <Link href={`/account/login`} passHref>

                  <button
                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to sign in page</span>
                    <span className="normal-case">Sign in</span>
                    <ChevronDown className="-rotate-90" />
                  </button>

                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4">
                <span className="text-gray-700 uppercase">Signed in as</span>
                <Link href={`/account/profile`} passHref>
                  <button
                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to account page</span>
                    <span className="normal-case">{customer.email}</span>
                    <ChevronDown className="-rotate-90" />
                  </button>

                </Link>
              </div>
            )}
            <div className="flex flex-col justify-start items-start gap-y-4">
              <CountryMenuMobile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu


const CustomDropdownMenu = ({ items, title, onClick }: { items: any, title: string, onClick: () => void }) => {

  const { toggle, state } = useToggleState(true);

  return <div className="bg-gray-50 transition-all ">
    <div onClick={toggle} className="w-full rounded flex justify-between items-center p-4">
      <h3 className="">{title}</h3>
      <ChevronDown className={clsx('transition-all', !state ? 'rotate-180' : 'rotate-0')} />
    </div>
    {<div className={clsx('transition-all duration-150', state ? 'h-0 overflow-hidden' : 'h-full')}>
      {items?.map((item: any) => <LinkDropdownMenu showTitle={!item.prefix?.includes('ready')} prefix={item.prefix} onClick={onClick} key={item.title} title={item.title} items={item.items} />)}
    </div>}
  </div>
}

const LinkDropdownMenu = ({ items, title, onClick, prefix, showTitle = true }: { items: any[], title: string, prefix: string, onClick: () => void, showTitle: boolean }) => {
  const { toggle, open, close, state } = useToggleState(true);

  return <div onClick={toggle} className="">
    {showTitle && <div className="w-full rounded flex justify-between items-center p-4">
      <h3 className="">{title}</h3>
      <ChevronDown className={clsx('transition-all', !state ? 'rotate-180' : 'rotate-0')} />
    </div>}
    <div className={clsx('transition-all pl-4 duration-150', state ? 'h-0 overflow-hidden' : 'h-full')}>
      {items?.map((cat: ProductCategory & any) =>
        <Link onClick={onClick} key={cat.id} href={`/${prefix}/${cat.handle}`}>
          <div
            className="pl-4 bg-gray-100 my-2 rounded hover:bg-primary">
            {cat.name}
          </div>
        </Link>)}
    </div>
  </div>

}