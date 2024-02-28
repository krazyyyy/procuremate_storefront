import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import PrimaryButton from '@modules/common/components/primary-button';
import { useInView, motion } from 'framer-motion';
import { staggeredAnimation } from '@lib/util/animation-util';
import { useRouter } from 'next/router';
import { useProductsFilter } from '../../../../lib/context/filter-context';
import clsx from 'clsx';
import { IS_BROWSER } from '../../../../lib/constants';

function ChooseDesign() {

  const ref = useRef<any>(null);
  const inView = useInView(ref);
  const buttonRef = useRef(null);
  const btnInView = useInView(buttonRef);
  const router = useRouter()
  const { collections } = useProductsFilter()
  const [isFireFox, setFireFox] = useState(false);

  const categories = [
    {
      img: '/images/full-set-1.png',
      name: 'Savage Kit',
    },
    {
      img: '/images/full-set-2.png',
      name: 'Royality Kit',
    },
    {
      img: '/images/full-set-3.png',
      name: 'Fire Kit',
    },
  ]

  const buttonAnimation = (reverse: boolean = false) => {
    return {
      initial: {
        x: reverse ? -25 : 25,
        y: reverse ? 25 : -25,
        opacity: 0,
        scale: 0.76
      },
      animate: {
        x: btnInView ? 0 : reverse ? -25 : 25,
        y: btnInView ? 0 : reverse ? 25 : -100,
        opacity: btnInView ? 1 : 0,
        scale: btnInView ? 1 : 0,
      },
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  }
  function checkBrowser(): string {
    if (!IS_BROWSER) return '';
    let browser = "";
    let c = navigator.userAgent.search("Chrome");
    let f = navigator.userAgent.search("Firefox");
    let m8 = navigator.userAgent.search("MSIE 8.0");
    let m9 = navigator.userAgent.search("MSIE 9.0");
    if (c > -1) {
      browser = "Chrome";
    } else if (f > -1) {
      browser = "Firefox";
    } else if (m9 > -1) {
      browser = "MSIE 9.0";
    } else if (m8 > -1) {
      browser = "MSIE 8.0";
    }
    return browser;
  }


  useEffect(() => {
    if (!IS_BROWSER) return;
    var browser = checkBrowser();
    if (!isFireFox && browser === 'Firefox') {
      setFireFox(true);
    }
  }, [])

  return <>
    <div ref={ref} className="flex-col overflow-hidden bg-white  shadow-xl content-container py-10  font-montserrat flex items-center justify-center">
      <div className="flex items-center gap-3 small:justify-start justify-center w-full py-6">
        <h2 className='flex flex-col'>
          <span className="sm:text-[40px] leading-8 small:leading-10  small:text-[130px] text-center tracking-[-0.05em] slashed-zero">
            <motion.div className="font-semibold gap-4 flex items-center justify-start">
              <motion.h2
                initial={{ x: -120, opacity: 0 }}
                animate={{ x: inView ? 0 : -120, opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.25, duration: 0.55 }}
                className="whitespace-nowrap mx-auto uppercase">
                Check out
              </motion.h2>
              <motion.p
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: inView ? 0 : 120, opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.25, duration: 0.55 }}
                className="text-xs hidden small:block small:text-xl tracking-normal font-normal break-words w-full text-left max-w-xs">
                Don{"'"}t settle for less! Get the best fight gear to make you stand out during
                <span className='font-bold ml-1'>combat</span>.
              </motion.p>
            </motion.div>
            <br className='hidden small:block' />
            <motion.h2
              className={clsx(
                'flex items-center justify-center small:justify-start ',
                { 'mt-10': isFireFox }
              )}
              initial={{ y: -120, opacity: 0 }}
              animate={{ y: inView ? 0 : -120, opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
            >
              <span className="font-black whitespace-nowrap uppercase relative tracking-normal italic">Full set</span>
              {' '}
              <span className="font-semibold whitespace-nowrap uppercase relative">Designs</span>
            </motion.h2>
            <motion.p
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: inView ? 0 : 120, opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="text-xs small:hidden small:text-xl tracking-normal font-normal break-words w-full text-left max-w-xs">
              Don{"'"}t settle for less! Get the best fight gear to make you stand out during
              <span className='font-bold'>combat</span>.
            </motion.p>
          </span>
        </h2>
      </div>

      <div className="w-full group rounded-2xl relative">
        <div className="flex flex-col items-start justify-center">
          <div className="flex flex-wrap small:flex-nowrap py-10 overflow-x-scroll gap-10 items-center justify-center" >
            {categories.map((c, index) => <CardItem key={index} index={index} inView={inView} card={c} />)}
          </div>
          <PrimaryButton onClick={() => {
            router.push('/full-set')
          }} className="max-w-sm mx-auto" >See All</PrimaryButton>
        </div>
      </div>


      <div className='py-8 small:py-20 flex flex-col gap-5 items-center justify-center'>
        <motion.h2
          initial={{ x: 200, opacity: 0, scale: 0.76 }}
          animate={{
            x: inView ? 0 : 200,
            opacity: inView ? 1 : 0,
            scale: inView ? 1 : 0
          }}
          transition={{ delay: 0.45, duration: 0.55 }}
          className='small:text-[80px] text-3xl font-bold italic'>Featured: New Products</motion.h2>
        <p className="small:text-3xl small:mt-4 text-center">
          Explore the collection of premium items available for supply in our online fight store. High quality boxing shoes, MMA gear,muay thai shorts, and other boxing equipment that will make you stand out in boxing rings. Need to throw a good punch? Our boxing gloves and original fightwear are your best bet!
        </p>


        <div className='flex flex-wrap items-center py-10 gap-10 w-full justify-center'>
          <div className='text-center'>
            <Image objectFit="contain" src={'/images/premium.png'} alt="shop" height={520} width={294} />
          </div>
          <div className='w-full max-w-md flex justify-around flex-col gap-5'>
            <PrimaryButton onClick={() => router.push('/products')}>Shop now</PrimaryButton>
            <PrimaryButton onClick={() => {
              var collection = collections?.find((c) => c.handle.includes('custom-fightwear'));
              if (collection)
                router.push(collection?.handle)
            }}>Customize</PrimaryButton>
          </div>

        </div>
      </div>
    </div >
    <div className='flex content-container px-0 h-[70vh] mx-auto'>
      <div ref={buttonRef} className='text-center relative w-full'>
        <Image objectFit="cover" src={'/images/image-5.png'} alt="ready-made" layout='fill' />
        <div className='absolute w-full flex items-center justify-center h-full'>
          <PrimaryButton
            onClick={() => {
              var collection = collections?.find((c) => c.handle.includes('ready'));
              router.push({ pathname: `/${collection?.handle}`, })
            }}
            {...buttonAnimation()}
            className='max-w-md m-4' variant='secondary'>Ready made</PrimaryButton>
        </div>
      </div>
      <div className='text-center relative w-full'>
        <Image objectFit="cover" src={'/images/image-6.png'} alt="gym uniforms" layout='fill' />
        <div className='absolute w-full flex items-center justify-center h-full'>
          <PrimaryButton
            onClick={() => {
              var collection = collections?.find((c) => c.handle.includes('gym'));
              router.push({ pathname: `/${collection?.handle}`, })
            }}
            {...buttonAnimation(true)}
            className='max-w-md m-4' variant='secondary'>gym uniform</PrimaryButton>
        </div>
      </div>
    </div>
  </>;
}


export default ChooseDesign

function CardItem({ card, index, inView }: { card: { img: string, name: string }, index: number, inView: boolean, }) {
  return <motion.div {...staggeredAnimation(index, inView)} className="bg-black cursor-pointer mx-auto relative rounded-xl flex flex-col">
    <div className="flex flex-col w-full small:w-auto gap-2 small:aspect-[16/19]">
      <div className='small:aspect-[16/19] group-1'>
        <Image objectFit="contain" src={card.img} alt="customizer" height={510} width={420} />
      </div>
      <span className="font-bold text-[40px] text-center  group-hover:text-white text-primary leading-[24.3px] mx-auto uppercase absolute left-0 right-0 bottom-1/4">{card.name}</span>
    </div>
  </motion.div>;
}