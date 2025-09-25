
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AuctionList.css";

function AuctionList() {
  // State to store products
  const [products, setProducts] = useState([]);
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Use global search query
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v0/product/allProducts");
        setProducts(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter products by search query (name, description, seller fields)
  const filteredProducts = products.filter(p => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const seller = p.user || {};
    return (
      (p.productName && p.productName.toLowerCase().includes(query)) ||
      (p.productDescription && p.productDescription.toLowerCase().includes(query)) ||
      (seller.username && seller.username.toLowerCase().includes(query)) ||
      (seller.email && seller.email.toLowerCase().includes(query)) ||
      (seller.firstName && seller.firstName.toLowerCase().includes(query)) ||
      (seller.lastName && seller.lastName.toLowerCase().includes(query))
    );
  });

  return (
    <div className="auction-list stylish-bg">
      {/* Big auction image and short description at the top */}
      <div className="auction-hero-section" style={{position: 'relative', textAlign: 'center', marginBottom: '2.5rem'}}>
         <h1 className="auction-hero-title" style={{fontSize: '3rem', fontWeight: '800', margin: '1.2rem 0 0.5rem', color: '#7A1528', letterSpacing: '1px'}}>RareSphere Auctions</h1>
        <h2 className="auction-hero-subtitle" style={{fontSize: '1.8rem', fontWeight: '600', margin: '0.5rem 0', color: 'black'}}>Bid, Win, and Own Something Unique</h2>
        <p className="auction-hero-desc" style={{fontSize: '1.3rem', color: '#0b0808ff', maxWidth: '600px', margin: '0 auto 1.5rem', fontWeight: '500'}}>Discover unique items, rare collectibles, and exclusive deals.<br />Browse our live auctions and place your bids to win amazing products!</p>

        <img src="https://sothebys-com.brightspotcdn.com/dims4/default/9b7ac95/2147483647/strip/true/crop/2691x1280+95+0/resize/1440x685!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F52%2Fbd%2F61936d0e4f96b153b4a88afb7cd0%2F252277900-park-life-web-banners-phaseii-homepage-salon-v2.jpg" alt="Auction Hero" style={{width: '100%', maxWidth: '900px', borderRadius: '24px', boxShadow: '0 8px 32px rgba(122,21,40,0.15)', margin: '0 auto'}} />
      </div>
      {/* Search Bar removed; only Navbar search bar remains */}
      <h2 className="auction-title" style={{fontSize: '2.2rem', fontWeight: '700', color: '#222', marginBottom: '2rem'}}>Available Auctions</h2>
      <div className="auction-grid stylish-grid">
        {filteredProducts.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: '1.2rem', color: '#7A1528', fontWeight: '600' }}>No products found matching your search.</p>
        ) : (
          filteredProducts.map((p) => (
            <div className="auction-card stylish-card" key={p.productId}>
              <img src={p.imageUrl ? `${p.imageUrl}`:`https://picsum.photos/seed/${p.productId}/400/300`} alt={p.productName} className="auction-img" style={{borderRadius: '16px', boxShadow: '0 2px 12px rgba(255, 255, 255, 0.1)'}} />
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#222', margin: '1rem 0 0.5rem'}}>{p.productName}</h3>
              <p style={{fontWeight: '600', color: '#333'}}>
                MinimumBid: <span style={{color: 'rgba(18, 18, 19, 1)'}}>₹{p.price}</span>
              </p>
              <p style={{color: '#555', fontSize: '1rem'}}>Auction: {new Date(p.auctionStartDate).toLocaleDateString()} - {new Date(p.auctionEndDate).toLocaleDateString()}</p>
              <Link to={`/product/${p.productId}`} className="auction-link" style={{display: 'inline-block', marginTop: '1rem', background: '#7A1528', color: '#fff', padding: '0.5rem 1.2rem', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.2s'}}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AuctionList;
