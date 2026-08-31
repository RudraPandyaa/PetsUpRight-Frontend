<script setup lang="ts">
import { ref, computed } from 'vue'
import CartDrawer from '~/components/cart layout/cartlayout.vue'

const isMobileMenuOpen = ref(false)
const isDogsOpen = ref(false)
const isCatsOpen = ref(false)
const isCartOpen = ref(false)
const searchQuery = ref('')

/*
|--------------------------------------------------------------------------
| GLOBAL CART
|--------------------------------------------------------------------------
*/
interface CartItem {
  id: number | string
  name: string
  image: string
  price: number
  quantity: number
  originalPrice?: number
  discount?: number
}

const cart = useState<CartItem[]>('cart', () => [])

/*
|--------------------------------------------------------------------------
| GLOBAL WISHLIST
|--------------------------------------------------------------------------
*/
interface WishlistItem {
  id: number | string
  name: string
  image: string
  price: number
}

const wishlist = useState<WishlistItem[]>('wishlist', () => [])

/*
|--------------------------------------------------------------------------
| DYNAMIC COUNTS
|--------------------------------------------------------------------------
*/
const cartCount = computed(() =>
  cart.value.reduce((total, item) => total + item.quantity, 0)
)

const wishlistCount = computed(() => wishlist.value.length)
</script>

<template>
  <header class="sticky top-0 z-50">
    <!-- Top utility bar -->
    <div class="bg-[#44476f] text-white text-xs md:text-sm">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-9">
          <nav class="hidden sm:flex items-center gap-6">
            <NuxtLink to="/store-locator" class="hover:text-[#c3b5df] transition">
              Store Locator
            </NuxtLink>
            <NuxtLink to="/track-order" class="hover:text-[#c3b5df] transition">
              Track Order
            </NuxtLink>
          </nav>
          <div class="ml-auto font-semibold tracking-wide">
            UP TO 60% OFF
          </div>
        </div>
      </div>
    </div>

    <!-- Main nav bar -->
    <div class="bg-white border-b border-[#ede7e7]">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-6 h-16 md:h-20">

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 shrink-0">
            <span class="text-2xl font-bold tracking-tight text-[#44476f]">
              Pets<span class="text-[#c3b5df]">U</span>pright
            </span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-6 flex-1">
            <!-- Dogs dropdown -->
            <div class="relative" @mouseenter="isDogsOpen = true" @mouseleave="isDogsOpen = false">
              <button
                class="flex items-center gap-1 text-sm font-semibold text-[#1a1a2e] hover:text-[#44476f] transition">
                Dogs
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="isDogsOpen"
                class="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md border border-[#ede7e7] py-2">
                <NuxtLink to="/shop?pet=dog&cat=food" class="block px-4 py-2 text-sm text-[#44476f] hover:bg-[#ede7e7]">
                  Food</NuxtLink>
                <NuxtLink to="/shop?pet=dog&cat=toys" class="block px-4 py-2 text-sm text-[#44476f] hover:bg-[#ede7e7]">
                  Toys</NuxtLink>
                <NuxtLink to="/shop?pet=dog&cat=grooming"
                  class="block px-4 py-2 text-sm text-[#44476f] hover:bg-[#ede7e7]">Grooming</NuxtLink>
                <NuxtLink to="/shop?pet=dog&cat=accessories"
                  class="block px-4 py-2 text-sm text-[#44476f] hover:bg-[#ede7e7]">Accessories</NuxtLink>
              </div>
            </div>

            <!-- Cats dropdown -->
            <div class="relative" @mouseenter="isCatsOpen = true" @mouseleave="isCatsOpen = false">
              <button
                class="flex items-center gap-1 text-sm font-semibold text-[#1a1a2e] hover:text-[#44476f] transition">
                Cats
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="isCatsOpen"
                class="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md border border-[#ede7e7] py-2">
                <NuxtLink to="/shop?pet=cat&cat=food" class="block px-4 py-2 text-sm text-[#44476f] hover:bg-[#ede7e7]">
                  Food</NuxtLink>
                <NuxtLink to="/shop?pet=cat&cat=toys" class="block px-4 py-2 text-sm text-[#44476f] hover:bg-[#ede7e7]">
                  Toys</NuxtLink>
                <NuxtLink to="/shop?pet=cat&cat=litter"
                  class="block px-4 py-2 text-sm text-[#44476f] hover:bg-[#ede7e7]">Litter</NuxtLink>
                <NuxtLink to="/shop?pet=cat&cat=accessories"
                  class="block px-4 py-2 text-sm text-[#44476f] hover:bg-[#ede7e7]">Accessories</NuxtLink>
              </div>
            </div>

            <NuxtLink to="/new-arrivals"
              class="text-sm font-semibold text-[#1a1a2e] hover:text-[#44476f] transition whitespace-nowrap">
              New Arrivals
            </NuxtLink>
            <NuxtLink to="/trending"
              class="text-sm font-semibold text-[#1a1a2e] hover:text-[#44476f] transition whitespace-nowrap">
              Trending Now
            </NuxtLink>
            <NuxtLink to="/combo-deals"
              class="text-sm font-semibold text-[#1a1a2e] hover:text-[#44476f] transition whitespace-nowrap">
              Combo Deals
            </NuxtLink>
            <NuxtLink to="/offers"
              class="text-sm font-semibold text-red-500 hover:text-red-600 transition whitespace-nowrap">
              Offers
            </NuxtLink>
            <NuxtLink to="/brands"
              class="text-sm font-semibold text-[#1a1a2e] hover:text-[#44476f] transition whitespace-nowrap">
              Brands
            </NuxtLink>
          </nav>

          <!-- Search -->
          <div class="hidden lg:flex items-center flex-1 max-w-xs">
            <div class="relative w-full">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input v-model="searchQuery" type="text" placeholder="Search for food, toys, grooming essentials..."
                class="w-full bg-[#f5f4f7] rounded-full pl-9 pr-4 py-2 text-sm text-[#44476f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c3b5df]" />
            </div>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-4 shrink-0">
            <NuxtLink
  to="/wishlist"
  class="relative p-1 text-[#1a1a2e] hover:text-[#44476f] transition"
  aria-label="Wishlist"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>

  <span
    v-if="wishlistCount > 0"
    class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#44476f] text-[10px] font-bold text-white"
  >
    {{ wishlistCount }}
  </span>
</NuxtLink>

            <button
  type="button"
  class="relative p-1 text-[#1a1a2e] hover:text-[#44476f] transition"
  aria-label="Cart"
  @click.stop="isCartOpen = true"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707-1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>

  <span
    v-if="cartCount > 0"
    class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#44476f] text-[10px] font-bold text-white"
  >
    {{ cartCount }}
  </span>
</button>

            <NuxtLink to="/store-locator" class="hidden sm:block p-1 text-[#1a1a2e] hover:text-[#44476f] transition"
              aria-label="Store locator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </NuxtLink>

            <NuxtLink to="/login"
              class="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#1a1a2e] hover:text-[#44476f] transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login
            </NuxtLink>

            <button class="md:hidden p-2 text-[#44476f]" @click="isMobileMenuOpen = !isMobileMenuOpen"
              aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile search -->
        <div class="lg:hidden pb-3">
          <div class="relative w-full">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Search for food, toys, grooming essentials..."
              class="w-full bg-[#f5f4f7] rounded-full pl-9 pr-4 py-2 text-sm text-[#44476f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c3b5df]" />
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-[#ede7e7] py-4 bg-white">
        <nav class="container mx-auto px-4 flex flex-col gap-1">
          <NuxtLink to="/shop?pet=dog" class="px-2 py-2 text-[#44476f] font-semibold" @click="isMobileMenuOpen = false">
            Dogs</NuxtLink>
          <NuxtLink to="/shop?pet=cat" class="px-2 py-2 text-[#44476f] font-semibold" @click="isMobileMenuOpen = false">
            Cats</NuxtLink>
          <NuxtLink to="/new-arrivals" class="px-2 py-2 text-[#44476f]" @click="isMobileMenuOpen = false">New Arrivals
          </NuxtLink>
          <NuxtLink to="/trending" class="px-2 py-2 text-[#44476f]" @click="isMobileMenuOpen = false">Trending Now
          </NuxtLink>
          <NuxtLink to="/combo-deals" class="px-2 py-2 text-[#44476f]" @click="isMobileMenuOpen = false">Combo Deals
          </NuxtLink>
          <NuxtLink to="/offers" class="px-2 py-2 text-red-500 font-semibold" @click="isMobileMenuOpen = false">Offers
          </NuxtLink>
          <NuxtLink to="/brands" class="px-2 py-2 text-[#44476f]" @click="isMobileMenuOpen = false">Brands</NuxtLink>
          <NuxtLink to="/store-locator" class="px-2 py-2 text-[#44476f]" @click="isMobileMenuOpen = false">Store Locator
          </NuxtLink>
          <NuxtLink to="/track-order" class="px-2 py-2 text-[#44476f]" @click="isMobileMenuOpen = false">Track Order
          </NuxtLink>
          <NuxtLink to="/login" class="px-2 py-2 text-[#44476f] font-semibold" @click="isMobileMenuOpen = false">Login
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
  <CartDrawer :is-open="isCartOpen" @close="isCartOpen = false" />
</template>