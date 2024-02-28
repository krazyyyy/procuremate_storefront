import Image from 'next/image';
import React from 'react'
import ArrowIcon from '@modules/common/icons/arrow';
import PrimaryButton from '@modules/common/components/primary-button';
import clsx from 'clsx';
import { useRouter } from 'next/router';

function TheGallery() {
  const router = useRouter()

  const categories = [
    {
      img: '/images/gallery-gloves.png',
      name: 'Gloves',
    },
    {
      img: '/images/gallery-short-jacket.png',
      name: 'Boxing Short And Jacket',
    },
    {
      img: '/images/gallery-groin-guard.png',
      name: 'Guard',
    },
    {
      img: '/images/gallery-mwaythaishorts.png',
      name: 'Muay Thai Shorts',
    },
    {
      img: '/images/gallery-boxingshorts.png',
      name: 'Boxing Shorts',
    },
    {
      img: '/images/image-12.png',
      name: 'Royality Kit',
    },
    {
      img: '/images/image-18.png',
      name: 'Black Boxer',
    },
    {
      img: '/images/image-10.png',
      name: 'Yellow Boxer',
    },
    {
      img: '/images/gallery-carey.png',
      name: 'Carey',
    },
  ]


  return <>
    <div className="flex-col content-container py-10  font-montserrat flex items-center justify-center">
      <div className="flex items-center gap-3 justify-start w-full py-10">
        <span className="font-bold text-xl small:text-[40px] italic">
          The Gallery
        </span>
        <ArrowIcon className="pb-6" size={50} />
      </div>
      <div className="w-full group rounded-2xl relative">
        <div className="flex gap-4 max-h-[840px] justify-center">
          <div className="grid mt-40 grid-cols-1 overflow-hidden gap-1">
            {categories.map((c, index) => {
              if (index % 3 === 0) {
                // first column
                return (
                  <div key={index} className={clsx("aspect-auto relative rounded-xl")}>
                    <Image objectFit="contain" src={c.img} alt="customizer" height={367} width={367} />
                  </div>
                )
              }
            })}
          </div>
          <div className="grid mt-20 grid-cols-1 overflow-hidden gap-1">
            {categories.map((c, index) => {
              if (index % 3 === 1) {
                // second column
                return (
                  <div key={index} className={clsx("aspect-auto relative rounded-xl")}>
                    <Image objectFit="contain" src={c.img} alt="customizer" height={367} width={367} />
                  </div>
                );
              }
            })}
          </div>
          <div className="grid grid-cols-1 overflow-hidden gap-1">
            {categories.map((c, index) => {
              if (index % 3 === 0) {
                return;
              } else if (index % 3 === 1) {
                return
              } else {
                return (
                  <div key={index} className={clsx("aspect-auto relative rounded-xl")}>
                    <Image objectFit="contain" src={c.img} alt="customizer" height={367} width={367} />
                  </div>
                );
              }

            })}
          </div>

          <div className="absolute h-full bottom-0 left-0 right-0 bg-gradient-to-t from-gray-400 via-transparent  to-transparent"></div>
        </div>
        <PrimaryButton
          onClick={() => {
            router.push("/gallery")
          }}
          className="max-w-sm w-full mx-auto bottom-2 small:bottom-20" >See All</PrimaryButton>
      </div>


      <div className='py-8 small:py-20 flex gap-10 items-center flex-wrap-reverse sm:flex-nowrap justify-around'>

        <div className='small:w-2/3 flex flex-col'>
          <h2 className='small:text-[40px] small:leading-[48px] text-xl font-bold italic'>
            Be the One: The New Winning Brand for Fighters with Strength - Procuremate for Sneaker, Shoes & More.
          </h2>
          <div className='mt-8'>
            <p className="text-base  text-left">
              Introducing Procuremate, where cutting-edge technology meets unparalleled design, providing you with the ultimate performance apparel.  At Procuremate, we{"'"}re more than just an online store – we{"'"}re a heaven for fighters, athletes, and enthusiasts seeking the finest quality gear. Our extensive selection and brand covers a wide range of disciplines, including boxing, MMA, Muay Thai, jiu jitsu, and more. As the one-stop-shop for all your combat sports needs, we offer new products including professional boxing gear, muay thai gear, custom apparel, fightwear, and equipment. Our Sneaker Shop offers custom gear, so you can always get the perfect fit for your needs and our friendly and knowledgeable staff is always happy to help you find the right gear for your sport. Shop with Procuremate today and experience the difference!
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className='my-10 flex items-center justify-center gap-4'>
      <VISAIcon />
      <MasterCardIcon />
      <PaypalIcon />
    </div>
  </>;
}

export default TheGallery


function VISAIcon() {
  return <svg width="100" height="31" viewBox="0 0 100 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35.3242 30.2855L40.3818 0.606445H48.4713L43.41 30.2855H35.3242Z" fill="#757575" />
    <path d="M72.6371 1.24651C71.0346 0.645239 68.5232 0 65.3869 0C57.3934 0 51.7631 4.02532 51.715 9.79442C51.67 14.059 55.7347 16.438 58.8032 17.8576C61.9521 19.3126 63.0106 20.2403 62.9955 21.5391C62.9753 23.5286 60.4809 24.4372 58.1556 24.4372C54.918 24.4372 53.1979 23.9874 50.5411 22.8796L49.4985 22.4078L48.3633 29.0517C50.2528 29.8804 53.7465 30.5979 57.3745 30.6352C65.8781 30.6352 71.3984 26.6558 71.4612 20.4951C71.4914 17.1189 69.3363 14.5497 64.6691 12.4315C61.8416 11.0585 60.1099 10.1424 60.1283 8.75212C60.1283 7.51849 61.594 6.19936 64.7612 6.19936C67.4063 6.15828 69.3228 6.73514 70.8158 7.33641L71.5406 7.67889L72.6371 1.24651Z" fill="#757575" />
    <path d="M93.4519 0.606445H87.2012C85.2647 0.606445 83.8155 1.13495 82.9651 3.06763L70.9512 30.2662H79.4459C79.4459 30.2662 80.8346 26.6093 81.1487 25.8062C82.077 25.8062 90.3293 25.819 91.5089 25.819C91.7509 26.8581 92.4932 30.2662 92.4932 30.2662H99.9995L93.4519 0.606445ZM83.5342 19.7708C84.2034 18.0608 86.7574 11.4742 86.7574 11.4742C86.7098 11.5532 87.4216 9.75592 87.8299 8.64161L88.3767 11.2004C88.3767 11.2004 89.9257 18.2849 90.2494 19.7703H83.5342V19.7708Z" fill="#757575" />
    <path d="M0.103341 0.606445L0 1.22383C3.19784 1.99793 6.05397 3.11834 8.55454 4.5121L15.7325 30.2379L24.2915 30.2284L37.027 0.606445H28.4574L20.5377 20.8454L19.6941 16.7322C19.6546 16.6051 19.6116 16.4778 19.5677 16.3502L16.8145 3.11211C16.3249 1.23279 14.9047 0.67194 13.1478 0.606445H0.103341Z" fill="#757575" />
  </svg>
}

function MasterCardIcon() {
  return <svg width="100" height="62" viewBox="0 0 100 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M63.5202 55.1974H36.4785V6.60156H63.5202V55.1974Z" fill="#D9D9D9" />
    <path d="M38.1958 30.9015C38.1917 26.2217 39.2524 21.6023 41.2975 17.393C43.3426 13.1837 46.3185 9.49486 50 6.60569C45.4411 3.02288 39.9661 0.794898 34.2009 0.176359C28.4356 -0.442179 22.6127 0.573681 17.3975 3.10785C12.1822 5.64201 7.78514 9.59224 4.70868 14.5071C1.63222 19.422 0.000498629 25.1032 0 30.9015C0.00111269 36.6991 1.63302 42.3795 4.70928 47.2936C7.78553 52.2078 12.1821 56.1575 17.3966 58.6915C22.611 61.2255 28.4332 62.2416 34.1977 61.6238C39.9623 61.0059 45.4368 58.7789 49.9958 55.1974C46.3156 52.3074 43.3408 48.6182 41.2965 44.409C39.2521 40.1999 38.1919 35.5809 38.1958 30.9015Z" fill="#757575" />
    <path d="M100 30.9015C99.9995 36.6998 98.3678 42.3811 95.2913 47.2959C92.2149 52.2108 87.8178 56.161 82.6025 58.6952C77.3873 61.2294 71.5644 62.2452 65.7991 61.6267C60.0339 61.0082 54.5589 58.7802 50 55.1974C57.1875 49.539 61.8042 40.7599 61.8042 30.9015C61.8042 21.0432 57.1875 12.264 50 6.60569C54.5589 3.02288 60.0339 0.794897 65.7991 0.176359C71.5644 -0.442179 77.3873 0.573681 82.6025 3.10784C87.8178 5.64201 92.2149 9.59224 95.2913 14.5071C98.3678 19.422 99.9995 25.1032 100 30.9015Z" fill="#757575" />
  </svg>

}

function PaypalIcon() {
  return <svg width="75" height="22" viewBox="0 0 75 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.04164 0.820312H3.20399C2.80446 0.820312 2.46471 1.1113 2.40231 1.50694L0.0412596 16.5188C-0.00558836 16.8153 0.223223 17.0821 0.522803 17.0821H3.30966C3.7091 17.0821 4.04889 16.7912 4.11129 16.3949L4.74807 12.3458C4.80941 11.9495 5.1499 11.6585 5.54873 11.6585H7.39666C11.2421 11.6585 13.4613 9.79215 14.0411 6.09434C14.3022 4.4764 14.0521 3.20532 13.2965 2.31503C12.4669 1.33741 10.9953 0.820312 9.04164 0.820312ZM9.71502 6.3033C9.39574 8.40385 7.79531 8.40385 6.24791 8.40385H5.36682L5.98486 4.48064C6.02163 4.24357 6.22634 4.06891 6.46553 4.06891H6.86931C7.92348 4.06891 8.91789 4.06891 9.43163 4.67157C9.73818 5.03097 9.83187 5.56522 9.71502 6.3033Z" fill="#757575" />
    <path fillRule="evenodd" clipRule="evenodd" d="M26.6401 6.12216H23.8446C23.6064 6.12216 23.4005 6.29682 23.3639 6.53389L23.2401 7.31793L23.0448 7.03384C22.4397 6.15292 21.0899 5.8584 19.7432 5.8584C16.6538 5.8584 14.0155 8.20486 13.5016 11.4962C13.2345 13.138 13.6142 14.7081 14.543 15.8029C15.3949 16.8095 16.6139 17.229 18.064 17.229C20.5532 17.229 21.9332 15.624 21.9332 15.624L21.8087 16.4031C21.7619 16.7008 21.9906 16.9679 22.2885 16.9679H24.8064C25.2069 16.9679 25.5449 16.6769 25.6082 16.2806L27.119 6.6854C27.1667 6.38999 26.9387 6.12216 26.6401 6.12216ZM22.7432 11.5786C22.4736 13.1799 21.2062 14.2551 19.5893 14.2551C18.7777 14.2551 18.1291 13.994 17.7122 13.4994C17.2991 13.0081 17.1423 12.3087 17.2735 11.5297C17.5256 9.94177 18.8143 8.83139 20.4064 8.83139C21.2002 8.83139 21.8455 9.09621 22.2706 9.59492C22.6963 10.0991 22.8655 10.8029 22.7432 11.5786Z" fill="#757575" />
    <path fillRule="evenodd" clipRule="evenodd" d="M41.3136 6.3623H38.5044C38.2363 6.3623 37.9846 6.49595 37.8327 6.71941L33.9581 12.4426L32.3158 6.94269C32.2126 6.59849 31.896 6.3623 31.5374 6.3623H28.7771C28.4414 6.3623 28.2086 6.69112 28.3152 7.00792L31.4094 16.1141L28.5004 20.2325C28.2717 20.5569 28.502 21.0029 28.8973 21.0029H31.7031C31.9695 21.0029 32.2186 20.8726 32.3697 20.6538L41.713 7.12849C41.9368 6.80498 41.707 6.3623 41.3136 6.3623Z" fill="#757575" />
    <path fillRule="evenodd" clipRule="evenodd" d="M50.6781 0.820312H44.8398C44.4411 0.820312 44.1013 1.1113 44.0389 1.50694L41.678 16.5188C41.6311 16.8153 41.8599 17.0821 42.1578 17.0821H45.1539C45.432 17.0821 45.6701 16.8786 45.7136 16.6012L46.3838 12.3458C46.4452 11.9495 46.786 11.6585 47.1845 11.6585H49.0317C52.8778 11.6585 55.0963 9.79215 55.6769 6.09434C55.9389 4.4764 55.6871 3.20532 54.9315 2.31503C54.1026 1.33741 52.6319 0.820312 50.6781 0.820312ZM51.3517 6.3033C51.0333 8.40385 49.4327 8.40385 47.8844 8.40385H47.0045L47.6233 4.48064C47.6599 4.24357 47.863 4.06891 48.1029 4.06891H48.5066C49.5599 4.06891 50.5552 4.06891 51.069 4.67157C51.3755 5.03097 51.4685 5.56522 51.3517 6.3033Z" fill="#757575" />
    <path fillRule="evenodd" clipRule="evenodd" d="M68.2729 6.12216H65.479C65.2393 6.12216 65.0353 6.29682 64.9994 6.53389L64.8756 7.31793L64.6792 7.03384C64.0741 6.15292 62.7254 5.8584 61.3783 5.8584C58.2893 5.8584 55.6519 8.20486 55.1381 11.4962C54.8717 13.138 55.2497 14.7081 56.1783 15.8029C57.0322 16.8095 58.2492 17.229 59.6996 17.229C62.1885 17.229 63.5687 15.624 63.5687 15.624L63.4442 16.4031C63.3974 16.7008 63.6259 16.9679 63.9256 16.9679H66.4428C66.8415 16.9679 67.1811 16.6769 67.2435 16.2806L68.7552 6.6854C68.8013 6.38999 68.5724 6.12216 68.2729 6.12216ZM64.3764 11.5786C64.1084 13.1799 62.8391 14.2551 61.2222 14.2551C60.4122 14.2551 59.762 13.994 59.3451 13.4994C58.9323 13.0081 58.7767 12.3087 58.9063 11.5297C59.16 9.94177 60.4472 8.83139 62.0393 8.83139C62.8331 8.83139 63.4783 9.09621 63.9035 9.59492C64.331 10.0991 64.5 10.8029 64.3764 11.5786Z" fill="#757575" />
    <path fillRule="evenodd" clipRule="evenodd" d="M71.3376 1.23293L68.9417 16.5195C68.8948 16.816 69.1234 17.0828 69.4213 17.0828H71.8301C72.2306 17.0828 72.5702 16.7919 72.6315 16.3956L74.9942 1.38443C75.0414 1.08814 74.8125 0.820312 74.5146 0.820312H71.8174C71.5793 0.82102 71.3744 0.995857 71.3376 1.23293Z" fill="#757575" />
  </svg>
}