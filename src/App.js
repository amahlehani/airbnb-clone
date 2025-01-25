import React from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import SearchResults from "./pages/SearchResults/SearchResults";
import Footer from "./components/Footer/Footer";
import ListingDetails from "./pages/ListingsDetails/ListingsDetails";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
