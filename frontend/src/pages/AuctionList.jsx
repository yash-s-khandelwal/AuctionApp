import { Link } from "react-router-dom";
import "./AuctionList.css";
function AuctionList() {
const products = [
  {
    id: 1,
    name: "Vintage Watch",
    price: "$120",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
  },
   {
    id: 2,
    name: "Classic Camera",
    price: "$250",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80"
  },
{
  id: 3,
  name: "Smartphone",
  price: "$450",
  image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"
},
   {
    id: 4,
    name: "Fine Art Painting",
    price: "$500",
    image: "https://picsum.photos/id/103/400/300"
  },
 {
    id: 5,
    name: "Vintage Furniture",
    price: "$750",
    image: "https://picsum.photos/id/104/400/300"
  },
   {
  id: 6,
  name: "Clothing",
  price: "$80",
  image: "https://picsum.photos/id/106/400/300"
},
  {
    id: 7,
    name: "Shoes",
    price: "$120",
    image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80"
  },
{
  id: 8,
  name: "Jewelry",
  price: "$200",
  image: "https://picsum.photos/id/107/400/300"
},
{
  id: 9,
  name: "Old Coin Collection",
  price: "$300",
  image: "https://images.unsplash.com/photo-1598387840470-18b0fc803f18?auto=format&fit=crop&w=500&q=80",
},
{
  id: 10,
  name: "Gift Cards",
  price: "$50",
  image: "https://images.unsplash.com/photo-1606813902891-1e2d8f00b37e?auto=format&fit=crop&w=500&q=80",
},
{
  id: 11,
  name: "Musical Instrument",
  price: "$650",
  image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=500&q=80",
},
{
  id: 12,
  name: "Smart TV",
  price: "$999",
  image: "https://images.unsplash.com/photo-1598300052083-74c1d9c74c7f?auto=format&fit=crop&w=500&q=80",
},

  ];


  return (
    <div className="auction-list">
      <h2 className="auction-title">Available Auctions</h2>
      <div className="auction-grid">
        {products.map((p) => (
          <div className="auction-card" key={p.id}>
            <img src={p.image} alt={p.name} className="auction-img" />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
            <Link to={`/product/${p.id}`} className="auction-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuctionList;
