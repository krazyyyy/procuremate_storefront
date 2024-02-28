import { GetServerSideProps } from 'next';
import { medusaClient } from '@lib/config';
import Medusa from '@lib/services/api';
import { Gallery } from 'types/global';
import { fetchProductCategory } from '@lib/services/customizer';
import { medusaUrl } from '../lib/services/config';


type SitemapResponse = {
  products: string[]
  galleries: string[]
  collections: string[]
  categories: string[]
}

const fetchSitemapURLs = async (): Promise<SitemapResponse> => {
  try {
    const response = await fetch(medusaUrl + '/api/sitemap');
    const { status, data } = (await response.json());
    const { products, galleries, collections, categories } = data;
    return { products, galleries, collections, categories };
  } catch (error) {
    return {
      products: [],
      galleries: [],
      collections: [],
      categories: []
    }

  }
}


export const fetchGalleryList = async (): Promise<Gallery[]> => {
  try {
    const data = await Medusa.gallery.list()
    return data?.data?.gallery?.gallery;
  } catch {
    return []
  }
}

const generateSitemap = (baseUrl: string, urls: string[]) => {
  const currentDate = new Date().toISOString();
  const urlElements = urls.map((url) => {
    return `
      <url>
        <loc>${baseUrl}${url}</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
    `;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      
      ${urlElements.join('')}
      
    </urlset>`;

  return sitemapXml;
};

const getCategory = async (product_id?: string) => {
  const category = await fetchProductCategory(String(product_id))
  return category?.handle
};
const SitemapXml = () => null;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    // console.info("Starting")
    const host = req.headers.host || ''; // Get the host from the request headers
    // console.info(`Host : ${host}`)

    // // Fetch products and galleries from the Medusa API
    // const products = await medusaClient.products.list().then(({ products }) => products);
    // console.info(`Product Fetched`)
    // const collections = await medusaClient.collections.list().then(({ collections }) => collections);
    // console.info(`Collection Fetched`)
    // const galleries = await fetchGalleryList()
    // console.info(`Galleries Fetched`)
    // const categories = await fetchCategories()
    // console.info(`Categories Fetched`)
    // // Generate URLs for products and gallery items
    // // const productUrlPromises = products.map(async (product) => {
    // //   const categoryHandle = await getCategory(product?.id);
    // //   return `/${product?.collection?.handle}/${categoryHandle ?? "default"}/${product?.handle}`;
    // // });

    // // const productUrls = await Promise.all(productUrlPromises);
    // const collectionHandlesUrls = collections.map((product) => `/${product?.handle}`);


    // const collectionUrls = collections.map((product) => `/collections/${product.id}`);
    // console.info(`Collection Mapped`)
    // const galleryItemUrls = galleries.map((gal) => `/gallery/${gal.handle}`);
    // console.info(`Gallery Mapped`)
    // const categoryUrls = categories.map((gal) => `/${gal.handle}`);
    // const collectionCategoryURL = []
    // const productUrls = [] as any
    // for (const c of categories) {
    //   const cat = await fetchCategory(`${c?.id}`);
    //   if (cat.length !== 0) {
    //     collectionCategoryURL.push(`/${cat[0]?.collection?.handle}/${c?.handle}`)
    //     const mappedCats = cat.map((p: Product) => {
    //       productUrls.push(`/${p?.collection?.handle}/${c?.handle}/${p?.handle}`)
    //       // Add any other properties you want to map here
    //     });
    //   }

    // }

    const { products, galleries, collections, categories } = await fetchSitemapURLs()
    // Additional specific URLs
    const additionalUrls = [
      '/',
      '/blog/',
      '/products',
      '/gallery',
      '/size-chart',
      '/account/login',
      '/account/login#register',
    ];

    // Combine all URLs
    const allUrls = [
      ...additionalUrls,
      ...collections,
      ...categories,
      ...products,
      ...galleries,
      // ...categoryUrls,
      // ...collectionUrls,
    ];
    // console.info("Array Created")
    const sitemapXmlContent = generateSitemap(`https://${host}`, allUrls);
    // console.info("Sitemap Done")

    res.setHeader('Content-Type', 'text/xml');
    console.info("Header Set")
    res.write(sitemapXmlContent);
    res.end();
  } catch (error) {
    console.error('Error fetching data:', error);
    // res.status(500).end();
  }

  return {
    props: {},
  };
};

export default SitemapXml;