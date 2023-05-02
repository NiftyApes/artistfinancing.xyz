const Footer = ({ footerText }: { footerText?: string }) => {
  return (
    <div className="flex items-center justify-between">
      <i className="text-sm">{footerText}</i>
      <div className="flex space-x-8 self-end">
        <button className="rounded-full text-sm font-bold uppercase hover:underline hover:underline-offset-4">
          Nevermind
        </button>
        <button className="rounded-full border-2 border-black px-8 py-3 text-sm font-bold uppercase hover:bg-black hover:text-white">
          Create Listing
        </button>
      </div>
    </div>
  )
}

export default Footer
