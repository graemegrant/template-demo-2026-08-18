/**
 * hotel.config.ts — single source of truth for client identity.
 * Cloning for a new hotel: edit this file, swap the Tailwind colour
 * tokens, point env vars at the new Sanity project + booking engine.
 */
export const hotelConfig = {
  name: 'The Selkie Bay Hotel',
  tagline: 'A quiet coastal escape.',
  description:
    'An eighteen-room boutique hotel on the harbour at North Berwick. Tide, weather, and a working harbour view — not a resort feel.',
  location: {
    // Structured parts — used for schema.org PostalAddress and local SEO.
    // Fill every field with the real address before launch (see
    // NEW-CLIENT-CHECKLIST.md §2). Vague addresses break hotel rich results.
    street: '1 Victoria Road',
    locality: 'North Berwick',
    region: 'East Lothian',
    postalCode: 'EH39 4JL',
    country: 'GB',
    // Human-readable single line for footers / contact page.
    address: '1 Victoria Road, North Berwick, East Lothian, EH39 4JL',
    // Longer display label used in hero eyebrow / footer legal line.
    regionLabel: 'East Lothian, Scotland',
    // Rooftop coordinates to 5 d.p. — feeds JSON-LD geo and the /location
    // map pin. Placeholder precision until the real building is confirmed.
    lat: 56.05972,
    lng: -2.71833,
  },
  contact: {
    // Display form (spacing, national prefix in brackets).
    phone: '+44 (0)1620 892 255',
    // Dialable E.164 form — used for tel: links and schema.org telephone.
    // Never derive this from `phone` at runtime; keep it explicit.
    phoneHref: '+441620892255',
    email: 'enquiries@selkiebayhotel.com',
    instagram: 'https://instagram.com/selkiebayhotel',
    facebook: 'https://facebook.com/selkiebayhotel',
  },
  /** Reception desk hours — display strings plus 24h forms for schema. */
  reception: {
    display: '7am – 11pm daily. Night porter on duty after hours.',
    opens: '07:00',
    closes: '23:00',
  },
  /** Guest-facing amenities — drives schema amenityFeature and can be
   *  surfaced on-page. Keep to things that are actually true. */
  amenities: [
    'Free on-site parking',
    'EV charging',
    'Dog-friendly rooms',
    'Restaurant',
    'Free breakfast',
    'Step-free access',
    'Family rooms',
    'Free Wi-Fi',
  ],
  petsAllowed: true,
  /** SEO copy that varies per client. */
  seo: {
    /** Short human descriptor used in the homepage <title>. */
    descriptor: 'Boutique Hotel',
    /** Location phrase appended to titles and used in fallback meta. */
    locationLabel: 'North Berwick, East Lothian',
    /**
     * Emit an aggregateRating in the LodgingBusiness JSON-LD, derived from
     * the featured testimonials. Only set true once those testimonials are
     * genuine, verifiable guest reviews — a fabricated rating risks a
     * Google manual action.
     */
    publishAggregateRating: false,
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.selkiebayhotel.com',
  rooms: 18,
  starRating: 4,
  priceRange: '£££',
  // Display strings for the page; checkInISO / checkOutISO are the
  // schema.org Time values (ISO 8601, "HH:MM:SS") — keep both in sync.
  checkIn: '3.00pm',
  checkOut: '11.00am',
  checkInISO: '15:00:00',
  checkOutISO: '11:00:00',
  trustItems: [
    'Best Rate Guaranteed',
    'No Booking Fees',
    'Complimentary Welcome Dram',
    'Loved by Our Guests',
  ],
};

export type HotelConfig = typeof hotelConfig;
