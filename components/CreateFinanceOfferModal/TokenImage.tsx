import { optimizeImage } from 'lib/optmizeImage'

const TokenImage = ({ imageSrc }: { imageSrc?: string }) => (
  <div className="flex flex-col space-y-2">
    <img
      alt="Token Image"
      className="h-[200px] w-[200px] object-contain"
      src={optimizeImage(imageSrc, 200)}
    />
    <div className="flex justify-between px-2">
      <p className="text-xs text-gray-500">Previous Sale</p>
      <p className="text-sm font-bold text-gray-500">0.84 ETH</p>
    </div>
  </div>
)

export default TokenImage
