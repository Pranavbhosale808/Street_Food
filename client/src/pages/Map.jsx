
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import MapComponent from "@/components/MapComponent";
import axios from "axios";
import { loginSchema } from "@/schemas/authSchema";

function Map() {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchVendorsByFood = async () => {
    try {
      const response = await axios.post("/api/searchVendor", {
        foodItem: searchTerm,
      });
      setVendors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error searching vendors:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      searchVendorsByFood();
    }
  };

  return (
    <section>
      <div className="fixed z-50 bg-white w-full flex justify-center items-center space-x-4 shadow-md py-5 px-4">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="scale-150 text-muted-foreground" />
        </Link>
        <div
          to={"/search"}
          className="px-3 border-input w-4/5 bg-[#ECF1F6] border rounded-full flex items-center justify-center"
        >
          <LuSearch className="text-xl text-muted-foreground" />
          <input
            type="text"
            placeholder="Enter shop name or food"
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#ECF1F6] w-full h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <MapComponent vendors={vendors} />

      <div className="bg-center w-full h-screen">
        <Button
          variant="outline"
          className="absolute z-50 bottom-20 right-4"
          onClick={handleSearch}
        >
          Scan Nearby
        </Button>
      </div>

      <BottomNav />
    </section>
  );
}

export default Map;



