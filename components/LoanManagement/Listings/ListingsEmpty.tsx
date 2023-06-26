const ListingsEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 mt-8">
      <img src="/niftyapes/glasses.png" alt="" />
      <div className="text-[#81859F] text-[11px]">
        You have no assets listed for BNPL, <br /> list your assets
      </div>
    </div>
   );
}
 
export default ListingsEmpty;