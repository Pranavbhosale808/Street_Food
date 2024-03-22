import Navbar from "@/components/Navbar";
import NavGrid from "@/components/homepage/NavGrid";
import Offers from "@/components/homepage/Offers";
import ProdSlide1 from "@/components/homepage/ProdSlide1";
import SearchBar from "@/components/homepage/SearchBar";
import ShopSlide1 from "@/components/homepage/ShopSlide1";
import BottomNav from "@/components/BottomNav";
import Recommended from "@/components/homepage/Recommended";
import Sidebar from "@/components/Sidebar";

function Home() {
  return (
    <div className="">
      <Navbar />
      <Sidebar />
      <div className="py-20 space-y-8 px-4 lg:px-20">
        <SearchBar />
        {/* <Offers /> */}
        <NavGrid />
        <ProdSlide1 title={"What's delicious around here?"} />
        <img src={""} alt="promo" />
        <ShopSlide1 title={"Nearby Restaurants"} />
        {/* <ProdSlide1 title={"Highlights of March"} /> */}
        <Recommended />
      </div>
      <BottomNav />
    </div>
  );
}

export default Home;
