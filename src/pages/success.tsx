import Head from "@modules/common/components/head"
import { motion } from 'framer-motion'
import { linearIntroAnimation } from "../lib/util/animation-util"
import Image from "next/image"
import PrimaryButton from "../modules/common/components/primary-button"
import Link from "next/link"
import { NavLink } from "../modules/coming-soon"

const Success = () => {

  return <>
    <Head title="Success" description="Success" />

    <div className="flex flex-col py-6 items-center justify-center min-h-screen h-full">
      <Image src="/background.png" layout="fill" alt="layout" objectFit="cover" />
      <div className="relative p-5 text-center flex flex-col gap-3 items-center justify-center">
        <motion.div {...linearIntroAnimation('bottom')} className="items-center text-white ">
          <h1 className="font-montserrat font-bold text-6xl">Success</h1>
        </motion.div>
        <motion.p {...linearIntroAnimation('left', 0.54)} className="small:text-xl text-white">
          {"Email has been added to waitlist, check your email for the updates."}
        </motion.p>

        <Link href='/' passHref legacyBehavior>
          <PrimaryButton variant="secondary" className="max-w-sm mt-5" >
            Go Back
          </PrimaryButton>
        </Link>
      </div>
    </div >
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
      <div className="small:hidden justify-center w-full items-center gap-2">
        <span className="">
          Powered by
        </span>
        <Link href="https://www.empirepixel.com">

          <Image src="/empirepixel.svg" height={18} width={170} alt="empirepixel" />

        </Link>
      </div>
    </footer>
  </>;
}

export default Success
