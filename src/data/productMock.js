const productMock = [
  {
    id: 1,
    name: "Vintage Watch",
    price: "$120",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    condition: "Pre-owned",
    brand: "Unbranded",
    color: "Brown",
    material: "Leather",
    category: "Watches & Accessories",
    type: "Watch Case",
    country: "China",
    endTime: "2025-09-12T18:00:00",
    description: "Classic vintage watch with gold finish. Perfect collectible for enthusiasts.",
    seller: {
      name: "blackhummer",
      feedback: "100% positive",
      itemsSold: 1200,
      memberSince: "Jan 2004",
      responseTime: "Usually responds within 24 hours",
      recentSales: [
        "Philips Sonicare Electric Toothbrush HX939W Charging cup (#297315689700)",
        "Good Golly Miss Dollyspeckled Stoneware Coffee (#296887152183)",
        "Highland Cow Plush Toy with Breathing Feature (#296887152183)",
        "Gena Heritage Black Ring size 10 (#296694195775)"
      ]
    }
  },
  {
    id: 2,
    name: "Classic Camera",
    price: "$250",
    image: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=400&q=80",
    condition: "Pre-owned",
    brand: "Canon",
    color: "Black",
    material: "Metal/Plastic",
    category: "Cameras",
    type: "DSLR",
    country: "Japan",
    description: "Retro DSLR camera with excellent optics, sturdy build, and perfect for collectors.",
    seller: {
      name: "cameraPro",
      feedback: "98% positive",
      itemsSold: 850,
      memberSince: "Mar 2010",
      responseTime: "Usually responds within 12 hours",
      recentSales: [
        "Canon Lens EF 50mm f/1.8 (#295678123456)",
        "Vintage Tripod Stand (#295678987654)"
      ]
    }
  },
  {
    id: 3,
    name: "Smartphone",
    price: "$450",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    condition: "New",
    brand: "Samsung",
    color: "Black",
    material: "Glass/Metal",
    category: "Smartphones",
    type: "Galaxy Series",
    country: "South Korea",
    description: "Latest Samsung Galaxy smartphone with high-end specs, fast processor, and sleek design.",
    seller: {
      name: "techGuru",
      feedback: "99% positive",
      itemsSold: 500,
      memberSince: "Jun 2015",
      responseTime: "Usually responds within 6 hours",
      recentSales: [
        "Samsung Galaxy Buds Pro (#298765432101)",
        "Samsung Fast Charger (#298765432102)"
      ]
    }
  },
  {
    id: 4,
    name: "Fine Art Painting",
    price: "$500",
    image: "https://picsum.photos/id/103/400/300",
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
    id: 5,
    name: "Vintage Furniture",
    price: "$750",
    image: "https://picsum.photos/id/104/400/300",
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
    id: 6,
    name: "Clothing",
    price: "$80",
    image: "https://picsum.photos/id/106/400/300",
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
    id: 7,
    name: "Shoes",
    price: "$120",
    image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80",
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
    id: 8,
    name: "Jewelry",
    price: "$200",
    image: "https://picsum.photos/id/107/400/300",
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
