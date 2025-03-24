
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  colors: string[];
  sizes: number[];
  images: string[];
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Air Max Pulse",
    brand: "Nike",
    price: 159.99,
    colors: ["Black/Anthracite", "White/Volt", "Grey/Red"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
    ],
    description: "Featuring a design inspired by the energy of London's music scene, the Nike Air Max Pulse brings a unique edge to the Air Max legacy. The textile-wrapped midsole and vacuum-sealed accents achieve a raw, industrial look.",
    featured: true
  },
  {
    id: "2",
    name: "Ultra Boost 22",
    brand: "Adidas",
    price: 189.99,
    colors: ["Core Black", "Cloud White", "Blue Rush"],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
    ],
    description: "Featuring a Primeknit upper and responsive Boost cushioning, the Ultra Boost 22 delivers unmatched comfort and energy return. Designed with a focus on sustainability, the shoe uses recycled materials.",
    featured: true
  },
  {
    id: "3",
    name: "Chuck 70 High Top",
    brand: "Converse",
    price: 85.00,
    colors: ["Black", "Parchment", "Navy"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
    ],
    description: "The Chuck 70 is a premium take on the iconic Chuck Taylor All Star. Enhanced with upgraded materials and elevated craftsmanship, it delivers superior comfort and durability."
  },
  {
    id: "4",
    name: "Old Skool",
    brand: "Vans",
    price: 70.00,
    colors: ["Black/White", "Navy/White", "Red/White"],
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
    ],
    description: "The iconic Vans Old Skool silhouette features the signature side stripe and a low-top lace-up design. Constructed with durable suede and canvas, it offers both style and durability."
  },
  {
    id: "5",
    name: "RS-X³ Puzzle",
    brand: "Puma",
    price: 110.00,
    colors: ["White/Blue/Red", "Black/Neon", "Grey/Orange"],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
    ],
    description: "The PUMA RS-X³ Puzzle reimagines the classic RS running shoe with amplified proportions and bold design elements. The chunky silhouette features enhanced cushioning and a distinctive multi-layered look."
  },
  {
    id: "6",
    name: "990v5",
    brand: "New Balance",
    price: 184.99,
    colors: ["Grey", "Navy", "Black"],
    sizes: [40, 41, 42, 43, 44, 45, 46, 47],
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
    ],
    description: "The New Balance 990v5 continues the legacy of the iconic 990 series with premium materials and unparalleled craftsmanship. Made in the USA, it offers superior cushioning and stability."
  },
  {
    id: "7",
    name: "Jordan 1 Retro High",
    brand: "Nike",
    price: 170.00,
    colors: ["Chicago", "Royal Blue", "Shadow 2.0"],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
    ],
    description: "The Air Jordan 1 Retro High is the shoe that started it all. With its iconic silhouette and legendary history, it continues to define basketball culture and street style.",
    featured: true
  },
  {
    id: "8",
    name: "Classic Leather",
    brand: "Reebok",
    price: 80.00,
    colors: ["White", "Black", "Chalk"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://images.unsplash.com/photo-1604083392711-43f5d43c1a6c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      "https://images.unsplash.com/photo-1604083392711-43f5d43c1a6c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
    ],
    description: "The Reebok Classic Leather offers a clean and sophisticated look. With a supple leather upper and EVA midsole, it delivers everyday comfort and timeless style."
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
