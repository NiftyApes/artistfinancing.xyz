import { Button, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import LoadingDots from '../LoadingDots'

export default function WalletApproval({
  imageSrc,
  tokenName,
  onApprove,
}: {
  imageSrc: string
  tokenName: string
  onApprove: () => void
}) {
  return (
    <VStack h="full" justify="space-between">
      <VStack justify="center" spacing="10" flexGrow={1}>
        <Heading
          size={'md'}
          textAlign="center"
        >{`Approve ${window.location.hostname} (on NiftyApes) to access item in your wallet`}</Heading>
        <HStack spacing="6">
          <Image
            borderRadius="md"
            boxSize="80px"
            src={imageSrc}
            alt={tokenName}
          ></Image>
          <LoadingDots />
          <Image
            borderRadius="md"
            boxSize="80px"
            src="/niftyapes/NA-BLACK.png"
          />
        </HStack>
        <Text align="center">
          Each NFT collection you want to trade requires a one-time approval
          transaction
        </Text>
      </VStack>
      <Button
        isLoading
        loadingText="Waiting for Approval"
        colorScheme="blue"
        w="full"
      ></Button>
    </VStack>
  )
}
