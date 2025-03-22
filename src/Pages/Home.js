import React from "react";
import Header from "../Components/Header/Header.js";
import Footer from "../Components/Footer/Footer.js";
import Banner from "../Components/Banner/Banner.js";
import RowList from "../Components/Rows/RowList/RowList.js";
function Home() {
  return (
    <>
      <Header />
      <Banner />
      <RowList />
      <Footer />
    </>
  );
}

export default Home;
