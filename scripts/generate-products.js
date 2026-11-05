import { mkdir, writeFile } from 'node:fs/promises'

const Catalog = [
  ['PlayStation 5 Slim Console (Disc Edition)','Sony','consoles',['PS5'],27990,29990,'1TB SSD','Up to 4K 120Hz','/photo-1606813907291-d86efa9b94db'],
  ['Xbox Series X 1TB Console','Microsoft','consoles',['Xbox'],31990,33990,'1TB SSD','4K UHD','/photo-1621259182978-fbf93132d53d'],
  ['Nintendo Switch OLED Model','Nintendo','consoles',['Nintendo Switch'],16990,18990,'64GB','7-inch OLED','/photo-1578303512597-81e6cc155b3e'],
  ['Steam Deck OLED 512GB','Valve','consoles',['PC'],32990,34990,'512GB NVMe SSD','1280 × 800 HDR','/photo-1593305841991-05c297ba4575'],
  ['Nintendo Switch Lite Coral','Nintendo','consoles',['Nintendo Switch'],10990,11990,'32GB','720p handheld','/photo-1578303512597-81e6cc155b3e'],
  ['Xbox Series S 1TB Robot White','Microsoft','consoles',['Xbox'],22990,24990,'1TB SSD','1440p gaming','/photo-1621259182978-fbf93132d53d'],
  ['DualSense Wireless Controller','Sony','accessories',['PS5'],3990,4490,'Haptic feedback','USB-C charging','/photo-1606813907291-d86efa9b94db'],
  ['Xbox Wireless Controller Carbon Black','Microsoft','accessories',['Xbox'],3290,3690,'40-hour battery','Bluetooth','/photo-1621259182978-fbf93132d53d'],
  ['The Legend of Zelda: Echoes of Wisdom','Nintendo','games',['Nintendo Switch'],2990,3290,'Adventure','Nintendo Switch','/photo-1578303512597-81e6cc155b3e'],
  ['Super Mario Party Jamboree','Nintendo','games',['Nintendo Switch'],2990,3290,'Party','Nintendo Switch','/photo-1578303512597-81e6cc155b3e'],
  ['Pokémon Legends: Z-A','Nintendo','games',['Nintendo Switch'],2990,3290,'Adventure RPG','Nintendo Switch','/photo-1578303512597-81e6cc155b3e'],
  ['Mario Kart 8 Deluxe','Nintendo','games',['Nintendo Switch'],2490,2790,'Racing','Nintendo Switch','/photo-1578303512597-81e6cc155b3e'],
  ['Astro Bot','Sony','games',['PS5'],2990,3290,'Platformer','PlayStation 5','/photo-1606813907291-d86efa9b94db'],
  ['Marvel’s Spider-Man 2','Sony','games',['PS5'],2990,3490,'Action adventure','PlayStation 5','/photo-1606813907291-d86efa9b94db'],
  ['God of War Ragnarök','Sony','games',['PS5'],2490,2990,'Action adventure','PlayStation 5','/photo-1606813907291-d86efa9b94db'],
  ['Forza Horizon 5','Microsoft','games',['Xbox','PC'],1990,2490,'Racing','Xbox Series X|S','/photo-1621259182978-fbf93132d53d'],
  ['Call of Duty: Black Ops 6','Activision','games',['PS5','Xbox','PC'],3490,3990,'First-person shooter','PS5 / Xbox / PC','/photo-1542751371-adc38448a05e'],
  ['Elden Ring: Shadow of the Erdtree Edition','Bandai Namco','games',['PS5','Xbox','PC'],3290,3690,'Action RPG','PS5 / Xbox / PC','/photo-1542751371-adc38448a05e'],
  ['Logitech G Pro X TKL Mechanical Keyboard','Logitech','pc-gaming',['PC'],8990,9990,'GX Brown switches','RGB LIGHTSYNC','/photo-1587829741301-dc798b83add3'],
  ['Razer BlackWidow V4 Pro','Razer','pc-gaming',['PC'],12990,14990,'Green mechanical switches','Razer Chroma RGB','/photo-1587829741301-dc798b83add3'],
  ['ASUS ROG Strix G16 Gaming Monitor','ASUS','pc-gaming',['PC'],18990,21990,'165Hz IPS','1920 × 1080','/photo-1527443224154-c4a3942d3acf'],
  ['Logitech G502 X Gaming Mouse','Logitech','pc-gaming',['PC'],3990,4490,'HERO 25K sensor','Wired','/photo-1527814050087-3793815479db'],
  ['Razer DeathAdder V3 Pro','Razer','pc-gaming',['PC'],7990,8990,'Focus Pro 30K sensor','Wireless','/photo-1527814050087-3793815479db'],
  ['HyperX Cloud III Wireless Headset','HyperX','pc-gaming',['PC','PS5'],6990,7990,'120-hour battery','DTS Headphone:X','/photo-1599669454699-248893623440'],
  ['Logitech G733 LIGHTSPEED Headset','Logitech','pc-gaming',['PC','PS5'],6990,7990,'29-hour battery','LIGHTSYNC RGB','/photo-1599669454699-248893623440'],
  ['SteelSeries QcK XXL Mousepad','SteelSeries','pc-gaming',['PC'],1490,1790,'900 × 400 mm','Micro-woven cloth','/photo-1615663245857-ac93bb7c39e7'],
  ['Keychron K2 Pro Wireless Keyboard','Keychron','pc-gaming',['PC'],5690,6490,'Hot-swappable','Bluetooth 5.1','/photo-1587829741301-dc798b83add3'],
  ['Razer Kraken Kitty V2','Razer','pc-gaming',['PC'],6990,7990,'TriForce 40mm drivers','Kitty ear lighting','/photo-1599669454699-248893623440'],
  ['PlayStation Portal Remote Player','Sony','gadgets',['PS5'],12990,13990,'8-inch LCD','1080p at 60fps','/photo-1606813907291-d86efa9b94db'],
  ['JBL Tune 770NC Wireless Headphones','JBL','gadgets',['Universal'],3990,4990,'70-hour battery','Adaptive Noise Cancelling','/photo-1505740420928-5e560c06d30e'],
  ['Anker 20,000mAh Power Bank','Anker','gadgets',['Universal'],1990,2490,'20,000mAh','22.5W fast charge','/photo-1609091839311-d5365f9ff1c5'],
  ['Nintendo Switch Carrying Case','Nintendo','accessories',['Nintendo Switch'],1290,1590,'Fits Switch OLED','Hard shell','/photo-1578303512597-81e6cc155b3e'],
  ['DualSense Charging Station','Sony','accessories',['PS5'],1690,1990,'Dual controller charging','Click-in design','/photo-1606813907291-d86efa9b94db'],
  ['SanDisk 256GB microSD Express Card','SanDisk','accessories',['Nintendo Switch'],2490,2990,'256GB','Up to 880 MB/s','/photo-1591488320449-011701bb6704'],
  ['Razer Kishi V2 Mobile Controller','Razer','accessories',['Universal'],4990,5990,'USB-C','Mobile gaming','/photo-1612287230202-1ff1d85d1bdf'],
  ['Amiibo: Link (Tears of the Kingdom)','Nintendo','collectibles',['Nintendo Switch'],1990,2290,'Official amiibo','Collector figure','/photo-1578303512597-81e6cc155b3e'],
  ['Gundam RX-78-2 Entry Grade Figure','Bandai','collectibles',['Universal'],890,1090,'1/144 scale','Snap-fit model kit','/photo-1566576912321-d58ddd7a6088'],
  ['Sonic the Hedgehog Tails Plush','Sega','collectibles',['Universal'],1490,1690,'25 cm','Official plush','/photo-1566576912321-d58ddd7a6088'],
  ['Pokémon Pikachu Sitting Cuties Plush','Pokémon','collectibles',['Universal'],1290,1490,'15 cm','Official plush','/photo-1566576912321-d58ddd7a6088'],
  ['Razer Kraken V3 X USB Gaming Headset','Razer','accessories',['PC'],2990,3490,'7.1 surround sound','USB wired','/photo-1599669454699-248893623440'],
  ['Logitech C920s HD Pro Webcam','Logitech','gadgets',['PC'],3990,4490,'1080p at 30fps','Privacy shutter','/photo-1587829741301-dc798b83add3']
]

const Products = Catalog.map(([Name, Brand, Category, Platform, Price, ComparePrice, SpecA, SpecB, Image], Index) => ({
  id: `p-${1001 + Index}`,
  sku: `${Brand.slice(0, 3).toUpperCase()}-${Category.slice(0, 3).toUpperCase()}-${1001 + Index}`,
  name: Name,
  brand: Brand,
  category: Category,
  platform: Platform,
  price: Price,
  salePrice: Price,
  currency: 'PHP',
  stock: Index % 11 === 0 ? 3 : Index % 13 === 0 ? 0 : 5 + Index % 36,
  rating: Number((4.2 + ((Index * 7) % 9) / 10).toFixed(1)),
  reviewCount: 22 + (Index * 31) % 280,
  images: [`https://images.unsplash.com${Image}?auto=format&fit=crop&w=900&q=85`, `https://images.unsplash.com${Image}?auto=format&fit=crop&w=900&q=70`],
  description: `${Name} brings dependable quality and a brilliant play experience. Shop with confidence and get ready for your next great session.`,
  specs: { [Category === 'consoles' ? 'Storage' : 'Feature']: SpecA, [Category === 'consoles' ? 'Resolution' : 'Details']: SpecB, Brand },
  tags: Index % 4 === 0 ? ['best-seller', 'sale'] : Index % 3 === 0 ? ['new', 'sale'] : ['sale'],
  isFeatured: Index < 8
}))

await mkdir(new URL('../src/data/', import.meta.url), { recursive: true })
await writeFile(new URL('../src/data/products.json', import.meta.url), `${JSON.stringify(Products, null, 2)}\n`)
process.stdout.write(`Generated ${Products.length} products\n`)
