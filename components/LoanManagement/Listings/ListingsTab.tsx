import ListingItem from "./ListingItem";
import ListingsEmpty from "./ListingsEmpty";

const emptyItems: any = [];
const fullItems: any = [
  {
    listings: [{ expired: false }],
  },
  {
    listings: [{ expired: false }, { expired: false }, { expired: true }],
  },
  {
    listings: [{ expired: false}, { expired: true }],
  },
];

export const ListingsTab = () => {
  const items = fullItems;

  if (items.length === 0) {
    return (
      <ListingsEmpty />
    )
  }

  return ( 
    <div className="mt-6 space-y-5">
      {items.map((listing: any, i: number) => (
        <ListingItem listings={listing.listings} key={i} />
      ))}
    </div>
  );
};
