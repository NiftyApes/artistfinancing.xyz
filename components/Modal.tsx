import * as Dialog from '@radix-ui/react-dialog'

const Modal = (props: Dialog.DialogProps) => (
  <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed top-[50%] left-[50%] z-[1001] max-h-screen translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        {props.children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export default Modal
