import { extendTheme } from '@chakra-ui/react'

/**
 * NOTE: Use of !important in some styles is to override global css rules from
 * libraries which we don't control. As we shift to take over more and more of
 * this marketplace code, we can remove !important once all styling is
 * consolidated.
 **/
const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Inter',
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        margin: '0 !important',
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        cursor: 'pointer',
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'gray.800',
        },
      },
    },
    FormLabel: {
      baseStyle: {
        fontSize: 'sm',
      },
    },
  },
})

export default theme
