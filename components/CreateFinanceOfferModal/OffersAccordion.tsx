import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'
import Checkbox from 'components/Checkbox'
import React, { useContext } from 'react'
import { IoAddSharp, IoChevronDown } from 'react-icons/io5'
import { processTerms } from './lib/processTerms'
import OfferForm from './OfferForm'
import NumberInput from './NumberInput'
import { CreateOffersStore } from './store'

/** 
  TODO: Refactor components so that the <Checkbox> <button>
  component is not a descendant of the <AccordionTrigger> <button>
  which creates a warning in the console.
**/
const OffersAccordion = () => {
  const { state, dispatch } = useContext(CreateOffersStore)

  const preventAccordionTrigger = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
  }

  return (
    <Accordion.Root className="m-[1px] bg-mauve6" type="single" collapsible>
      <AccordionItem value="buy-now">
        <AccordionTrigger noContent={true}>
          <div className="flex items-center space-x-16">
            <div className="flex w-[180px] items-center space-x-4">
              <Checkbox
                className="flex-shrink-0"
                onClick={preventAccordionTrigger}
                defaultChecked={state.buyNow.enabled}
                onCheckedChange={(checked: boolean | 'indeterminate') => {
                  if (checked !== 'indeterminate') {
                    dispatch({
                      type: 'update_buy_now',
                      payload: { key: 'enabled', value: checked },
                    })
                  }
                }}
              />
              <div className="h-[46px] w-[150px]">
                <NumberInput
                  descriptor="ETH"
                  defaultValue={state.buyNow.price}
                  formError={state.buyNow.formErrors['price']}
                  onChange={(valueAsString) => {
                    dispatch({
                      type: 'update_buy_now',
                      payload: { key: 'price', value: valueAsString },
                    })
                  }}
                />
              </div>
            </div>
            <p className="text-gray-600">Buy Now Price</p>
          </div>
        </AccordionTrigger>
      </AccordionItem>

      {state.batch.map((offerTerms, idx) => {
        const handleFormChange = (key: string, value: string | boolean) => {
          dispatch({
            type: 'update_batch_form_value',
            payload: {
              idx,
              key,
              value,
            },
          })
        }

        const processedTerms = processTerms(offerTerms)

        return (
          <AccordionItem key={idx} value={`batch-offer-${idx}`}>
            <AccordionTrigger>
              <div className="flex items-center space-x-16">
                <div className="flex w-[180px] items-center space-x-4">
                  <Checkbox
                    onClick={preventAccordionTrigger}
                    defaultChecked={state.batch[idx].enabled}
                    onCheckedChange={(checked: boolean | 'indeterminate') => {
                      if (checked !== 'indeterminate') {
                        handleFormChange('enabled', checked)
                      }
                    }}
                  />
                  <p className="text-gray-600">
                    {processedTerms.duration || '-'} Day Financing
                  </p>
                </div>
                <div className="flex space-x-2 rounded-full border border-black px-3 py-2">
                  <p className="font-semibold">{processedTerms.saleTotal}</p>
                  <p className="text-gray-600">Sale Total</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <OfferForm
                terms={offerTerms}
                handleFormChange={handleFormChange}
                formErrors={offerTerms.formErrors}
              />
            </AccordionContent>
          </AccordionItem>
        )
      })}

      <AccordionItem value="add" isButton={true}>
        <AccordionTrigger
          noContent={true}
          isButton={true}
          onClick={() => {
            dispatch({ type: 'add_new_batch_offer' })
          }}
        >
          <div className="flex w-[180px] items-center space-x-4">
            <div className="flex h-5 w-5 items-center justify-center border border-black">
              <IoAddSharp />
            </div>
            <p className="text-gray-600">Add Custom Offer</p>
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </Accordion.Root>
  )
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Accordion.Item>,
  React.ComponentPropsWithoutRef<typeof Accordion.Item> & { isButton?: Boolean }
>(({ children, className, isButton, ...props }, forwardedRef) => (
  <Accordion.Item
    className={clsx(
      'mt-px overflow-hidden first:mt-0',
      className,
      !isButton &&
        'focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_1px]'
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
))

AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Accordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger> & {
    isButton?: Boolean
    noContent?: Boolean
  }
>(({ children, className, noContent, isButton, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={clsx(
        'group flex flex-1 items-center justify-between bg-white px-5 py-8 leading-none shadow-[0_1px_0] outline-none',
        className,
        !isButton && 'cursor-default',
        isButton && 'cursor-pointer hover:bg-gray-100'
      )}
      ref={forwardedRef}
      {...props}
    >
      {children}
      {!noContent && (
        <IoChevronDown
          className="h-6 w-6 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
          aria-hidden
        />
      )}
    </Accordion.Trigger>
  </Accordion.Header>
))

AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Accordion.Content>,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={clsx(
      'bg-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="px-5 py-4">{children}</div>
  </Accordion.Content>
))

AccordionContent.displayName = 'AccordionContent'

export default OffersAccordion
