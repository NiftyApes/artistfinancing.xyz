export default function getAttributeFloor(attributes: any) {
  return attributes
    ? Math.max(...attributes.map((attr: any) => Number(attr.floorAskPrice)), 0)
    : 0
}
