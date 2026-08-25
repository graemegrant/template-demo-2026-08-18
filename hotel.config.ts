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
    address: 'North Berwick, East Lothian, EH39',
    region: 'East Lothian, Scotland',
    lat: 56.06,
    lng: -2.72,
  },
  contact: {
    phone: '+44 (0)1620 000 000',
    email: 'enquiries@selkiebayhotel.com',
    instagram: 'https://instagram.com/selkiebayhotel',
    facebook: 'https://facebook.com/selkiebayhotel',
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.selkiebayhotel.com',
  rooms: 18,
  starRating: 4,
  priceRange: '£££',
  checkIn: '3.00pm',
  checkOut: '11.00am',
  trustItems: [
    'Best Rate Guaranteed',
    'No Booking Fees',
    'Complimentary Welcome Dram',
    'Rated 5 Stars by Guests',
  ],
};

export type HotelConfig = typeof hotelConfig;
