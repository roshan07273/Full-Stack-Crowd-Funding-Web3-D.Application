import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`${styles} font-epilogue font-semibold lg:text-[16px] md:text-[12px] lg:leading-[26px] md:leading-[20px] text-white min-h-[52px] px-4 rounded-[10px]`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
