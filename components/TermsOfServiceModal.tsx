import React, { useCallback, useEffect, useState } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import Modal from 'components/Modal'
import Button from 'components/Button'

const STORAGE_KEY = 'TOS_SRU'

const TermsOfServiceModal: React.FC = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  const [value, setValue] = useLocalStorage(STORAGE_KEY, false)

  useEffect(() => {
    if (!value) {
      setOpen(true)
    }
  }, [value])

  const handleAction = useCallback(() => {
    setValue(true)
    onClose()
  }, [setValue, onClose])

  return (
    <Modal open={open} onOpenChange={setOpen} preventCloseOnOutsideClick>
      <div className="flex max-w-2xl flex-col space-y-8 p-4">
        <h4 className="text-xl font-bold text-black">Terms of Service</h4>
        <div className="text-black">
          {
            'Your use of the NiftyApes App is expressly conditioned on your acceptance of the NiftyApes '
          }
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href="https://blog.niftyapes.money/legal-privacy-tos/"
          >
            Terms of Service
          </a>
          {' and '}
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href="https://blog.niftyapes.money/legal-privacy-tos/"
          >
            Privacy Policy
          </a>
          . By clicking accept and close, you indicate that you have read and
          agree to the NiftyApes Terms of Service and Privacy Policy, and that
          you consent to collection, storage and use of your personal
          information for the purposes set forth in the Privacy Policy.
        </div>
        <div className="w-64 self-end">
          <Button variant="secondary" onClick={handleAction}>
            Accept
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default TermsOfServiceModal
