import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import EntriesSearch from "../../Components/EntriesSearch/EntriesSearch";

import "./home.css";

function Home() {
  return (
    <div className="home">
      <Header />

      <section className="section-home">
        <h2>Discover your city </h2>
        <p>Discover accessible cities below</p>
      </section>

      <EntriesSearch />

      <Footer />
    </div>
  );
}

export default Home;
