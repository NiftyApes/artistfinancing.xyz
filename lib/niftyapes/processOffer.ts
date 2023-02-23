import { format } from "date-fns";
import { DateTime } from "luxon";

import { Offer } from "hooks/niftyapes/useOffers";

function processOffer(offerDetails: Offer['offer']) {
  const tokenId = offerDetails.nftId;
  const contract = offerDetails.nftContractAddress;

  const price = parseInt(offerDetails?.price, 10);
  const downPaymentAmount = parseInt(offerDetails?.downPaymentAmount, 10);

  const data = {
    contract,
    tokenId,
    expiration:
      offerDetails?.expiration === 0
        ? 'Never'
        : DateTime.fromMillis(+`${offerDetails?.expiration}000`).toRelative(),
    id: offerDetails?.nftId,
    price,
    downPaymentAmount,
    periodDuration: format(new Date(offerDetails?.periodDuration * 1000), 'Pp'),
    address: offerDetails?.nftContractAddress,
    apr: offerDetails?.periodInterestRateBps,
    minPayment: Number(offerDetails?.minimumPrincipalPerPeriod) + (Number(offerDetails?.periodInterestRateBps) * Number(price - downPaymentAmount)),
  }

  const tokenHref = `/${data.contract}/${data.tokenId}`

  return { ...data, tokenHref }
}

export default processOffer;
