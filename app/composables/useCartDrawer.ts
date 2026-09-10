export function useCartDrawer() {
  const isCartOpen = useState(
    'cart-drawer-open',
    () => false,
  )

  function openCart() {
    isCartOpen.value = true
  }

  function closeCart() {
    isCartOpen.value = false
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  return {
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  }
}