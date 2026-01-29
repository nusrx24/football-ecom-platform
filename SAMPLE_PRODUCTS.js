// Sample Football Products - Use these in Admin Panel

const sampleProducts = [
  // Arsenal Products
  {
    name: "Arsenal Home Jersey 2023-24",
    price: 89.99,
    description: "Official Arsenal home jersey for the 2023-24 season. Premium fabric with moisture-wicking technology.",
    image: "https://images.unsplash.com/photo-1627482173914-82af3a5ff199?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Arsenal",
    league: "Premier League",
    brand: "Adidas",
    season: "2023-24",
    jerseyType: "Home",
    isRetro: false,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    allowNameNumber: true,
    countInStock: 50
  },
  {
    name: "Arsenal Away Jersey 2023-24",
    price: 89.99,
    description: "Official Arsenal away jersey featuring a classic white design.",
    image: "https://images.unsplash.com/photo-1600185365926-19d7e8d54e96?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Arsenal",
    league: "Premier League",
    brand: "Adidas",
    season: "2023-24",
    jerseyType: "Away",
    isRetro: false,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    allowNameNumber: true,
    countInStock: 35
  },
  {
    name: "Arsenal Retro 2005-06 Highbury",
    price: 124.99,
    description: "Iconic Arsenal jersey from the unbeaten 2005-06 season. Throwback to Thierry Henry era.",
    image: "https://images.unsplash.com/photo-1611339555312-e607c04352fd?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Arsenal",
    league: "Premier League",
    brand: "Nike",
    season: "2005-06",
    jerseyType: "Home",
    isRetro: true,
    sizes: ["S", "M", "L", "XL"],
    allowNameNumber: true,
    countInStock: 25
  },

  // Barcelona Products
  {
    name: "Barcelona Home Jersey 2023-24",
    price: 94.99,
    description: "FC Barcelona official home jersey. Classic blaugrana colors with modern design.",
    image: "https://images.unsplash.com/photo-1581953834760-bd46a42434ca?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Barcelona",
    league: "La Liga",
    brand: "Nike",
    season: "2023-24",
    jerseyType: "Home",
    isRetro: false,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    allowNameNumber: true,
    countInStock: 45
  },
  {
    name: "Barcelona Retro Ronaldinho 2006",
    price: 129.99,
    description: "Legendary Barcelona jersey from the golden Ronaldinho era. 2006 UEFA Champions League winner.",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Barcelona",
    league: "La Liga",
    brand: "Kappa",
    season: "2004-2006",
    jerseyType: "Home",
    isRetro: true,
    sizes: ["S", "M", "L", "XL"],
    allowNameNumber: true,
    countInStock: 20
  },

  // Manchester United Products
  {
    name: "Manchester United Home Jersey 2023-24",
    price: 87.99,
    description: "Manchester United official home jersey featuring the iconic red color and crest.",
    image: "https://images.unsplash.com/photo-1518611505868-48510c2de5d1?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Manchester United",
    league: "Premier League",
    brand: "Adidas",
    season: "2023-24",
    jerseyType: "Home",
    isRetro: false,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    allowNameNumber: true,
    countInStock: 55
  },
  {
    name: "Manchester United Retro 1999 Treble",
    price: 134.99,
    description: "Historic Manchester United jersey from the legendary treble-winning 1999 season. Worn by Scholes, Giggs, and Beckham.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Manchester United",
    league: "Premier League",
    brand: "Umbro",
    season: "1998-1999",
    jerseyType: "Home",
    isRetro: true,
    sizes: ["S", "M", "L", "XL"],
    allowNameNumber: true,
    countInStock: 18
  },

  // Real Madrid Products
  {
    name: "Real Madrid Home Jersey 2023-24",
    price: 99.99,
    description: "Real Madrid official home jersey featuring classic all-white design. For Los Blancos fans.",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Real Madrid",
    league: "La Liga",
    brand: "Adidas",
    season: "2023-24",
    jerseyType: "Home",
    isRetro: false,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    allowNameNumber: true,
    countInStock: 48
  },
  {
    name: "Real Madrid Retro Zidane 2000",
    price: 139.99,
    description: "Real Madrid jersey from the year Zinedine Zidane joined. Iconic period of galacticos.",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6c4d?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Real Madrid",
    league: "La Liga",
    brand: "Adidas",
    season: "2000-2001",
    jerseyType: "Home",
    isRetro: true,
    sizes: ["M", "L", "XL"],
    allowNameNumber: true,
    countInStock: 15
  },

  // Liverpool Products
  {
    name: "Liverpool Home Jersey 2023-24",
    price: 86.99,
    description: "Liverpool FC official home jersey. The red crest returns with modern performance technology.",
    image: "https://images.unsplash.com/photo-1535132072855-614b60fb0e3f?w=400&h=400&fit=crop",
    category: "Jerseys",
    team: "Liverpool",
    league: "Premier League",
    brand: "Nike",
    season: "2023-24",
    jerseyType: "Home",
    isRetro: false,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    allowNameNumber: true,
    countInStock: 52
  },

  // Football Boots
  {
    name: "Nike Phantom GX Elite",
    price: 249.99,
    description: "Professional football boots designed for strikers. Exceptional touch and power. Worn by elite players.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Boots",
    brand: "Nike",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    allowNameNumber: false,
    countInStock: 60
  },
  {
    name: "Adidas Predator Elite",
    price: 279.99,
    description: "The legendary Predator line returns. Maximum control and swerve capability.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Boots",
    brand: "Adidas",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    allowNameNumber: false,
    countInStock: 55
  },
  {
    name: "Puma Future Z",
    price: 199.99,
    description: "Innovative Puma boots with speedmesh fabric. Perfect for dynamic midfielders.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Boots",
    brand: "Puma",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    allowNameNumber: false,
    countInStock: 50
  },

  // Accessories
  {
    name: "Official Football Size 5",
    price: 149.99,
    description: "Professional match ball used in official competitions. Premium construction.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=400&fit=crop",
    category: "Equipment",
    brand: "Adidas",
    allowNameNumber: false,
    countInStock: 100
  },
  {
    name: "Pro Shin Guards",
    price: 39.99,
    description: "High-impact protection shin guards. Lightweight and breathable.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop",
    category: "Equipment",
    brand: "Nike",
    sizes: ["S", "M", "L", "XL"],
    allowNameNumber: false,
    countInStock: 80
  },
  {
    name: "Team Soccer Socks",
    price: 24.99,
    description: "Professional soccer socks with moisture-wicking technology. Pack of 3 pairs.",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
    category: "Equipment",
    brand: "Adidas",
    allowNameNumber: false,
    countInStock: 150
  }
];

export default sampleProducts;
