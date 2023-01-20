import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Inter',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
      },
    },
  },
})

export default theme
