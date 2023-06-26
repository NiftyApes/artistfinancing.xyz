import FormatNativeCrypto from "components/FormatNativeCrypto";

export const CurrencyBox = ({ amount, label }: { amount: number, label: string }) => (
  <div className="w-[110px] h-[100px] rounded-xl bg-[#16141E] flex flex-col items-center justify-center gap-y-1">
    <FormatNativeCrypto amount={amount} />
    <p className="text-[11px] text-[#81859F]">{label}</p>
  </div>
);
