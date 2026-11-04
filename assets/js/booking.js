/**
 * AquaSurge Luxury Ocean Club - Booking & VIP Concierge Controller
 * Live dynamic pricing, VIP add-on calculator, form validation, reference ID generation, LocalStorage persistence & luxury boarding pass printing
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'aquasurge_bookings';
  let currentSelectionPrice = 120; // Default Sea-Doo RXT-X 300

  function initBookingController() {
    populateActivityDropdown();
    handleUrlOrStoragePrefill();
    initPriceCalculator();
    initFormValidation();
    initDateRestrictions();
    initDirectContactForm();
  }

  // Populate Dropdown with all 12 Luxury Activities + 4 VIP Combos
  function populateActivityDropdown() {
    const select = document.getElementById('booking-activity-select');
    if (!select) return;

    const activities = (window.AQUASURGE_DATA && window.AQUASURGE_DATA.activities) || [];
    const combos = (window.AQUASURGE_DATA && window.AQUASURGE_DATA.combos) || [];

    let html = '<option value="" disabled>-- Select Your Luxury Watersport Experience --</option>';

    // Group 1: Individual Activities
    html += '<optgroup label="2026 Ultra-Luxury Watersports Fleet">';
    activities.forEach(act => {
      html += `<option value="${act.id}" data-price="${act.price}" data-name="${act.name}">${act.name} ($${act.price}/person • ${act.duration})</option>`;
    });
    html += '</optgroup>';

    // Group 2: Combo Packages
    html += '<optgroup label="VIP Curated Multi-Experience Packages">';
    combos.forEach(combo => {
      html += `<option value="${combo.id}" data-price="${combo.price}" data-name="${combo.name}">${combo.name} ($${combo.price} • ${combo.savings})</option>`;
    });
    html += '</optgroup>';

    select.innerHTML = html;
  }

  // Check URL params or LocalStorage pre-selection
  function handleUrlOrStoragePrefill() {
    const select = document.getElementById('booking-activity-select');
    if (!select) return;

    const urlParams = new URLSearchParams(window.location.search);
    const activityParam = urlParams.get('activity') || localStorage.getItem('selectedActivity');

    if (activityParam) {
      const options = Array.from(select.options);
      const match = options.find(opt => opt.value === activityParam || opt.value.toLowerCase().includes(activityParam.toLowerCase()));
      if (match) {
        select.value = match.value;
      } else {
        select.selectedIndex = 1;
      }
      localStorage.removeItem('selectedActivity');
    } else {
      select.selectedIndex = 1;
    }

    calculateLivePrice();
  }

  window.updateBookingFormSelection = function (activityId) {
    const select = document.getElementById('booking-activity-select');
    if (select) {
      select.value = activityId;
      calculateLivePrice();
    }
  };

  function initDateRestrictions() {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
      if (!dateInput.value) {
        dateInput.value = today;
      }
    }
  }

  // Live Price Calculator
  function initPriceCalculator() {
    const inputsToWatch = [
      '#booking-activity-select',
      '#booking-adults',
      '#booking-children',
      '#addon-gopro',
      '#addon-wetsuit',
      '#addon-locker',
      '#addon-champagne'
    ];

    inputsToWatch.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        el.addEventListener('change', calculateLivePrice);
        el.addEventListener('input', calculateLivePrice);
      }
    });

    // Guest counter buttons
    document.querySelectorAll('[data-counter-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-counter-target');
        const action = btn.getAttribute('data-counter-action');
        const input = document.getElementById(targetId);
        if (!input) return;

        let val = parseInt(input.value, 10) || 0;
        const min = parseInt(input.getAttribute('min'), 10) || 0;
        const max = parseInt(input.getAttribute('max'), 10) || 20;

        if (action === 'plus' && val < max) val++;
        if (action === 'minus' && val > min) val--;

        input.value = val;
        calculateLivePrice();
      });
    });
  }

  function calculateLivePrice() {
    const select = document.getElementById('booking-activity-select');
    const adultsInput = document.getElementById('booking-adults');
    const childrenInput = document.getElementById('booking-children');
    const addonGopro = document.getElementById('addon-gopro');
    const addonWetsuit = document.getElementById('addon-wetsuit');
    const addonLocker = document.getElementById('addon-locker');
    const addonChampagne = document.getElementById('addon-champagne');

    if (!select || !adultsInput) return;

    const selectedOption = select.options[select.selectedIndex];
    const basePrice = selectedOption ? parseFloat(selectedOption.getAttribute('data-price')) || 120 : 120;
    const activityName = selectedOption ? selectedOption.getAttribute('data-name') : 'Selected Experience';

    const adults = parseInt(adultsInput.value, 10) || 1;
    const children = childrenInput ? (parseInt(childrenInput.value, 10) || 0) : 0;
    const totalGuests = adults + children;

    // Children 75% rate
    const childPricePerPerson = Math.round(basePrice * 0.75);
    let subtotal = (adults * basePrice) + (children * childPricePerPerson);

    // Group Discount: 15% OFF for 4+ guests
    let groupDiscount = 0;
    if (totalGuests >= 4) {
      groupDiscount = Math.round(subtotal * 0.15);
    }

    // Addons
    let addonsTotal = 0;
    if (addonGopro && addonGopro.checked) addonsTotal += 45; // 4K Drone reel
    if (addonWetsuit && addonWetsuit.checked) addonsTotal += (totalGuests * 15); // Designer gear & polarized eyewear
    if (addonLocker && addonLocker.checked) addonsTotal += 50; // Private cabana & towel concierge
    if (addonChampagne && addonChampagne.checked) addonsTotal += 65; // Chilled Moët champagne & coastal fruit

    const discountedSubtotal = subtotal - groupDiscount;
    const marineTax = Math.round((discountedSubtotal + addonsTotal) * 0.05); // 5% marine environmental fee
    const finalTotal = discountedSubtotal + addonsTotal + marineTax;

    // Update DOM Display
    const elSubtotal = document.getElementById('calc-subtotal');
    const elGroupDiscountRow = document.getElementById('calc-group-discount-row');
    const elGroupDiscount = document.getElementById('calc-group-discount');
    const elAddonsRow = document.getElementById('calc-addons-row');
    const elAddons = document.getElementById('calc-addons');
    const elTax = document.getElementById('calc-tax');
    const elTotal = document.getElementById('calc-total');
    const elSummaryName = document.getElementById('calc-summary-name');
    const elSummaryGuests = document.getElementById('calc-summary-guests');

    if (elSubtotal) elSubtotal.textContent = `$${subtotal}`;
    if (elSummaryName) elSummaryName.textContent = activityName;
    if (elSummaryGuests) elSummaryGuests.textContent = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}`;

    if (elGroupDiscountRow) {
      if (groupDiscount > 0) {
        elGroupDiscountRow.classList.remove('hidden');
        if (elGroupDiscount) elGroupDiscount.textContent = `-$${groupDiscount} (15% VIP OFF)`;
      } else {
        elGroupDiscountRow.classList.add('hidden');
      }
    }

    if (elAddonsRow) {
      if (addonsTotal > 0) {
        elAddonsRow.classList.remove('hidden');
        if (elAddons) elAddons.textContent = `+$${addonsTotal}`;
      } else {
        elAddonsRow.classList.add('hidden');
      }
    }

    if (elTax) elTax.textContent = `$${marineTax}`;
    if (elTotal) elTotal.textContent = `$${finalTotal}`;

    return {
      activityName,
      basePrice,
      adults,
      children,
      totalGuests,
      subtotal,
      groupDiscount,
      addonsTotal,
      marineTax,
      finalTotal
    };
  }

  // Form Validation & Submission
  function initFormValidation() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      const nameInput = document.getElementById('booking-name');
      const emailInput = document.getElementById('booking-email');
      const phoneInput = document.getElementById('booking-phone');
      const dateInput = document.getElementById('booking-date');
      const timeInput = document.getElementById('booking-time');
      const waiverInput = document.getElementById('booking-waiver');

      function validateField(input, condition) {
        if (!input) return;
        const parent = input.closest('.form-group') || input.parentElement;
        if (!condition) {
          parent.classList.add('has-error');
          isValid = false;
        } else {
          parent.classList.remove('has-error');
        }
      }

      validateField(nameInput, nameInput.value.trim().length >= 3);
      validateField(emailInput, emailInput.value.trim().includes('@') && emailInput.value.includes('.'));
      validateField(phoneInput, phoneInput.value.trim().length >= 7);
      validateField(dateInput, !!dateInput.value);
      validateField(timeInput, !!timeInput.value);
      validateField(waiverInput, waiverInput.checked);

      if (!isValid) {
        window.AquaSurge.showToast('Please correct the highlighted fields before submitting', 'error');
        return;
      }

      // Generate Reference Code
      const refId = 'AS-VIP-' + Math.floor(100000 + Math.random() * 900000);
      const pricing = calculateLivePrice();

      const bookingRecord = {
        refId,
        dateCreated: new Date().toISOString(),
        fullName: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        activityName: pricing.activityName,
        bookingDate: dateInput.value,
        timeSlot: timeInput.value,
        adults: pricing.adults,
        children: pricing.children,
        totalGuests: pricing.totalGuests,
        swimmingSkill: document.getElementById('booking-swimming') ? document.getElementById('booking-swimming').value : 'Confident',
        notes: document.getElementById('booking-notes') ? document.getElementById('booking-notes').value.trim() : '',
        totalAmount: pricing.finalTotal,
        paymentStatus: 'Confirmed (VIP Check-in & Valet Arrival)'
      };

      try {
        const existingBookings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        existingBookings.unshift(bookingRecord);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingBookings));
      } catch (err) {
        console.error('LocalStorage save error:', err);
      }

      window.AquaSurge.showToast(`VIP Reservation ${refId} successfully confirmed!`, 'success', 5000);
      showConfirmationModal(bookingRecord);

      form.reset();
      initDateRestrictions();
      calculateLivePrice();
    });
  }

  // Display Luxury Boarding Pass Receipt Modal
  function showConfirmationModal(booking) {
    const modal = document.getElementById('booking-success-modal');
    const container = document.getElementById('booking-receipt-content');
    if (!modal || !container) return;

    container.innerHTML = `
      <div id="printable-receipt" class="p-6 sm:p-10 space-y-6 relative overflow-hidden bg-white dark:bg-[#07101F] text-slate-900 dark:text-white rounded-3xl border-2 border-amber-400 shadow-2xl">
        
        <!-- Luxury Top Gold Ribbon -->
        <div class="flex items-center justify-between pb-6 border-b border-amber-400/30">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 text-2xl shadow-lg shadow-amber-500/30">
              <i class="bi bi-water"></i>
            </div>
            <div>
              <span class="text-xs font-crest uppercase tracking-widest text-amber-500 font-bold block">VIP Boarding Pass & Receipt</span>
              <h3 class="text-2xl font-black font-heading tracking-tight">AquaSurge Luxury Ocean Club</h3>
            </div>
          </div>
          <div class="text-right">
            <span class="badge-vip"><i class="bi bi-patch-check-fill text-amber-400"></i> CONFIRMED</span>
          </div>
        </div>

        <!-- Reference Code Display -->
        <div class="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-400/5 to-cyan-500/10 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-mono">OFFICIAL VIP REFERENCE PASS</span>
            <strong class="text-2xl sm:text-3xl font-mono text-amber-500 dark:text-amber-400 tracking-wider font-black">${booking.refId}</strong>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <i class="bi bi-qr-code text-4xl text-slate-800 dark:text-slate-200"></i>
            <span class="text-left font-mono leading-tight">Digital Pier<br>Fast-Track Access</span>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm py-2">
          <div class="space-y-1">
            <span class="text-slate-400 block text-xs">Primary Guest</span>
            <strong class="font-bold block">${booking.fullName}</strong>
            <span class="text-slate-500 text-xs">${booking.phone}</span>
          </div>
          <div class="space-y-1">
            <span class="text-slate-400 block text-xs">Date & Time Slot</span>
            <strong class="font-bold block">${booking.bookingDate}</strong>
            <span class="text-amber-500 font-semibold text-xs">${booking.timeSlot}</span>
          </div>
          <div class="space-y-1">
            <span class="text-slate-400 block text-xs">Experience</span>
            <strong class="font-bold block truncate">${booking.activityName}</strong>
            <span class="text-slate-500 text-xs">${booking.totalGuests} Guests</span>
          </div>
          <div class="space-y-1 text-right sm:text-left">
            <span class="text-slate-400 block text-xs">Total Amount</span>
            <strong class="text-2xl font-black text-amber-500 dark:text-amber-400">$${booking.totalAmount}</strong>
            <span class="text-[11px] text-emerald-500 block font-semibold">100% Insured</span>
          </div>
        </div>

        <!-- VIP Arrival Instructions -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
          <div class="font-bold text-amber-500 flex items-center gap-1.5">
            <i class="bi bi-geo-alt-fill"></i> Pier 4 VIP Marina Arrival & Valet:
          </div>
          <p class="text-slate-600 dark:text-slate-300">
            Complimentary VIP valet parking is available at Laguna Bay Marina Pier 4. Please arrive <strong>15 minutes prior</strong> to your time slot. Present your reference code <strong>${booking.refId}</strong>. Your reserved locker, neoprene suite, chilled refreshments, and instructor team are ready for your party.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 no-print">
          <button type="button" onclick="window.print()" class="btn-secondary flex-1 py-3 text-xs sm:text-sm">
            <i class="bi bi-printer"></i> Print / Save VIP Pass PDF
          </button>
          <button type="button" data-modal-close="booking-success-modal" class="btn-primary flex-1 py-3 text-xs sm:text-sm">
            <i class="bi bi-check2-circle"></i> Done & Return to Club
          </button>
        </div>
      </div>
    `;

    window.AquaSurge.openModal('booking-success-modal');
  }

  // Direct Inquiry / General Contact Form
  function initDirectContactForm() {
    const contactForm = document.getElementById('general-contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        window.AquaSurge.showToast('Please fill out all contact message fields', 'error');
        return;
      }

      window.AquaSurge.showToast(`Inquiry received! VIP Concierge will reply to ${email} within 2 hours.`, 'success', 5000);
      contactForm.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('booking-form')) {
      initBookingController();
    } else if (document.getElementById('general-contact-form')) {
      initDirectContactForm();
    }
  });

})();
