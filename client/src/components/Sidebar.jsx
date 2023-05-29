import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";

const Icon = ({ styles, imgUrl, name, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled ? "cursor-pointer" : "cursor-not-allowed"
    } ${styles}`}
    onClick={handleClick}
  >
    {isActive === name ? (
      <img src={imgUrl} alt={name} className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt={name} className="w-1/2 h-1/2 grayscale" />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] ">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex flex-1 flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center itmes-center gap-3">
          {navlinks.map((item) => (
            <Icon
              key={item.name}
              // spreading all the items inside navlinks
              {...item}
              isActive={isActive}
              handleClick={() => {
                if (!item.disabled) {
                  setIsActive(item.name);
                  navigate(item.link);
                }
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
