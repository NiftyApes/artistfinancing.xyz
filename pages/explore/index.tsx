import Layout from 'components/Layout'
import { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../../components/Footer'
import FeaturedFinancingOffers from '../../components/FeaturedFinancingOffers'

const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE
const META_DESCRIPTION = process.env.NEXT_PUBLIC_META_DESCRIPTION
const META_IMAGE = process.env.NEXT_PUBLIC_META_OG_IMAGE

const metadata = {
  title: (title: string) => <title>{title}</title>,
  description: (description: string) => (
    <meta name="description" content={description} />
  ),
  image: (image?: string) => {
    if (image) {
      return (
        <>
          <meta name="twitter:image" content={image} />
          <meta name="og:image" content={image} />
        </>
      )
    }
    return null
  },
}

const Explore: NextPage = () => {
  const title = META_TITLE && metadata.title(META_TITLE)
  const description = META_DESCRIPTION && metadata.description(META_DESCRIPTION)
  const image = metadata.image(META_IMAGE)

  return (
    <Layout navbar={{}}>
      <Head>
        {title}
        {description}
        {image}
      </Head>

      <div className="col-span-full mt-20 mb-20 flex flex-col items-center justify-center text-center">
        <div className="text-5xl">Collect with Financing</div>
        <div className="mt-5 text-xl font-thin text-gray-600">
          Flexible terms from premium artists.
        </div>
      </div>

      <div className="col-span-full mb-20">
        <div className="flex items-center justify-center px-12">
          <FeaturedFinancingOffers />
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Explore
