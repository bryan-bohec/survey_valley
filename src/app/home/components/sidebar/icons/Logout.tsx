import React from "react";
import { IconProps } from "./types";

export const Logout: React.FC<IconProps> = ({ size = 18, ...rest }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2_164)">
        <path d="M2.5 15L8.75 20V16.25H20V13.75H8.75V10L2.5 15Z" fill="#8E8E8E" />
        <path d="M16.2513 3.74876C14.7732 3.74466 13.309 4.0339 11.9434 4.59972C10.5779 5.16553 9.33827 5.99668 8.29626 7.04501L10.0638 8.81251C11.7163 7.16001 13.9138 6.24876 16.2513 6.24876C18.5888 6.24876 20.7863 7.16001 22.4388 8.81251C24.0913 10.465 25.0025 12.6625 25.0025 15C25.0025 17.3375 24.0913 19.535 22.4388 21.1875C20.7863 22.84 18.5888 23.7513 16.2513 23.7513C13.9138 23.7513 11.7163 22.84 10.0638 21.1875L8.29626 22.955C10.42 25.08 13.245 26.2513 16.2513 26.2513C19.2575 26.2513 22.0825 25.08 24.2063 22.955C26.3313 20.8313 27.5025 18.0063 27.5025 15C27.5025 11.9938 26.3313 9.16876 24.2063 7.04501C23.1643 5.99668 21.9246 5.16553 20.5591 4.59972C19.1936 4.0339 17.7294 3.74466 16.2513 3.74876Z" fill="#8E8E8E" />
      </g>
      <defs>
        <clipPath id="clip0_2_164">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
