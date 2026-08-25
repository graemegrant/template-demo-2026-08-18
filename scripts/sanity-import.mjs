/**
 * sanity-import.mjs
 * Imports all static fallback content into your Sanity project.
 *
 * BEFORE RUNNING:
 * 1. Create a write token in Sanity: sanity.io/manage → API → Tokens → Add API token (Editor)
 * 2. Run from your project folder:
 *    SANITY_TOKEN=<your-token> node scripts/sanity-import.mjs
 *
 * On Windows PowerShell:
 *    $env:SANITY_TOKEN="<your-token>"; node scripts/sanity-import.mjs
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = 'ak480owv'
const DATASET = 'production'
const TOKEN = process.env.SANITY_TOKEN

if (!TOKEN) {
  console.error('\n❌  SANITY_TOKEN is not set.\n')
  console.error('Create a write token at: https://sanity.io/manage → API → Tokens')
  console.error('\nWindows PowerShell:')
  console.error('  $env:SANITY_TOKEN="your-token-here"; node scripts/sanity-import.mjs\n')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── Helpers ────────────────────────────────────────────────────────────────

let _k = 0
const key = () => `k${++_k}`
const slug = (current) => ({ _type: 'slug', current })

function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

async function uploadImage(url, label) {
  try {
    process.stdout.write(`    📸 ${label} ... `)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const asset = await client.assets.upload('image', buffer, {
      filename: `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`,
      contentType: 'image/jpeg',
    })
    console.log('✓')
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (e) {
    console.log(`✗ skipped (${e.message})`)
    return undefined
  }
}

async function create(doc) {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: doc._id })
  if (existing) {
    await client.patch(doc._id).set(doc).commit()
    return 'updated'
  }
  await client.create(doc)
  return 'created'
}

// ─── Image URLs ──────────────────────────────────────────────────────────────

const u = (id, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const URLS = {
  heroHouse: u('photo-1506744038136-46273834b3fb'),
  exterior:  u('photo-1520250497591-112f2f40a3f4'),
  bay:       u('photo-1506905925346-21bda4d32df4'),
  dunes:     u('photo-1441974231531-c6227db76b6e'),
  sea:       u('photo-1469474968028-56623f02e42e'),
  room1:     u('photo-1611892440504-42a792e24d32'),
  room2:     u('photo-1590490360182-c33d57733427'),
  room3:     u('photo-1582719478250-c89cae4dc85b'),
  room4:     u('photo-1566665797739-1674de7a421a'),
  room5:     u('photo-1578683010236-d716f9a3f461'),
  room6:     u('photo-1505693416388-ac5ce068fe85'),
  bath:      u('photo-1552858725-2758b5fb1286'),
  dining1:   u('photo-1414235077428-338989a2e8c0'),
  fire:      u('photo-1542718610-a1d656d1884c'),
  gin:       u('photo-1527281400683-1aae777175f8'),
  garden:    u('photo-1416879595882-3373a0480b5b'),
  walk:      u('photo-1551632811-561732d1e306'),
  boat:      u('photo-1499242611767-cf8b9be02854'),
  portrait1: u('photo-1560250097-0b93528c311a', 900),
  portrait2: u('photo-1573496359142-b8d87734a5a2', 900),
  portrait3: u('photo-1472099645785-5658abf4ff4e', 900),
  portrait4: u('photo-1438761681033-6461ffad8d80', 900),
  portrait5: u('photo-1500648767791-00dcc994a43e', 900),
  portrait6: u('photo-1544005313-94ddf0286df2', 900),
}

// ─── Import functions ─────────────────────────────────────────────────────────

async function importRooms(imgs) {
  console.log('\n🛏  Rooms')

  const rooms = [
    {
      _id: 'room-bass-suite',
      _type: 'room',
      name: 'The Bass Suite',
      slug: slug('bass-suite'),
      type: 'Suite',
      description: 'The principal suite, occupying the south-west corner of the second floor, with the harbour and Bass Rock filling the window. A separate sitting room with open fire, a bedroom hung with old harbour charts, and a bathroom built around a cast-iron bath that looks straight out to the rock. On a clear evening you can watch the gannets turn for home without lifting your head from the pillow.',
      heroImage: imgs.room1,
      gallery: [imgs.room1, imgs.bath, imgs.room2, imgs.bay].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 425, sqm: 58, occupancy: 3,
      floor: 'Second floor',
      view: 'North, over the harbour to Bass Rock',
      amenities: ['Super-king bed', 'Separate sitting room with open fire', 'Cast-iron roll-top bath', 'Walk-in shower', 'North Law gin miniature', 'Roberts radio', 'Bramley toiletries', 'Daily pressed linen', 'Tea tray with home baking'],
      featured: true, active: true,
    },
    {
      _id: 'room-fidra-suite',
      _type: 'room',
      name: 'The Fidra Suite',
      slug: slug('fidra-suite'),
      type: 'Suite',
      description: 'A first-floor suite over the harbour wall, with the longest view in the house — out past the moorings to Fidra and its lighthouse. Panelled walls, a writing desk that guests tend to photograph, and a dressing room that makes a week-long stay feel sensible.',
      heroImage: imgs.room2,
      gallery: [imgs.room2, imgs.room3, imgs.bath, imgs.garden].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 365, sqm: 52, occupancy: 2,
      floor: 'First floor',
      view: 'East, over the harbour to Fidra',
      amenities: ['Super-king bed', 'Dressing room', 'Roll-top bath and walk-in shower', 'Writing desk', 'Open fire', 'North Law gin miniature', 'Bramley toiletries', 'Tea tray with home baking'],
      featured: true, active: true,
    },
    {
      _id: 'room-the-yellowcraig',
      _type: 'room',
      name: 'The Yellowcraig',
      slug: slug('the-yellowcraig'),
      type: 'Deluxe',
      description: 'A generous first-floor double overlooking the walled garden, with the dunes at Yellowcraig a short walk beyond the wall. The bed faces the window deliberately — mornings here are the argument for the room. Bathroom in honed marble with both bath and shower.',
      heroImage: imgs.room3,
      gallery: [imgs.room3, imgs.bath, imgs.garden, imgs.room4].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 285, sqm: 34, occupancy: 2,
      floor: 'First floor',
      view: 'South, over the walled garden',
      amenities: ['King bed', 'Bath and walk-in shower', 'Window seat', 'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking'],
      featured: true, active: true,
    },
    {
      _id: 'room-the-tantallon',
      _type: 'room',
      name: 'The Tantallon',
      slug: slug('the-tantallon'),
      type: 'Deluxe',
      description: 'Second floor, harbour side. Sloped ceilings, a deep window with the castle ruin on the headland beyond the water, and the quietest corridor in the house. Popular with returning guests who book it by name.',
      heroImage: imgs.room4,
      gallery: [imgs.room4, imgs.room5, imgs.bath, imgs.sea].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 265, sqm: 32, occupancy: 2,
      floor: 'Second floor',
      view: 'East, over the water to Tantallon',
      amenities: ['King bed', 'Walk-in shower', 'Window seat', 'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking'],
      active: true,
    },
    {
      _id: 'room-the-gullane',
      _type: 'room',
      name: 'The Gullane',
      slug: slug('the-gullane'),
      type: 'Classic',
      description: 'A ground-floor double off the garden corridor, with its own door to the courtyard — the room to take if you travel with a dog or simply prefer to slip out early for the beach. Compact, warm, and quietly handsome.',
      heroImage: imgs.room5,
      gallery: [imgs.room5, imgs.room6, imgs.bath, imgs.fire].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 205, sqm: 24, occupancy: 2,
      floor: 'Ground floor',
      view: 'Courtyard',
      amenities: ['King or twin beds', 'Walk-in shower', 'Direct courtyard access', 'Dog-friendly', 'Bramley toiletries', 'Tea tray with home baking'],
      active: true,
    },
    {
      _id: 'room-canty-bay',
      _type: 'room',
      name: 'The Canty Bay',
      slug: slug('canty-bay'),
      type: 'Classic',
      description: 'Tucked under the eaves on the second floor with a porthole view of the rooftops and, on a clear day, the cove at Canty Bay beyond them. The smallest room in the house and, by some accounts, the best loved — all the comfort, none of the ceremony.',
      heroImage: imgs.room6,
      gallery: [imgs.room6, imgs.dunes, imgs.bath, imgs.room5].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 220, sqm: 26, occupancy: 2,
      floor: 'Second floor',
      view: 'Rooftops, with a glimpse of Canty Bay',
      amenities: ['King bed', 'Walk-in shower', 'Reading chair', 'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking'],
      active: true,
    },
  ]

  for (const room of rooms) {
    const status = await create(room)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${room.name}`)
  }
}

async function importExperiences(imgs) {
  console.log('\n🌊  Experiences')

  const experiences = [
    {
      _id: 'exp-gin-tasting',
      _type: 'experience',
      name: 'Gin Tasting at the Harbour',
      slug: slug('gin-tasting-at-the-harbour'),
      category: 'Food & Drink',
      description: 'An evening in the library with our keeper of the cellar: six pours, tasted chronologically, from the first bottling to the newest small-batch release — finishing with the house blend, made for us alone with sea buckthorn and bladderwrack from the rocks below the hotel.',
      heroImage: imgs.gin,
      duration: '2 hours',
      price: 'From £75 per person',
      seasons: ['Year round'],
      includes: ['Six guided pours', 'House blend tasting', 'Oatcakes and cheese from the pantry', 'Tasting notes to take home'],
    },
    {
      _id: 'exp-gannet-safari',
      _type: 'experience',
      name: 'Bass Rock Gannet Safari',
      slug: slug('bass-rock-gannet-safari'),
      category: 'Outdoors',
      description: 'An hour by RIB out to the rock and back, timed to the tide and the light. Between April and September it holds the largest colony of Northern gannets on Earth — a hundred and fifty thousand birds, and a noise you feel as much as hear. Wetsuits and warm layers provided.',
      heroImage: imgs.boat,
      duration: '2 hours',
      price: 'From £55 per person',
      seasons: ['Spring', 'Summer', 'Autumn'],
      includes: ['Private skipper and RIB', 'Wetsuits and waterproofs', 'Flask and shortbread on deck', 'Binoculars for the crossing'],
    },
    {
      _id: 'exp-sea-kayaking',
      _type: 'experience',
      name: 'Sea Kayaking to Fidra',
      slug: slug('sea-kayaking-to-fidra'),
      category: 'Outdoors',
      description: 'A guided paddle from the harbour out past the moorings to Fidra, tuition pitched precisely to you — first stroke or fortieth season. Seals haul out on the rocks most mornings and rarely mind the company. Lunch comes back to the harbour wall in a hamper.',
      heroImage: imgs.sea,
      duration: 'Half day',
      price: 'From £90 per person',
      seasons: ['Spring', 'Summer', 'Autumn'],
      includes: ['Sit-on-top kayak and all kit', 'Qualified guide', 'Harbour-wall hamper lunch', 'Wetsuit and changing hut'],
    },
    {
      _id: 'exp-wild-swimming',
      _type: 'experience',
      name: 'Wild Swimming & Beach Sauna',
      slug: slug('wild-swimming-and-beach-sauna'),
      category: 'Wellness',
      description: 'A short walk along the sand to the water, a swim that will reorganise your priorities, and a wood-fired sauna on the beach to put them back. Towels, robes and hot chocolate at the door.',
      heroImage: imgs.sea,
      duration: '2 hours',
      price: 'From £55 per person',
      seasons: ['Year round'],
      includes: ['Guided swim with safety cover', 'Wood-fired beach sauna', 'Robes, towels and changing hut', 'Hot chocolate or a dram afterwards'],
    },
    {
      _id: 'exp-tantallon-selkie',
      _type: 'experience',
      name: 'Tantallon & the Selkie Shore',
      slug: slug('tantallon-and-the-selkie-shore'),
      category: 'Heritage',
      description: 'A clifftop walk to the ruin at Tantallon with a storyteller who has kept the local selkie legends — seal-folk who shed their skins to walk among us — alive for longer than the castle has been a ruin. The walk ends at the cove where, depending who you ask, they still come ashore.',
      heroImage: imgs.dunes,
      duration: '2.5 hours',
      price: 'From £45 per person',
      seasons: ['Year round'],
      includes: ['Private storyteller-guide', 'Castle entry', 'Flask and shortbread', 'Map of the coastal path for the rest of your stay'],
    },
    {
      _id: 'exp-foraging',
      _type: 'experience',
      name: 'Foraging the Shoreline with the Chef',
      slug: slug('foraging-the-shoreline-with-the-chef'),
      category: 'Food & Drink',
      description: 'A morning on the rocks and in the dunes with our head chef, gathering whatever the tide offers — sea purslane, dulse, mussels, the occasional stray oyster — followed by lunch built around the basket you carried home.',
      heroImage: imgs.dunes,
      duration: 'Half day',
      price: 'From £110 per person',
      seasons: ['Spring', 'Summer', 'Autumn'],
      includes: ['Foraging walk with the head chef', 'Basket and knife to use', 'Three-course lunch from your haul', 'Recipe cards to take home'],
    },
  ]

  for (const exp of experiences) {
    const status = await create(exp)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${exp.name}`)
  }
}

async function importOffers(imgs) {
  console.log('\n🎁  Offers')

  const offers = [
    {
      _id: 'offer-long-weekend',
      _type: 'offer',
      title: 'The Long Weekend',
      slug: slug('the-long-weekend'),
      subtitle: 'Three nights, properly taken',
      description: 'Arrive Friday, leave Monday, and let the house do the rest. Dinner on your first evening, a late checkout on your last morning, and the weekend left deliberately unplanned in between.',
      tag: 'Most popular',
      image: imgs.exterior,
      inclusions: ['Three nights bed & breakfast', 'Three-course dinner on arrival night', 'Late checkout until 1pm', 'Welcome dram on arrival'],
      type: 'Stay',
    },
    {
      _id: 'offer-winter-fire',
      _type: 'offer',
      title: 'Winter by the Fire',
      slug: slug('winter-by-the-fire'),
      subtitle: 'November to March',
      description: 'The house at its most persuasive: fires lit by breakfast, storms rolling in off the water, and the tasting menu at its richest. Two nights minimum, hot water bottles administered without irony.',
      tag: 'Seasonal',
      image: imgs.fire,
      inclusions: ['Two nights bed & breakfast', 'Six-course tasting menu one evening', 'Gin nightcap by the library fire', '20% off spa and sauna experiences'],
      validFrom: '2026-11-01',
      validUntil: '2027-03-31',
      type: 'Seasonal',
    },
    {
      _id: 'offer-midweek',
      _type: 'offer',
      title: 'The Midweek Escape',
      slug: slug('midweek-escape'),
      subtitle: 'Sunday to Thursday',
      description: 'The tide does not know it is Tuesday. Fifteen percent off bed and breakfast stays midweek, when the house is at its quietest and the beach is yours alone.',
      tag: 'Best value',
      image: imgs.bay,
      inclusions: ['15% off bed & breakfast rates', 'Flexible cancellation to 48 hours', 'Complimentary coastal walk map', 'Priority dinner reservations'],
      type: 'Stay',
    },
    {
      _id: 'offer-celebration',
      _type: 'offer',
      title: 'The Celebration Stay',
      slug: slug('celebration-stay'),
      subtitle: 'Mark it properly',
      description: 'Anniversaries, decades, escapes that needed an excuse. Champagne on ice when you arrive, flowers from the walled garden in the room, and an upgrade to the best available suite when the house allows.',
      tag: 'Occasions',
      image: imgs.room1,
      inclusions: ['Suite upgrade when available', 'Champagne and walled-garden flowers', 'Breakfast in bed, no judgement', 'Late checkout until 1pm'],
      type: 'Occasion',
    },
  ]

  for (const offer of offers) {
    const status = await create(offer)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${offer.title}`)
  }
}

async function importTestimonials() {
  console.log('\n💬  Testimonials')

  const testimonials = [
    {
      _id: 'testimonial-pemberton',
      _type: 'testimonial',
      guestName: 'A. & J. Pemberton',
      quote: 'We have stayed in grander hotels and slept worse in all of them. Selkie Bay understands the difference between luxury and fuss, and chooses correctly every single time.',
      rating: 5, roomStayed: 'The Fidra Suite', date: '2026-03-02', source: 'Guest book', featured: true,
    },
    {
      _id: 'testimonial-margaret',
      _type: 'testimonial',
      guestName: 'Margaret L.',
      quote: 'Dinner was the best I have eaten in Scotland, and I say that as someone who came principally for the gannets. The gannets, incidentally, were also the best I have seen in Scotland.',
      rating: 5, roomStayed: 'The Tantallon', date: '2026-05-18', source: 'Direct review', featured: true,
    },
    {
      _id: 'testimonial-okafor',
      _type: 'testimonial',
      guestName: 'The Okafor family',
      quote: 'Three generations, four days, zero complaints — a family first. The staff remembered everyone\'s name by breakfast on day one, including the dog\'s.',
      rating: 5, roomStayed: 'The Gullane & The Yellowcraig', date: '2025-10-26', source: 'Guest book', featured: true,
    },
    {
      _id: 'testimonial-whitfield',
      _type: 'testimonial',
      guestName: 'D. Whitfield',
      quote: 'I came for two nights to finish a book and stayed five. The library fire, the tide going out twice a day, and the woman who kept appearing with exactly the right pot of tea are jointly responsible.',
      rating: 5, roomStayed: 'The Canty Bay', date: '2026-02-09', source: 'Direct review', featured: true,
    },
    {
      _id: 'testimonial-maxwell',
      _type: 'testimonial',
      guestName: 'S. & R. Maxwell',
      quote: 'We were married on the harbour lawn in September. A year on, guests still bring it up unprompted. Flawless is an overused word; I am using it anyway.',
      rating: 5, roomStayed: 'The Bass Suite', date: '2025-09-30', source: 'Guest book', featured: true,
    },
  ]

  for (const t of testimonials) {
    const status = await create(t)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${t.guestName}`)
  }
}

async function importJournal(imgs) {
  console.log('\n📰  Journal posts')

  const posts = [
    {
      _id: 'journal-walled-garden',
      _type: 'journalPost',
      title: 'A Year in the Walled Garden',
      slug: slug('a-year-in-the-walled-garden'),
      category: 'Garden',
      author: 'Sorcha Bell',
      publishedAt: '2026-04-14',
      readingTime: '6 min read',
      excerpt: 'Our head gardener on sea fret, salt wind, and the quiet politics of growing for a kitchen that wants everything a fortnight early.',
      heroImage: imgs.garden,
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
      _id: 'journal-quiet-season',
      _type: 'journalPost',
      title: 'The Quiet Season: Why Winter Suits the East Lothian Coast',
      slug: slug('the-quiet-season'),
      category: 'The Bay',
      author: 'Fiona Sutherland',
      publishedAt: '2026-01-20',
      readingTime: '5 min read',
      excerpt: 'The case for coming when everyone else has gone home: short days, long dinners, and a stretch of coast that keeps its best light for the patient.',
      heroImage: imgs.fire,
      featured: true,
      body: [
        block('There is a fortnight in deep winter when the sun barely clears the horizon, and the whole bay sits in a kind of blue half-light from ten until three. Most hotels would apologise for it. We would argue it is the best thing we offer.'),
        block('Winter compresses the day into something honest. You walk in the morning because the light is leaving. You are back by the fire at four because there is nowhere better to be. Dinner takes three hours because nobody can think of a reason it should not.'),
        block('What to actually do', 'h2'),
        block('The coastal path is at its best in a hard frost — the marram grass rimed white and the beach empty for miles. The sauna on the sand becomes a conviction rather than a novelty. And the kitchen, freed from the tyranny of summer lightness, cooks the way this coast has always wanted to be cooked: slowly, richly, with gravity.'),
        block('Come in February. Bring boots and a book. Leave the rest to the house.'),
      ],
    },
    {
      _id: 'journal-north-law',
      _type: 'journalPost',
      title: 'Meet the Maker: North Law Distillery',
      slug: slug('meet-the-maker-north-law'),
      category: 'Provenance',
      author: 'Euan Tait',
      publishedAt: '2025-11-08',
      readingTime: '5 min read',
      excerpt: 'Ten minutes up the coast road is a nine-person distillery making gin the way it was always supposed to be made — slowly, and mostly by hand. We went to see how they do it.',
      heroImage: imgs.gin,
      featured: true,
      body: [
        block('The still room smells of warm copper and something greener — juniper, sea buckthorn, and the particular sharpness of bladderwrack drying on racks by the door. North Law Distillery have been at this for eight years on a site that was a maltings for a century before that. The team is nine people. The output is around eleven thousand bottles a year. By any measure of the industry, this is very small. By any measure of quality, it is not.'),
        block('The house blend', 'h2'),
        block('Three years ago, I walked up the hill with a proposal: could we work together on a gin for the house? Something that reflected the shore, the kitchen, the particular kind of evening we try to create. What came back, a year later, was a spirit built on local juniper and sea buckthorn, with enough bladderwrack to know where it came from and enough citrus to make it welcome before dinner.'),
        block('It sits behind every bar in the house now, in a bottle with our own label. Guests finish it. We take that as the review.'),
        block('You can visit North Law with us — the tasting in the library ends with a pour of their newest batch, and the distillery walk runs most Thursdays in season.'),
      ],
    },
    {
      _id: 'journal-six-walks',
      _type: 'journalPost',
      title: 'Six Walks from the Harbour',
      slug: slug('six-walks-from-the-harbour'),
      category: 'Outdoors',
      author: 'Angus Reid',
      publishedAt: '2025-09-15',
      readingTime: '7 min read',
      excerpt: 'No car required. Our boat skipper ranks the six routes that start on the harbour wall outside reception, from a gentle twenty minutes to a full morning on the Law.',
      heroImage: imgs.walk,
      featured: true,
      body: [
        block('People drive an hour from here to start walks worse than the ones that begin on our harbour wall. Here are the six I send guests on, easiest first. All of them start and end at the front door, which matters more than people think — the best walk is the one between you and dinner.'),
        block('One: The Harbour Circuit', 'h2'),
        block('Twenty minutes, flat, impossible to lose. Along the West Bay sands, round the point, back past the lifeboat station. Oystercatchers guaranteed; a seal in the harbour mouth if you are quiet and lucky.'),
        block('Two: The Yellowcraig Loop', 'h2'),
        block('Forty minutes through the dunes and Scots pine, taking in the beach, the rockpools, and the view out to Fidra that made a local boy write Treasure Island. Good with a coffee from the hall table.'),
        block('Three to Five: The Coast Path', 'h2'),
        block('Three stretches run east and west along the John Muir Way: the Tantallon leg (two hours), the Seacliff shore (three, rocky, worth it), and the Dirleton loop (four, big views, take lunch). Ask at the desk and we will mark the day\'s best choice on a map — wind decides.'),
        block('Six: The Law', 'h2'),
        block('A full morning, proper boots, packed lunch from the kitchen. The whole coast at your feet and, on a clear day, the Highlands themselves on the far side of the water. I have done it some four hundred times. It has not once been the same walk twice.'),
      ],
    },
  ]

  for (const post of posts) {
    const status = await create(post)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${post.title}`)
  }
}

async function importTeam(imgs) {
  console.log('\n👥  Team')

  const team = [
    {
      _id: 'team-fiona',
      _type: 'teamMember',
      name: 'Fiona Sutherland',
      role: 'General Manager',
      bio: 'Twenty years in coastal hotels on both sides of the Forth, and a firm belief that the best service is the kind you only notice afterwards. Keeper of the guest book and its secrets.',
      headshot: imgs.portrait2,
      department: 'Management',
      displayOrder: 1,
    },
    {
      _id: 'team-euan',
      _type: 'teamMember',
      name: 'Euan Tait',
      role: 'Head Chef',
      bio: 'East Lothian born, trained in Edinburgh and Copenhagen, returned on the understanding that the larder would be the shoreline itself. Cooks what the harbour, the tide and the walled garden hand him.',
      headshot: imgs.portrait3,
      department: 'Kitchen',
      displayOrder: 2,
    },
    {
      _id: 'team-mairi',
      _type: 'teamMember',
      name: 'Mairi Cochrane',
      role: 'Front of House Manager',
      bio: 'The first voice most guests hear and the reason most of them come back. Knows every train time, every tide table, and every guest\'s usual table by their second visit.',
      headshot: imgs.portrait4,
      department: 'Front of House',
      displayOrder: 3,
    },
    {
      _id: 'team-sorcha',
      _type: 'teamMember',
      name: 'Sorcha Bell',
      role: 'Head Gardener',
      bio: 'Custodian of the 1868 walled garden and its seven varieties of potato. Negotiates daily with the kitchen and, by her own account, usually wins.',
      headshot: imgs.portrait5,
      department: 'Grounds',
      displayOrder: 4,
    },
    {
      _id: 'team-angus',
      _type: 'teamMember',
      name: 'Angus Reid',
      role: 'Boat Skipper',
      bio: 'Thirty years on this water. Guide to the coast paths, keeper of the RIB, and the only member of staff with a standing excuse to be late: the tide wanted watching.',
      headshot: imgs.portrait1,
      department: 'Grounds',
      displayOrder: 5,
    },
    {
      _id: 'team-priya',
      _type: 'teamMember',
      name: 'Priya Nair',
      role: 'Head of Housekeeping',
      bio: 'Runs the quietest department in the house to the highest standard in it. Believes a properly made bed is a moral position, and makes a persuasive case nightly.',
      headshot: imgs.portrait6,
      department: 'Housekeeping',
      displayOrder: 6,
    },
  ]

  for (const member of team) {
    const status = await create(member)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${member.name}`)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌊  The Selkie Bay Hotel — Sanity Import`)
  console.log(`    Project: ${PROJECT_ID} / ${DATASET}\n`)

  console.log('📸  Uploading images (this takes a minute)...')
  const imgs = {}
  for (const [name, url] of Object.entries(URLS)) {
    imgs[name] = await uploadImage(url, name)
  }

  await importRooms(imgs)
  await importExperiences(imgs)
  await importOffers(imgs)
  await importTestimonials()
  await importJournal(imgs)
  await importTeam(imgs)

  console.log('\n✅  Import complete! Refresh your Studio and the site to see the content.\n')
}

main().catch((err) => {
  console.error('\n❌ ', err.message)
  process.exit(1)
})
