<script setup lang="ts">
const props = defineProps<{
  bannerImages?: string[]
}>()

const activeImage = ref(0)

const images = computed(() => props.bannerImages?.length
  ? props.bannerImages
  : ['/images/hero-bg.png'])

let sliderTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (images.value.length > 1) {
    sliderTimer = setInterval(() => {
      activeImage.value = (activeImage.value + 1) % images.value.length
    }, 2500)
  }
})

onUnmounted(() => {
  if (sliderTimer) clearInterval(sliderTimer)
})
const trustBadges = [
  { icon: '/images/icons/quality.png', label: 'Premium', label2: 'Quality' },
  { icon: '/images/icons/trusted.png', label: 'Safe &', label2: 'Trusted' },
  { icon: '/images/icons/delivery.png', label: 'Fast', label2: 'Delivery' },
  { icon: '/images/icons/love.png', label: 'Made with', label2: 'Love' },
]

const infoStrip = [
  {
    title: 'Care for Every Pet',
    desc: 'Products for all breeds, sizes & ages.',
    icon: '/images/icons/paw.png',
  },
  {
    title: 'Health First',
    desc: 'Nutrition and care that supports their well-being.',
    icon: '/images/icons/health.png',
  },
  {
    title: 'Joy in Every Moment',
    desc: 'Toys and essentials for a more playful life.',
    icon: '/images/icons/joy.png',
  },
  {
    title: "We're Here for You",
    desc: 'Friendly support anytime you need us.',
    icon: '/images/icons/support.png',
  },
]
</script>

<template>
  <section class="relative overflow-hidden bg-cover bg-[66%_top] bg-no-repeat">
    <img 
      src="/images/pets-upright-logo-circle.png" 
      alt="PetsUpright Logo" 
      class="absolute top-4 right-4 md:top-8 md:right-8 w-24 md:w-40 lg:w-56 z-20" 
    />
    <div
      v-for="(image, index) in images"
      :key="image"
      class="absolute inset-0 bg-cover bg-[66%_top] bg-no-repeat transition-opacity duration-700"
      :class="index === activeImage ? 'opacity-100' : 'opacity-0'"
      :style="{ backgroundImage: `url(${image})` }"
      aria-hidden="true"
    />
    <div class="container mx-auto px-4 pt-12 pb-16 md:pt-16 md:pb-8 relative z-10">

        <div class="grid lg:grid-cols-[55%_45%] gap-6 lg:gap-10 items-center">

        <!-- Left: copy — full column width, no max-w here -->
        <div class="w-full lg:max-w-[500px] xl:max-w-none">
            <p class="text-sm font-semibold tracking-wide text-[#1a1a2e] mb-4">
            <span class="inline-block w-2 h-2 rounded-full bg-[#c3b5df] mr-2 align-middle" />
            PREMIUM PRODUCTS.
            <span class="text-[#c3b5df]">HAPPY PETS.</span>
            </p>

            <h1 class="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.05] text-[#1a1a2e] mb-6">
            Better Products,<br />
            <span class="text-[#c3b5df]">Stronger</span> Bonds.
            <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-8 w-8 md:h-10 md:w-10 text-[#c3b5df] align-middle ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            </h1>

            <!-- divider with paw icon -->
            <div class="relative flex items-center mb-6 w-full max-w-md">
            <div class="flex-1 border-t border-dashed border-[#c3b5df]"></div>
            <div class="paw-icon">🐾</div>
            <div class="flex-1 border-t border-dashed border-[#c3b5df]"></div>
            </div>

            <p class="text-base md:text-lg text-[#1a1a2e]/70 mb-8 max-w-md">
            Everything your pet needs for a
            <span class="text-[#c3b5df] font-semibold">healthy</span>,
            <span class="text-[#c3b5df] font-semibold">happy</span> and
            <span class="text-[#1a1a2e] font-semibold">playful</span> life.
            </p>

            <div
              class="mb-5 grid max-w-[540px] grid-cols-2 gap-x-4 gap-y-4 md:flex md:flex-nowrap md:items-center md:gap-2"
            >
              <div
                v-for="badge in trustBadges"
                :key="badge.label"
                class="flex min-w-0 items-center gap-2 md:shrink-0 md:gap-2.5"
              >
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3eef9] p-2 md:h-10 md:w-10"
                >
                  <img
                    :src="badge.icon"
                    :alt="`${badge.label} ${badge.label2}`"
                    class="h-full w-full object-contain md:scale-110"
                  />
                </div>

                <div
                  class="font-['Inter'] text-[12px] font-bold leading-tight tracking-wide text-[#1a1a2e] sm:text-[13px] md:text-[14px] md:whitespace-nowrap"
                >
                  {{ badge.label }}<br />
                  {{ badge.label2 }}
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="relative inline-block mb-4 md:mb-0">
            <NuxtLink
                to="/shop"
                class="inline-flex items-center gap-3 bg-[#1a1a2e] text-white font-semibold pl-6 pr-2 py-2 rounded-full hover:bg-[#44476f] transition"
            >
                Shop Now
                <span class="w-8 h-8 rounded-full bg-[#c3b5df] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#1a1a2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                </span>
            </NuxtLink>
            <img
                src="/images/icons/arrow-flourish.png"
                alt=""
                class="hidden md:block absolute top-1/2 left-full ml-2 w-20 lg:w-24 h-auto -translate-y-1/4"
            />
            </div>
        </div>
        </div>
      </div>
      <div class="relative z-20 mx-auto mt-8 mb-8 flex w-full justify-center px-4 md:mt-12 md:mb-10">
        <div
          class="w-full max-w-5xl rounded-2xl bg-white px-4 py-5 shadow-lg sm:w-[92%] sm:px-6 md:w-[85%] md:px-8 md:py-6 lg:w-[75%]"
        >
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="item in infoStrip"
              :key="item.title"
              class="flex min-w-0 items-start gap-3"
            >
              <div class="h-10 w-10 shrink-0">
                <img
                  :src="item.icon"
                  :alt="item.title"
                  class="h-full w-full object-contain"
                />
              </div>

              <div class="min-w-0">
                <h4 class="text-sm font-bold tracking-wide text-[#1a1a2e]">
                  {{ item.title }}
                </h4>

                <p class="mt-1 text-xs leading-5 tracking-wide text-[#1a1a2e]/60">
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>
<style>
.paw-icon {
  font-size: 30px;
  color: #c3b5df;
}
</style>