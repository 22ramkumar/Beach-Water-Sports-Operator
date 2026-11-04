# AquaSurge - Luxury Ocean Club & Elite Watersports HTML5 Website

> A radiant, ultra-luxury, ThemeForest & Awwwards-standard HTML5 template for high-end coastal water sports operators, luxury beach clubs, private superyacht toy charters, and 5-star seaside resorts (Monaco, St. Tropez, Amalfi, and Dubai Marina aesthetics).

---

## 🌟 Key Highlights & Colorful Luxury Design System

- **Brand Identity:** **AquaSurge Luxury Ocean Club & Elite Watersports** (Pier 4 VIP Superyacht Marina).
- **Vibrant & Colorful Luxury Palette:**
  - 👑 **Molten 24K Gold Gradients:** `#F59E0B`, `#FCD34D`, `#D97706` for regal crests, metallic buttons, glowing borders, and VIP badges.
  - 🌊 **Royal Sapphire & Deep Navy:** `#0284C7`, `#0369A1`, `#0F172A` providing regal contrast and maritime heritage.
  - 🐬 **Vivid Ocean Turquoise & Aqua:** `#00F2FE`, `#06B6D4`, `#10B981` delivering sunlit coastal vibrancy and luminous neon highlights.
  - 🌅 **Sunset Coral & Ruby Glow:** `#F43F5E`, `#FB7185` for high-energy excitement and thrill indicators.
  - 🌌 **Velvet Midnight Obsidian:** `#030712`, `#0B1120` for an ultra-premium dark luxury aesthetic with ambient golden glow orbs.
- **Luxury Typography:**
  - `Cinzel` & `Cinzel Decorative` (Monaco crests, luxury titles, serif elegance).
  - `Playfair Display` (Sophisticated editorial display headlines).
  - `Outfit` (Modern high-contrast luxury UI titles).
  - `Plus Jakarta Sans` (Clean, hyper-legible body typography).
- **Pages Included (4 Core Pages):**
  1. `index.html` - Elite Home (Luxury Top Announcement Bar, Gold Crest Logo, Ambient Glow Orbs, 5-Star Distinctions, Live Marine Telemetry, 4 Curated Supercraft Cards, Interactive 4K Lightbox Gallery, High-Society Testimonials).
  2. `activities.html` - Elite Supercraft & Charters (12 luxury watercraft, dynamic category filter tabs, instant search, price sorting, thrill-level gauges, and 4 Curated VIP Combos with Champagne & Drone inclusions).
  3. `safety.html` - Maritime Safety & Naval Standards (14-year zero-incident record, 4 gold safety commitments, 6-stage pre-flight orientation timeline, German/Swiss equipment specs, marine flag telemetry, certified naval team profiles, and downloadable guidelines).
  4. `contact.html` - VIP Concierge & Online Reservation (Interactive luxury booking wizard with live dynamic price calculation, child discounts, automatic group discounts, 4 luxury add-ons including Moët & Chandon Champagne and 4K Cinema Drone reels, Pier 4 VIP Marina Map, Valet arrival instructions, and printable Gold VIP Boarding Pass generator).

- **Technology Stack:**
  - Pure HTML5 semantic markup with rich ARIA accessibility.
  - Tailwind CSS (via CDN) with customized luxury color extensions (`gold`, `ocean`, `aqua`, `coral`, `navy`).
  - Handcrafted Custom CSS (`assets/css/style.css`) with glassmorphism (`glass-card`, `luxury-hero-card`), 24K gold foil borders, glowing hover effects, and print boarding pass stylesheets.
  - Vanilla JavaScript ES6 (`data.js`, `main.js`, `activities.js`, `booking.js`) - zero build step, zero dependencies.
  - Bootstrap Icons v1.11.3 CDN.

- **Interactive Capabilities:**
  - 🌓 **Luxury Light & Midnight Dark Modes:** Seamless toggle between Radiant Sunlit Coast and Velvet Midnight Obsidian with LocalStorage persistence.
  - 🌐 **RTL (Right-to-Left) Ready:** Full bilingual Arabic/Hebrew RTL layout toggle with CSS logical properties and mirrored icons.
  - 💖 **VIP Wishlist Drawer:** Save desired supercraft experiences with real-time counter and sliding drawer.
  - ⚡ **Dynamic Live Pricing Engine:** Live calculation of base rate, child ticket discounts (25% off), group discounts (15% off for 4+ guests), luxury add-ons (Moët & Chandon champagne service, 4K Cinema Drone video, Private VIP Cabana), and port environmental fees.
  - 🎫 **VIP Boarding Pass Generator:** Generates prestigious boarding passes with reference IDs (e.g., `VIP-894102-GOLD`), QR stamp simulation, and one-click print/PDF functionality.
  - 📥 **Official Naval Safety Guidelines Generator:** Instant client-side download of the certified 2026 Ocean Safety & Maritime Protocols.
  - 🔍 **Interactive Ultra-HD Lightbox Gallery:** Cinematic full-screen viewer.

---

## 📁 Project Structure

```
Beach Water Sports Operator/
├── index.html                  # Page 1: Elite Ocean Club Home
├── activities.html             # Page 2: Supercraft Fleet & VIP Combos (12 crafts + 4 combos)
├── safety.html                 # Page 3: Naval Standards, 14-Yr Record & Certified Team
├── contact.html                # Page 4: VIP Concierge, Booking Wizard & Pier 4 Marina
├── README.md                   # Documentation & Customization Guide
└── assets/
    ├── css/
    │   └── style.css           # 24K gold gradients, glassmorphism, RTL rules, print styles
    └── js/
        ├── data.js             # 12 luxury activities, 4 VIP combos, testimonials, telemetry
        ├── main.js             # Theme, RTL, wishlist drawer, modals, toasts, telemetry counters
        ├── activities.js       # Dynamic luxury card rendering, search, filters, pricing toggles
        └── booking.js          # Dynamic VIP price calculation, validation, boarding pass modal
```

---

## 🚀 How to Run Locally

Because this is a pure frontend HTML5 template, no build step or node package manager is required.

1. Double-click `index.html` to open directly in any modern browser (Chrome, Edge, Firefox, Safari).
2. Or serve using any static HTTP server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js
   npx serve .
   ```
3. Open `http://localhost:8000` to browse.

---

## 🛠️ Customization Guide

### 1. Modifying Activities or Fleet Specs
Open `assets/js/data.js` and locate the `AQUASURGE_DATA.activities` array. Each craft contains:
- `id`, `name`, `category` (`thrill` | `family` | `scenic` | `underwater`)
- `price` (solo rate) and `priceGroup` (group rate)
- `duration`, `thrillLevel` (1-5), `minAge`, `shortDesc`, `fullDesc`, and `image`

### 2. Adjusting Luxury Color System
Open `assets/css/style.css` and customize the CSS root variables:
- `--gold-400`, `--gold-500`, `--gold-600` (Molten 24K Gold accents)
- `--sapphire-600`, `--sapphire-900` (Royal Sapphire tones)
- `--turquoise-400`, `--emerald-500` (Lagoon & Ocean Turquoise accents)
- `--coral-500`, `--coral-600` (Sunset Coral accents)

---

## 📜 License & Accreditation
Designed for commercial production, ThemeForest, and elite maritime adventure operators.
All photos sourced from Unsplash with commercial permissive licenses.
