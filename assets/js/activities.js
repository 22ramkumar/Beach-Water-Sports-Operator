/**
 * AquaSurge Luxury Ocean Club - Activities Page Logic
 * Renders 12 luxury activities, colorful category filters, search, sorting, VIP combo packages & pricing toggle
 */

(function () {
  'use strict';

  let currentCategory = 'all';
  let currentSearchQuery = '';
  let currentSort = 'featured';
  let isGroupPricing = false;

  function initActivitiesPage() {
    // Restore saved group pricing state if persisted
    try {
      const savedGroup = sessionStorage.getItem('aquasurge_group_pricing');
      if (savedGroup === 'true') {
        isGroupPricing = true;
        const groupRadio = document.querySelector('input[name="pricing-mode"][value="group"]');
        if (groupRadio) groupRadio.checked = true;
      }
    } catch (e) {}

    initUrlParams();
    renderCategoryFilterButtons();
    renderCombos();
    renderActivities();
    initFilterEventListeners();
  }

  // Check URL parameters & session storage for preset category (e.g. activities.html?category=thrill)
  function initUrlParams() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const cat = urlParams.get('category') || sessionStorage.getItem('aquasurge_category');
      if (cat && ['all', 'thrill', 'family', 'scenic', 'underwater'].includes(cat)) {
        currentCategory = cat;
      }
    } catch (e) {}
  }

  // Render Filter Tab Buttons
  function renderCategoryFilterButtons() {
    const tabsContainer = document.getElementById('category-filter-tabs');
    if (!tabsContainer) return;

    const categories = [
      { id: 'all', label: 'All Fleet', icon: 'bi-grid-fill', count: 12 },
      { id: 'thrill', label: 'Thrill Supercraft', icon: 'bi-lightning-charge-fill', count: 5 },
      { id: 'family', label: 'Family & Groups', icon: 'bi-people-fill', count: 2 },
      { id: 'scenic', label: 'Calm & Scenic', icon: 'bi-compass-fill', count: 3 },
      { id: 'underwater', label: 'Sub-Aquatic & Seabob', icon: 'bi-water', count: 2 }
    ];

    tabsContainer.innerHTML = categories.map(cat => `
      <button type="button" data-category="${cat.id}" class="category-tab-btn px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
        currentCategory === cat.id 
          ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 ring-2 ring-yellow-400 font-extrabold' 
          : 'bg-white dark:bg-[#0A1628] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-amber-400 hover:text-amber-500'
      }">
        <i class="bi ${cat.icon}"></i>
        <span>${cat.label}</span>
        <span class="text-[10px] px-2 py-0.5 rounded-full ${
          currentCategory === cat.id ? 'bg-black/20 text-slate-950 font-black' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
        }">${cat.count}</span>
      </button>
    `).join('');

    // Attach click listeners with button state persistence across reloads
    const buttons = tabsContainer.querySelectorAll('.category-tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-category');
        try {
          sessionStorage.setItem('aquasurge_category', currentCategory);
          const currentPath = window.location.pathname.split('/').pop() || 'activities.html';
          const queryPart = currentCategory === 'all' ? '' : '?category=' + encodeURIComponent(currentCategory);
          const newUrl = currentPath + queryPart + window.location.hash;
          history.replaceState(null, '', newUrl);
          sessionStorage.setItem('aquasurge_active_url', newUrl);
          sessionStorage.setItem('aquasurge_active_page', 'activities.html');
          sessionStorage.removeItem('aquasurge_home_clicked');
        } catch (e) {}
        updateFilterButtonsUI();
        renderActivities();
      });
    });
  }

  function updateFilterButtonsUI() {
    const buttons = document.querySelectorAll('.category-tab-btn');
    buttons.forEach(btn => {
      const catId = btn.getAttribute('data-category');
      const isSelected = catId === currentCategory;
      if (isSelected) {
        btn.className = 'category-tab-btn px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 ring-2 ring-yellow-400 font-extrabold';
      } else {
        btn.className = 'category-tab-btn px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 bg-white dark:bg-[#0A1628] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-amber-400 hover:text-amber-500';
      }
    });
  }

  // Filter and Sort dataset
  function getFilteredActivities() {
    const activities = (window.AQUASURGE_DATA && window.AQUASURGE_DATA.activities) || [];

    let filtered = activities.filter(item => {
      const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
      const q = currentSearchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.name.toLowerCase().includes(q) || 
        item.shortDesc.toLowerCase().includes(q) || 
        item.highlights.some(h => h.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });

    // Sorting
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => (isGroupPricing ? a.priceGroup : a.price) - (isGroupPricing ? b.priceGroup : b.price));
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => (isGroupPricing ? b.priceGroup : b.price) - (isGroupPricing ? a.priceGroup : a.price));
    } else if (currentSort === 'thrill') {
      filtered.sort((a, b) => b.thrillLevel - a.thrillLevel);
    } else if (currentSort === 'duration') {
      filtered.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
    }

    return filtered;
  }

  // Render 12 Activity Cards
  function renderActivities() {
    const grid = document.getElementById('activities-grid');
    const counterBadge = document.getElementById('activities-result-count');
    if (!grid) return;

    const list = getFilteredActivities();
    if (counterBadge) counterBadge.textContent = `${list.length} ${list.length === 1 ? 'VIP Experience' : 'VIP Experiences'} Available`;

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-20 h-20 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center text-3xl mb-4">
            <i class="bi bi-search"></i>
          </div>
          <h4 class="text-xl font-bold font-heading mb-2">No VIP Experiences Match Your Search</h4>
          <p class="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
            We couldn't find any water sport matching "${currentSearchQuery}". Try clearing search keywords or choosing "All Fleet".
          </p>
          <button type="button" id="reset-filter-btn" class="btn-primary text-sm">
            <i class="bi bi-arrow-counterclockwise"></i> Reset Filters
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          currentSearchQuery = '';
          try {
            sessionStorage.removeItem('aquasurge_category');
            const currentPath = window.location.pathname.split('/').pop() || 'activities.html';
            history.replaceState(null, '', currentPath);
            sessionStorage.setItem('aquasurge_active_url', currentPath);
          } catch (e) {}
          const searchInput = document.getElementById('activity-search-input');
          if (searchInput) searchInput.value = '';
          updateFilterButtonsUI();
          renderActivities();
        });
      }
      return;
    }

    grid.innerHTML = list.map(item => {
      const displayPrice = isGroupPricing ? item.priceGroup : item.price;
      const wishlist = window.AquaSurge ? window.AquaSurge.getWishlist() : [];
      const isFav = wishlist.includes(item.id);

      // Star thrill formatting
      const thrillStars = '★'.repeat(item.thrillLevel) + '☆'.repeat(5 - item.thrillLevel);

      return `
        <div class="card-theme group flex flex-col h-full bg-white dark:bg-[#07101F] border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-400/80 transition-all duration-300 shadow-md hover:shadow-xl">
          
          <!-- Image Banner (Compact Sizing) -->
          <div class="relative overflow-hidden aspect-[16/10]">
            <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style="${item.objectPosition ? `object-position: ${item.objectPosition} !important;` : ''}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <!-- Top Luxury Badge (High-Contrast, Visible on Any Image) -->
            <div class="absolute top-2.5 left-2.5 z-10 max-w-[calc(100%-48px)]">
              <span class="badge-vip text-[10.5px] py-1 px-2.5 font-bold inline-flex items-center gap-1.5 shadow-xl truncate">
                <i class="bi bi-gem text-amber-400"></i> ${item.badge || 'VIP Fleet'}
              </span>
            </div>

            <!-- Wishlist Button -->
            <button type="button" class="wishlist-toggle-btn absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black hover:text-rose-400 transition-all z-10 ${isFav ? 'active text-rose-500' : ''}" 
              data-activity-id="${item.id}"
              onclick="window.AquaSurge.toggleWishlist('${item.id}')"
              aria-label="Save to Wishlist">
              <i class="bi ${isFav ? 'bi-heart-fill text-rose-500' : 'bi-heart'} text-sm"></i>
            </button>

            <!-- Bottom Floating specs on image -->
            <div class="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] z-10">
              <span class="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                <i class="bi bi-clock-fill text-amber-400 text-[10px]"></i> ${item.duration}
              </span>
              <span class="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-amber-300 font-bold">
                <i class="bi bi-lightning-charge-fill text-amber-400 text-[10px]"></i> ${item.thrillLevel}/5
              </span>
            </div>
          </div>

          <!-- Card Content (Proportionally Resized & Clean) -->
          <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div>
              <!-- Uniform Fixed-Height Label & Rating Row (Zero Wrapping) -->
              <div class="flex items-center justify-between gap-2 h-7 mb-2.5">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/40 font-crest whitespace-nowrap shadow-sm truncate max-w-[calc(100%-78px)]">
                  <i class="bi bi-tag-fill text-amber-600 dark:text-amber-400 text-[10px] flex-shrink-0"></i>
                  <span class="truncate">${item.categoryLabel}</span>
                </span>
                <div class="flex items-center gap-1 flex-shrink-0 whitespace-nowrap text-amber-500 dark:text-amber-400 text-xs font-bold bg-slate-100 dark:bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-sm">
                  <i class="bi bi-star-fill text-amber-400 text-[10px] flex-shrink-0"></i>
                  <span class="text-slate-800 dark:text-slate-200 font-extrabold text-[10.5px] whitespace-nowrap">5.0 VIP</span>
                </div>
              </div>

              <!-- Uniform Fixed-Height Title (2 Lines Max, Exactly 44px) -->
              <h3 class="text-sm sm:text-base font-bold font-heading text-slate-900 dark:text-white group-hover:text-amber-400 transition-colors leading-snug h-11 line-clamp-2 mb-2 flex items-start" title="${item.name}">
                ${item.name}
              </h3>

              <!-- Uniform Fixed-Height Description (2 Lines Max, Exactly 36px) -->
              <p class="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 h-9 mb-3 leading-relaxed">
                ${item.shortDesc}
              </p>

              <!-- Uniform Luxury Requirement Pill (Exactly 34px) -->
              <div class="h-[34px] flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 font-semibold mb-3 bg-slate-100 dark:bg-slate-900/80 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 whitespace-nowrap overflow-hidden">
                <i class="bi bi-check-circle-fill text-emerald-500 text-xs flex-shrink-0"></i>
                <span class="truncate">Age <strong>${item.minAge}</strong> • Vests & Drinks Included</span>
              </div>
            </div>

            <!-- Pricing and Action Buttons (Pinned to Bottom with Exact Height Alignment) -->
            <div class="pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
              <div class="flex items-center justify-between h-10 mb-3">
                <div>
                  <span class="text-[10px] text-slate-400 block">${isGroupPricing ? 'Group (4+ Pax)' : 'Starting from'}</span>
                  <div class="flex items-baseline gap-1">
                    <span class="text-2xl font-black text-amber-500 dark:text-amber-400">$${displayPrice}</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">/ person</span>
                    ${isGroupPricing ? `<span class="text-[10px] line-through text-slate-400">$${item.price}</span>` : ''}
                  </div>
                </div>
                <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 flex-shrink-0">
                  <i class="bi bi-patch-check-fill"></i> Insured
                </span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <button type="button" onclick="window.AquaSurge.viewActivityDetails('${item.id}')" class="h-9 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-amber-400 flex items-center justify-center gap-1 transition-all">
                  <i class="bi bi-eye"></i> Details
                </button>
                <button type="button" onclick="window.AquaSurge.bookActivity('${item.id}')" class="h-9 btn-primary text-xs px-2.5 rounded-xl flex items-center justify-center gap-1 font-bold shadow-md">
                  <i class="bi bi-calendar-check"></i> Book VIP
                </button>
              </div>
            </div>

          </div>

        </div>
      `;
    }).join('');

    if (window.AquaSurge) {
      window.AquaSurge.syncWishlistButtons();
    }
  }

  // Render 4 Combo Packages
  function renderCombos() {
    const container = document.getElementById('combo-packages-container');
    if (!container) return;

    const combos = (window.AQUASURGE_DATA && window.AQUASURGE_DATA.combos) || [];

    container.innerHTML = combos.map(combo => `
      <div class="relative bg-white dark:bg-[#07101F] border-2 ${
        combo.popular ? 'border-amber-400 shadow-xl scale-100 lg:-translate-y-1' : 'border-slate-200 dark:border-slate-800'
      } rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-amber-400">
        
        ${combo.popular ? `
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md ring-2 ring-yellow-300 whitespace-nowrap">
            ★ Most Requested VIP Experience ★
          </div>
        ` : ''}

        <div>
          <div class="flex items-start justify-between gap-2.5 mb-2.5">
            <div class="flex-1 min-w-0">
              <span class="text-[10px] font-bold text-amber-500 uppercase tracking-wider block truncate">${combo.badge}</span>
              <h3 class="text-sm sm:text-base font-black font-heading mt-0.5 leading-snug line-clamp-2 min-h-[38px] text-slate-900 dark:text-white">${combo.name}</h3>
            </div>
            <div class="text-right flex-shrink-0">
              <span class="text-[11px] line-through text-slate-400 block">$${combo.originalPrice}</span>
              <span class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">$${combo.price}</span>
            </div>
          </div>

          <p class="text-slate-600 dark:text-slate-300 text-xs mb-2.5 leading-relaxed line-clamp-2 min-h-[32px]">${combo.description}</p>

          <div class="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-full mb-3.5 border border-emerald-500/20">
            <i class="bi bi-tag-fill text-[10px]"></i> <span>${combo.savings}</span>
          </div>

          <!-- Included Activities -->
          <div class="space-y-1.5 mb-4">
            <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">VIP Privileges Included:</span>
            ${combo.activitiesIncluded.map(item => `
              <div class="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                <i class="bi bi-patch-check-fill text-amber-400 text-sm flex-shrink-0"></i>
                <span class="truncate">${item}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
          <div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            <span><i class="bi bi-clock-fill text-amber-400"></i> ${combo.duration}</span>
            <span class="truncate max-w-[120px] text-right" title="${combo.target}"><i class="bi bi-people-fill text-amber-400"></i> ${combo.target}</span>
          </div>

          <button type="button" onclick="window.AquaSurge.bookActivity('${combo.id}')" class="w-full ${
            combo.popular ? 'btn-primary' : 'btn-outline-ocean'
          } py-2.5 text-xs sm:text-sm rounded-full font-bold flex items-center justify-center gap-2 shadow-sm">
            <i class="bi bi-gem"></i> Reserve VIP Package
          </button>
        </div>

      </div>
    `).join('');
  }

  // Filter Event Listeners
  function initFilterEventListeners() {
    // Search input
    const searchInput = document.getElementById('activity-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        renderActivities();
      });
    }

    // Sort Select
    const sortSelect = document.getElementById('activity-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderActivities();
      });
    }

    // Pricing Mode Toggle (Per Person vs Group Discount)
    const pricingRadios = document.querySelectorAll('input[name="pricing-mode"]');
    pricingRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        isGroupPricing = e.target.value === 'group';
        try {
          sessionStorage.setItem('aquasurge_group_pricing', isGroupPricing ? 'true' : 'false');
        } catch (e) {}
        renderActivities();
        if (window.AquaSurge) {
          window.AquaSurge.showToast(isGroupPricing ? 'Applied VIP Group Rate (15% OFF for 4+ Guests)' : 'Showing standard per person pricing', 'info');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('activities-grid')) {
      initActivitiesPage();
    }
  });

})();
