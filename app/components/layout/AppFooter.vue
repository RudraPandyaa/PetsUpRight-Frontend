 <template>
  <footer class="bg-[#44476f] text-white mt-auto">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <!-- Brand -->
        <div>
          <h3 class="text-xl font-bold mb-3">
            Pets<span class="text-[#c3b5df]">U</span>pright
          </h3>
          <p class="text-sm text-[#c3b5df] leading-relaxed">
            The right way to pet.
          </p>
        </div>

        <!-- Shop -->
        <div>
          <h4 class="text-sm font-semibold mb-4 text-white">Shop</h4>
          <ul class="space-y-2 text-sm text-[#c3b5df]">
            <li><NuxtLink to="/shop?pet=dog" class="hover:text-white transition">Dog Products</NuxtLink></li>
            <li><NuxtLink to="/shop?pet=cat" class="hover:text-white transition">Cat Products</NuxtLink></li>
            <li><NuxtLink to="/shop" class="hover:text-white transition">All Products</NuxtLink></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-sm font-semibold mb-4 text-white">Support</h4>
          <ul class="space-y-2 text-sm text-[#c3b5df]">
            <li><a href="#" class="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" class="hover:text-white transition">Shipping Info</a></li>
            <li><a href="#" class="hover:text-white transition">Returns</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-sm font-semibold mb-4 text-white">Stay Updated</h4>
          <p class="text-sm text-[#c3b5df] mb-3">Get offers & pet care tips.</p>
          <div class="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email"
              class="flex-1 px-3 py-2 text-sm rounded-lg bg-white/10 border border-[#c3b5df]/30 text-white placeholder:text-[#c3b5df] focus:outline-none focus:ring-2 focus:ring-[#c3b5df]"
            />
            <button class="px-4 py-2 bg-[#c3b5df] text-[#44476f] text-sm font-semibold rounded-lg hover:bg-white transition">
              Join
            </button>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-[#c3b5df]">
          © {{ new Date().getFullYear() }} PetsUpright. All rights reserved.
        </p>
        <div class="flex gap-4 text-xs text-[#c3b5df]">
          <a href="#" class="hover:text-white">Privacy Policy</a>
          <a href="#" class="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>