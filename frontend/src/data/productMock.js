const productMock = [
  {
    id: 1,
    name: "Vintage Watch",
    price: "$120",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    category: "VINTAGE",
    description: "Classic vintage watch with gold finish. Perfect collectible for enthusiasts."
  },
  {
    id: 2,
    name: "Designer Dress",
    price: "$220",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    category: "FASHION",
    description: "Elegant designer dress for special occasions."
  },
  {
    id: 3,
    name: "Smart Watch",
    price: "$199",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    category: "TECHNOLOGY",
    description: "Latest tech wearable."
  },
  {
    id: 4,
    name: "Rare Coin",
    price: "$500",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "COLLECTIBLES",
    description: "Rare collectible coin from 1800s."
  },
  {
    id: 5,
    name: "Abstract Painting",
    price: "$350",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    category: "ART",
    description: "Modern abstract painting for art lovers."
  },
  {
    id: 6,
    name: "Diamond Ring",
    price: "$1200",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    category: "JEWELRY",
    description: "Beautiful diamond ring for special occasions."
  },
  {
    id: 7,
    name: "Luxury Sofa",
    price: "$800",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80",
    category: "FURNITURE",
    description: "Comfortable luxury sofa for your living room."
  },
  {
  id: 8,
  name: "Handmade Vase",
  price: "$60",
  image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80",
  category: "HANDMADE CRAFTS",
  description: "Unique handmade vase for home decor. Crafted with care and perfect for any room."
  },
  {
    id: 9,
    name: "Sports Jersey",
    price: "$90",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    category: "SPORTS MEMORABILIA",
    description: "Signed sports jersey from famous player."
  },
  {
    id: 10,
    name: "Rare Book",
    price: "$75",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    category: "BOOKS",
    description: "First edition rare book."
  },
  {
    id: 11,
    name: "Smartphone",
    price: "$499",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    category: "ELECTRONICS",
    description: "Latest model smartphone."
  },
  {
    id: 12,
    name: "Classic Car",
    price: "$15000",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
    category: "VEHICLES",
    description: "Vintage classic car in great condition."
  },
  {
    id: 13,
    name: "Antique Clock",
    price: "$300",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    category: "ANTIQUES",
    description: "Antique clock from 19th century."
  },
  {
    id: 14,
    name: "Luxury Watch",
    price: "$2000",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    category: "TIMEPIECES",
    description: "Luxury timepiece for collectors."
  },
  {
    id: 15,
    name: "Fine Art Painting",
    price: "$500",
    image: "https://picsum.photos/id/103/400/300",
    category: "FINE ART",
    description: "Beautiful hand-painted canvas artwork with vibrant colors. A collector’s dream.",
    seller: {
      name: "artLover",
      feedback: "97% positive",
      itemsSold: 320,
      memberSince: "Jan 2012",
      responseTime: "Usually responds within 24 hours",
      recentSales: ["Abstract Landscape Painting (#298712345678)"]
    }
  },
  {
    id: 16,
    name: "Vintage Furniture",
    price: "$750",
    image: "https://picsum.photos/id/104/400/300",
    category: "FURNITURE",
    description: "Antique wooden chair with classic design and timeless elegance.",
    seller: {
      name: "furnitureKing",
      feedback: "96% positive",
      itemsSold: 450,
      memberSince: "Feb 2011",
      responseTime: "Usually responds within 24 hours",
      recentSales: ["Vintage Table Set (#298712398765)"]
    }
  },
  {
    id: 17,
    name: "Clothing",
    price: "$80",
    image: "https://picsum.photos/id/106/400/300",
    category: "CLOTHING",
    description: "Stylish and comfortable clothing, perfect for all occasions.",
    seller: {
      name: "fashionHub",
      feedback: "95% positive",
      itemsSold: 1100,
      memberSince: "Mar 2013",
      responseTime: "Usually responds within 24 hours",
      recentSales: ["Summer Dress (#298712300123)"]
    }
  },
  {
    id: 18,
    name: "Shoes",
    price: "$120",
    image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80",
    category: "FASHION",
    description: "Comfortable running shoes with durable sole, perfect for daily use.",
    seller: {
      name: "shoeWorld",
      feedback: "98% positive",
      itemsSold: 900,
      memberSince: "May 2014",
      responseTime: "Usually responds within 12 hours",
      recentSales: ["Running Shoes (#298712301234)"]
    }
  },
  {
    id: 19,
    name: "Jewelry",
    price: "$200",
    image: "https://picsum.photos/id/107/400/300",
    category: "JEWELRY",
    description: "Elegant jewelry set made with high-quality materials, perfect for gifting.",
    seller: {
      name: "jewelCraft",
      feedback: "99% positive",
      itemsSold: 750,
      memberSince: "Jul 2016",
      responseTime: "Usually responds within 6 hours",
      recentSales: ["Gold Necklace (#298712302345)"]
    }
  }
];

export default productMock;
