import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import AuctionList from "./pages/AuctionList";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import PostAuction from "./pages/PostAuction";
 
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home page (Hero + AuctionList) */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <AuctionList />
            </>
          }
        />

        {/* Product detail page */}
        <Route path="/product/:id" element={<ProductPage />} />
       <Route path="/post-auction" element={<PostAuction />} />
      </Routes>
    
    </Router>
  );
}

export default App;
