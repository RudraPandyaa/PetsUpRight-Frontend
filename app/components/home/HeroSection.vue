<script setup lang="ts">
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
  <section
          class="relative overflow-hidden bg-[url('/images/hero-bg.png')] bg-[length:auto_100%] bg-[85%_top] bg-no-repeat lg:bg-cover lg:bg-[135%_top]"
  >
    <div class="container mx-auto px-4 pt-8 pb-10 md:pt-12 md:pb-12 lg:pt-16 lg:pb-8 relative z-10">

        <div class="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 lg:gap-10 items-center">

        <!-- Left: copy — full column width, no max-w here -->
        <div>
            <p class="text-xs sm:text-sm font-semibold tracking-wide text-[#1a1a2e] mb-3 md:mb-4">
            <span class="inline-block w-2 h-2 rounded-full bg-[#c3b5df] mr-2 align-middle" />
            PREMIUM PRODUCTS.
            <span class="text-[#c3b5df]">HAPPY PETS.</span>
            </p>

            <h1 class="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] lg:leading-[1.05] text-[#1a1a2e] mb-5 md:mb-6">
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

            <p class="text-sm sm:text-base md:text-lg text-[#1a1a2e]/70 mb-6 md:mb-8 max-w-md">
            Everything your pet needs for a
            <span class="text-[#c3b5df] font-semibold">healthy</span>,
            <span class="text-[#c3b5df] font-semibold">happy</span> and
            <span class="text-[#1a1a2e] font-semibold">playful</span> life.
            </p>

            <!-- Trust Badges -->
            <div
            class="
                grid grid-cols-2
                gap-x-3 gap-y-4
                w-full max-w-[360px]
                mb-5

                sm:max-w-[420px]
                sm:gap-x-5

                md:grid-cols-4
                md:max-w-[540px]
                md:gap-x-3
                md:gap-y-0
            "
            >
            <div
                v-for="badge in trustBadges"
                :key="badge.label"
                class="flex items-center gap-2 min-w-0"
            >
                <!-- Icon -->
                <div
                class="
                    w-10 h-10
                    sm:w-11 sm:h-11
                    md:w-10 md:h-10
                    rounded-full
                    bg-[#f3eef9]
                    flex items-center justify-center
                    shrink-0
                    p-2.5
                "
                >
                <img
                    :src="badge.icon"
                    :alt="`${badge.label} ${badge.label2}`"
                    class="w-full h-full object-contain"
                />
                </div>

                <!-- Text -->
                <div
                class="
                    font-['Inter']
                    text-[13px]
                    sm:text-[14px]
                    md:text-[14px]
                    font-bold
                    text-[#1a1a2e]
                    leading-tight
                    whitespace-nowrap
                    tracking-wide
                "
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
                class="
                inline-flex items-center gap-2
                bg-[#1a1a2e] text-white
                text-sm sm:text-base
                font-semibold
                pl-5 sm:pl-6
                pr-2
                py-2
                rounded-full
                hover:bg-[#44476f]
                transition
                "
            >
                Shop Now

                <span
                class="
                    w-8 h-8
                    rounded-full
                    bg-[#c3b5df]
                    flex items-center justify-center
                    shrink-0
                "
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-[#1a1a2e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
                </span>
            </NuxtLink>

            <!-- Decorative arrow: tablet/desktop only -->
            <img
                src="/images/icons/arrow-flourish.png"
                alt=""
                class="
                hidden md:block
                absolute
                top-1/2 left-full
                ml-2
                w-20 lg:w-24
                h-auto
                -translate-y-1/4
                pointer-events-none
                "
            />
            </div>
        </div>
        </div>
      </div>

    <!-- Hero Info Strip -->
    <div
    class="
        relative z-20
        mt-8 mb-6
        md:mt-16 md:mb-10
        lg:mt-12
        flex justify-center
        px-4 md:px-0
    "
    >
    <div
        class="
        w-full
        md:w-[70%]
        lg:w-[60%]
        bg-white
        rounded-2xl
        shadow-lg
        px-4 py-5
        sm:px-6
        md:px-10 md:py-5
        "
    >
        <div
        class="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-4
            gap-x-5 gap-y-5
            md:gap-6
        "
        >
        <div
            v-for="item in infoStrip"
            :key="item.title"
            class="flex items-start gap-3 min-w-0"
        >
            <div
            class="
                w-9 h-9
                md:w-9 md:h-9
                shrink-0
            "
            >
            <img
                :src="item.icon"
                :alt="item.title"
                class="w-full h-full object-contain"
            />
            </div>

            <div class="min-w-0">
            <h4
                class="
                font-['Inter']
                text-[13px]
                md:text-[14px]
                font-bold
                text-[#1a1a2e]
                tracking-wide
                leading-tight
                "
            >
                {{ item.title }}
            </h4>

            <p
                class="
                font-['Inter']
                text-[11px]
                md:text-[12px]
                text-[#1a1a2e]/60
                mt-1
                tracking-wide
                leading-relaxed
                "
            >
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