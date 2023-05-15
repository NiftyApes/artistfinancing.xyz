import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import CreateFinanceOfferModal from 'components/CreateFinanceOfferModal'
import EthAccount from 'components/EthAccount'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { setToast } from 'components/token/setToast'
import { useNftOwnership } from 'hooks/niftyapes/useNftOwnership'
import { useOffers } from '@niftyapes/sdk'
import { FinancingTerms, processOffer } from 'lib/niftyapes/processOffer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { Collection } from 'types/reservoir'
import { Address, useAccount } from 'wagmi'
import BuyNowPayLaterModal from './bnpl/BuyNowPayLaterModal'
import CancelListingModal from './cancel-listing/CancelListingModal'

export default function FinancingSection({
  token,
  collection,
  isOwner,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
  collection?: Collection
  isOwner: boolean
}) {
  const router = useRouter()
  const { contract } = router.query
  const collectionId = collection?.id || (contract as string)

  const {
    data: offerData,
    isError,
    isLoading: isLoadingOffers,
    refetch,
  } = useOffers({
    collection: collectionId,
    nftId: token?.token?.tokenId,
  })
  // Get most recent active listing where offer creator and nft owner are the same
  const listing = offerData?.filter(
    (offer) => offer.status === 'ACTIVE' /* && */
    // isEqualAddress(offer.offer.creator, token?.token?.owner)
  )[0]
  const terms = listing ? processOffer(listing.offer) : null

  if (isError) {
    setToast({
      kind: 'error',
      message: 'An error occurred while checking for current listing.',
      title: 'Failed to load listing',
    })
  }

  const { address } = useAccount()
  const { isEntitledToNft, isLoadingTokens: isLoadingOwnershipCheck } =
    useNftOwnership()
  const isNiftyApesOwned = isEntitledToNft(
    token?.token?.contract as Address,
    token?.token?.tokenId
  )

  return (
    <div className="col-span-full md:col-span-4 lg:col-span-5 lg:col-start-2">
      <article className="col-span-full rounded-2xl border border-gray-300 bg-white p-6 dark:border-neutral-600 dark:bg-black">
        <VStack w="full" align="left" spacing="8">
          {isLoadingOffers || isLoadingOwnershipCheck ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : isNiftyApesOwned ? (
            <VStack spacing="4">
              <VStack w="full" align="left" spacing="0">
                <Heading size="md">Purchased with Financing</Heading>
                <HStack>
                  <Text>on NiftyApes</Text>
                  <Image
                    borderRadius="md"
                    boxSize="1.5rem"
                    src="/niftyapes/banana.png"
                    alt="NiftyApes banana logo"
                  />
                </HStack>
              </VStack>
              <VStack w="full" align="left">
                <HStack>
                  <div className="reservoir-h6 font-headings dark:text-white">
                    Owner
                  </div>
                  <Tooltip
                    hasArrow
                    placement="right"
                    label="You are entitled to this NFT once your loan is paid in full."
                  >
                    <span>
                      <Icon boxSize={'5'} as={IoInformationCircleOutline} />
                    </span>
                  </Tooltip>
                </HStack>
                <Link href={`/address/${address}`} legacyBehavior={true}>
                  <a>
                    <EthAccount address={address} side="left" />
                  </a>
                </Link>
              </VStack>
            </VStack>
          ) : (
            <>
              <VStack w="full" align="left" spacing="0">
                <Heading size="md">
                  {isOwner ? 'List with financing' : 'Buy now, pay later'}
                </Heading>
                <HStack>
                  <Text>on NiftyApes</Text>
                  <Image
                    borderRadius="md"
                    boxSize="1.5rem"
                    src="/niftyapes/banana.png"
                    alt="NiftyApes banana logo"
                  />
                </HStack>
              </VStack>
              {listing && <CurrentListing terms={terms!} isOwner={isOwner} />}
              {isOwner ? (
                <HStack>
                  <CreateFinanceOfferModal token={token} />
                  {/* <ListFinancingModal
                    token={token}
                    collection={collection}
                    currListingExists={listing ? true : false}
                    roundedButton={true}
                  /> */}
                  {listing && (
                    <CancelListingModal offer={listing} refetch={refetch} />
                  )}
                </HStack>
              ) : listing ? (
                <BuyNowPayLaterModal
                  token={token}
                  roundedButton={true}
                  offer={listing}
                />
              ) : (
                <Box>No current finance listings</Box>
              )}
            </>
          )}
        </VStack>
      </article>
    </div>
  )
}

function CurrentListing({
  terms,
  isOwner,
}: {
  terms: FinancingTerms
  isOwner: boolean
}) {
  return (
    <VStack w="full" align="left" spacing="4">
      <Heading size="sm">
        {isOwner ? 'Your current listing' : 'Current listing'}
      </Heading>
      <Grid rowGap="2" columnGap="12" templateColumns={'1fr 1fr'}>
        <GridItem>
          <HStack justify="space-between">
            <Text>Down payment</Text>
            <FormatNativeCrypto amount={terms.downPaymentAmount} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Price</Text>
            <FormatNativeCrypto amount={terms.listPrice} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Minimum principal</Text>
            <FormatNativeCrypto amount={terms.minPrincipalPerPeriod} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Pay period</Text>
            <Text fontWeight="semibold">{`${terms.payPeriodDays} days`}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>APR</Text>
            <Text fontWeight="semibold">{`${terms.apr}%`}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Total cost</Text>
            <FormatNativeCrypto amount={terms.totalCost} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Loan duration</Text>
            <Text fontWeight="semibold">{`${terms.loanDurMos} months`}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Expires</Text>
            <Text fontWeight="semibold">{terms.expirationRelative}</Text>
          </HStack>
        </GridItem>
      </Grid>
    </VStack>
  )
}
