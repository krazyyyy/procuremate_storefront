import Link from "next/link"
import CountrySelect from "../country-select"
import Image from "next/image"

const FooterNav = () => {
  const links = [
    { title: '', href: '/' },
    { title: 'Size Chart', href: '/size-chart' },
    { title: 'Contact Us', href: 'mailto:manager@fiercefightgear.com' },
    { title: 'Order processing', href: '/order-processing-terms' },
    { title: 'Terms and Conditions', href: '/terms-and-conditions' },
    { title: 'Privacy Policy', href: '/privacy-policy' },
  ];

  return (
    <div className="bg-primary font-montserrat">
      <div className="content-container flex flex-col gap-y-8 pt-10 pb-8">
        <div className="flex gap-2 mx-auto">
          <TwitterIcon />
          <InstaIcon />
        </div>
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between">
          <div className="text-small-regular flex-wrap flex max-w-2xl mx-auto items-center justify-center gap-x-6 gap-y-4">
            {links.map((l, index) => {
              return (
                <Link
                  key={index}
                  href={l.href}
                  className="whitespace-nowrap cursor-pointer hover:underline uppercase">
                  {l.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mx-auto text-center">
          <span className="uppercase block mb-1 font-bold text-sm">Coming Soon</span>
          <div className="flex flex-wrap max-w-md items-center justify-center  gap-4  place-items-center justify-items-center">

            <Image src="/appstore.svg" height={48} width={137} alt="appstore" />


            <Image src="/playstore.svg" height={46} width={158} alt="playstore" />

            <span className="text-base font-bold">
              All rights reserved
            </span>
            <span className="text-base font-bold">
              © Copyright {new Date().getFullYear()} Procuremate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterNav


function TwitterIcon() {
  return (
    <a href="https://twitter.com/Fiercefightgear" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
      <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"></path>
      </svg>
    </a>
  );
}


function InstaIcon() {
  return (
    <a href="https://instagram.com/fiercefightgear?igshid=NjIwNzIyMDk2Mg==" target="_blank" rel="noopener noreferrer">
      <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.743 0.65625H7.37665C3.30822 0.65625 0.882812 3.08045 0.882812 7.14685V16.4973C0.882812 20.5749 3.30822 22.9991 7.37665 22.9991H16.7318C20.8002 22.9991 23.2256 20.5749 23.2256 16.5085V7.14685C23.2368 3.08045 20.8114 0.65625 16.743 0.65625ZM12.0598 16.1622C9.66793 16.1622 7.72314 14.2184 7.72314 11.8277C7.72314 9.43699 9.66793 7.49316 12.0598 7.49316C14.4517 7.49316 16.3965 9.43699 16.3965 11.8277C16.3965 14.2184 14.4517 16.1622 12.0598 16.1622ZM18.6766 6.10791C18.6207 6.24196 18.5425 6.36485 18.4419 6.47656C18.3301 6.57711 18.2072 6.65531 18.073 6.71116C17.9389 6.76702 17.7936 6.80054 17.6483 6.80054C17.3465 6.80054 17.0671 6.68882 16.8547 6.47656C16.7542 6.36485 16.6759 6.24196 16.62 6.10791C16.5641 5.97385 16.5306 5.82862 16.5306 5.68339C16.5306 5.53816 16.5641 5.39294 16.62 5.25888C16.6759 5.11365 16.7542 5.00194 16.8547 4.89022C17.1118 4.63328 17.503 4.51039 17.8607 4.58859C17.9389 4.59976 18.006 4.62211 18.073 4.65562C18.1401 4.67796 18.2072 4.71148 18.2742 4.75616C18.3301 4.78968 18.386 4.84554 18.4419 4.89022C18.5425 5.00194 18.6207 5.11365 18.6766 5.25888C18.7325 5.39294 18.766 5.53816 18.766 5.68339C18.766 5.82862 18.7325 5.97385 18.6766 6.10791Z" fill="black" />
      </svg>
    </a>
  );
}


// {/* <div className="flex flex-col gap-y-2">
//             <span className="text-base-semi">Collections</span>
//             <ul
//               className={clsx("grid grid-cols-1 gap-y-2", {
//                 "grid-cols-2": (collections?.length || 0) > 4,
//               })}
//             >
//               {collections?.map((c) => (
//                 <li key={c.id}>
//                   <Link href={`/collections/${c.id}`}>
//                     <a>{c.title}</a>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="flex flex-col gap-y-2">
//             <span className="text-base-semi">Medusa</span>
//             <ul className="grid grid-cols-1 gap-y-2">
//               <li>
//                 <a
//                   href="https://github.com/medusajs"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   GitHub
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://docs.medusajs.com"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Documentation
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://github.com/medusajs/nextjs-starter-medusa"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Source code
//                 </a>
//               </li>
//             </ul>
//           </div> */}

