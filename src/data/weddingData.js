// ---------------------------------------------------------------------------
//  SINGLE SOURCE OF TRUTH
// ---------------------------------------------------------------------------
//  Every screen reads from this file. Today it exports hardcoded placeholder
//  data. Later, this is the ONE place you swap in the Google Sheet:
//
//    1. Read side  -> fetch the published CSV, parse rows into these same
//       shapes, and export them (see `src/data/README.md` for the plan).
//    2. Write side -> POST changes to a Google Apps Script Web App URL.
//
//  Keep the exported shapes stable and the rest of the app won't need to change.
// ---------------------------------------------------------------------------

export const wedding = {
  coupleNames: 'Max & Brooke',
  // ~14 months out from mid-2026. A Saturday.
  date: '2027-09-18T16:00:00',
  venueName: 'Willowmere Estate (tentative)',
  location: 'Sonoma County, CA',
}

// --- Budget --------------------------------------------------------------
// `actual: null` means "not spent / not finalized yet".
export const budget = {
  total: 55000,
  currency: 'USD',
  lineItems: [
    { id: 'b1', category: 'Venue',           estimated: 18000, actual: 17500, notes: 'Deposit paid' },
    { id: 'b2', category: 'Catering',        estimated: 14000, actual: null,  notes: '~110 guests @ $125' },
    { id: 'b3', category: 'Photography',     estimated: 5500,  actual: 5500,  notes: 'Booked' },
    { id: 'b4', category: 'Florals',         estimated: 4000,  actual: null,  notes: 'Quotes pending' },
    { id: 'b5', category: 'Music / DJ',      estimated: 3000,  actual: null,  notes: '' },
    { id: 'b6', category: 'Attire',          estimated: 3500,  actual: 1200,  notes: 'Dress deposit' },
    { id: 'b7', category: 'Cake & Desserts', estimated: 1200,  actual: null,  notes: '' },
    { id: 'b8', category: 'Invitations',     estimated: 900,   actual: 640,   notes: 'Save-the-dates sent' },
    { id: 'b9', category: 'Rentals & Decor', estimated: 3200,  actual: null,  notes: '' },
    { id: 'b10', category: 'Hair & Makeup',  estimated: 1400,  actual: null,  notes: '' },
    { id: 'b11', category: 'Officiant',      estimated: 800,   actual: 800,   notes: 'Booked' },
    { id: 'b12', category: 'Contingency',    estimated: 1500,  actual: null,  notes: '~3% buffer' },
  ],
}

// --- Venues --------------------------------------------------------------
// status: 'shortlisted' | 'visited' | 'confirmed' | 'passed'
export const venues = [
  { id: 'v1', name: 'Willowmere Estate', status: 'confirmed',   capacity: 150, price: 18000, location: 'Glen Ellen, CA',  notes: 'Garden ceremony + barn reception. Our pick.' },
  { id: 'v2', name: 'The Stone Vineyard', status: 'visited',    capacity: 120, price: 21000, location: 'Healdsburg, CA',  notes: 'Stunning views, over budget.' },
  { id: 'v3', name: 'Marin Art & Garden', status: 'visited',    capacity: 130, price: 15500, location: 'Ross, CA',        notes: 'Great value, rain plan is tight.' },
  { id: 'v4', name: 'Cavallo Point',      status: 'shortlisted', capacity: 180, price: 26000, location: 'Sausalito, CA',  notes: 'Dream option, waiting on a quote.' },
  { id: 'v5', name: 'Redwood Ranch',      status: 'passed',     capacity: 100, price: 12000, location: 'Occidental, CA',  notes: 'Too small for our list.' },
]

// --- Guests --------------------------------------------------------------
// side: 'Max' | 'Brooke' | 'Both'
// rsvp: 'pending' | 'yes' | 'no'
// meal: 'Chicken' | 'Beef' | 'Vegetarian' | 'Vegan' | '' (blank until RSVP'd)
export const guests = [
  { id: 'g1',  name: 'Eleanor Hayes',      email: 'eleanor.h@example.com',   side: 'Brooke', invited: true,  rsvp: 'yes',     meal: 'Vegetarian', plusOne: true  },
  { id: 'g2',  name: 'James Okafor',       email: 'j.okafor@example.com',    side: 'Max',    invited: true,  rsvp: 'yes',     meal: 'Beef',       plusOne: false },
  { id: 'g3',  name: 'Priya Nair',         email: 'priya.nair@example.com',  side: 'Brooke', invited: true,  rsvp: 'pending', meal: '',           plusOne: true  },
  { id: 'g4',  name: 'Daniel & Sofia Ruiz', email: 'd.ruiz@example.com',     side: 'Both',   invited: true,  rsvp: 'yes',     meal: 'Chicken',    plusOne: false },
  { id: 'g5',  name: 'Grandma Ruth',       email: '',                        side: 'Max',    invited: true,  rsvp: 'yes',     meal: 'Chicken',    plusOne: false },
  { id: 'g6',  name: 'Tom Bradley',        email: 't.bradley@example.com',   side: 'Max',    invited: true,  rsvp: 'no',      meal: '',           plusOne: false },
  { id: 'g7',  name: 'Aisha Rahman',       email: 'aisha.r@example.com',     side: 'Brooke', invited: true,  rsvp: 'pending', meal: '',           plusOne: false },
  { id: 'g8',  name: 'The Kowalski Family', email: 'kowalski@example.com',   side: 'Both',   invited: true,  rsvp: 'yes',     meal: 'Vegan',      plusOne: true  },
  { id: 'g9',  name: 'Marcus Lee',         email: 'marcus.lee@example.com',  side: 'Max',    invited: false, rsvp: 'pending', meal: '',           plusOne: false },
  { id: 'g10', name: 'Chloe Turner',       email: 'chloe.t@example.com',     side: 'Brooke', invited: true,  rsvp: 'yes',     meal: 'Beef',       plusOne: true  },
  { id: 'g11', name: 'Uncle Pete',         email: '',                        side: 'Max',    invited: true,  rsvp: 'pending', meal: '',           plusOne: false },
  { id: 'g12', name: 'Nina Patel',         email: 'nina.patel@example.com',  side: 'Brooke', invited: true,  rsvp: 'no',      meal: '',           plusOne: false },
]

// --- Vendors -------------------------------------------------------------
// contract: 'none' | 'inquiry' | 'proposal' | 'signed'
export const vendors = [
  { id: 'vn1', type: 'Photographer', name: 'Aperture & Vine',      contact: 'Rosa Kim',    email: 'rosa@apertureandvine.com', phone: '(707) 555-0148', contract: 'signed',   cost: 5500 },
  { id: 'vn2', type: 'Caterer',      name: 'Harvest Table Co.',    contact: 'Marco Duval', email: 'events@harvesttable.co',   phone: '(707) 555-0192', contract: 'proposal', cost: 14000 },
  { id: 'vn3', type: 'DJ',           name: 'Golden Hour Sound',    contact: 'DJ Ravi',     email: 'book@goldenhoursound.com', phone: '(415) 555-0176', contract: 'inquiry',  cost: 3000 },
  { id: 'vn4', type: 'Florist',      name: 'Fern & Thistle',       contact: 'Nora Ellis',  email: 'hello@fernandthistle.com', phone: '(707) 555-0133', contract: 'inquiry',  cost: 4000 },
]

// --- Menu & Drinks -------------------------------------------------------
export const menu = {
  courses: [
    { id: 'm1', course: 'Passed Apps',  items: ['Fig & goat cheese crostini', 'Ahi tuna tartare cones', 'Wild mushroom arancini'] },
    { id: 'm2', course: 'First',         items: ['Heirloom tomato & burrata', 'Little gem Caesar'] },
    { id: 'm3', course: 'Main',          items: ['Herb-roasted chicken', 'Braised short rib', 'Wild mushroom risotto (v)'] },
    { id: 'm4', course: 'Dessert',       items: ['Naked vanilla cake', 'Assorted mini tarts', 'Late-night grilled cheese bar'] },
  ],
  drinks: [
    { id: 'd1', name: 'Signature: "The Brooke" (elderflower spritz)', type: 'Cocktail' },
    { id: 'd2', name: 'Signature: "Max\'s Old Fashioned"',            type: 'Cocktail' },
    { id: 'd3', name: 'Local Sonoma red + white',                     type: 'Wine' },
    { id: 'd4', name: 'Two local craft beers on tap',                 type: 'Beer' },
    { id: 'd5', name: 'Sparkling + still water, sodas, mocktails',    type: 'Non-alcoholic' },
  ],
}

// --- Music ---------------------------------------------------------------
export const music = {
  ceremony: [
    { id: 'mc1', title: 'Processional — "Canon in D"',        artist: 'Pachelbel' },
    { id: 'mc2', title: 'Bridal entrance — "A Thousand Years"', artist: 'Christina Perri (string quartet)' },
    { id: 'mc3', title: 'Recessional — "Signed, Sealed, Delivered"', artist: 'Stevie Wonder' },
  ],
  cocktail: [
    { id: 'mk1', title: 'Golden hour playlist', artist: 'Jazz & soul mix' },
    { id: 'mk2', title: 'Put Your Records On',  artist: 'Corinne Bailey Rae' },
    { id: 'mk3', title: 'Valerie',              artist: 'Amy Winehouse' },
  ],
  reception: [
    { id: 'mr1', title: 'First dance — "At Last"', artist: 'Etta James' },
    { id: 'mr2', title: 'Dance floor openers',     artist: 'DJ Ravi set' },
    { id: 'mr3', title: 'Last song — "Closing Time"', artist: 'Semisonic' },
  ],
}

// --- Timeline (day-of) ---------------------------------------------------
export const timeline = [
  { id: 't1',  time: '12:00 PM', event: 'Hair & makeup begins',        owner: 'Bridal party' },
  { id: 't2',  time: '2:30 PM',  event: 'Photographer arrives',        owner: 'Rosa (Aperture & Vine)' },
  { id: 't3',  time: '3:30 PM',  event: 'First look',                  owner: 'Max & Brooke' },
  { id: 't4',  time: '4:00 PM',  event: 'Ceremony',                    owner: 'Officiant' },
  { id: 't5',  time: '4:30 PM',  event: 'Cocktail hour',               owner: 'Guests' },
  { id: 't6',  time: '5:45 PM',  event: 'Grand entrance & first dance', owner: 'DJ Ravi' },
  { id: 't7',  time: '6:15 PM',  event: 'Dinner served',               owner: 'Harvest Table' },
  { id: 't8',  time: '7:30 PM',  event: 'Toasts',                      owner: 'Best man / MOH' },
  { id: 't9',  time: '8:00 PM',  event: 'Dancing',                     owner: 'Everyone' },
  { id: 't10', time: '10:30 PM', event: 'Send-off (sparklers)',        owner: 'Everyone' },
]

// --- Tasks / checklist ---------------------------------------------------
// done: boolean. dueDate: ISO date string.
export const tasks = [
  { id: 'tk1',  title: 'Sign venue contract',            done: true,  dueDate: '2026-06-01', category: 'Venue' },
  { id: 'tk2',  title: 'Book photographer',              done: true,  dueDate: '2026-07-15', category: 'Vendors' },
  { id: 'tk3',  title: 'Send save-the-dates',            done: true,  dueDate: '2026-08-01', category: 'Guests' },
  { id: 'tk4',  title: 'Finalize caterer & tasting',     done: false, dueDate: '2026-09-30', category: 'Catering' },
  { id: 'tk5',  title: 'Book DJ',                        done: false, dueDate: '2026-10-15', category: 'Vendors' },
  { id: 'tk6',  title: 'Choose florist & get proposal',  done: false, dueDate: '2026-10-30', category: 'Vendors' },
  { id: 'tk7',  title: 'Order invitations',              done: false, dueDate: '2027-03-01', category: 'Guests' },
  { id: 'tk8',  title: 'Dress fittings',                 done: false, dueDate: '2027-05-15', category: 'Attire' },
  { id: 'tk9',  title: 'Finalize guest count',           done: false, dueDate: '2027-08-01', category: 'Guests' },
  { id: 'tk10', title: 'Confirm day-of timeline',        done: false, dueDate: '2027-09-01', category: 'Planning' },
]
