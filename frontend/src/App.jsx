import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import AuctionList from "./pages/AuctionList";
import Navbar from "./components/Navbar";
import User from './components/User';
import Product from './components/Product';
import Bid from './components/Bid';
import Login from './components/Login';
import Signup from './components/Signup';
import SearchResults from './components/SearchResults';
import ProductPage from "./pages/ProductPage";
import CategoryList from "./pages/CategoryList";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";

 
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

        {/* Product detail page */}
         <Route path="/hero" element={<Hero />} />
         <Route path="/auctionlist" element={<AuctionList />} />
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

      </Routes>
    </Router>
  );
}

export default App;
