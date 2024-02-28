import { Inter, Montserrat, Roboto } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: false,
})

export const roboto_mono = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  preload: false,
  weight: ['300', '400', '500', '700'],
})
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})