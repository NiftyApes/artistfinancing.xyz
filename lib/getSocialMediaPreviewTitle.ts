const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE

// This used to be "Powered by META_TITLE"
export function getSocialMediaPreviewTitle() {
  return `${META_TITLE}`
}
