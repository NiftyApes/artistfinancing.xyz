import Link from 'next/link'

const FOOTER_ENABLED = process.env.NEXT_PUBLIC_FOOTER_ENABLED == 'true'

const Footer = () => {
  if (FOOTER_ENABLED)
    return (
      <footer className='lg:flex col-span-full bg-white p-20 text-black text-sm'>


        <div>
          <img src='/niftyapes/sru-logo-footer.svg' />
          <div className='italic mt-[8px]'>Powered by NiftyApes</div>
          <div className='flex space-x-[15px] mt-[8px]'>
            <div><img src='/icons/twitter-plain.svg' /></div>
            <div><img src='/icons/discord-plain.svg' /></div>
          </div>
        </div>


        <div className='flex items-center justify-center ml-auto space-x-[20px]'>
          <div className="flex items-center justify-center">
            <Link
              href='https://www.niftyapes.money/#top'
              legacyBehavior={true}
            >
              <a target='_blank' rel='noreferrer'>
                SDK
              </a>
            </Link>
            <div className='uppercase border border-black rounded-[5px] text-[8px] px-[5px] ml-2'>new</div>
          </div>
          <div className='border-t border-r border-gray-200 h-[16px]'></div>
          <Link href='https://app.niftyapes.money/' legacyBehavior={true}>
            <a className='min-w-max' target='_blank' rel='noreferrer'>
              Lending App
            </a>
          </Link>
          <div className='border-t border-r border-gray-200 h-[16px]'></div>
          <div>Blog</div>
          <div className='border-t border-r border-gray-200 h-[16px]'></div>
          <div>Contracts</div>
          <div className='border-t border-r border-gray-200 h-[16px]'></div>
          <div>FAQ</div>
          <div className='border-t border-r border-gray-200 h-[16px]'></div>
          <div>Docs</div>
          <div className='border-t border-r border-gray-200 h-[16px]'></div>
          <div>Terms of Service</div>
        </div>
      </footer>
    )

  return null
}

export default Footer
