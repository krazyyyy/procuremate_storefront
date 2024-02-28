import Medusa from '@lib/services/api'
import clsx from "clsx"
import { motion } from 'framer-motion'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import useToggleState from "../../lib/hooks/use-toggle-state"
import { linearIntroAnimation } from "../../lib/util/animation-util"
import Spinner from "../common/icons/spinner"
import { useRouter } from 'next/router'

const ComingSoonTemplate = () => {
  const { toggle, state } = useToggleState(false);
  const { state: loading, open: startLoading, close: stopLoading } = useToggleState(false);
  const [email, setEmail] = useState('');
  const { push } = useRouter()

  const handleSubmit = async () => {

    if (email.length === 0) {
      toast.error("Email is empty");
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      toast.error("Enter a valid email");
      return;
    }
    startLoading()
    try {
      const result = await Medusa.email.submitComingSoon(email);
      if (result.status === 200) {
        toast.success("Your request has been submitted successfully!")
        push('/success')
      }
    } catch (error) {
      toast.error("An error occurred try again later.")
    }
    stopLoading();
  }

  return (
    <div className="font-montserrat small:overflow-hidden relative min-h-screen w-screen">
      <Image src="/background.png" layout="fill" alt="layout" objectFit="cover" />
      <div className="relative font-montserrat">
        <nav className="flex h-20 top-0 left-0 items-center justify-between w-full px-10">
          <Image src="/logo-white.svg" height={64} width={64} alt="Logo" />
          <div onClick={toggle} className="text-white cursor-pointer small:hidden">
            <span className='rotate-90 block select-none'>|||</span>
          </div>
          <div className={clsx("flex transition-all duration-300 flex-col small:top-auto absolute top-16 small:fixed small:flex-row left-0 text-white gap-3 uppercase items-center justify-center w-full",
            state ? 'flex bg-black rounded-xl bg-opacity-80 py-3 ' : 'hidden small:flex'
          )}>
            <NavLink title="Customizable Products" />
            <div className="hidden small:block">/</div>
            <NavLink title="create your designs easily" />
            <div className="hidden small:block">/</div>
            <NavLink title="Premium items" />
          </div>
        </nav>
      </div>
      <div className="p-4 h-[calc(100vh-80px)] relative m-auto w-full flex-col flex gap-5 items-center justify-center">
        <motion.h1
          style={{ fontWeight: 900, fontStyle: 'normal' }}
          {...linearIntroAnimation('right',)}
          className="text-4xl small:text-[128px] small:leading-[156px] uppercase text-primary font-montserrat">
          coming soon
        </motion.h1>
        <motion.p
          {...linearIntroAnimation('left',)}
          className="text-white small:text-base">Get ready to enter the ring in style! Stay tuned for our launch.</motion.p>
        <motion.div
          {...linearIntroAnimation('top', 0.35)}
          className="flex bg-white rounded p-1 small:h-20 w-full gap-1 max-w-[1013px]">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="font-bold text-sm w-full px-2 small:px-4 focus:ring-1 rounded placeholder-black outline-none small:text-3xl placeholder:text-center"
            placeholder="Enter your email address." />
          <button
            onClick={handleSubmit}
            className="bg-primary flex items-center justify-center text-xs small:w-60 font-bold whitespace-nowrap px-4 small:px-12 py-4 small:text-base rounded-[5px]">
            {loading ? <Spinner /> : ' Notify me'}
          </button>
        </motion.div>
      </div>
      <footer className="fixed uppercase bottom-0 left-0 flex text-white px-4 small:px-12 py-5 justify-between flex-wrap w-full">
        <div className="flex gap-3">
          <NavLink title="All rights reserved" />
          <div className="hidden small:block">/</div>
          <span className="text-sm small:text-base font-bold">© 2023 Procuremate</span>
        </div>
        <div className="hidden small:flex items-center gap-2">
          <span className="">
            Powered by
          </span>
          <Link href="https://www.empirepixel.com">

            <Image src="/empirepixel.svg" height={40} width={200} alt="empirepixel" />

          </Link>
        </div>
        <div className="flex gap-3">
          <NavLink href="https://www.facebook.com/fiercefightgear" title="facebook" />
          <div className="hidden small:block">/</div>
          <NavLink href="https://instagram.com/fiercefightgear?igshid=MzRlODBiNWFlZA==" title="instagram" />
          <div className="hidden small:block">/</div>
          <NavLink href="https://twitter.com/Fiercefightgear" title="twitter" />
        </div>
        <div className="small:hidden text-center justify-center w-full items-center gap-2">
          <span className="">
            Powered by
          </span>
          <Link href="https://www.empirepixel.com">

            <Image src="/empirepixel.svg" height={18} width={170} alt="empirepixel" />

          </Link>
        </div>
      </footer>
    </div>
  );
}

export default ComingSoonTemplate


export const NavLink = ({ title, href = '#' }: { title: string, href?: string }) => {
  return (
    <Link href={href} className="text-sm font-bold hover:underline small:text-base">

      {title}

    </Link>
  );
}