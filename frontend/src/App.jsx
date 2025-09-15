import UpdatesFull from "./pages/UpdatesFull";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import AuctionList from "./pages/AuctionList";
import Navbar from "../src/components/Navbar";
import User from '../src/components/User';
import Product from '../src/components/Product';
import Bid from '../src/components/Bid';
import Login from '../src/components/Login';
import Signup from '../src/components/Signup';
import SearchResults from '../src/components/SearchResults';
import ProductPage from "./pages/ProductPage";
import CategoryList from "./pages/CategoryList";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import Updates from "./pages/Updates";
import LiveAuctionList from "./pages/LiveAuctionList";
import PassedAuctionList from "./pages/PassedAuctionList";

 
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home page (AuctionList) */}
        <Route
          path="/"
          element={<AuctionList />}
        />
        {/* Auction list page for /auctions route */}
  <Route path="/auctions" element={<AuctionList />} />
  <Route path="/live-auctions" element={<LiveAuctionList />} />
  <Route path="/passed-auctions" element={<PassedAuctionList />} />

        {/* Product detail page */}
         <Route path="/hero" element={<Hero />} />
         {/* Removed duplicate /auctionlist route to avoid confusion */}
        <Route path="/users" element={<User />} />
        <Route path="/products" element={<Product />} />
        <Route path="/bids" element={<Bid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/productDetails" element={<ProductPage />} />
         <Route path="/categories" element={<CategoryList />} />
        <Route path="/category/:id" element={<CategoryPage />} />

    <Route path="/product/:productId" element={<ProductDetails />} />
    <Route path="/updates" element={<Updates />} />
    <Route path="/updates-full" element={<UpdatesFull />} />

      </Routes>
    </Router>
  );
}

export default App;
