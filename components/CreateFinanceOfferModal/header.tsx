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
    <div className="flex justify-between text-black">
      <header>{`Create Listing for ${collectionName} #${nftId}`}</header>
      <button onClick={onClose}>
        <IoClose size={24} />
      </button>
    </div>
  )
}
