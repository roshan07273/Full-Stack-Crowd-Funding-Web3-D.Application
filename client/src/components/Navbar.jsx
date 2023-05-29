import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
  const { address } = useStateContext();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="flex lg:flex-1 flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />

        <div className=" w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer  ">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="hidden sm:flex flex-row justify-end gap-4">
        {address ? (
          <>
            <CustomButton
              btnType="button"
              title={"Create a campaign"}
              styles={"bg-[#1dc071] hover:bg-[#1dc060]"}
              handleClick={() => {
                if (address) navigate("/create-campaign");
              }}
            />
            <ConnectWallet accentColor={"#1c1c24"} />
          </>
        ) : (
          <ConnectWallet accentColor={"#8c6dfd"} />
        )}

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* SECTION mobile navbar menu */}
      <div className="flex sm:hidden justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain "
          // NOTE whatever the "previous state" of setToggleDrawer is, you have to set that state to "not-previous-state"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((item) => (
              <li
                key={item.name}
                className={`flex p-4 ${
                  isActive === item.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(item.name);
                  setToggleDrawer(false);
                  navigate(item.link);
                }}
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === item.name ? "grayscale-0" : "grayscale"
                  }`}
                />

                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === item.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {item.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4 ">
            {address ? (
              <>
                <CustomButton
                  btnType="button"
                  title={"Create a campaign"}
                  styles={"bg-[#1dc071] hover:bg-[#1dc060]"}
                  handleClick={() => {
                    if (address) navigate("/create-campaign");
                  }}
                />
                <ConnectWallet accentColor={"#1c1c24"} />
              </>
            ) : (
              <ConnectWallet accentColor={"#8c6dfd"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
