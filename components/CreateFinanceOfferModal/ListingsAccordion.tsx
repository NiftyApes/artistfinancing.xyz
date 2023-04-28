import React from 'react'
import clsx from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import { IoChevronDown } from 'react-icons/io5'
import ListingForm from './ListingForm'
import Checkbox from 'components/Checkbox'

const ListingsAccordion = () => (
  <Accordion.Root
    className="rounded-md bg-mauve6 shadow-[0_2px_10px] shadow-black/5"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <div className="flex items-center space-x-4">
          <Checkbox />
          <div>30 Day Financing</div>
          <div className="flex space-x-2 rounded-full border border-black px-3 py-2">
            <p className="font-semibold">4.51</p>
            <p className="text-gray-600">Sale Price</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ListingForm />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>Is it unstyled?</AccordionTrigger>
      <AccordionContent>
        <ListingForm />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>Can it be animated?</AccordionTrigger>
      <AccordionContent>
        <ListingForm />
      </AccordionContent>
    </AccordionItem>
  </Accordion.Root>
)

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Accordion.Item>,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={clsx(
      'mt-px overflow-hidden first:mt-0 first:rounded-t focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
      className
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
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={clsx(
        'group flex flex-1 cursor-default items-center justify-between bg-white px-5 py-10 leading-none shadow-[0_1px_0] outline-none',
        className
      )}
      ref={forwardedRef}
      {...props}
    >
      {children}
      <IoChevronDown
        className="h-6 w-6 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
        aria-hidden
      />
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
      'overflow-hidden bg-mauve2 text-[15px] text-mauve11 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
))

AccordionContent.displayName = 'AccordionContent'

export default ListingsAccordion
