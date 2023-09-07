import { optimizeImage } from 'lib/optmizeImage'
import Script from 'next/script'
import { SuperRareToken } from 'pages/api/superrare/token'
import { FC, MouseEvent } from 'react'
import { TokenDetails } from 'types/reservoir'

type Props = {
  token?: TokenDetails
  srToken?: SuperRareToken
  isLaserLewDudeFocus?: boolean
}

const TokenMedia: FC<Props> = ({ token, srToken, isLaserLewDudeFocus }) => {
  let tokenImage = isLaserLewDudeFocus
    ? '/art/Focus.webp'
    : token?.image
    ? optimizeImage(token?.image, 533)
    : '/niftyapes/placeholder.png'

  if (
    !isLaserLewDudeFocus &&
    srToken?.erc721_token?.nft_image.image_artwork_detail
  ) {
    tokenImage = srToken.erc721_token.nft_image.image_artwork_detail
  }

  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      />
      <Script
        noModule
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
      />

      <Media
        media={token?.media}
        tokenImage={tokenImage}
        tokenAlt={token?.name || `#${token?.tokenId}`}
      />
    </>
  )
}

export default TokenMedia

const Media: FC<{
  media?: string | null
  tokenImage: string
  tokenAlt: string
}> = ({ media, tokenImage, tokenAlt }) => {
  const replacedElemClass =
    'max-h-full max-w-full object-contain cursor-pointer'

  const openFullscreen = (elem: HTMLImageElement) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    }
  }
  const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
    openFullscreen(event.target as HTMLImageElement)
  }

  // Media not present, use image provided
  if (media === null || media === undefined) {
    return (
      <img
        onClick={handleImageClick}
        className={replacedElemClass}
        src={tokenImage}
        alt={tokenAlt}
      />
    )
  }

  const matches = media?.match('(\\.[^.]+)$')
  const extension = matches ? matches[0].replace('.', '') : null

  //Image
  if (
    extension === 'png' ||
    extension === 'jpeg' ||
    extension === 'jpg' ||
    extension === 'gif'
  ) {
    return (
      <img
        onClick={handleImageClick}
        className={replacedElemClass}
        src={tokenImage}
        alt={tokenAlt}
      />
    )
  }

  // VIDEO
  if (extension === 'mp4') {
    return (
      <video
        className={replacedElemClass}
        poster={tokenImage}
        controls
        autoPlay
        loop
        playsInline
        muted
      >
        <source src={media} type="video/mp4" />
        Your browser does not support the
        <code>video</code> element.
      </video>
    )
  }

  // AUDIO
  if (extension === 'wav' || extension === 'mp3') {
    return (
      <div>
        <img className={replacedElemClass} alt={tokenAlt} src={tokenImage} />
        <audio controls src={media}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    )
  }

  // 3D
  if (extension === 'gltf' || extension === 'glb') {
    return (
      <model-viewer
        src={media}
        ar
        ar-modes="webxr scene-viewer quick-look"
        poster={tokenImage}
        seamless-poster
        shadow-intensity="1"
        camera-controls
        enable-pan
        className={replacedElemClass}
      />
    )
  }

  // HTML
  if (
    extension === 'html' ||
    extension === undefined ||
    extension === 'other'
  ) {
    return (
      <iframe
        className={replacedElemClass}
        src={media}
        sandbox="allow-scripts"
      />
    )
  }

  return (
    <img
      onClick={handleImageClick}
      className={replacedElemClass}
      src={tokenImage}
      alt={tokenAlt}
    />
  )
}
