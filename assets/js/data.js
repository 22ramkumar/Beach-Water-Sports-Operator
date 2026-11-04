/**
 * AquaSurge Luxury Ocean Club & Elite Watersports - Core Dataset
 * 2026 Fleet, VIP Combos, 5-Star Testimonials, Safety Standards, and Concierge Services
 */

const AQUASURGE_DATA = {
  brand: {
    name: "AquaSurge Luxury Ocean Club",
    badge: "5-Star Riviera Rated",
    tagline: "Ride the Waves in Pure Luxury. Laguna Bay & Private Marina.",
    location: "Pier 4 VIP Marina & Heliport, Laguna Bay",
    phone: "+1 (800) 555-SURGE",
    whatsapp: "+18005557874",
    email: "concierge@aquasurgeluxury.com",
    vhfChannel: "VHF Marine Channel 16 & 68 (Laguna Bay Harbor Master)",
    openingHours: "Mon - Sun: 07:30 AM – 07:00 PM (Private Charters available 24/7)",
    safetyRecord: "100% Incident-Free Safety Record (2012-2026)",
    fleetRating: "2026 Luxury Commercial Fleet • USCG Master Certified"
  },

  // 12 Elite Watersports Activities with Colorful & Luxury Assets
  activities: [
    {
      id: "act-1",
      slug: "jet-ski",
      name: "VIP Sea-Doo RXT-X 300 Supercharged WaveRunner",
      category: "thrill",
      categoryLabel: "Thrill Supercraft",
      price: 120,
      priceGroup: 99,
      duration: "30 Mins",
      thrillLevel: 5,
      minAge: "16+ (or 10+ with adult)",
      badge: "Flagship Adrenaline",
      shortDesc: "Command a 300hp supercharged carbon-fiber jet ski with Bluetooth marine audio & private chaser escort.",
      fullDesc: "Experience the peak of ocean power and luxury! Our flagship Sea-Doo RXT-X 300hp watercraft rocket from 0 to 60 mph in 3.6 seconds. Enjoy carbon-fiber ergonomic racing seats, Bluetooth BRP sound systems, GPS-geofenced deep water tracks, and private instructor chaser tender support in pristine turquoise swells.",
      image: "https://images.unsplash.com/photo-1503327431567-3ab5e6e79140?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1503327431567-3ab5e6e79140?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1746642174258-896572fd03f8?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1791664969603-c0ebab8083cf?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["300hp Supercharged Rotax Engine", "BRP Premium Bluetooth Sound System", "Private Chaser Rescue Tender Escort", "Free 4K 60fps GoPro Video Reel"],
      included: ["USCG Type III Neoprene Luxury Vest", "UV Performance Rashguard", "Chilled Bottled Water & Cold Towel Service", "Complimentary Digital Locker Storage"],
      requirements: "Valid photo ID required. Solo drivers must be 16+. Tandem passenger welcome ($25 surcharge)."
    },
    {
      id: "act-2",
      slug: "parasailing",
      name: "SkyHigh Royal Tandem Parasailing & Dip",
      category: "scenic",
      categoryLabel: "Calm & Scenic",
      price: 135,
      priceGroup: 115,
      duration: "45 Mins (15m airborne)",
      thrillLevel: 4,
      minAge: "6+ yrs",
      badge: "500ft Panoramic Flight",
      shortDesc: "Soar 500 feet above glowing turquoise reefs with hydraulic winch boat takeoff and gentle foot-dip.",
      fullDesc: "The pinnacle of peaceful coastal grandeur! Our 35ft custom winch boat glides into Laguna Bay's sapphire waters before smoothly launching your tandem or triple chute 500 feet aloft. Gaze across panoramic coastal cliffs, dolphin pods, and coral formations with optional warm surf dipping upon descent.",
      image: "https://images.unsplash.com/photo-1632904074880-b77f02b6d01e?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1632904074880-b77f02b6d01e?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1781958031371-eb881a4b146f?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1778688326453-d95423517e40?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["Solo, Tandem & Triple harnesses available", "Smooth hydraulic winch recovery system", "Dolphin & eagle ray aerial spotting", "High-angle telephoto photo service"],
      included: ["Master USCG Captain & flight mate", "Custom-tailored parachute harness & vest", "Glass of chilled sparkling cider or San Pellegrino", "Locker storage"],
      requirements: "Combined weight between 130 lbs and 450 lbs. Safe for non-swimmers."
    },
    {
      id: "act-3",
      slug: "seabob-diver",
      name: "Seabob F5 SR Superyacht Underwater Diver",
      category: "underwater",
      categoryLabel: "Sub-Aquatic & Seabob",
      price: 165,
      priceGroup: 140,
      duration: "45 Mins",
      thrillLevel: 5,
      minAge: "12+ yrs",
      badge: "Superyacht Toy",
      shortDesc: "Glide above and below the surface at 22 km/h on the world's most luxurious electric water sled.",
      fullDesc: "Experience the ultimate James Bond aquatic toy! The German-engineered Seabob F5 SR delivers 7 power gears, dual front HD cameras, and emission-free E-Jet thrust. Carve effortlessly over azure waves, then dive seamlessly down to 40 meters to swim alongside sea turtles like a dolphin.",
      image: "https://images.unsplash.com/photo-1682686581295-7364cabf5511?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1682686581295-7364cabf5511?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1704676818881-7c185db4ced1?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1682687981674-0927add86f2b?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["Seabob F5 SR with 745 Newtons thrust", "Built-in dual Full HD video recording", "Dives up to 40 meters (programmable depth lock)", "1-on-1 private sub-aquatic guide"],
      included: ["Cressi anti-fog crystal mask & snorkel", "Neoprene impact suit & safety lanyard", "Full HD video download of your dive", "VIP beach cabana refreshment"],
      requirements: "Comfort in open water required. Minimum age 12 years."
    },
    {
      id: "act-4",
      slug: "speed-boat-blast",
      name: "Offshore Racing Powerboat Blast (900hp)",
      category: "thrill",
      categoryLabel: "Thrill Supercraft",
      price: 95,
      priceGroup: 80,
      duration: "40 Mins",
      thrillLevel: 5,
      minAge: "8+ yrs",
      badge: "High-Octane",
      shortDesc: "Slice through open oceanic swells at 60 knots with high-G carving turns and ocean spray.",
      fullDesc: "Hold tight as twin 450hp Mercury Racing outboards roar to life! Our 36ft offshore tournament craft accelerates with visceral torque, carving 360-degree power spins, wave-hopping oceanic crests, and flying past Laguna Bay's outer sea stack cliffs with rock-steady stability.",
      image: "assets/images/offshore-powerboat.jpg",
      gallery: [
        "assets/images/offshore-powerboat.jpg",
        "https://images.unsplash.com/photo-1673878391998-50a50a51977b?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1639676377170-8a0554bd4145?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["Dual 450hp Mercury Racing 4.6L V8s", "360° Hamilton water-brake stops & high-G turns", "JL Audio marine sound stage", "Laguna Outer Islands offshore sprint"],
      included: ["Aviation-grade impact flotation jackets", "Wind-deflecting polarized goggles", "Master Ocean Skippers with USCG credentials", "Hydration packs"],
      requirements: "Not suitable for expectant mothers or guests with spinal ailments."
    },
    {
      id: "act-5",
      slug: "flyboard-pro",
      name: "Hydroflight Zapata Flyboard Pro Flight",
      category: "thrill",
      categoryLabel: "Thrill Supercraft",
      price: 150,
      priceGroup: 125,
      duration: "35 Mins",
      thrillLevel: 5,
      minAge: "14+ yrs",
      badge: "Iron Man Flight",
      shortDesc: "Hover 35 feet above crystal waves powered by twin pressurized water jets with 1-on-1 coaching.",
      fullDesc: "Defy gravity and fly like a superhero! Strapped to the latest Zapata Flyboard Pro, twin water jets propel you seamlessly up to 35 feet into the air. With real-time Bb Talkin wireless radio helmets, our instructor coaches your balance instantly: 98% of beginners fly within 5 minutes!",
      image: "https://images.unsplash.com/photo-1505408990643-cb9bbf4bfe2c?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1505408990643-cb9bbf4bfe2c?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1777135967086-2506028127e8?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1542231928-2a3772c20dfc?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["Zapata Racing Pro Edition Deck", "Two-way wireless Bb Talkin headset coaching", "Hover, 360-spin & dolphin dive maneuvers", "Private 4K flight video edit included"],
      included: ["Impact helmet & high-buoyancy vest", "Dedicated personal pilot & flight coach", "Pre-flight digital theory demo", "Cold eucalyptus towels & beverage"],
      requirements: "Min weight 45kg, max weight 125kg. Deep water confidence."
    },
    {
      id: "act-6",
      slug: "electric-jetboard",
      name: "Radinn Electric Jetboard (E-Foil) Experience",
      category: "thrill",
      categoryLabel: "Thrill Supercraft",
      price: 135,
      priceGroup: 115,
      duration: "45 Mins",
      thrillLevel: 4,
      minAge: "14+ yrs",
      badge: "Futuristic Flight",
      shortDesc: "Fly silently above the lagoon surface on an all-electric hydrofoil surfboard at 25 knots.",
      fullDesc: "The future of luxury watersports! Lift off above the chop on a carbon-fiber Radinn electric jetboard. Guided by an intuitive handheld wireless throttle, you'll glide smoothly 2 feet above the water with zero noise and zero drag, experiencing the serene sensation of pure oceanic flight.",
      image: "https://images.unsplash.com/photo-1573156687062-16e55830bdc8?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1573156687062-16e55830bdc8?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1775317826224-6d4bf239a537?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1601869959642-58e1ff8d81a3?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["Carbon-fiber Fliteboard & Radinn jetboards", "Smooth whisper-quiet lithium electric power", "Handheld wireless remote throttle with safety clutch", "Laguna Glass Lagoon training zone"],
      included: ["Impact protective vest & water helmet", "Personal e-foil instructor & radio coach", "Wetsuit or rash guard", "Private lounge access"],
      requirements: "Basic swimming ability and balance. Weight limit 110kg."
    },
    {
      id: "act-7",
      slug: "mastercraft-wakeboard",
      name: "Mastercraft X24 Pro Wakeboard & Wakesurf",
      category: "thrill",
      categoryLabel: "Thrill Supercraft",
      price: 145,
      priceGroup: 125,
      duration: "60 Mins",
      thrillLevel: 5,
      minAge: "10+ yrs",
      badge: "Endless Surf Wave",
      shortDesc: "Ride an endless peeling surf barrel behind our custom $280k Mastercraft X24 tournament vessel.",
      fullDesc: "Surf ocean waves without relying on ocean swell! Our 2026 Mastercraft X24 generates massive, customizable surf wakes using ballast tanks and Gen2 Surf System. Drop the tow rope and surf freely on the endless curl with private coaching from competitive wake athletes.",
      image: "https://images.unsplash.com/photo-1531001602318-1916852b9205?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1531001602318-1916852b9205?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1718658617125-9b4926d62c99?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1790270866740-9072cffcb176?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["2026 Mastercraft X24 with Ilmor 6.2L 430hp", "Liquid Force & Hyperlite pro boards", "Heated tournament passenger lounge", "Endless rope-free ocean wake surfing"],
      included: ["Pro wakeboards & surfboards", "Comp-fit neoprene vest", "Licensed tournament master captain & spotter", "GoPro stern angle video download"],
      requirements: "Comfortable swimmer. Beginners to expert riders welcome."
    },
    {
      id: "act-8",
      slug: "crystal-kayak",
      name: "100% Crystal-Clear LED Kayak Expedition",
      category: "scenic",
      categoryLabel: "Calm & Scenic",
      price: 65,
      priceGroup: 55,
      duration: "90 Mins",
      thrillLevel: 2,
      minAge: "6+ yrs",
      badge: "Glass-Bottom View",
      shortDesc: "Paddle transparent kayaks over living coral gardens with underwater LED illumination at dusk.",
      fullDesc: "Glide across the water as if floating on air! Our 100% transparent polycarbonate kayaks provide unobstructed 360° views of sea life swimming right beneath your feet. Journey into secluded sea cave archways with a marine naturalist guide, with optional sunset LED illumination.",
      image: "assets/images/crystal-clear-kayak.jpg",
      gallery: [
        "assets/images/crystal-clear-kayak.jpg",
        "https://images.unsplash.com/photo-1759521626408-4118f14632ac?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1759675348333-947604617813?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["100% clear polycarbonate hull", "Night-glow hull LED strips on sunset departures", "Secret sea cave exploration", "Naturalist guide narration & marine id slate"],
      included: ["Lightweight carbon-fiber paddle", "Luxury padded lumbar seats", "USCG Type III flotation vest", "Waterproof smartphone dry casing"],
      requirements: "Suitable for beginners, couples, and children with adults."
    },
    {
      id: "act-9",
      slug: "turtle-snorkeling",
      name: "VIP Coral Reef & Sea Turtle Yacht Safari",
      category: "underwater",
      categoryLabel: "Sub-Aquatic & Seabob",
      price: 85,
      priceGroup: 70,
      duration: "2.5 Hours",
      thrillLevel: 2,
      minAge: "6+ yrs",
      badge: "99% Turtle Sightings",
      shortDesc: "Cruise aboard a 42ft luxury yacht tender to protected outer reefs with certified dive masters.",
      fullDesc: "Embark on an opulent underwater safari! Our luxury dive tender transports small VIP groups to pristine marine reserves where green sea turtles, spotted eagle rays, and vibrant coral formations thrive. Enjoy personalized in-water guiding and hot freshwater open-air deck showers.",
      image: "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1637310926451-14e6619302a9?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1416138645715-930585fe4ce2?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["Max 10 guests for serene uncrowded reef access", "Professional Cressi anti-fog silicone gear", "Underwater photographer shoots included", "Fresh tropical fruit skewers & chilled champagne"],
      included: ["Mask, snorkel, fins & buoyancy vest", "Yacht tender cruise with sundeck", "Marine biologist guide", "Hot towel service & deck shower"],
      requirements: "All swimming levels welcome. Life vests provided."
    },
    {
      id: "act-10",
      slug: "vip-scuba-dive",
      name: "PADI 5-Star VIP Discover Scuba Diving",
      category: "underwater",
      categoryLabel: "Sub-Aquatic & Seabob",
      price: 185,
      priceGroup: 155,
      duration: "3.5 Hours",
      thrillLevel: 4,
      minAge: "12+ yrs",
      badge: "No Cert Required",
      shortDesc: "Descend to 10 meters with a personal PADI Master Instructor, Scubapro carbon gear & 4K media.",
      fullDesc: "Discover the breathtaking silent world underwater with zero previous scuba certification needed! Following a relaxed poolside orientation, step aboard our private dive tender to descend safely along a protected coral reef wall. Enjoy weightless serenity under the 1-on-1 supervision of a master diver.",
      image: "assets/images/padi-scuba-dive.jpg?v=4k",
      objectPosition: "center 22%",
      imagePosition: "center 22%",
      gallery: [
        "assets/images/padi-scuba-dive.jpg?v=4k",
        "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["Ultra-private 1:2 instructor to guest ratio", "Complete top-tier Scubapro carbon dive kit", "High-res underwater photo & video gallery", "Official PADI Discover Scuba registration"],
      included: ["All scuba equipment, tanks, and wetsuits", "Private dive boat transit & harbor permits", "Gourmet post-dive snack & hydration", "Locker storage & towel service"],
      requirements: "Medically fit to dive. No flying for 18 hours following dive."
    },
    {
      id: "act-11",
      slug: "extreme-banana-tubing",
      name: "VIP Extreme Banana & Disco Donut Tubing",
      category: "family",
      categoryLabel: "Family Fun",
      price: 50,
      priceGroup: 42,
      duration: "25 Mins",
      thrillLevel: 4,
      minAge: "5+ yrs",
      badge: "Pure Group Joy",
      shortDesc: "High-octane laughter and wave-hopping spins behind our twin-engine power tender with private rescue escort.",
      fullDesc: "The ultimate laugh generator for friends, families, and bachelor parties! Choose between the heavy-duty 10-seater banana sled or high-spin centrifugal disco donuts. Custom throttle settings allow you to choose either gentle scenic splashing or wild high-G wake jumps!",
      image: "assets/images/banana-boat-tubing.jpg?v=4k",
      gallery: [
        "assets/images/banana-boat-tubing.jpg?v=4k",
        "https://images.unsplash.com/photo-1755865984882-72738b754c39?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1765103395590-fb17325b1b43?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["Choice of Banana or Spinning Disco Tube", "Customizable speeds from calm to extreme", "Chaser tender escort with life-guard", "GoPro video capture available"],
      included: ["Comfort-fit neoprene impact vests", "Safety briefing and hand signal instruction", "Beach locker & warm freshwater shower", "Chilled coconut water"],
      requirements: "Basic swimming comfort. Children under 12 must ride with an accompanying adult."
    },
    {
      id: "act-12",
      slug: "sunset-catamaran-cruise",
      name: "Golden Hour Luxury Catamaran Champagne Cruise",
      category: "scenic",
      categoryLabel: "Calm & Scenic",
      price: 110,
      priceGroup: 92,
      duration: "2 Hours",
      thrillLevel: 1,
      minAge: "All ages",
      badge: "Sunset Champagne",
      shortDesc: "Sail into the sunset aboard our 52ft twin-hull catamaran with Moët & Chandon champagne & charcuterie.",
      fullDesc: "Unwind in true French Riviera opulence! Step onto the teak decks of our 52-foot ocean catamaran as twilight paints the horizon in magenta and molten gold. Lounge on the forward trampolines with chilled Moët & Chandon champagne, artisan charcuterie boards, and soothing sunset beats.",
      image: "https://images.unsplash.com/photo-1773593893090-27d17a880a07?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1773593893090-27d17a880a07?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1772990490123-2c9e1ae63c16?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=85"
      ],
      highlights: ["52ft Luxury Ocean Catamaran with flybridge", "Complimentary Moët & Chandon champagne & mocktails", "Artisan cheese and Mediterranean fruit board", "Curated acoustic sundown playlist & dolphin watching"],
      included: ["Welcome glass of champagne", "Gourmet canapés & cheese board", "Licensed Master Yacht Captain & host", "Sunset photo portraits by crew"],
      requirements: "Resort casual attire recommended. Light windbreaker suggested for evening."
    }
  ],

  // 4 Luxury Curated Multi-Experience Combo Packages
  combos: [
    {
      id: "combo-1",
      slug: "st-tropez-day-pass",
      name: "The St. Tropez VIP Beach Pass",
      badge: "Riviera Elegance",
      popular: false,
      price: 195,
      originalPrice: 270,
      savings: "Save $75 (28% OFF)",
      duration: "Approx. 2.5 Hours",
      target: "Couples & Sunset Chasers",
      activitiesIncluded: ["VIP Tandem Parasailing (500ft)", "100% Clear LED Kayak Tour", "Catamaran Champagne Sundowner"],
      description: "An elegant, scenic journey across Laguna Bay combining panoramic sky flights, crystal lagoon paddling, and sunset champagne on the catamaran."
    },
    {
      id: "combo-2",
      slug: "monaco-superyacht-trio",
      name: "The Monaco Superyacht Adrenaline Trio",
      badge: "Most Popular",
      popular: true,
      price: 295,
      originalPrice: 395,
      savings: "Save $100 (25% OFF)",
      duration: "Approx. 3 Hours",
      target: "High-Speed Adrenaline Enthusiasts",
      activitiesIncluded: ["Sea-Doo RXT-X 300hp Jet Ski Safari", "SkyHigh Parasailing & Dip", "Offshore 900hp Powerboat Blast"],
      description: "Our signature high-velocity trio: open-throttle 300hp wave running, 500ft aerial views, and high-G 60-knot offshore powerboat spins!"
    },
    {
      id: "combo-3",
      slug: "billionaire-ocean-safari",
      name: "The Billionaire Laguna Ocean Safari",
      badge: "Ultra-VIP Luxury",
      popular: false,
      price: 450,
      originalPrice: 590,
      savings: "Save $140 (24% OFF)",
      duration: "Approx. 4.5 Hours",
      target: "Exclusive Bucket List Seekers",
      activitiesIncluded: ["Seabob F5 SR Underwater Dive", "Hydroflight Flyboard Pro Flight", "VIP Sea-Doo RXT-X 300 Sprint", "Private Cabana & Champagne"],
      description: "The absolute pinnacle of luxury watersports: fly like a superhero, glide beneath the reef on a Seabob, and relax in a private beach cabana with champagne."
    },
    {
      id: "combo-4",
      slug: "riviera-family-charter",
      name: "The Riviera Grand Family Private Charter",
      badge: "Up to 4 Guests",
      popular: false,
      price: 380,
      originalPrice: 520,
      savings: "Save $140 (27% OFF)",
      duration: "Half-Day VIP Pass",
      target: "Families & VIP Parties (4 Pax)",
      activitiesIncluded: ["Private Extreme Banana Boat Run", "2x Clear Kayaks or E-Foils", "Full Coral Reef Snorkel Safari", "Reserved Beach Canopy & Towels"],
      description: "Unforgettable memories for parents and children with private boat tenders, sanitized gear, certified lifeguards, and luxury beachside shade."
    }
  ],

  // 5-Star Luxury Testimonials
  testimonials: [
    {
      id: "test-1",
      name: "Lord Julian & Lady Vivienne Sterling",
      role: "Superyacht Owners & Members",
      location: "Monaco / London",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=85",
      rating: 5,
      activity: "Seabob F5 SR + Catamaran Cruise",
      text: "AquaSurge has brought French Riviera luxury straight to Laguna Bay. The Seabob F5 SR watercraft were immaculate, the champagne service on the catamaran was five-star, and the safety team was thoroughly professional."
    },
    {
      id: "test-2",
      name: "Dr. Alexander & Sophia Moreau",
      role: "Luxury Travel Connoisseurs",
      location: "Geneva, Switzerland",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=85",
      rating: 5,
      activity: "SkyHigh Royal Parasailing",
      text: "The hydraulic winch takeoff was so effortless it felt like stepping into a dream. Floating 500 feet over the azure lagoon watching sea turtles below was magical. The 4K drone reel they edited for us was breathtaking."
    },
    {
      id: "test-3",
      name: "Marcus Vance",
      role: "Venture Partner & Adrenaline Enthusiast",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=85",
      rating: 5,
      activity: "Sea-Doo RXT-X 300 + Flyboard Pro",
      text: "The 300hp Sea-Doo is an absolute beast on the water. The private chaser tender gave me complete freedom to carve waves while feeling totally secure. Best luxury watersports setup on the coast."
    },
    {
      id: "test-4",
      name: "Capt. Rachel Kensington",
      role: "Commercial Yacht Master & Pilot",
      location: "Miami & Saint-Barth",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=85",
      rating: 5,
      activity: "PADI VIP Scuba Dive Experience",
      text: "As someone who audits marine operations globally, AquaSurge sets the international benchmark. Dual redundant safety systems, Scubapro carbon equipment, and flawless 1-on-1 private dive masters."
    }
  ],

  // Live Sea Condition Widget Defaults
  seaConditions: {
    status: "Green Flag",
    statusText: "Laguna Bay Calm Swell • All VIP Operations Active",
    waterTemp: "26.2°C / 79.2°F",
    waveHeight: "1.0m (Clean Glassy Swell)",
    windSpeed: "8 Knots SW (Gentle Warm Breeze)",
    uvIndex: "6.8 (Mediterranean Sun / Sunscreen Advised)",
    tide: "High Tide at 02:30 PM (Ideal Reef Depth)",
    visibility: "22+ Meters Crystal Clarity"
  },

  // 5-Star Luxury Distinctions
  features: [
    {
      icon: "bi-shield-check",
      title: "100% USCG Master Certified",
      desc: "Every captain and dive master holds verified commercial marine licenses with rigorous bi-annual water safety and medical certifications."
    },
    {
      icon: "bi-gem",
      title: "2026 Ultra-Luxury Fleet",
      desc: "Zero outdated gear. Brand-new 300hp Sea-Doos, German Seabob F5 SRs, Mastercraft vessels, and Zapata hydroflight platforms refreshed every season."
    },
    {
      icon: "bi-award",
      title: "$10M Maritime Bond & Insurance",
      desc: "Comprehensive Lloyd's of London $10M liability protection included with every VIP reservation, protecting private parties and charters."
    },
    {
      icon: "bi-cup-hot",
      title: "Private VIP Concierge Service",
      desc: "From chilled Moët champagne and cold eucalyptus towels to complimentary 4K drone cinematography and private beach cabanas."
    }
  ],

  // Safety Matrix
  safetyCommitments: [
    {
      step: "01",
      title: "Personalized Fitting & Gear Audit",
      desc: "Every guest is fitted with sanitized USCG neoprene impact vests, polarized eye protection, and wireless communication helmets."
    },
    {
      step: "02",
      title: "Dry-Land VIP Briefing & Flight Theory",
      desc: "10-minute orientation covering vessel mechanics, emergency engine kill-lanyards, hand signals, and Laguna Bay's marine sanctuaries."
    },
    {
      step: "03",
      title: "GPS-Geofenced Open Arena",
      desc: "High-horsepower watercraft operate within automated electronic geofenced marine zones with immediate audio perimeter alerts."
    },
    {
      step: "04",
      title: "300hp Dedicated Chase Rescue Tender",
      desc: "High-speed rescue tenders manned by rescue swimmers patrol all active areas continuously for immediate assistance."
    }
  ],

  // Team Profiles
  team: [
    {
      name: "Captain Mateo Alvarez",
      role: "Director of Marine Operations & Master Skipper",
      certs: "USCG 200-Ton Master, PADI Master Instructor",
      exp: "18 Years Ocean Command",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85"
    },
    {
      name: "Elena Rostova",
      role: "Head of Hydroflight & Water Sports Concierge",
      certs: "Zapata Pro Master Trainer, IKO Level 3 Coach",
      exp: "10 Years Hydroflight",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=85"
    },
    {
      name: "Kai Kahanamoku",
      role: "Chief Ocean Lifeguard & Safety Officer",
      certs: "USLA Surf Rescue Chief, Wilderness EMT",
      exp: "14 Years Surf Rescue",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=85"
    },
    {
      name: "Aaliyah Brooks",
      role: "Senior Dive Master & Seabob Specialist",
      certs: "PADI MSDT #384912, B.Sc. Marine Biology",
      exp: "9 Years Reef Exploration",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85"
    }
  ],

  // FAQs
  faqs: [
    {
      q: "Do I need a boating license or prior experience to operate the jet ski or Seabob?",
      a: "No license or prior experience is required! All guests receive an intuitive 1-on-1 orientation and hands-on guidance before entering our designated open-water riding arena. Solo jet ski operators must be 16+ with valid government photo ID."
    },
    {
      q: "What is included with my VIP watersports booking?",
      a: "Every booking includes full fuel, harbor permits, USCG neoprene impact vests, sanitized masks/helmets, private locker storage, chilled beverages, eucalyptus towels, and free cancellation under our Fair Weather Guarantee."
    },
    {
      q: "What is your Fair Weather Guarantee?",
      a: "Safety and supreme luxury comfort are non-negotiable. If wind, swell, or rainfall exceeds our calm-water parameters, you may reschedule at zero penalty or receive an immediate 100% full refund with no questions asked."
    },
    {
      q: "Can non-swimmers participate in activities like parasailing or catamaran cruises?",
      a: "Absolutely! Parasailing, Offshore Powerboat cruises, Catamaran tours, and Tubing are completely accessible to non-swimmers thanks to our high-buoyancy custom impact vests and certified marine crew."
    },
    {
      q: "Can I book private group charters, corporate retreats, or bachelor parties?",
      a: "Yes! Our VIP Concierge organizes private multi-boat beach takeovers with private cabanas, dedicated instructors, drone videographers, and champagne catering for parties of 6 to 60 guests."
    }
  ]
};

// Expose to window for browser scripts
if (typeof window !== "undefined") {
  window.AQUASURGE_DATA = AQUASURGE_DATA;
}
