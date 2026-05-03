// Simulates real API calls with async delays

const DESTINATIONS = [
  {
    id: 1, name: 'Santorini', country: 'Greece', continent: 'Europe',
    category: 'beach', price: 2400, rating: 4.9, reviews: 3847,
    featured: true, trending: true,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    description: 'Iconic white-washed villages perched on volcanic cliffs above the deep blue Aegean. Watch sunsets that have inspired artists for millennia from the clifftops of Oia.',
    highlights: ['Caldera views', 'Wine tasting', 'Volcano hike', 'Beach hopping'],
    duration: '5-7 days', bestTime: 'Apr–Oct',
    weather: { temp: 26, condition: 'Sunny', humidity: 55 },
    coordinates: { lat: 36.3932, lng: 25.4615 },
    tags: ['romantic', 'scenic', 'photography'],
  },
  {
    id: 2, name: 'Kyoto', country: 'Japan', continent: 'Asia',
    category: 'culture', price: 3100, rating: 4.8, reviews: 5621,
    featured: true, trending: false,
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    description: 'Ancient temples, bamboo groves, and geisha districts — Kyoto is Japan\'s cultural heart. Over 1,600 Buddhist temples and 400 Shinto shrines await your discovery.',
    highlights: ['Fushimi Inari', 'Arashiyama Bamboo', 'Tea ceremony', 'Geisha district'],
    duration: '4-6 days', bestTime: 'Mar–May, Oct–Nov',
    weather: { temp: 18, condition: 'Partly Cloudy', humidity: 68 },
    coordinates: { lat: 35.0116, lng: 135.7681 },
    tags: ['culture', 'history', 'temples'],
  },
  {
    id: 3, name: 'Machu Picchu', country: 'Peru', continent: 'South America',
    category: 'adventure', price: 2800, rating: 4.9, reviews: 4102,
    featured: true, trending: true,
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
    description: 'The Lost City of the Incas floats among the clouds at 2,430m. This 15th-century citadel offers one of the world\'s most breathtaking archaeological experiences.',
    highlights: ['Sun Gate trek', 'Inca Trail', 'Huayna Picchu', 'Llama encounters'],
    duration: '3-5 days', bestTime: 'May–Sep',
    weather: { temp: 15, condition: 'Misty', humidity: 75 },
    coordinates: { lat: -13.1631, lng: -72.5450 },
    tags: ['adventure', 'history', 'hiking'],
  },
  {
    id: 4, name: 'Maldives', country: 'Maldives', continent: 'Asia',
    category: 'beach', price: 4800, rating: 4.9, reviews: 2938,
    featured: false, trending: true,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    description: 'Overwater bungalows, bioluminescent beaches, and crystal lagoons. The Maldives is the ultimate luxury escape with some of the world\'s finest diving and snorkeling.',
    highlights: ['Overwater villas', 'Snorkeling with rays', 'Dolphin cruises', 'Sunset fishing'],
    duration: '5-10 days', bestTime: 'Nov–Apr',
    weather: { temp: 30, condition: 'Sunny', humidity: 78 },
    coordinates: { lat: 3.2028, lng: 73.2207 },
    tags: ['luxury', 'romantic', 'diving'],
  },
  {
    id: 5, name: 'Patagonia', country: 'Argentina/Chile', continent: 'South America',
    category: 'adventure', price: 3500, rating: 4.7, reviews: 1856,
    featured: false, trending: false,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    description: 'At the end of the world, dramatic granite spires pierce the sky above endless pampas. Torres del Paine offers some of Earth\'s most spectacular wilderness trekking.',
    highlights: ['Torres del Paine', 'Perito Moreno Glacier', 'Condor watching', 'Gaucho culture'],
    duration: '7-14 days', bestTime: 'Nov–Mar',
    weather: { temp: 8, condition: 'Windy', humidity: 60 },
    coordinates: { lat: -50.9423, lng: -73.4068 },
    tags: ['adventure', 'wilderness', 'trekking'],
  },
  {
    id: 6, name: 'Amalfi Coast', country: 'Italy', continent: 'Europe',
    category: 'scenic', price: 2900, rating: 4.8, reviews: 4421,
    featured: false, trending: true,
    image: 'https://images.unsplash.com/photo-1534308143481-c55f00dc5663?w=800&q=80',
    description: 'Pastel-colored villages tumble down vertiginous cliffs into the turquoise Tyrrhenian Sea. Drive the winding coastal road, eat the world\'s finest seafood, and drink Limoncello at sunset.',
    highlights: ['Positano', 'Ravello gardens', 'Boat tours', 'Limoncello tasting'],
    duration: '4-7 days', bestTime: 'Apr–Jun, Sep–Oct',
    weather: { temp: 24, condition: 'Sunny', humidity: 62 },
    coordinates: { lat: 40.6333, lng: 14.6029 },
    tags: ['scenic', 'food', 'romantic'],
  },
  {
    id: 7, name: 'Marrakech', country: 'Morocco', continent: 'Africa',
    category: 'culture', price: 1400, rating: 4.6, reviews: 3219,
    featured: false, trending: false,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80',
    description: 'Lose yourself in the labyrinthine medina where spice markets, riads, and the hypnotic call to prayer create an intoxicating sensory overload unlike anywhere else on Earth.',
    highlights: ['Djemaa el-Fna', 'Majorelle Garden', 'Hammam ritual', 'Sahara day trip'],
    duration: '3-5 days', bestTime: 'Oct–Apr',
    weather: { temp: 22, condition: 'Sunny', humidity: 40 },
    coordinates: { lat: 31.6295, lng: -7.9811 },
    tags: ['culture', 'markets', 'food'],
  },
  {
    id: 8, name: 'Iceland', country: 'Iceland', continent: 'Europe',
    category: 'adventure', price: 3800, rating: 4.8, reviews: 2745,
    featured: false, trending: true,
    image: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80',
    description: 'A land of fire and ice where glaciers, volcanoes, geysers, and the aurora borealis coexist. Iceland offers otherworldly landscapes that feel like standing on another planet.',
    highlights: ['Northern Lights', 'Blue Lagoon', 'Golden Circle', 'Glacier hiking'],
    duration: '6-10 days', bestTime: 'Jun–Aug (midnight sun), Sep–Mar (aurora)',
    weather: { temp: 5, condition: 'Overcast', humidity: 80 },
    coordinates: { lat: 64.9631, lng: -19.0208 },
    tags: ['adventure', 'nature', 'aurora'],
  },
  {
    id: 9, name: 'Bali', country: 'Indonesia', continent: 'Asia',
    category: 'beach', price: 1800, rating: 4.7, reviews: 6832,
    featured: false, trending: true,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    description: 'The Island of the Gods blends lush rice terraces, sacred temples, surf breaks, and vibrant nightlife with a spiritual richness that transforms every traveler who visits.',
    highlights: ['Uluwatu Temple', 'Tegalalang Rice Terrace', 'Ubud Monkey Forest', 'Surfing Kuta'],
    duration: '7-14 days', bestTime: 'Apr–Oct',
    weather: { temp: 28, condition: 'Humid', humidity: 82 },
    coordinates: { lat: -8.3405, lng: 115.0920 },
    tags: ['culture', 'beach', 'spiritual'],
  },
  {
    id: 10, name: 'New Zealand', country: 'New Zealand', continent: 'Oceania',
    category: 'adventure', price: 4200, rating: 4.8, reviews: 2341,
    featured: false, trending: false,
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',
    description: 'Middle Earth brought to life: fjords, volcanic peaks, glowworm caves, and bungee jumping in the adventure capital of the world. Both North and South Islands offer distinct wonders.',
    highlights: ['Milford Sound', 'Hobbiton', 'Queenstown thrills', 'Waitomo Caves'],
    duration: '10-21 days', bestTime: 'Dec–Feb',
    weather: { temp: 14, condition: 'Partly Cloudy', humidity: 72 },
    coordinates: { lat: -40.9006, lng: 174.8860 },
    tags: ['adventure', 'nature', 'scenic'],
  },
  {
    id: 11, name: 'Prague', country: 'Czech Republic', continent: 'Europe',
    category: 'culture', price: 1600, rating: 4.7, reviews: 5109,
    featured: false, trending: false,
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
    description: 'The City of a Hundred Spires preserves its medieval magic remarkably intact. Gothic cathedrals, baroque palaces, and the world\'s oldest astronomical clock line cobblestone streets.',
    highlights: ['Charles Bridge', 'Prague Castle', 'Old Town Square', 'Beer culture'],
    duration: '3-5 days', bestTime: 'Apr–Jun, Sep–Nov',
    weather: { temp: 12, condition: 'Cloudy', humidity: 70 },
    coordinates: { lat: 50.0755, lng: 14.4378 },
    tags: ['history', 'architecture', 'nightlife'],
  },
  {
    id: 12, name: 'Serengeti', country: 'Tanzania', continent: 'Africa',
    category: 'wildlife', price: 4500, rating: 4.9, reviews: 1923,
    featured: false, trending: false,
    image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80',
    description: 'Witness the greatest wildlife spectacle on Earth — the Great Migration of 1.5 million wildebeest across the endless plains. The Serengeti delivers raw, unfiltered Africa.',
    highlights: ['Great Migration', 'Big Five safari', 'Hot air balloon', 'Maasai culture'],
    duration: '5-10 days', bestTime: 'Jun–Oct',
    weather: { temp: 25, condition: 'Clear', humidity: 45 },
    coordinates: { lat: -2.3333, lng: 34.8333 },
    tags: ['wildlife', 'safari', 'nature'],
  },
];

const WEATHER_API_KEY = 'demo'; // Uses Open-Meteo (free, no key needed)

export const fetchDestinationsAPI = async ({ page = 1, limit = 6, filters = {} } = {}) => {
  await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

  let filtered = [...DESTINATIONS];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.tags.some(t => t.includes(q))
    );
  }
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(d => d.category === filters.category);
  }
  if (filters.continent && filters.continent !== 'all') {
    filtered = filtered.filter(d => d.continent === filters.continent);
  }
  if (filters.rating > 0) {
    filtered = filtered.filter(d => d.rating >= filters.rating);
  }
  if (filters.priceRange) {
    filtered = filtered.filter(d =>
      d.price >= filters.priceRange[0] && d.price <= filters.priceRange[1]
    );
  }

  if (filters.sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (filters.sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (filters.sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  else if (filters.sortBy === 'popular') filtered.sort((a, b) => b.reviews - a.reviews);

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return { items, total, page, append: page > 1 };
};

export const fetchDestinationById = async (id) => {
  await new Promise(r => setTimeout(r, 400));
  return DESTINATIONS.find(d => d.id === parseInt(id)) || null;
};

export const fetchWeather = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m`
    );
    const data = await res.json();
    return {
      temp: Math.round(data.current_weather?.temperature || 20),
      condition: getWeatherCondition(data.current_weather?.weathercode || 0),
      windspeed: data.current_weather?.windspeed,
    };
  } catch {
    return null;
  }
};

const getWeatherCondition = (code) => {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  if (code <= 82) return 'Showers';
  return 'Stormy';
};

export const fetchExchangeRate = async (from = 'USD', to = 'INR') => {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await res.json();
    return data.rates?.[to] || null;
  } catch {
    return null;
  }
};

export { DESTINATIONS };
