import ArtPage from "./pages/ArtPage";
import CollectiblesPage from "./pages/CollectiblesPage";
import TechnologyPage from "./pages/TechnologyPage";
import React from "react";
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
import FashionPage from "./pages/FashionPage";
import Updates from "./pages/Updates";
import LiveAuctionList from "./pages/LiveAuctionList";
import PastAuctionList from "./pages/PastAuctionList";

 
function App() {
  const [currency, setCurrency] = React.useState('USD');
  return (
    <Router>
      <Navbar currency={currency} setCurrency={setCurrency} />
      <Routes>
        {/* Home page (AuctionList) */}
        <Route path="/" element={<AuctionList currency={currency} />} />
        <Route path="/auctions" element={<AuctionList currency={currency} />} />
        <Route path="/live-auctions" element={<LiveAuctionList currency={currency} />} />
        <Route path="/passed-auctions" element={<PastAuctionList currency={currency} />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/users" element={<User />} />
        <Route path="/products" element={<Product />} />
        <Route path="/bids" element={<Bid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/productDetails" element={<ProductPage />} />
        <Route path="/categories" element={<CategoryList />} />
  <Route path="/category/:id" element={<CategoryPage currency={currency} />} />
  <Route path="/category/art" element={<ArtPage />} />
  <Route path="/category/collectibles" element={<CollectiblesPage />} />
  <Route path="/category/technology" element={<TechnologyPage />} />
  <Route path="/category/fashion" element={<FashionPage />} />
  <Route path="/product/:productId" element={<ProductDetails currency={currency} />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/updates-full" element={<UpdatesFull />} />
        {/* Profile and its sections */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/create-product" element={<CreateProduct />} />
        <Route path="/profile/my-bids" element={<MyBids currency={currency} />} />
        <Route path="/profile/my-products" element={<MyProducts currency={currency} />} />
        <Route path="/profile/user-details" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

import Profile from "./pages/Profile";
import CreateProduct from "./pages/CreateProduct";
import MyBids from "./pages/MyBids";
import MyProducts from "./pages/MyProducts";
import UserDetails from "./pages/UserDetails";
