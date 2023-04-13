import { IoClose } from 'react-icons/io5'

export default function Header({
  collectionName,
  nftId,
  onClose,
}: {
  collectionName: string
  nftId: string
  onClose: () => void
}) {
  return (
    <div className="flex justify-between">
      <h4 className="text-xl">{`Create Listing for ${collectionName} #${nftId}`}</h4>
      <button onClick={onClose}>
        <IoClose size={24} />
      </button>
    </div>
  )
}
