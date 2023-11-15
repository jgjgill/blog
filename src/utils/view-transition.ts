export function viewTransition(callback: () => void) {
  if (!document.startViewTransition) {
    callback()
  }

  document.startViewTransition(() => {
    callback()
  })
}
