export function isMobileViewport(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches
  )
}
