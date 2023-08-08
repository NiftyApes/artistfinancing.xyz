import Layout from 'components/Layout'
import { NextPage } from 'next'
import Head from 'next/head'

import { TokenDetails } from 'types/reservoir'
import FeaturedFinancingOffers from '../../components/FeaturedFinancingOffers'
import Footer from '../../components/Footer'

type Props = {
  collectionId: string
  tokenDetails?: TokenDetails
}
const Explore: NextPage<Props> = () => {

  return (
    <Layout navbar={{}}>
      <Head>
        {'Explore'}
        {'Explore'}
      </Head>

      <div className='col-span-full mt-20 mb-20'>

        <div className='font-extrabold text-3xl mb-[48px] ml-20'>Buy Now</div>
        <div className='flex items-center justify-center px-4'>
          <FeaturedFinancingOffers />
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Explore
