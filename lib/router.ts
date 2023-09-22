import { NextRouter } from 'next/router'

function toggleOnItem(router: NextRouter, item: string, value: string) {
  router.push(
    {
      query: { ...router.query, [`${item}`]: value },
    },
    undefined,
    {
      shallow: true,
    }
  )
}

export { toggleOnItem }
