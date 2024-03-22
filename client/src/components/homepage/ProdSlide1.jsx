// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import { getMenuList } from "@/services/menu-services";
// import { AiOutlineRight } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";
// import { GoHeart } from "react-icons/go";
// import { Link } from "react-router-dom";

// const menuList = await getMenuList();
// function ProdSlide1({ title, list = menuList }) {
//   const toggleFavorite = (id) => {
    
//   };
//   return (
//     <section className=" space-y-4">
//       <div className="flex justify-between items-center w-full">
//         <h2 className="text-[20px] italic text-left">{title}</h2>
//         <Link to={"/"}>
//           <AiOutlineRight />
//         </Link>
//       </div>
//       <div>
//         <Carousel
//           opts={{
//             align: "start",
//             loop: false,
//           }}
//           className="flex justify-center items-center w-full"
//         >
//           <CarouselContent>
//             {list &&
//               list.map((item, i) => {
//                 return (
//                   <CarouselItem key={item._id || i}>
//                     <div className=" space-y-2">
//                       <img
//                         src={item.image}
//                         alt=""
//                         className="rounded-lg rounded-b-none m-auto md:basis-1/2 lg:basis-1/3"
//                       />
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <h4 className="font-semibold">{item.name}</h4>
//                           <p className="italic w-full flex mt-1">
//                             1.5 km | <FaStar className="text-yellow-500 mx-1" />{" "}
//                             4.8(1.2k)
//                           </p>
                        
//                         </div>
//                         <GoHeart
//                           className="mx-4 text-xl text-primary "
//                           role="button"
//                           onClick={() => toggleFavorite(item._id)}
//                         />
//                       </div>
//                     </div>
//                   </CarouselItem>
//                 );
//               })}
//           </CarouselContent>
//         </Carousel>
//       </div>
//     </section>
//   );
// }

// export default ProdSlide1;



import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getMenuList } from "@/services/menu-services";
import { AiOutlineRight } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { Link } from "react-router-dom";

// Import dish images
import BiryaniImage from "../../assets/Menu/Biryani.png";
import Pizza from "../../assets/Menu/Pizza.png";
import Burger from "../../assets/Menu/Burger.png";
import Shake from "../../assets/Menu/Shake.png";
import Cholebhature from "../../assets/Menu/Cholebhature.png";

const menuList = await getMenuList();

const dishes = [
  { name: "Biryani", image: BiryaniImage },
  { name: "Pizza", image: Pizza },
  { name: "Shake", image: Shake },
  { name: "Burger", image: Burger },
  { name: "Cholebhature", image: Cholebhature },
];

function ProdSlide1({ title, list = menuList }) {
  const toggleFavorite = (id) => {};

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 4000, // Animation speed (2 seconds)
    autoplay: true, // Autoplay enabled
    autoplaySpeed: 1000, // Delay between slides (4 seconds)
    slidesToShow: 5, // Show 5 images at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[20px] italic text-left">{title}</h2>
        <Link to={"/"}>
          <AiOutlineRight />
        </Link>
      </div>
      <div>
        <Slider {...sliderSettings}>
          {dishes.map((dish, i) => (
            <div key={i}>
              <div className="space-y-2 text-center">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="rounded-lg rounded-b-none mx-auto"
                  style={{ maxWidth: "150px", height: "150px" }}
                />
                <div className="mt-2 text-sm text-black">{dish.name}</div>
                <div className="flex justify-between items-center">
                  <div>
                 
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default ProdSlide1;
