import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Show only vintage products for the vintage category
        if (id && (id.toLowerCase() === 'vintage')) {
          setProducts([
            {
              productId: 10012,
              productName: "Vintage Camera",
              minimumBid: 348600,
              productDescription: "Working vintage film camera. Comes with a leather case.",
              auctionStartDate: "2025-09-27T17:30:00",
              auctionEndDate: "2025-10-07T17:30:00",
              imageUrl: null,
              user: {
                userId: 10000,
                username: "rajiv.sharma@example.in",
                email: "Rajiv",
                phoneNumber: "2025-09-08 16:25:54",
                firstName: "Sharma",
                lastName: "rajiv_sharma",
                createdAt: null
              }
            },
            {
              productId: 10013,
              productName: "Hand-Woven Silk Scarf",
              minimumBid: 83000,
              productDescription: "High-quality silk scarf with intricate patterns and vibrant colors.",
              auctionStartDate: "2025-09-28T20:30:00",
              auctionEndDate: "2025-10-08T20:30:00",
              imageUrl: null,
              user: {
                userId: 10021,
                username: "prachi.sen@app.in",
                email: "Prachi",
                phoneNumber: "2025-09-08 16:25:54",
                firstName: "Sen",
                lastName: "prachi_sen",
                createdAt: null
              }
            },
            {
              productId: 10027,
              productName: "Vintage Fountain Pen",
              minimumBid: 166000,
              productDescription: "A classic fountain pen with a gold nib. Includes a leather case.",
              auctionStartDate: "2025-10-12T20:30:00",
              auctionEndDate: "2025-10-22T20:30:00",
              imageUrl: null,
              user: {
                userId: 10013,
                username: "sonia.das@data.in",
                email: "Sonia",
                phoneNumber: "2025-09-08 16:25:54",
                firstName: "Das",
                lastName: "sonia_das",
                createdAt: null
              }
            }
          ]);
        } else {
          let endpoint;
          if (!isNaN(Number(id))) {
            endpoint = `http://localhost:8080/api/v0/category/getProductInCategory/${id}`;
          } else {
            endpoint = `http://localhost:8080/api/v0/category/getProductInCategoryByName/${id}`;
            if (id && (id.toLowerCase() === 'jewelry')) {
              endpoint = `http://localhost:8080/api/v0/category/getProductInCategoryByName/jewelry`;
            }
            if (id && (id.toLowerCase() === 'home-and-living' || id.toLowerCase() === 'home & living' || id.toLowerCase() === 'home and living')) {
              endpoint = `http://localhost:8080/api/v0/category/getProductInCategoryByName/home and living`;
            }
            if (id && (id.toLowerCase() === 'sports-memorabilia' || id.toLowerCase() === 'sports memorabilia')) {
              endpoint = `http://localhost:8080/api/v0/category/getProductInCategoryByName/sports memorabilia`;
            }
          }
          const response = await axios.get(endpoint);
          if (Array.isArray(response.data)) {
            const now = new Date();
            const liveAuctions = response.data.filter(product => {
              const start = new Date(product.auctionStartDate);
              const end = new Date(product.auctionEndDate);
              return start <= now && now < end;
            });
            setProducts(liveAuctions);
          } else {
            setProducts([]);
          }
        }
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  if (loading) return <p>Loading products...</p>;

  // Currency conversion logic
  const conversionRates = { USD: 1, INR: 83, EUR: 0.93, GBP: 0.8 };
  const currencySymbols = { USD: '$', INR: '₹', EUR: '€', GBP: '£' };
  function convertPrice(price, from, to) {
    if (from === to) return price;
    return Math.round(price * (conversionRates[to] / conversionRates[from]));
  }

  // Mock vintage products if API fails or returns no products
  const mockVintage = [
    {
      productId: 1,
      productName: 'Vintage Leather Bag',
      price: 1500,
      auctionStartDate: '2025-09-15',
      auctionEndDate: '2025-09-25',
      imagePath: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    },
    {
      productId: 2,
      productName: 'Vintage Watch',
      price: 1200,
      auctionStartDate: '2025-09-16',
      auctionEndDate: '2025-09-26',
      imagePath: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    },
    {
      productId: 3,
      productName: 'Classic Camera',
      price: 2500,
      auctionStartDate: '2025-09-17',
      auctionEndDate: '2025-09-27',
      imagePath: 'https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=400&q=80',
    },
  ];
  const showProducts = products.length > 0 ? products : mockVintage;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#7A1528', marginBottom: '2rem'}}>
        {id ? `${id.charAt(0).toUpperCase() + id.slice(1)} Auctions` : 'Category Auctions'}
      </h2>
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center", background: "#f5f5f5", padding: "32px 0" }}>
        {showProducts.map((product, idx) => (
          <div key={product.productId || idx} style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
            width: "340px",
            margin: "16px",
            padding: "1.2rem 0.8rem 1.1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "0.2px solid #e0e0e0",
          }}>
            <img src={product.imagePath} alt={product.productName} style={{
              width: "100%",
              maxWidth: "300px",
              height: "210px",
              objectFit: "cover",
              borderRadius: "14px",
              marginBottom: "1.3rem",
              boxShadow: "0 6px 24px rgba(122,21,40,0.13)",
              border: "none",
              outline: "none",
              transition: "box-shadow 0.2s",
            }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#222',
              margin: '0 0 0.7rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}>{product.productName}</h3>
            <div style={{
              fontWeight: '500',
              color: '#444',
              fontSize: '1.08rem',
              margin: '0 0 0.7rem',
              textAlign: 'center',
            }}>
              MinimumBid: <span style={{color: '#7A1528', fontWeight: '700'}}>
                ₹{product.minimumBid}
              </span>
            </div>
            <div style={{
              color: '#7A1528',
              fontSize: '1.08rem',
              fontWeight: '600',
              margin: '0 0 1.2rem',
              textAlign: 'center',
            }}>
              Auction: {new Date(product.auctionStartDate).toLocaleDateString()} - {new Date(product.auctionEndDate).toLocaleDateString()}
            </div>
            <a
              href={`/product/${product.productId}`}
              style={{
                background: 'linear-gradient(90deg, #7A1528 60%, #a83250 100%)',
                color: '#fff',
                padding: '0.7rem 2.2rem',
                borderRadius: '7px',
                fontWeight: '700',
                fontSize: '1.08rem',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(122,21,40,0.08)',
                border: 'none',
                transition: 'background 0.2s',
                letterSpacing: '0.03em',
                cursor: 'pointer',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
