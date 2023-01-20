import { Button, ChakraProvider, GridItem } from '@chakra-ui/react'

export default function ListFinancing() {
  return (
    <Button as={GridItem} colSpan={2} colorScheme={'blue'}>
      List with Financing
    </Button>
  )
}
