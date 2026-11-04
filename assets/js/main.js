/**
 * AquaSurge Beach Water Sports Operator - Main Controller
 * Theme, RTL, Navigation, Wishlist, Modals, Toasts, Counters & Lightbox
 */

(function () {
  'use strict';

  // Global Namespace
  window.AquaSurge = window.AquaSurge || {};

  /* ------------------------------------------------------------------------
   * 1. THEME & RTL STATE MANAGEMENT
   * ------------------------------------------------------------------------ */
  const THEME_STORAGE_KEY = 'aquasurge_theme';
  const RTL_STORAGE_KEY = 'aquasurge_rtl';
  const WISHLIST_STORAGE_KEY = 'aquasurge_wishlist';
  const BOOKINGS_STORAGE_KEY = 'aquasurge_bookings';
  const NEWSLETTER_STORAGE_KEY = 'aquasurge_newsletter';

  // Initialize Theme
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    applyTheme(savedTheme);

    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        AquaSurge.showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update icons
    const icons = document.querySelectorAll('.theme-toggle-icon');
    icons.forEach(icon => {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill theme-toggle-icon' : 'bi bi-moon-stars-fill theme-toggle-icon';
    });
  }

  // Initialize RTL
  function initRTL() {
    const savedRTL = localStorage.getItem(RTL_STORAGE_KEY) === 'true';
    applyRTL(savedRTL);

    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    rtlToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCurrentRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const newRTL = !isCurrentRTL;
        applyRTL(newRTL);
        AquaSurge.showToast(newRTL ? 'RTL layout enabled' : 'LTR layout enabled', 'info');
      });
    });
  }

  function applyRTL(isRTL) {
    if (isRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.classList.remove('rtl');
    }
    localStorage.setItem(RTL_STORAGE_KEY, isRTL ? 'true' : 'false');

    // Update badge text if present
    const labels = document.querySelectorAll('.rtl-status-label');
    labels.forEach(label => {
      label.textContent = isRTL ? 'LTR' : 'RTL';
    });
  }

  /* ------------------------------------------------------------------------
   * 2. HEADER & MOBILE DRAWER NAVIGATION
   * ------------------------------------------------------------------------ */
  function initNavigation() {
    const header = document.querySelector('.main-header, .site-header');
    const menuBtn = document.querySelector('.mobile-menu-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    const closeBtn = document.querySelector('.drawer-close-btn');

    // Scroll effect
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // Smooth scroll if clicking current page nav-link (avoids unnecessary page reload blinking)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        if (href === currentPath) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    // Mobile Drawer Open / Close
    function openDrawer() {
      if (drawer && backdrop) {
        drawer.classList.add('open');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (drawer && backdrop) {
        drawer.classList.remove('open');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    if (menuBtn) menuBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Close on mobile nav item click
    const drawerLinks = document.querySelectorAll('.mobile-drawer a');
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    // ESC key closes drawer & modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
        AquaSurge.closeAllModals();
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 3. TOAST NOTIFICATION SYSTEM
   * ------------------------------------------------------------------------ */
  AquaSurge.showToast = function (message, type = 'info', duration = 3800) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item ${type === 'success' ? 'toast-success' : ''}`;

    let iconClass = 'bi-info-circle-fill text-sky-400';
    if (type === 'success') iconClass = 'bi-check-circle-fill text-emerald-400';
    if (type === 'error') iconClass = 'bi-exclamation-triangle-fill text-rose-400';
    if (type === 'warning') iconClass = 'bi-exclamation-circle-fill text-amber-400';

    toast.innerHTML = `
      <i class="bi ${iconClass} text-xl flex-shrink-0"></i>
      <div class="flex-1 text-sm font-medium">${message}</div>
      <button type="button" class="text-slate-400 hover:text-white ml-2 flex-shrink-0" aria-label="Close Toast">
        <i class="bi bi-x-lg text-xs"></i>
      </button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => removeToast(toast));

    container.appendChild(toast);

    const timer = setTimeout(() => {
      removeToast(toast);
    }, duration);

    function removeToast(el) {
      clearTimeout(timer);
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px) scale(0.95)';
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 250);
    }
  };

  /* ------------------------------------------------------------------------
   * 4. WISHLIST MANAGEMENT
   * ------------------------------------------------------------------------ */
  AquaSurge.getWishlist = function () {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  };

  AquaSurge.toggleWishlist = function (activityId) {
    let list = AquaSurge.getWishlist();
    const index = list.indexOf(activityId);
    let added = false;

    if (index > -1) {
      list.splice(index, 1);
      added = false;
    } else {
      list.push(activityId);
      added = true;
    }

    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    AquaSurge.updateWishlistBadges();

    // Find activity name
    const act = (window.AQUASURGE_DATA && window.AQUASURGE_DATA.activities)
      ? window.AQUASURGE_DATA.activities.find(a => a.id === activityId)
      : null;

    const actName = act ? act.name : 'Activity';
    if (added) {
      AquaSurge.showToast(`Saved "${actName}" to your Favorites!`, 'success');
    } else {
      AquaSurge.showToast(`Removed "${actName}" from Favorites`, 'info');
    }

    // Refresh hearts on page
    AquaSurge.syncWishlistButtons();
    return added;
  };

  AquaSurge.updateWishlistBadges = function () {
    const list = AquaSurge.getWishlist();
    const badges = document.querySelectorAll('.wishlist-count-badge');
    badges.forEach(b => {
      b.textContent = list.length;
      b.style.display = list.length > 0 ? 'inline-flex' : 'none';
    });
  };

  AquaSurge.syncWishlistButtons = function () {
    const list = AquaSurge.getWishlist();
    const buttons = document.querySelectorAll('.wishlist-toggle-btn');
    buttons.forEach(btn => {
      const id = btn.getAttribute('data-activity-id');
      const isFav = list.includes(id);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isFav ? 'bi bi-heart-fill text-rose-500' : 'bi bi-heart';
      }
      btn.setAttribute('aria-label', isFav ? 'Remove from wishlist' : 'Add to wishlist');
      btn.classList.toggle('active', isFav);
    });
  };

  AquaSurge.openWishlistDrawer = function () {
    const list = AquaSurge.getWishlist();
    const modal = document.getElementById('wishlist-modal');
    const container = document.getElementById('wishlist-items-container');

    if (!modal || !container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 px-4">
          <div class="w-16 h-16 rounded-full bg-sky-500/10 text-sky-400 mx-auto flex items-center justify-center text-3xl mb-4">
            <i class="bi bi-heart"></i>
          </div>
          <h4 class="text-xl font-bold mb-2">Your Wishlist is Empty</h4>
          <p class="text-slate-400 text-sm max-w-sm mx-auto mb-6">Explore our 12 thrilling beach water sports activities and click the heart icon on any card to save your favorites!</p>
          <a href="activities.html" class="btn-primary inline-flex text-sm">Browse Activities</a>
        </div>
      `;
    } else {
      const allActs = (window.AQUASURGE_DATA && window.AQUASURGE_DATA.activities) || [];
      const favActs = allActs.filter(a => list.includes(a.id));

      container.innerHTML = `
        <div class="divide-y divide-slate-200 dark:divide-slate-800">
          ${favActs.map(act => `
            <div class="py-4 flex items-center gap-4">
              <img src="${act.image}" alt="${act.name}" class="w-20 h-16 object-cover rounded-xl flex-shrink-0" style="${act.objectPosition ? `object-position: ${act.objectPosition} !important;` : ''}">
              <div class="flex-1 min-w-0">
                <span class="text-xs uppercase font-bold text-sky-500">${act.categoryLabel}</span>
                <h5 class="font-bold text-base truncate">${act.name}</h5>
                <p class="text-xs text-slate-500 dark:text-slate-400">${act.duration} • $${act.price}/person</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="AquaSurge.bookActivity('${act.id}')" class="btn-primary text-xs px-3 py-2">
                  Book
                </button>
                <button type="button" onclick="AquaSurge.toggleWishlist('${act.id}'); AquaSurge.openWishlistDrawer();" class="text-rose-500 hover:text-rose-600 p-2" title="Remove">
                  <i class="bi bi-trash3 text-base"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span class="text-sm font-semibold">${favActs.length} Saved Activities</span>
          <a href="booking.html" class="btn-primary text-xs px-4 py-2.5">Proceed to Booking Form</a>
        </div>
      `;
    }

    AquaSurge.openModal('wishlist-modal');
  };

  /* ------------------------------------------------------------------------
   * 5. MODAL SYSTEM
   * ------------------------------------------------------------------------ */
  AquaSurge.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Trap focus inside modal
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  };

  AquaSurge.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    if (!document.querySelector('.modal-overlay.active')) {
      document.body.style.overflow = '';
    }
  };

  AquaSurge.closeAllModals = function () {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  };

  // Close modals on overlay click or close button
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      AquaSurge.closeAllModals();
    }
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      const modalId = closeBtn.getAttribute('data-modal-close');
      if (modalId) AquaSurge.closeModal(modalId);
      else AquaSurge.closeAllModals();
    }
  });

  /* ------------------------------------------------------------------------
   * 6. ACTIVITY DETAIL & QUICK BOOKING MODALS
   * ------------------------------------------------------------------------ */
  AquaSurge.viewActivityDetails = function (activityId) {
    const acts = (window.AQUASURGE_DATA && window.AQUASURGE_DATA.activities) || [];
    const act = acts.find(a => a.id === activityId);
    if (!act) return;

    const modal = document.getElementById('activity-detail-modal');
    const content = document.getElementById('activity-detail-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="relative overflow-hidden">
        <img src="${act.image}" alt="${act.name}" class="w-full h-72 sm:h-96 object-cover rounded-t-3xl" style="${act.objectPosition ? `object-position: ${act.objectPosition} !important;` : ''}">
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
        <div class="absolute top-4 left-4 flex flex-wrap gap-2">
          <span class="badge-gold">${act.categoryLabel}</span>
          ${act.badge ? `<span class="badge-vip"><i class="bi bi-gem"></i> ${act.badge}</span>` : ''}
        </div>
        <button type="button" data-modal-close="activity-detail-modal" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black hover:text-amber-400 transition-all">
          <i class="bi bi-x-lg text-sm"></i>
        </button>
      </div>

      <div class="p-6 sm:p-8 space-y-6 bg-white dark:bg-[#07101F]">
        <div>
          <div class="flex items-center gap-1 text-amber-400 text-xs mb-1.5">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
            <span class="text-slate-400 text-xs ml-1 font-semibold">5.0 Official 5-Star Ocean Club Standard</span>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-4 mb-2">
            <h3 class="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white">${act.name}</h3>
            <div class="text-right">
              <span class="text-3xl font-black text-amber-500 dark:text-amber-400">$${act.price}</span>
              <span class="text-xs text-slate-400 block">per guest</span>
            </div>
          </div>
          <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">${act.fullDesc}</p>
        </div>

        <!-- Quick Specs Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-200 dark:border-slate-800 text-center">
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800">
            <i class="bi bi-clock-fill text-cyan-400 text-lg"></i>
            <span class="text-xs text-slate-400 block mt-1">Duration</span>
            <strong class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">${act.duration}</strong>
          </div>
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800">
            <i class="bi bi-lightning-charge-fill text-amber-400 text-lg"></i>
            <span class="text-xs text-slate-400 block mt-1">Thrill Intensity</span>
            <strong class="text-xs sm:text-sm font-bold text-amber-500">${'★'.repeat(act.thrillLevel)} (${act.thrillLevel}/5)</strong>
          </div>
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800">
            <i class="bi bi-person-check-fill text-emerald-400 text-lg"></i>
            <span class="text-xs text-slate-400 block mt-1">Age Policy</span>
            <strong class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">${act.minAge}</strong>
          </div>
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800">
            <i class="bi bi-people-fill text-indigo-400 text-lg"></i>
            <span class="text-xs text-slate-400 block mt-1">VIP Group Rate</span>
            <strong class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">$${act.priceGroup}/pers</strong>
          </div>
        </div>

        <!-- Highlights & Inclusions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            <h5 class="text-xs uppercase tracking-wider font-extrabold text-amber-500 mb-2.5 flex items-center gap-1.5">
              <i class="bi bi-stars"></i> Key Luxury Highlights
            </h5>
            <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              ${act.highlights.map(h => `<li class="flex items-center gap-2"><i class="bi bi-check-circle-fill text-amber-400 font-bold"></i> ${h}</li>`).join('')}
            </ul>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            <h5 class="text-xs uppercase tracking-wider font-extrabold text-cyan-400 mb-2.5 flex items-center gap-1.5">
              <i class="bi bi-shield-check"></i> 5-Star VIP Inclusions
            </h5>
            <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              ${act.included.map(inc => `<li class="flex items-center gap-2"><i class="bi bi-patch-check-fill text-emerald-400 font-bold"></i> ${inc}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-400/5 to-cyan-500/10 border border-amber-400/30 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
          <i class="bi bi-info-circle-fill text-amber-500 text-base flex-shrink-0 mt-0.5"></i>
          <div>
            <strong class="text-amber-500">Concierge Requirements & Safety Note:</strong> ${act.requirements}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <button type="button" onclick="AquaSurge.bookActivity('${act.id}')" class="btn-primary flex-1 py-3.5 text-sm rounded-full">
            <i class="bi bi-calendar-check"></i> Reserve VIP Experience
          </button>
          <button type="button" onclick="AquaSurge.toggleWishlist('${act.id}')" class="btn-secondary py-3.5 text-sm rounded-full">
            <i class="bi bi-heart"></i> Save to Favorites
          </button>
        </div>
      </div>
    `;

    AquaSurge.openModal('activity-detail-modal');
  };

  // Direct Book / Pre-fill routing
  AquaSurge.bookActivity = function (activityId) {
    localStorage.setItem('selectedActivity', activityId);

    // If currently on booking.html or contact.html with active form, update form directly
    if ((window.location.pathname.includes('booking.html') || window.location.pathname.includes('contact.html')) && typeof window.updateBookingFormSelection === 'function' && document.getElementById('booking-form')) {
      window.updateBookingFormSelection(activityId);
      AquaSurge.closeAllModals();
      const formEl = document.getElementById('booking-form');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
      AquaSurge.showToast('Activity selected in booking form', 'info');
    } else {
      // Redirect directly to booking page with param
      window.location.href = `booking.html?activity=${encodeURIComponent(activityId)}`;
    }
  };

  /* ------------------------------------------------------------------------
   * 7. ANIMATED STAT COUNTERS
   * ------------------------------------------------------------------------ */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    if (!counters.length) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1800;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target.toLocaleString() + suffix;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current).toLocaleString() + suffix;
              }
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  /* ------------------------------------------------------------------------
   * 8. FAQ ACCORDION HANDLERS
   * ------------------------------------------------------------------------ */
  function initAccordions() {
    document.addEventListener('click', (e) => {
      const header = e.target.closest('.faq-header');
      if (!header) return;

      const item = header.closest('.faq-accordion-item');
      if (!item) return;

      const content = item.querySelector('.faq-content');
      const isOpen = item.classList.contains('open');

      // Close siblings if in accordion container
      const container = item.closest('.faq-container');
      if (container) {
        container.querySelectorAll('.faq-accordion-item.open').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('open');
            const sibContent = sibling.querySelector('.faq-content');
            if (sibContent) sibContent.style.maxHeight = null;
          }
        });
      }

      if (isOpen) {
        item.classList.remove('open');
        if (content) content.style.maxHeight = null;
      } else {
        item.classList.add('open');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 9. LIGHTBOX COMPONENT
   * ------------------------------------------------------------------------ */
  AquaSurge.openLightbox = function (imageUrl, caption = '') {
    let lb = document.getElementById('lightbox-modal');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'lightbox-modal';
      lb.className = 'modal-overlay';
      lb.innerHTML = `
        <div class="relative max-w-4xl w-full p-4 flex flex-col items-center">
          <button type="button" class="absolute -top-10 right-4 text-white text-2xl hover:text-rose-400" data-modal-close="lightbox-modal">
            <i class="bi bi-x-lg"></i>
          </button>
          <img id="lightbox-img" src="" alt="Gallery Image" class="max-h-[80vh] w-auto rounded-2xl shadow-2xl object-contain">
          <p id="lightbox-caption" class="text-white text-sm mt-3 text-center"></p>
        </div>
      `;
      document.body.appendChild(lb);
    }

    const img = lb.querySelector('#lightbox-img');
    const cap = lb.querySelector('#lightbox-caption');
    img.src = imageUrl;
    cap.textContent = caption;

    AquaSurge.openModal('lightbox-modal');
  };

  /* ------------------------------------------------------------------------
   * 10. DEMO FILE GENERATORS (Safety Guidelines & Waiver)
   * ------------------------------------------------------------------------ */
  AquaSurge.downloadSafetyGuidelines = function () {
    const text = `
========================================================================
AQUASURGE LUXURY OCEAN CLUB & ELITE WATERSPORTS
OFFICIAL 5-STAR SAFETY GUIDELINES & OCEAN PARTICIPANT CODE (2026 EDITION)
Accredited by: US Coast Guard Auxiliary, PADI 5-Star Partner, Lloyd's Maritime
========================================================================

1. GENERAL VIP PARTICIPANT STANDARDS
- Minimum age for jet ski drivers is 16 with government-issued photo ID.
- Flotation aids: USCG Type III or V Impact Neoprene PFDs are strictly MANDATORY 
  for every guest at all times while aboard any vessel or watercraft.
- Zero Alcohol & Chemical Tolerance on high-horsepower motorized equipment.
  AquaSurge reserves the right to refuse service for passenger safety.

2. SPEED & DISTANCE CORRIDORS
- 200-meter Shoreline Safe Buffer: Low-speed idle throttle only (under 5 knots).
- Designated High-Speed Arena: Yellow perimeter buoys with electronic GPS geofence.
- Maintain a minimum of 50 meters distance from swimmers, paddleboards, and dive flags.

3. EMERGENCY WATER PROTOCOLS
- Engine Cut-Off Lanyard (Kill Switch): Must be clipped to the driver's vest at all times.
- Wave Capsize Procedure: Stay calm, stay with your craft. Do not swim away.
- Dedicated 300hp rescue tenders patrol the active arena constantly.
- Hand Signals:
  * Hand tapped on helmet = "I need assistance / Stop"
  * Both arms crossed overhead = "Medical or mechanical emergency"
  * Thumbs up = "All clear / Ready to proceed"

4. FAIR WEATHER & SEA CONDITION MATRIX
- Green Flag: Calm sea, swell <1.5m, wind <15 kts. All activities operational.
- Yellow Flag: Moderate swell, choppy surface. Reduced capacity on parasailing/tubing.
- Red Flag: High swell >2.2m, squalls, lightning. Complete suspension & 100% refund.

For emergency marine radio communications: VHF Channel 16 / Channel 68
Laguna Bay Pier 4 VIP Marina Concierge: +1 (800) 555-SURGE
========================================================================
Downloaded from AquaSurge Luxury Ocean Club Official Portal.
    `.trim();

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AquaSurge-Safety-Guidelines-2026.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    AquaSurge.showToast('Downloaded Safety Guidelines (2026 Edition)', 'success');
  };

  /* ------------------------------------------------------------------------
   * 11. NEWSLETTER & FOOTER FORM
   * ------------------------------------------------------------------------ */
  function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input || !input.value.trim() || !input.value.includes('@')) {
          AquaSurge.showToast('Please enter a valid email address', 'error');
          return;
        }

        const email = input.value.trim();
        try {
          const subscribers = JSON.parse(localStorage.getItem(NEWSLETTER_STORAGE_KEY)) || [];
          if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(subscribers));
          }
        } catch {
          // fallback
        }

        input.value = '';
        AquaSurge.showToast('Thank you! Welcome aboard the AquaSurge VIP Club (10% code sent)', 'success');
      });
    });
  }

  /* ------------------------------------------------------------------------
   * 12. BACK TO TOP BUTTON
   * ------------------------------------------------------------------------ */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.remove('opacity-0', 'pointer-events-none');
        btn.classList.add('opacity-100');
      } else {
        btn.classList.add('opacity-0', 'pointer-events-none');
        btn.classList.remove('opacity-100');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
   * 13. WEATHER WIDGET REFRESH SIMULATION
   * ------------------------------------------------------------------------ */
  AquaSurge.refreshWeatherWidget = function () {
    const btn = document.querySelector('.weather-refresh-btn');
    if (btn) btn.classList.add('animate-spin');

    setTimeout(() => {
      if (btn) btn.classList.remove('animate-spin');
      AquaSurge.showToast('Marine telemetry synchronized with Laguna Bay Buoy #4', 'success');
    }, 600);
  };

  /* ------------------------------------------------------------------------
   * HERO BACKGROUND VIDEO AUTOPLAY
   * ------------------------------------------------------------------------ */
  function initHeroVideo() {
    const video = document.querySelector('video.hero-video-bg');
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startPlayback = () => {
          video.play().catch(() => {});
          window.removeEventListener('click', startPlayback);
          window.removeEventListener('touchstart', startPlayback);
          window.removeEventListener('scroll', startPlayback);
        };
        window.addEventListener('click', startPlayback, { passive: true });
        window.addEventListener('touchstart', startPlayback, { passive: true });
        window.addEventListener('scroll', startPlayback, { passive: true });
      });
    }
  }

  /* ------------------------------------------------------------------------
   * DOM READY INIT
   * ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initNavigation();
    initHeroVideo();
    initCounters();
    initAccordions();
    initNewsletter();
    initBackToTop();
    AquaSurge.updateWishlistBadges();
    AquaSurge.syncWishlistButtons();
  });

})();
