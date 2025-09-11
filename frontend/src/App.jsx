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

 
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home page (Hero + AuctionList) */}
        <Route
          path="/"
          element={<User />}
        />

        {/* Product detail page */}
        <Route path="/users" element={<User />} />
        <Route path="/products" element={<Product />} />
        <Route path="/bids" element={<Bid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
