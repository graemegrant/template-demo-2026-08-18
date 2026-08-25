/**
 * lib/data.ts — static fallback content.
 * The site builds and runs entirely from this file when no Sanity project
 * is configured. All imagery is Unsplash placeholder, swapped via the CMS.
 */
import type {
  Room, Experience, Offer, JournalPost, Testimonial, TeamMember,
} from './types';

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  heroHouse: u('photo-1528806290983-2c003d438fb3'),
  exterior: u('photo-1589489873423-d1745278a8f4'),
  bay: u('photo-1546706872-9c90b8d0c94f'),
  dunes: u('photo-1441974231531-c6227db76b6e'),
  sea: u('photo-1516570628389-492e1488089d'),
  room1: u('photo-1611892440504-42a792e24d32'),
  room2: u('photo-1590490360182-c33d57733427'),
  room3: u('photo-1582719478250-c89cae4dc85b'),
  room4: u('photo-1566665797739-1674de7a421a'),
  room5: u('photo-1578683010236-d716f9a3f461'),
  room6: u('photo-1505693416388-ac5ce068fe85'),
  bath: u('photo-1552858725-2758b5fb1286'),
  dining1: u('photo-1414235077428-338989a2e8c0'),
  dining2: u('photo-1559339352-11d035aa65de'),
  food1: u('photo-1467003909585-2f8a72700288'),
  food2: u('photo-1504674900247-0877df9cc836'),
  gin: u('photo-1527281400683-1aae777175f8'),
  spa: u('photo-1544161515-4ab6ce6db874'),
  wedding1: u('photo-1519225421980-715cb0215aed'),
  wedding2: u('photo-1511795409834-ef04bbd61622'),
  garden: u('photo-1612721531230-16c20cf8adce'),
  fire: u('photo-1542718610-a1d656d1884c'),
  walk: u('photo-1609674750700-33895b9b7ce1'),
  boat: u('photo-1589490047559-a1c13ec25b87'),
  portrait1: u('photo-1560250097-0b93528c311a', 900),
  portrait2: u('photo-1573496359142-b8d87734a5a2', 900),
  portrait3: u('photo-1472099645785-5658abf4ff4e', 900),
  portrait4: u('photo-1438761681033-6461ffad8d80', 900),
  portrait5: u('photo-1500648767791-00dcc994a43e', 900),
  portrait6: u('photo-1544005313-94ddf0286df2', 900),
};

/* Minimal portable-text builder so fallback journal posts render
   through the same PortableText component as CMS content. */
let k = 0;
const block = (text: string, style = 'normal') => ({
  _type: 'block',
  _key: `b${k++}`,
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: `s${k++}`, text, marks: [] }],
});

export const rooms: Room[] = [
  {
    name: 'The Bass Suite',
    slug: 'bass-suite',
    type: 'Suite',
    description:
      'The principal suite, occupying the south-west corner of the second floor, with the harbour and Bass Rock filling the window. A separate sitting room with open fire, a bedroom hung with old harbour charts, and a bathroom built around a cast-iron bath that looks straight out to the rock. On a clear evening you can watch the gannets turn for home without lifting your head from the pillow.',
    heroImage: IMG.room1,
    gallery: [IMG.room1, IMG.bath, IMG.room2, IMG.bay],
    rate: 425,
    sqm: 58,
    occupancy: 3,
    floor: 'Second floor',
    view: 'North, over the harbour to Bass Rock',
    amenities: [
      'Super-king bed', 'Separate sitting room with open fire', 'Cast-iron roll-top bath',
      'Walk-in shower', 'North Law gin miniature', 'Roberts radio',
      'Bramley toiletries', 'Daily pressed linen', 'Tea tray with home baking',
    ],
    featured: true,
    active: true,
  },
  {
    name: 'The Fidra Suite',
    slug: 'fidra-suite',
    type: 'Suite',
    description:
      'A first-floor suite over the harbour wall, with the longest view in the house — out past the moorings to Fidra and its lighthouse. Panelled walls, a writing desk that guests tend to photograph, and a dressing room that makes a week-long stay feel sensible.',
    heroImage: IMG.room2,
    gallery: [IMG.room2, IMG.room3, IMG.bath, IMG.garden],
    rate: 365,
    sqm: 52,
    occupancy: 2,
    floor: 'First floor',
    view: 'East, over the harbour to Fidra',
    amenities: [
      'Super-king bed', 'Dressing room', 'Roll-top bath and walk-in shower',
      'Writing desk', 'Open fire', 'North Law gin miniature',
      'Bramley toiletries', 'Tea tray with home baking',
    ],
    featured: true,
    active: true,
  },
  {
    name: 'The Yellowcraig',
    slug: 'the-yellowcraig',
    type: 'Deluxe',
    description:
      'A generous first-floor double overlooking the walled garden, with the dunes at Yellowcraig a short walk beyond the wall. The bed faces the window deliberately — mornings here are the argument for the room. Bathroom in honed marble with both bath and shower.',
    heroImage: IMG.room3,
    gallery: [IMG.room3, IMG.bath, IMG.garden, IMG.room4],
    rate: 285,
    sqm: 34,
    occupancy: 2,
    floor: 'First floor',
    view: 'South, over the walled garden',
    amenities: [
      'King bed', 'Bath and walk-in shower', 'Window seat',
      'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking',
    ],
    featured: true,
    active: true,
  },
  {
    name: 'The Tantallon',
    slug: 'the-tantallon',
    type: 'Deluxe',
    description:
      'Second floor, harbour side. Sloped ceilings, a deep window with the castle ruin on the headland beyond the water, and the quietest corridor in the house. Popular with returning guests who book it by name.',
    heroImage: IMG.room4,
    gallery: [IMG.room4, IMG.room5, IMG.bath, IMG.sea],
    rate: 265,
    sqm: 32,
    occupancy: 2,
    floor: 'Second floor',
    view: 'East, over the water to Tantallon',
    amenities: [
      'King bed', 'Walk-in shower', 'Window seat',
      'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking',
    ],
    active: true,
  },
  {
    name: 'The Gullane',
    slug: 'the-gullane',
    type: 'Classic',
    description:
      'A ground-floor double off the garden corridor, with its own door to the courtyard — the room to take if you travel with a dog or simply prefer to slip out early for the beach. Compact, warm, and quietly handsome.',
    heroImage: IMG.room5,
    gallery: [IMG.room5, IMG.room6, IMG.bath, IMG.fire],
    rate: 205,
    sqm: 24,
    occupancy: 2,
    floor: 'Ground floor',
    view: 'Courtyard',
    amenities: [
      'King or twin beds', 'Walk-in shower', 'Direct courtyard access',
      'Dog-friendly', 'Bramley toiletries', 'Tea tray with home baking',
    ],
    active: true,
  },
  {
    name: 'The Canty Bay',
    slug: 'canty-bay',
    type: 'Classic',
    description:
      'Tucked under the eaves on the second floor with a porthole view of the rooftops and, on a clear day, the cove at Canty Bay beyond them. The smallest room in the house and, by some accounts, the best loved — all the comfort, none of the ceremony.',
    heroImage: IMG.room6,
    gallery: [IMG.room6, IMG.dunes, IMG.bath, IMG.room5],
    rate: 220,
    sqm: 26,
    occupancy: 2,
    floor: 'Second floor',
    view: 'Rooftops, with a glimpse of Canty Bay',
    amenities: [
      'King bed', 'Walk-in shower', 'Reading chair',
      'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking',
    ],
    active: true,
  },
];

export const experiences: Experience[] = [
  {
    name: 'Gin Tasting at the Harbour',
    slug: 'gin-tasting-at-the-harbour',
    category: 'Food & Drink',
    description:
      'An evening in the library with our keeper of the cellar: six pours, tasted chronologically, from the first bottling to the newest small-batch release — finishing with the house blend, made for us alone with sea buckthorn and bladderwrack from the rocks below the hotel.',
    heroImage: IMG.gin,
    duration: '2 hours',
    price: 'From £75 per person',
    seasons: ['Year round'],
    includes: ['Six guided pours', 'House blend tasting', 'Oatcakes and cheese from the pantry', 'Tasting notes to take home'],
  },
  {
    name: 'Bass Rock Gannet Safari',
    slug: 'bass-rock-gannet-safari',
    category: 'Outdoors',
    description:
      'An hour by RIB out to the rock and back, timed to the tide and the light. Between April and September it holds the largest colony of Northern gannets on Earth — a hundred and fifty thousand birds, and a noise you feel as much as hear. Wetsuits and warm layers provided.',
    heroImage: IMG.boat,
    duration: '2 hours',
    price: 'From £55 per person',
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: ['Private skipper and RIB', 'Wetsuits and waterproofs', 'Flask and shortbread on deck', 'Binoculars for the crossing'],
  },
  {
    name: 'Sea Kayaking to Fidra',
    slug: 'sea-kayaking-to-fidra',
    category: 'Outdoors',
    description:
      'A guided paddle from the harbour out past the moorings to Fidra, tuition pitched precisely to you — first stroke or fortieth season. Seals haul out on the rocks most mornings and rarely mind the company. Lunch comes back to the harbour wall in a hamper.',
    heroImage: IMG.sea,
    duration: 'Half day',
    price: 'From £90 per person',
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: ['Sit-on-top kayak and all kit', 'Qualified guide', 'Harbour-wall hamper lunch', 'Wetsuit and changing hut'],
  },
  {
    name: 'Wild Swimming & Beach Sauna',
    slug: 'wild-swimming-and-beach-sauna',
    category: 'Wellness',
    description:
      'A short walk along the sand to the water, a swim that will reorganise your priorities, and a wood-fired sauna on the beach to put them back. Towels, robes and hot chocolate at the door.',
    heroImage: IMG.sea,
    duration: '2 hours',
    price: 'From £55 per person',
    seasons: ['Year round'],
    includes: ['Guided swim with safety cover', 'Wood-fired beach sauna', 'Robes, towels and changing hut', 'Hot chocolate or a dram afterwards'],
  },
  {
    name: 'Tantallon & the Selkie Shore',
    slug: 'tantallon-and-the-selkie-shore',
    category: 'Heritage',
    description:
      'A clifftop walk to the ruin at Tantallon with a storyteller who has kept the local selkie legends — seal-folk who shed their skins to walk among us — alive for longer than the castle has been a ruin. The walk ends at the cove where, depending who you ask, they still come ashore.',
    heroImage: IMG.dunes,
    duration: '2.5 hours',
    price: 'From £45 per person',
    seasons: ['Year round'],
    includes: ['Private storyteller-guide', 'Castle entry', 'Flask and shortbread', 'Map of the coastal path for the rest of your stay'],
  },
  {
    name: 'Foraging the Shoreline with the Chef',
    slug: 'foraging-the-shoreline-with-the-chef',
    category: 'Food & Drink',
    description:
      'A morning on the rocks and in the dunes with our head chef, gathering whatever the tide offers — sea purslane, dulse, mussels, the occasional stray oyster — followed by lunch built around the basket you carried home.',
    heroImage: IMG.dunes,
    duration: 'Half day',
    price: 'From £110 per person',
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: ['Foraging walk with the head chef', 'Basket and knife to use', 'Three-course lunch from your haul', 'Recipe cards to take home'],
  },
];

export const offers: Offer[] = [
  {
    title: 'The Long Weekend',
    slug: 'the-long-weekend',
    subtitle: 'Three nights, properly taken',
    description:
      'Arrive Friday, leave Monday, and let the house do the rest. Dinner on your first evening, a late checkout on your last morning, and the weekend left deliberately unplanned in between.',
    tag: 'Most popular',
    image: IMG.exterior,
    inclusions: ['Three nights bed & breakfast', 'Three-course dinner on arrival night', 'Late checkout until 1pm', 'Welcome dram on arrival'],
    type: 'Stay',
  },
  {
    title: 'Winter by the Fire',
    slug: 'winter-by-the-fire',
    subtitle: 'November to March',
    description:
      'The house at its most persuasive: fires lit by breakfast, storms rolling in off the water, and the tasting menu at its richest. Two nights minimum, hot water bottles administered without irony.',
    tag: 'Seasonal',
    image: IMG.fire,
    inclusions: ['Two nights bed & breakfast', 'Six-course tasting menu one evening', 'Gin nightcap by the library fire', '20% off spa and sauna experiences'],
    validFrom: '2026-11-01',
    validUntil: '2027-03-31',
    type: 'Seasonal',
  },
  {
    title: 'The Midweek Escape',
    slug: 'midweek-escape',
    subtitle: 'Sunday to Thursday',
    description:
      'The tide does not know it is Tuesday. Fifteen percent off bed and breakfast stays midweek, when the house is at its quietest and the beach is yours alone.',
    tag: 'Best value',
    image: IMG.bay,
    inclusions: ['15% off bed & breakfast rates', 'Flexible cancellation to 48 hours', 'Complimentary coastal walk map', 'Priority dinner reservations'],
    type: 'Stay',
  },
  {
    title: 'The Celebration Stay',
    slug: 'celebration-stay',
    subtitle: 'Mark it properly',
    description:
      'Anniversaries, decades, escapes that needed an excuse. Champagne on ice when you arrive, flowers from the walled garden in the room, and an upgrade to the best available suite when the house allows.',
    tag: 'Occasions',
    image: IMG.room1,
    inclusions: ['Suite upgrade when available', 'Champagne and walled-garden flowers', 'Breakfast in bed, no judgement', 'Late checkout until 1pm'],
    type: 'Occasion',
  },
];

export const journalPosts: JournalPost[] = [
  {
    title: 'A Year in the Walled Garden',
    slug: 'a-year-in-the-walled-garden',
    category: 'Garden',
    author: 'Sorcha Bell',
    publishedAt: '2026-04-14',
    readingTime: '6 min read',
    excerpt:
      'Our head gardener on sea fret, salt wind, and the quiet politics of growing for a kitchen that wants everything a fortnight early.',
    heroImage: IMG.garden,
    featured: true,
    body: [
      block('The wall was built in 1868 to keep the salt wind out and the heat in, and it still does both better than anything we could buy. Inside it, a year moves differently. January is paper — seed orders, grudges from last season, optimism in catalogue form. By February the rhubarb is up under its forcing pots, pale and indecently pink, and the kitchen starts telephoning.'),
      block('What the kitchen wants', 'h2'),
      block('Chefs, in my experience, believe vegetables are a scheduling problem. Euan is better than most, but even he asks for courgette flowers in May. The garden answers to the coast, not the menu, and the sea fret keeps us a fortnight behind Edinburgh and a month behind London most springs. The negotiation is the job.'),
      block('We grow what the ground does well behind that wall: brassicas that shrug off a sea gale, potatoes in seven varieties, gooseberries on the south-facing bed, and herbs in quantities that would look like madness anywhere else. Everything walks to the kitchen. Nothing sees a van.'),
      block('The quiet months', 'h2'),
      block('Guests ask what we do in winter. The honest answer is: prune, plan, and drink tea in the potting shed while the robin supervises. The garden is never finished and never empty. That is rather the point of it.'),
      block('If you are staying with us, the garden gate is never locked. Come in, walk the paths, take a gooseberry if the season allows. Just close the gate — the wall keeps the wind out, but only if we help it.', 'blockquote'),
    ],
  },
  {
    title: 'The Quiet Season: Why Winter Suits the East Lothian Coast',
    slug: 'the-quiet-season',
    category: 'The Bay',
    author: 'Fiona Sutherland',
    publishedAt: '2026-01-20',
    readingTime: '5 min read',
    excerpt:
      'The case for coming when everyone else has gone home: short days, long dinners, and a stretch of coast that keeps its best light for the patient.',
    heroImage: IMG.fire,
    body: [
      block('There is a fortnight in deep winter when the sun barely clears the horizon, and the whole bay sits in a kind of blue half-light from ten until three. Most hotels would apologise for it. We would argue it is the best thing we offer.'),
      block('Winter compresses the day into something honest. You walk in the morning because the light is leaving. You are back by the fire at four because there is nowhere better to be. Dinner takes three hours because nobody can think of a reason it should not.'),
      block('What to actually do', 'h2'),
      block('The coastal path is at its best in a hard frost — the marram grass rimed white and the beach empty for miles. The sauna on the sand becomes a conviction rather than a novelty. And the kitchen, freed from the tyranny of summer lightness, cooks the way this coast has always wanted to be cooked: slowly, richly, with gravity.'),
      block('Come in February. Bring boots and a book. Leave the rest to the house.'),
    ],
  },
  {
    title: 'Meet the Maker: North Law Distillery',
    slug: 'meet-the-maker-north-law',
    category: 'Provenance',
    author: 'Euan Tait',
    publishedAt: '2025-11-08',
    readingTime: '5 min read',
    excerpt:
      'Ten minutes up the coast road is a nine-person distillery making gin the way it was always supposed to be made — slowly, and mostly by hand. We went to see how they do it.',
    heroImage: IMG.gin,
    body: [
      block('The still room smells of warm copper and something greener — juniper, sea buckthorn, and the particular sharpness of bladderwrack drying on racks by the door. North Law Distillery have been at this for eight years on a site that was a maltings for a century before that. The team is nine people. The output is around eleven thousand bottles a year. By any measure of the industry, this is very small. By any measure of quality, it is not.'),
      block('The house blend', 'h2'),
      block('Three years ago, I walked up the hill with a proposal: could we work together on a gin for the house? Something that reflected the shore, the kitchen, the particular kind of evening we try to create. What came back, a year later, was a spirit built on local juniper and sea buckthorn, with enough bladderwrack to know where it came from and enough citrus to make it welcome before dinner.'),
      block('It sits behind every bar in the house now, in a bottle with our own label. Guests finish it. We take that as the review.'),
      block('You can visit North Law with us — the tasting in the library ends with a pour of their newest batch, and the distillery walk runs most Thursdays in season.'),
    ],
  },
  {
    title: 'Six Walks from the Harbour',
    slug: 'six-walks-from-the-harbour',
    category: 'Outdoors',
    author: 'Angus Reid',
    publishedAt: '2025-09-15',
    readingTime: '7 min read',
    excerpt:
      'No car required. Our boat skipper ranks the six routes that start on the harbour wall outside reception, from a gentle twenty minutes to a full morning on the Law.',
    heroImage: IMG.walk,
    body: [
      block('People drive an hour from here to start walks worse than the ones that begin on our harbour wall. Here are the six I send guests on, easiest first. All of them start and end at the front door, which matters more than people think — the best walk is the one between you and dinner.'),
      block('One: The Harbour Circuit', 'h2'),
      block('Twenty minutes, flat, impossible to lose. Along the West Bay sands, round the point, back past the lifeboat station. Oystercatchers guaranteed; a seal in the harbour mouth if you are quiet and lucky.'),
      block('Two: The Yellowcraig Loop', 'h2'),
      block('Forty minutes through the dunes and Scots pine, taking in the beach, the rockpools, and the view out to Fidra that made a local boy write Treasure Island. Good with a coffee from the hall table.'),
      block('Three to Five: The Coast Path', 'h2'),
      block('Three stretches run east and west along the John Muir Way: the Tantallon leg (two hours), the Seacliff shore (three, rocky, worth it), and the Dirleton loop (four, big views, take lunch). Ask at the desk and we will mark the day’s best choice on a map — wind decides.'),
      block('Six: The Law', 'h2'),
      block('A full morning, proper boots, packed lunch from the kitchen. The whole coast at your feet and, on a clear day, the Highlands themselves on the far side of the water. I have done it some four hundred times. It has not once been the same walk twice.'),
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    guestName: 'A. & J. Pemberton',
    quote:
      'We have stayed in grander hotels and slept worse in all of them. Selkie Bay understands the difference between luxury and fuss, and chooses correctly every single time.',
    rating: 5,
    roomStayed: 'The Fidra Suite',
    date: '2026-03-02',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'Margaret L.',
    quote:
      'Dinner was the best I have eaten in Scotland, and I say that as someone who came principally for the gannets. The gannets, incidentally, were also the best I have seen in Scotland.',
    rating: 5,
    roomStayed: 'The Tantallon',
    date: '2026-05-18',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'The Okafor family',
    quote:
      'Three generations, four days, zero complaints — a family first. The staff remembered everyone’s name by breakfast on day one, including the dog’s.',
    rating: 5,
    roomStayed: 'The Gullane & The Yellowcraig',
    date: '2025-10-26',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'D. Whitfield',
    quote:
      'I came for two nights to finish a book and stayed five. The library fire, the tide going out twice a day, and the woman who kept appearing with exactly the right pot of tea are jointly responsible.',
    rating: 5,
    roomStayed: 'The Canty Bay',
    date: '2026-02-09',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'S. & R. Maxwell',
    quote:
      'We were married on the harbour lawn in September. A year on, guests still bring it up unprompted. Flawless is an overused word; I am using it anyway.',
    rating: 5,
    roomStayed: 'The Bass Suite',
    date: '2025-09-30',
    source: 'Guest book',
    featured: true,
  },
];

export const team: TeamMember[] = [
  {
    name: 'Fiona Sutherland',
    role: 'General Manager',
    bio: 'Twenty years in coastal hotels on both sides of the Forth, and a firm belief that the best service is the kind you only notice afterwards. Keeper of the guest book and its secrets.',
    headshot: IMG.portrait2,
    department: 'Management',
    displayOrder: 1,
  },
  {
    name: 'Euan Tait',
    role: 'Head Chef',
    bio: 'East Lothian born, trained in Edinburgh and Copenhagen, returned on the understanding that the larder would be the shoreline itself. Cooks what the harbour, the tide and the walled garden hand him.',
    headshot: IMG.portrait3,
    department: 'Kitchen',
    displayOrder: 2,
  },
  {
    name: 'Mairi Cochrane',
    role: 'Front of House Manager',
    bio: 'The first voice most guests hear and the reason most of them come back. Knows every train time, every tide table, and every guest’s usual table by their second visit.',
    headshot: IMG.portrait4,
    department: 'Front of House',
    displayOrder: 3,
  },
  {
    name: 'Sorcha Bell',
    role: 'Head Gardener',
    bio: 'Custodian of the 1868 walled garden and its seven varieties of potato. Negotiates daily with the kitchen and, by her own account, usually wins.',
    headshot: IMG.portrait5,
    department: 'Grounds',
    displayOrder: 4,
  },
  {
    name: 'Angus Reid',
    role: 'Boat Skipper',
    bio: 'Thirty years on this water. Guide to the coast paths, keeper of the RIB, and the only member of staff with a standing excuse to be late: the tide wanted watching.',
    headshot: IMG.portrait1,
    department: 'Grounds',
    displayOrder: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Head of Housekeeping',
    bio: 'Runs the quietest department in the house to the highest standard in it. Believes a properly made bed is a moral position, and makes a persuasive case nightly.',
    headshot: IMG.portrait6,
    department: 'Housekeeping',
    displayOrder: 6,
  },
];

/* ——— Static page content (not CMS-managed) ——— */

export const faqs = [
  { q: 'What are your check-in and check-out times?', a: 'Check-in is from 3pm and check-out by 11am. Early arrivals are welcome to leave luggage and take the run of the house; late checkout until 1pm can usually be arranged.' },
  { q: 'Are dogs welcome?', a: 'Dogs are welcome in The Gullane, which has direct courtyard access, and throughout the grounds and beach on a lead. We provide beds, bowls and a map of the best sniffs. £25 per dog per stay.' },
  { q: 'Do you welcome children?', a: 'We welcome children of all ages. Cots and extra beds are available in the suites, the kitchen cooks a proper children’s supper at 5.30pm, and the beach absorbs energy better than any screen.' },
  { q: 'Can you cater for dietary requirements?', a: 'Yes — tell us when you book and the kitchen will plan properly rather than improvise. Vegetarian and vegan menus stand on their own merits; allergies are handled with full separation.' },
  { q: 'Is there parking and EV charging?', a: 'Free parking on the harbour front for all guests, with two 22kW EV chargers in the courtyard. No charge for charging.' },
  { q: 'How accessible is the house?', a: 'The Gullane and all ground-floor public rooms are step-free, and we have a ramp for the front steps. The house is Victorian and honest about it — call us and we will talk through your needs candidly.' },
];

export const attractions = [
  { name: 'Bass Rock & the Scottish Seabird Centre', distance: '5 minutes', description: 'The world’s largest colony of Northern gannets, and a visitor centre with live cameras trained on the rock itself. Boat trips leave from our harbour.' },
  { name: 'Tantallon Castle', distance: '10 minutes', description: 'A clifftop ruin of real drama, held by the Douglases for three centuries and besieged more than once. Best with a flask and a headwind.' },
  { name: 'North Berwick Law', distance: '15 minute walk', description: 'The volcanic cone behind the town, topped with a whale’s jawbone arch and the best view on this stretch of coast. Steeper than it looks from the harbour.' },
  { name: 'Gullane Beach & the Dunes', distance: '10 minutes', description: 'Two miles of sand backed by dunes and some of the finest links golf in the world. Low tide adds another half-mile of beach for free.' },
  { name: 'Dirleton Castle & Village', distance: '15 minutes', description: 'A ruined castle with the longest herbaceous border in Scotland attached, in a village that wins the tidiest-in-Scotland award more often than seems fair.' },
  { name: 'North Law Distillery', distance: '10 minutes', description: 'The nine-person distillery behind our house gin. Tours by arrangement through the house — ask at the desk.' },
];

export const directions = [
  { mode: 'By car', detail: 'Leave the A1 at the East Linton junction and follow the coast road for six miles. The harbour is at the bottom of the high street; the drive takes another two minutes if the gulls let you through. Edinburgh is around 40 minutes, Glasgow just over 90.' },
  { mode: 'By rail', detail: 'North Berwick station is 25 minutes from Edinburgh Waverley, with a direct service most of the day. We will collect you from the platform — just tell us your train.' },
  { mode: 'By air', detail: 'Edinburgh Airport is 45 minutes by car. Private transfers can be arranged; the drive out along the coast is the gentlest possible decompression.' },
  { mode: 'By boat', detail: 'The harbour keeps two visitor moorings for guests arriving by sea. Give us 24 hours’ notice on the VHF or by phone and we will have a berth and a dram ready.' },
];

export const pressMentions = [
  { outlet: 'Condé Nast Traveller', quote: 'The new benchmark for the Scottish seaside hotel.' },
  { outlet: 'The Times', quote: 'Eighteen rooms, one working harbour, and not a single false note.' },
  { outlet: 'Country Life', quote: 'Selkie Bay does what the great coastal hotels always did — it simply does it better.' },
  { outlet: 'The Telegraph', quote: 'Worth the drive up the coast. Worth, frankly, any drive at all.' },
];

export const menus = [
  {
    name: 'Breakfast',
    note: 'Served 7.30–10am, table or tray',
    items: [
      { dish: 'The Full Selkie Bay', detail: 'Harbour sausage, Eyemouth kipper, tattie scone, hen-of-the-morning eggs' },
      { dish: 'Porridge with cream and heather honey', detail: 'Or with a dram, after 9am, no questions' },
      { dish: 'Smoked haddock omelette', detail: 'Arbroath smokie, Mull cheddar, chives from the wall' },
      { dish: 'Walled garden compote', detail: 'Whatever Sorcha surrendered this week, with crowdie and oats' },
    ],
  },
  {
    name: 'Dinner — À la carte',
    note: 'Served 6.30–9pm in the dining room',
    items: [
      { dish: 'Hand-dived Bass Rock scallop', detail: 'Brown butter, sea aster, roe from the shell' },
      { dish: 'North Sea halibut', detail: 'Musselburgh leeks, garden cucumber, smoked bone sauce' },
      { dish: 'Lobster from the boats at the harbour', detail: 'Drawn butter, sourdough, samphire' },
      { dish: 'Gooseberry and elderflower tart', detail: 'From the south wall, with meadowsweet cream' },
    ],
  },
  {
    name: 'The Tasting Menu',
    note: 'Six courses, whole table, £95 — with pairings £150',
    items: [
      { dish: 'Six courses, tide to table', detail: 'The rock, the harbour, the garden and the cellar, in that order' },
      { dish: 'Pairings from the cellar', detail: 'Old-world wines and the occasional insubordinate gin' },
      { dish: 'The cheese course', detail: 'A trolley of Scottish farmhouse cheeses, oatcakes baked at 4pm' },
      { dish: 'To finish', detail: 'The house gin, by the fire, in no hurry whatsoever' },
    ],
  },
];

export const voucherTypes = [
  {
    name: 'The Monetary Voucher',
    price: 'From £50',
    description: 'Any amount from fifty pounds, valid against rooms, dinner, the cellar and every experience at the house. The flexible option for people whose taste you trust.',
    image: IMG.exterior,
  },
  {
    name: 'Dinner for Two',
    price: '£190',
    description: 'The six-course tasting menu for two, with a glass of champagne in the library first. The kitchen’s full argument, made on someone else’s behalf.',
    image: IMG.dining1,
  },
  {
    name: 'The Night Away',
    price: 'From £340',
    description: 'A night in a deluxe room with breakfast and dinner for two. The gift that is actually an instruction: go to the coast, switch the phone off.',
    image: IMG.room3,
  },
];
