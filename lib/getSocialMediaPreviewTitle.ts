const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE

export function getSocialMediaPreviewTitle() {
  return `Powered by ${META_TITLE}`
}
