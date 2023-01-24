import { Icon, Text, HStack, VStack, Tooltip } from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import getAttributeFloor from 'niftyapes/util/getAttributeFloor'
import { IoInformationCircleOutline } from 'react-icons/io5'

export default function TokenStats({
  token,
  collection,
}: {
  token: any
  collection: any
}) {
  const attributeFloor = getAttributeFloor(token?.token?.attributes)

  return (
    <VStack align={'left'} w="full">
      <Stat
        text="Creator Royalties"
        tooltipText="A fee on every order that goes to the collection creator."
        value={(collection.royalties?.bps || 0) * 0.01 + '%'}
      />
      <Stat
        text="Last Sale"
        value={token?.token?.lastSell?.value}
        asNative={true}
      />
      <Stat
        text="Collection Floor"
        value={collection?.floorAsk?.price?.amount?.native || 0}
        asNative={true}
      />
      <Stat
        text="Highest Trait Floor"
        tooltipText="The floor price of the most valuable trait of a token."
        value={
          attributeFloor || collection?.floorAsk?.price?.amount?.native || 0
        }
        asNative={true}
      />
    </VStack>
  )
}

function Stat({
  text,
  tooltipText,
  value,
  asNative = false,
}: {
  text: string
  tooltipText?: string
  value?: string | number
  asNative?: boolean
}) {
  return (
    <HStack bg="gray.700" p="2" borderRadius="md" justify="space-between">
      <HStack>
        <Text fontSize="sm">{text}</Text>
        {tooltipText && (
          <Tooltip hasArrow placement="right" label={tooltipText}>
            <span>
              <Icon as={IoInformationCircleOutline} />
            </span>
          </Tooltip>
        )}
      </HStack>
      {asNative ? (
        <FormatNativeCrypto amount={value} maximumFractionDigits={4} />
      ) : (
        <Text fontWeight="semibold" fontSize="md">
          {value || '-'}
        </Text>
      )}
    </HStack>
  )
}
