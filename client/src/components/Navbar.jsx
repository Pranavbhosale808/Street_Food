import { motion } from "framer-motion";
import { RiMenu2Fill } from "react-icons/ri";
import { FcMenu } from "react-icons/fc";
import logo from "@/assets/logo2.png";
import { VscBell } from "react-icons/vsc";
import { SlHandbag } from "react-icons/sl";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "@/store/reducers/sidebarSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setIsLoggedIn } from "@/store/reducers/authSlice";
import { IoCallOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { LuCompass } from "react-icons/lu";

const links = [
  {
    name: "Home",
    link: "",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Notification",
    link: "/notification",
  },
  {
    name: "Language",
    link: "/language",
  },
  {
    name: "Help",
    link: "/help",
  },
  {
    name: "Term and Policies",
    link: "/term-and-policies",
  },
];

function Navbar() {
  const activePath = location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  return (
    <nav className=" fixed w-full z-20 bg-white flex justify-between items-center p-5 py-3 shadow-md">
      <div className="flex items-center justify-center space-x-6">
        <RiMenu2Fill
          className="text-black text-3xl lg:hidden"
          role="button"
          onClick={() => dispatch(setSidebar(true))}
        />
        <img src={logo} alt="" className="w-20 h-full scale-150 hover:bg-sky-700" />
        <ul className="hidden lg:flex space-x-4">
          {links.map((item, i) => {
            return (
              <Link to={item.link}>
                <li
                  key={i}
                  className={`${activePath == item.link && "text-primary"}`}
                >
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center justify-center space-x-3 text-2xl">
        <Link to="/map" className="hidden lg:flex">
          <LuCompass />
        </Link>
        <Link to="/favourite" className="hidden lg:flex">
          {" "}
          <GoHeart />
        </Link>
        <Link to={"/notification"}>
          <VscBell />
        </Link>
        {/* <Link to={"/cart"}>
          <SlHandbag />
        </Link> */}
        <Link to={"/contact"}>
          <IoCallOutline />
        </Link>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Shop</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem
                role="button"
                onClick={() => dispatch(setIsLoggedIn(false))}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
