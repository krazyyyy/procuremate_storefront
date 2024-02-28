import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import MobileMenu from "@modules/mobile-menu/templates"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, Fragment, useState, useRef } from "react"
import Heart from "@modules/common/icons/heart"
import User from "@modules/common/icons/user"
// import { useMeCustomer } from "medusa-react"
import Image from "next/image"
import CartDropdown from "../../components/cart-dropdown"
import CountryMenu from "@modules/mobile-menu/components/country-menu"
import ChevronDown from "@modules/common/icons/chevron-down"
import { Transition } from '@headlessui/react'
import useToggleState from "@lib/hooks/use-toggle-state"
import ThumbnailImage from "@modules/products/components/thumbnail-image"
import { throttle } from "lodash"
import { useNavbar } from "lib/context/navbar-context"
import repeat from "lib/util/repeat"
import { useAccount } from "@lib/context/account-context"

const Navbar = () => {
  const { pathname } = useRouter()
  const { customer } = useAccount()
  const [isHome, setIsHome] = useState(false)
  const { categories, loading } = useNavbar()
  const { readyMade, customEquipment, customFightwear } = categories;

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products' },
    { title: 'customize online', children: [customFightwear, customEquipment] },
    { title: 'ready made', href: '/ready-made', children: readyMade },
    { title: 'gallery', href: '/gallery' },
    { title: 'size chart', href: '/size-chart' },
  ];


  return (
    <div
      className={clsx("sticky bg-white top-0 shadow-md inset-x-0 font-montserrat z-50 group", {
        "!fixed": isHome,
      })}
    >
      <header
        className={clsx(
          "relative flex flex-col mx-auto transition-colors bg-transparent border-b border-transparent duration-200",
        )}>
        <div
          className="bg-black text-xs w-screen font-montserrat text-white flex flex-col justify-between h-full small:relative">
          <div className="hidden small:flex gap-3 mb-1 justify-end  px-10 items-center">
            <CountryMenu />
            <Link href="/account/orders">
              Order status
            </Link>
            {!customer &&
              <Link href="/account/login">
                Log in/Sign up
              </Link>}

          </div>
        </div>
        <nav
          className={clsx(
            "text-gray-900 flex px-8 py-2 justify-between items-center h-full transition-colors duration-200",
          )}  >
          {/* Logo part */}
          <div className="flex h-full items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
          </div>

          <div className="small:hidden items-center justify-center h-full">
            <div className="flex items-center gap-8">
              <Link href='/favorites' title="Favorites">
                <Heart
                  className="cursor-pointer"
                  width={22}
                  height={22}
                />
              </Link>
              <Link href='/account/profile' title="Accounts">
                <User
                  width={22}
                  height={22}
                />
              </Link>
              <div title="Cart" className="mt-2.5">
                <CartDropdown />
              </div>
            </div>
          </div>
          {/* Second part */}
          <div className="small:flex hidden items-center justify-end gap-6">
            {navItems?.map((item) => {
              return <NavLink {...item} key={item.title} loading={loading} />
            })}

            <div className="flex items-center gap-8">
              <Link href='/favorites' title="Favorites">
                <Heart
                  className="cursor-pointer"
                  width={22}
                  height={22}
                />
              </Link>
              <Link href='/account/profile' title="Accounts">
                <User
                  width={22}
                  height={22}
                />
              </Link>
              <div title="Cart" className="mt-2.5">
                <CartDropdown />
              </div>
            </div>
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div >
  );
}

export default Navbar



type NavLinkProps = {
  href?: string
  title?: string
  children?: any[]
  loading: boolean
}

const NavLink = ({ href, title, children, loading }: NavLinkProps) => {
  const ref = useRef(null);
  const { state: visible, open: view, close: hide } = useToggleState()

  if (!children || href?.startsWith('http')) {
    console.log('is link', href)
    return <a
      href={href ?? '#'}
      className="uppercase hover:bg-primary text-base rounded-full px-4 py-3 font-bold"
      title={title}>
      <div> {title}</div>
    </a>
  }

  const custom = title?.toLowerCase().includes('custom')

  const showNav = throttle(view, 600);
  const hideNav = throttle(hide, 600);

  const child = custom ? <div className="flex gap-10 items-start justify-between">
    <ThumbnailImage
      width={400}
      height={400}
      src="https://blog.fiercefightgear.com/wp-content/uploads/2023/08/customizer.png"
      alt="Customizer"
      className="w-1/3" />
    <div className="w-2/3 pl-20 flex items-start justify-center">
      <NavbarList onClose={hide} prefix="custom-fightwear" title="Custom Fightwear" items={children[0] as any} />
      <NavbarList onClose={hide} prefix="custom-equipment" title="Custom Equipment" items={children[1] as any} />
    </div>
  </div>
    :
    <div className="flex gap-10 items-start justify-between">
      <ThumbnailImage
        width={400}
        height={400}
        src="https://blog.fiercefightgear.com/wp-content/uploads/2023/08/customizer.png"
        alt="Customizer"
        className="w-1/3" />
      <div className="w-2/3 pl-20">
        <NavbarList onClose={hide} prefix="ready-made" title="Ready Made" items={children} />
      </div>
    </div>


  return (
    <div onMouseEnter={showNav} onMouseLeave={hideNav} className="flex items-center hover:bg-primary px-4 py-3 rounded-full gap-2 relative">
      <button className="inline-block text-left">
        <div>
          <a ref={ref} className={clsx("flex group items-center  w-full justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75", {})}>
            <span className="uppercase text-base font-bold">{title}</span>
            <ChevronDown
              className="ml-2 -mr-1 h-5 w-5  text-black hover:text-white"
              aria-hidden="true"
            />
          </a>
        </div>
        <Transition
          show={visible}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="w-screen shadow left-0 top-[97px]  fixed bg-white min-h-[60vh] p-10">
            {loading ? <div className="flex gap-10 items-start justify-between">
              <ThumbnailImage
                width={400}
                height={400}
                src="https://blog.fiercefightgear.com/wp-content/uploads/2023/08/customizer.png"
                alt="Customizer"
                className="w-1/3" />
              <div className="w-2/3 pl-20 flex gap-10 items-start justify-between">
                <div className="flex flex-col gap-4 w-full">
                  {repeat(6).map(i => <div className="bg-gray-200 rounded-xl animate-pulse h-12 w-full" key={i}></div>)}
                </div>
                <div className="flex flex-col gap-4 w-full">
                  {repeat(6).map(i => <div className="bg-gray-200 rounded-xl animate-pulse h-12 w-full" key={i}></div>)}
                </div>
              </div>
            </div> : child}
          </div>
        </Transition>
      </button>
    </div >
  );
}


const NavbarList = ({ items, title, prefix, onClose }: { items: any[], title: string, prefix: string, onClose: () => void }) => {
  return <div className="w-full flex py-4 font-montserrat  items-start justify-center flex-col">
    <h3 className="font-bold uppercase text-xl">{title}</h3>
    <ul className="mt-4">
      {items?.map((item, index) => (
        <Link onClick={onClose} href={`/${prefix}/${item?.handle}`} key={index}>
          <li className="text-sm hover:bg-primary hover:px-6 py-3 transition-all rounded-full h-full font-normal">
            {item.name}
          </li>
        </Link>
      ))}
    </ul>
  </div >
}