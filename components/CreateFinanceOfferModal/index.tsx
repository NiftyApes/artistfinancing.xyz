import * as Dialog from '@radix-ui/react-dialog'

export default function CreateFinanceOfferModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="btn-primary-fill">Create Offer</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title />
          <Dialog.Description />
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
